import React, { useState } from 'react';
import type { AvatarConfig } from '../types';
import { EXPRESSIONS, PERSONALITIES, AVATAR_STYLES } from '../types';
import { motion } from 'framer-motion';

interface AvatarCustomizationPageProps {
  onAvatarCreate: (config: AvatarConfig) => void;
  existingConfig: AvatarConfig | null;
}

const OptionButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}> = ({ label, isSelected, onClick, className = '' }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full border-2 text-sm transition-all duration-200 ${
      isSelected
        ? 'bg-violet-500 border-violet-500 text-white'
        : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-violet-400'
    } ${className}`}
  >
    {label}
  </motion.button>
);

const AvatarPreview: React.FC<{ expression: string, avatarStyle: string }> = ({ expression, avatarStyle }) => {
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
        <motion.div
            key={`${expression}-${avatarStyle}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            className={`w-32 h-32 flex items-center justify-center font-mono text-4xl text-gray-900 shadow-lg transition-colors duration-300 ${avatarColor} ${shapeClasses}`}
        >
            {avatarStyle === 'Robot' ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3/4 h-1/4 bg-gray-800/50 flex items-center justify-center gap-4">
                        <div className="w-4 h-4 bg-cyan-300 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-cyan-300 rounded-full animate-pulse"></div>
                    </div>
                </div>
            ) : (
                avatarEyes
            )}
        </motion.div>
    );
};


const AvatarCustomizationPage: React.FC<AvatarCustomizationPageProps> = ({ onAvatarCreate, existingConfig }) => {
  const [avatarStyle, setAvatarStyle] = useState(existingConfig?.avatarStyle || AVATAR_STYLES[0]);
  const [expression, setExpression] = useState(existingConfig?.expression || EXPRESSIONS[0]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>(existingConfig?.personality || [PERSONALITIES[0]]);

  const handlePersonalityToggle = (p: string) => {
    setSelectedPersonalities(prev =>
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  const handleCreate = () => {
    if (selectedPersonalities.length > 0) {
      onAvatarCreate({ expression, personality: selectedPersonalities, avatarStyle });
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col p-6 overflow-y-auto">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">{existingConfig ? 'Modify' : 'Create'} Your Companion</h1>
        <p className="text-gray-400 mt-1 mb-6 text-sm">Personalize your AI for your wellness journey.</p>
        
        <AvatarPreview expression={expression} avatarStyle={avatarStyle} />
        
        <div className="w-full mt-6 space-y-4">
            <div>
              <h2 className="text-md font-semibold mb-2">Style</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {AVATAR_STYLES.map(s => (
                  <OptionButton key={s} label={s} isSelected={avatarStyle === s} onClick={() => setAvatarStyle(s)} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-md font-semibold mb-2">Expression</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {EXPRESSIONS.map(e => (
                  <OptionButton key={e} label={e} isSelected={expression === e} onClick={() => setExpression(e)} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-md font-semibold mb-2">Personality Traits</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {PERSONALITIES.map(p => (
                  <OptionButton key={p} label={p} isSelected={selectedPersonalities.includes(p)} onClick={() => handlePersonalityToggle(p)} />
                ))}
              </div>
            </div>
        </div>
      </div>
      
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          disabled={selectedPersonalities.length === 0}
          className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {existingConfig ? 'Save Changes' : 'Create Companion'}
        </motion.button>
      </div>
    </div>
  );
};

export default AvatarCustomizationPage;
