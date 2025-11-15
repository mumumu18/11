import React from 'react';
import type { Page } from '../types';
import { ChevronRightIcon } from '../components/icons';

interface ProfilePageProps {
  navigateTo: (page: Page) => void;
}

const ProfileMenuItem: React.FC<{
    icon: string;
    label: string;
    onClick: () => void;
}> = ({icon, label, onClick}) => (
    <button onClick={onClick} className="w-full flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
        <span className="text-2xl mr-4">{icon}</span>
        <span className="flex-grow text-left font-medium">{label}</span>
        <ChevronRightIcon />
    </button>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ navigateTo }) => {
  return (
    <div className="h-full bg-gray-900 text-white flex flex-col p-6 pb-28 overflow-y-auto">
      <header className="flex items-center gap-4 mb-8">
        <img src="https://picsum.photos/80" alt="User Avatar" className="w-20 h-20 rounded-full border-2 border-violet-400" />
        <div>
            <h1 className="text-2xl font-bold">User Name</h1>
            <p className="text-gray-400">Stay calm, stay positive.</p>
        </div>
      </header>

      <div className="space-y-4">
        <ProfileMenuItem icon="👤" label="Personal Account" onClick={() => {}}/>
        <ProfileMenuItem icon="⚙️" label="Settings" onClick={() => {}}/>
        <ProfileMenuItem icon="🎨" label="Background" onClick={() => {}}/>
        <ProfileMenuItem icon="🤖" label="Modify AI Avatar" onClick={() => navigateTo('avatarCustomization')}/>
        <ProfileMenuItem icon="❓" label="Help & Feedback" onClick={() => {}}/>
      </div>

      <div className="mt-auto pt-8">
          <button className="w-full text-center py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors">
              Log Out
          </button>
      </div>
    </div>
  );
};

export default ProfilePage;
