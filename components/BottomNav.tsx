import React from 'react';
import type { Page } from '../types';
import { HomeIcon, Gamepad2Icon, BotIcon, UserIcon } from './icons';

interface BottomNavProps {
  activePage: Page;
  navigateTo: (page: Page) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 h-full transition-all duration-300 transform ${
      isActive ? 'text-violet-400 scale-110' : 'text-gray-400'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activePage, navigateTo }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-900/80 backdrop-blur-md rounded-b-[56px] flex items-center justify-around z-10 border-t border-gray-700">
      <NavItem
        label="Home"
        icon={<HomeIcon />}
        isActive={activePage === 'home'}
        onClick={() => navigateTo('home')}
      />
      <NavItem
        label="Games"
        icon={<Gamepad2Icon />}
        isActive={activePage === 'games'}
        onClick={() => navigateTo('games')}
      />
      <NavItem
        label="Companion"
        icon={<BotIcon />}
        isActive={activePage === 'chat'}
        onClick={() => navigateTo('chat')}
      />
      <NavItem
        label="Me"
        icon={<UserIcon />}
        isActive={activePage === 'profile'}
        onClick={() => navigateTo('profile')}
      />
    </div>
  );
};

export default BottomNav;
