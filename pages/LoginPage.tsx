import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginButton: React.FC<{
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  isLoading: boolean;
}> = ({ children, className, onClick, isLoading }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={isLoading}
    className={`w-full text-white font-semibold py-4 px-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : children}
  </motion.button>
);

const WelcomeModal: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const messages = [
        "A small step today is a giant leap for your well-being.",
        "Remember to be kind to yourself. You're doing great.",
        "Your feelings are valid. Take a deep breath.",
        "Even on cloudy days, the sun is still shining."
    ];
    const [message] = useState(messages[Math.floor(Math.random() * messages.length)]);

    React.useEffect(() => {
        const timer = setTimeout(onLogin, 2000); // Navigate after 2 seconds
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLogin]);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-white text-center shadow-2xl max-w-sm">
                <p className="text-xl italic">"{message}"</p>
            </div>
        </motion.div>
    );
};

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleLoginClick = () => {
    if (isLoading || showWelcome) return;
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setShowWelcome(true);
    }, 1200);
  };
  
  return (
    <div className="h-full w-full breathing-gradient flex flex-col justify-around items-center p-8 text-white overflow-hidden">
        <AnimatePresence>
            {showWelcome && <WelcomeModal onLogin={onLogin} />}
        </AnimatePresence>
        
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold tracking-tighter">Your Band</h1>
        <p className="mt-2 text-lg opacity-80">Your Personal Wellness Companion</p>
      </motion.div>

      <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      >
          <div className="relative">
              <motion.div 
                  className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center text-4xl font-mono text-gray-800"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                  (^_^)
              </motion.div>
              <motion.div 
                  className="absolute -top-2 -right-14 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 15 }}
              >
                  Hello!
                  <div className="absolute left-2 bottom-[-8px] w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>
              </motion.div>
          </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="w-full max-w-sm space-y-4"
      >
        <LoginButton
          className="bg-blue-500/80 hover:bg-blue-500"
          onClick={handleLoginClick}
          isLoading={isLoading}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 8.5V10a1.5 1.5 0 0 0 1.5 1.5h1A1.5 1.5 0 0 0 8 10V8.5a1.5 1.5 0 0 0-1.5-1.5h-1A1.5 1.5 0 0 0 4 8.5Z M16 7a1.5 1.5 0 0 1 1.5 1.5V10a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V8.5A1.5 1.5 0 0 1 15 7Z M5.5 14h13a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z"></path></svg>
            Connect with Band
          </span>
        </LoginButton>
        <LoginButton
          className="bg-green-500/80 hover:bg-green-500"
          onClick={handleLoginClick}
          isLoading={isLoading}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M11.333 14.061C12.13 14.53 13.065 15 14 15c2.21 0 4-1.79 4-4s-1.79-4-4-4c-2.094 0-3.801 1.604-3.983 3.66"></path><path d="m7 11.5 2.5 2.5 5-5"></path><path d="M21 12a9 9 0 1 1-9-9"></path></svg>
            Sign in with WeChat
          </span>
        </LoginButton>
        <LoginButton
          className="bg-purple-500/80 hover:bg-purple-500"
          onClick={handleLoginClick}
          isLoading={isLoading}
        >
         <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Use Phone Number
          </span>
        </LoginButton>
      </motion.div>
    </div>
  );
};

export default LoginPage;
