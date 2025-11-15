import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '../components/icons';

type Game = 'lemon' | 'breathing' | 'match' | null;

interface GameProps {
    onEnd: (message: string) => void;
    onExit: () => void;
}

const GameExitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="absolute top-4 right-4 z-20 text-gray-800 bg-white/50 rounded-full p-2 transition-transform hover:scale-110">
        <XIcon />
    </button>
);

const TOTAL_LEMONS_TO_SMASH = 20;
const MAX_LEMONS_ON_SCREEN = 7;

const LemonSqueezeGame: React.FC<GameProps> = ({ onEnd, onExit }) => {
    const [lemons, setLemons] = useState<{ id: number; top: string; left: string }[]>([]);
    const [smashedCount, setSmashedCount] = useState(0);
    const nextId = useRef(0);

    const addLemon = useCallback(() => {
        if (smashedCount + lemons.length >= TOTAL_LEMONS_TO_SMASH) return;
        
        const newLemon = {
            id: nextId.current++,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
        };
        setLemons(prev => [...prev, newLemon]);
    }, [lemons.length, smashedCount]);

    useEffect(() => {
        // Initial lemons
        const initialCount = Math.min(TOTAL_LEMONS_TO_SMASH, MAX_LEMONS_ON_SCREEN);
        if (lemons.length === 0 && nextId.current === 0) {
            for (let i = 0; i < initialCount; i++) {
                addLemon();
            }
        }
    }, [addLemon, lemons.length]);

    useEffect(() => {
        if (smashedCount >= TOTAL_LEMONS_TO_SMASH) {
            setTimeout(() => onEnd(`Stress Released: 100%`), 1000);
        }
    }, [smashedCount, onEnd]);

    const handleSmash = (id: number) => {
        setSmashedCount(prev => prev + 1);
        setLemons(prev => prev.filter(lemon => lemon.id !== id));
        setTimeout(addLemon, 200); // Add a new one to replace, with a small delay
    };

    return (
        <div className="absolute inset-0 bg-yellow-200 p-4 flex flex-col overflow-hidden">
            <GameExitButton onClick={onExit} />
            <h2 className="text-2xl font-bold text-yellow-800 text-center z-10">Smash the lemons!</h2>
            <div className="relative flex-grow">
                <AnimatePresence>
                    {lemons.map(lemon => (
                        <motion.div
                            key={lemon.id}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 360, transition: { duration: 0.3 } }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            onClick={() => handleSmash(lemon.id)}
                            className="absolute aspect-square text-5xl flex items-center justify-center cursor-pointer"
                            style={{ top: lemon.top, left: lemon.left }}
                        >
                           🍋
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <p className="text-center text-yellow-700 font-bold z-10">Smashed: {smashedCount}/{TOTAL_LEMONS_TO_SMASH}</p>
        </div>
    );
};

const BreathingDoughGame: React.FC<GameProps> = ({ onEnd, onExit }) => {
    const [cycle, setCycle] = useState('inhale');
    const [perfect, setPerfect] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCycle(c => c === 'inhale' ? 'exhale' : 'inhale');
        }, 4000);
        return () => clearTimeout(timer);
    }, [cycle]);

    useEffect(() => {
        if (perfect >= 5) {
            setTimeout(() => onEnd("Great job! You're in sync."), 2000);
        }
    }, [perfect, onEnd]);

    return (
        <div className="absolute inset-0 bg-blue-200 p-4 flex flex-col items-center justify-center overflow-hidden">
             <GameExitButton onClick={onExit} />
            {perfect > 0 && <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 opacity-50 animate-pulse"></div>}
            <p className="absolute top-5 text-xl text-blue-800 font-bold capitalize animate-pulse">{cycle}</p>
            <motion.div
                animate={{ scale: cycle === 'inhale' ? 1.5 : 1 }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                className="w-40 h-40 bg-purple-400 rounded-full"
                onTap={() => setPerfect(p => p+1)}
            ></motion.div>
            <p className="absolute bottom-5 text-lg text-blue-700">Tap in rhythm. Perfect: {perfect}</p>
        </div>
    );
};

const EmotionMatchGame: React.FC<GameProps> = ({ onEnd, onExit }) => {
    const emojis = ['😊', '😢', '😠', '😮'];
    const [grid, setGrid] = useState(Array.from({length: 16}, () => emojis[Math.floor(Math.random() * emojis.length)]));
    const [score, setScore] = useState(0);

    const handleClick = (index: number) => {
        setScore(s => s + 10);
        const newGrid = [...grid];
        newGrid[index] = '💥';
        setGrid(newGrid);
        setTimeout(() => setGrid(g => g.map(cell => cell === '💥' ? emojis[Math.floor(Math.random() * emojis.length)] : cell)), 200);
    };

    useEffect(() => {
        if (score >= 100) {
            setTimeout(() => onEnd("You've cleared the board!"), 1000);
        }
    }, [score, onEnd]);

    return (
        <div className="absolute inset-0 bg-green-200 p-4 flex flex-col">
            <GameExitButton onClick={onExit} />
            <h2 className="text-2xl font-bold text-green-800 text-center">Emotion Match</h2>
            <div className="flex-grow grid grid-cols-4 gap-2 content-center">
                {grid.map((emoji, i) => (
                    <motion.div 
                        key={i} 
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleClick(i)}
                        className="aspect-square text-4xl flex items-center justify-center cursor-pointer bg-white/50 rounded-lg">
                        {emoji}
                    </motion.div>
                ))}
            </div>
            <p className="text-center text-green-700 font-bold">Score: {score}</p>
        </div>
    );
};

