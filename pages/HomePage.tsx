import React, { useState, useEffect, useMemo } from 'react';
import type { Page } from '../types';
import { ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const generateWaveData = () => {
  const data = [];
  const isVolatile = Math.random() > 0.5;
  const base = 50;
  const amplitude = isVolatile ? 30 : 10;
  for (let i = 0; i < 30; i++) {
    const value = base + Math.sin(i * 0.5) * amplitude * Math.random() + (Math.random() - 0.5) * 10;
    data.push({ name: i, uv: value });
  }
  return { data, isVolatile };
};

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-gray-800/50 p-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">{title}</h3>
        {children}
    </div>
);

const sleepData = [
  { name: 'Deep', value: 400 },
  { name: 'Light', value: 300 },
  { name: 'REM', value: 300 },
  { name: 'Awake', value: 100 },
];
const COLORS = ['#6366f1', '#818cf8', '#a78bfa', '#c4b5fd'];

const DataCard: React.FC<{icon: string, label: string, value: string, unit: string, colorClass: string, children?: React.ReactNode}> = 
({ icon, label, value, unit, colorClass, children }) => (
    <div className="bg-gray-800 p-4 rounded-xl flex items-center">
        <div className="flex-1">
            <div className="text-xs text-gray-400 flex items-center">{icon} <span className="ml-1">{label}</span></div>
            <div className="flex items-baseline">
                <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
                <span className="text-sm text-gray-400 ml-1">{unit}</span>
            </div>
        </div>
        {children && <div className="w-24 h-12">{children}</div>}
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const [heartRate, setHeartRate] = useState(72);
  const [temperature] = useState(36.8);
  
  const { data: waveData, isVolatile } = useMemo(() => generateWaveData(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(hr => Math.min(120, Math.max(50, hr + Math.floor(Math.random() * 5) - 2)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col p-6 pb-28 overflow-y-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Hello, there</h1>
        <p className="text-gray-400">Here's your emotional summary today.</p>
      </header>

      <div className="h-40 -mx-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={waveData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isVolatile ? "#fb923c" : "#818cf8"} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isVolatile ? "#fb923c" : "#818cf8"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="uv" stroke={isVolatile ? "#fb923c" : "#818cf8"} strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
        <p className={`text-center text-sm font-semibold -mt-4 ${isVolatile ? 'text-orange-400' : 'text-blue-400'}`}>
            Emotion Wave: {isVolatile ? 'Volatile' : 'Calm'}
        </p>
      </div>
      
      <div className="space-y-4 mt-6">
        <Section title="Basic Data">
            <div className="space-y-3">
                <DataCard icon="❤️" label="Heart Rate" value={String(heartRate)} unit="BPM" colorClass="text-red-400" />
                <DataCard icon="🌡️" label="Temperature" value={String(temperature)} unit="°C" colorClass="text-orange-400" />
                <DataCard icon="😴" label="Sleep" value="7h 15m" unit="" colorClass="text-indigo-400">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={sleepData} cx="50%" cy="50%" innerRadius={12} outerRadius={20} fill="#8884d8" paddingAngle={5} dataKey="value" >
                                {sleepData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </DataCard>
            </div>
        </Section>
        
        <Section title="Deep Analysis">
            <p className="text-gray-300 text-sm">Your recent HRV and skin electricity data suggest a period of high focus. Remember to take short breaks.</p>
        </Section>
      </div>

      <div className="mt-auto pt-6">
        <button 
            onClick={() => navigateTo('games')}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold py-4 rounded-full shadow-lg hover:scale-105 transition-transform">
          Today's Suggestion: Try a Game
        </button>
      </div>
    </div>
  );
};

export default HomePage;
