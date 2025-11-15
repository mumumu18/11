import React, { useState, useRef, useEffect } from 'react';
import { getAiChatResponse } from '../services/geminiService';
import type { AvatarConfig, Message } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { MicIcon, SendIcon } from '../components/icons';

interface ChatPageProps {
  avatarConfig: AvatarConfig;
}

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
          isUser
            ? 'bg-violet-500 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-200 rounded-bl-none'
        }`}
      >
        {message.text}
      </motion.div>
    </div>
  );
};

const Avatar: React.FC<{ config: AvatarConfig, size?: 'sm' | 'lg' }> = ({ config, size = 'lg' }) => {
    const { expression, avatarStyle } = config;

    const sizeClasses = size === 'lg' ? 'w-32 h-32 text-4xl' : 'w-12 h-12 text-xl';

    const avatarColor = {
      Calm: 'bg-blue-400',
      Happy: 'bg-yellow-400',
      Thoughtful: 'bg-purple-400',
      Curious: 'bg-green-400',
      Playful: 'bg-pink-400',
      Wise: 'bg-indigo-400',
    }[expression] || 'bg-gray-400';

    const avatarEyes = {
      Calm: '(- -)',
      Happy: '(^ ^)',
      Thoughtful: '(u u)',
      Curious: '(o o)',
      Playful: '(> <)',
      Wise: '(-_-)',
    }[expression] || '(o o)';
    
    const shapeClasses = {
      Circle: 'rounded-full',
      Square: 'rounded-2xl',
      Blob: 'rounded-[45%_55%_60%_40%_/_50%_40%_60%_50%]',
      Robot: 'rounded-lg border-4 border-gray-500 bg-gray-600',
    }[avatarStyle] || 'rounded-full';

    return (
        <div
            className={`flex items-center justify-center font-mono text-gray-900 shadow-lg transition-colors duration-300 ${sizeClasses} ${avatarColor} ${shapeClasses}`}
        >
            {avatarStyle === 'Robot' ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3/4 h-1/4 bg-gray-800/50 flex items-center justify-center gap-2">
                        <div className="w-3 h-3 bg-cyan-300 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-cyan-300 rounded-full animate-pulse"></div>
                    </div>
                </div>
            ) : (
                avatarEyes
            )}
        </div>
    );
};

const ChatPage: React.FC<ChatPageProps> = ({ avatarConfig }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: `Hello! I'm Aura. How are you feeling today?` },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAiChatResponse(input, avatarConfig);
    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      <header className="p-4 bg-gray-800/50 backdrop-blur-sm flex items-center gap-4 border-b border-gray-700">
        <Avatar config={avatarConfig} size="sm" />
        <div>
            <h1 className="text-xl font-bold text-white">Aura</h1>
            <p className="text-sm text-green-400">Online</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
        <AnimatePresence>
            {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg} />
            ))}
        </AnimatePresence>
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-200 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="absolute bottom-24 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center gap-2 bg-gray-800 rounded-full p-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none px-2"
            disabled={isLoading}
          />
          <button className="p-2 text-gray-400 hover:text-white transition-colors"><MicIcon /></button>
          <button 
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="w-10 h-10 flex items-center justify-center bg-violet-500 rounded-full text-white disabled:bg-gray-600 transition-colors"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