const GameCard: React.FC<{
  title: string;
  description: string;
  bgColor: string;
  onClick: () => void;
}> = ({ title, description, bgColor, onClick }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    onClick={onClick}
    className={`p-6 rounded-2xl text-white cursor-pointer shadow-lg ${bgColor}`}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="mt-2 text-sm opacity-80">{description}</p>
  </motion.div>
);

const GamesPage = () => {
    const [activeGame, setActiveGame] = useState<Game>(null);
    const [totalTime, setTotalTime] = useState(0);
    const [showResult, setShowResult] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setTotalTime(t => t+1), 1000);
        return () => clearInterval(timer);
    }, []);
    
    const handleGameEnd = useCallback((resultMessage: string) => {
        setActiveGame(null);
        setShowResult(resultMessage);
        setTimeout(() => setShowResult(null), 2000);
    }, []);

    const handleGameExit = useCallback(() => {
        setActiveGame(null);
    }, []);

    const renderGame = () => {
        switch (activeGame) {
            case 'lemon': return <LemonSqueezeGame onEnd={handleGameEnd} onExit={handleGameExit} />;
            case 'breathing': return <BreathingDoughGame onEnd={handleGameEnd} onExit={handleGameExit} />;
            case 'match': return <EmotionMatchGame onEnd={handleGameEnd} onExit={handleGameExit} />;
            default: return null;
        }
    }

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col p-6 pb-28 overflow-y-auto relative">
      <header>
        <h1 className="text-3xl font-bold">Decompression Games</h1>
        <p className="text-gray-400">Total time played: {Math.floor(totalTime / 60)}m {totalTime % 60}s</p>
      </header>

      <div className="mt-8 space-y-6">
        <GameCard
          title="Lemon Squeeze"
          description="Smash lemons to release tension. The more you smash, the better you feel!"
          bgColor="bg-gradient-to-br from-yellow-400 to-yellow-600"
          onClick={() => setActiveGame('lemon')}
        />
        <GameCard
          title="Breathing Dough"
          description="Sync your breath with the expanding dough. Find your calm center."
          bgColor="bg-gradient-to-br from-blue-400 to-indigo-600"
          onClick={() => setActiveGame('breathing')}
        />
        <GameCard
          title="Emotion Match"
          description="Clear away negative emotions and listen to soothing sounds."
          bgColor="bg-gradient-to-br from-green-400 to-teal-600"
          onClick={() => setActiveGame('match')}
        />
      </div>
      
      <AnimatePresence>
        {activeGame && (
             <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                className="absolute inset-0 z-20"
             >
                {renderGame()}
             </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResult && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center z-30 p-4"
            >
                <p className="text-2xl font-bold text-white text-center">{showResult}</p>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamesPage;
