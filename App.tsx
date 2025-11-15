import React, { useState, useCallback } from 'react';
// FIX: Added Transition type import from framer-motion to resolve typing error for pageTransition.
import { AnimatePresence, motion, Transition } from 'framer-motion';
import type { Page, AvatarConfig } from './types';
import LoginPage from './pages/LoginPage';
import AvatarCustomizationPage from './pages/AvatarCustomizationPage';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';

const pageVariants = {
  initial: { opacity: 0, x: 300 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -300 },
};

// FIX: Explicitly typed pageTransition with the Transition type from framer-motion.
const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig | null>(null);

  const handleLogin = useCallback(() => {
    // Timeout removed, LoginPage now controls the flow.
    setPage('avatarCustomization');
  }, []);

  const handleAvatarCreate = useCallback((config: AvatarConfig) => {
    setAvatarConfig(config);
    setIsLoggedIn(true);
    setPage('home');
  }, []);

  const navigateTo = useCallback((newPage: Page) => {
    setPage(newPage);
  }, []);
  
  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'avatarCustomization':
        return <AvatarCustomizationPage onAvatarCreate={handleAvatarCreate} existingConfig={avatarConfig} />;
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'games':
        return <GamesPage />;
      case 'chat':
        return avatarConfig ? <ChatPage avatarConfig={avatarConfig} /> : <div className="p-4 text-center">Please create an avatar first.</div>;
      case 'profile':
        return <ProfilePage navigateTo={navigateTo} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-[393px] h-[852px] bg-black rounded-[60px] shadow-2xl overflow-hidden relative border-8 border-gray-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-2xl z-20"></div>
        <div className="w-full h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
        {isLoggedIn && (
          <BottomNav activePage={page} navigateTo={navigateTo} />
        )}
      </div>
    </div>
  );
}
