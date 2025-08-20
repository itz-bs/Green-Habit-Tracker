import React from 'react';
import { User } from '../../types';
import { Leaf, Bell } from 'lucide-react';
import { getStreakColor } from '../../utils/gameLogic';

interface HeaderProps {
  user: User;
  currentTab: string;
}

export const Header: React.FC<HeaderProps> = ({ user, currentTab }) => {
  const getTabTitle = (tab: string) => {
    const titles = {
      dashboard: 'Dashboard',
      habits: 'Log Habits',
      achievements: 'Achievements',
      challenges: 'Challenges',
      suggestions: 'Suggestions',
      community: 'Community',
      profile: 'Profile'
    };
    return titles[tab as keyof typeof titles] || 'EcoTracker';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 lg:px-6 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">
                {getTabTitle(currentTab)}
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 lg:hidden">
                Level {user.level} • {user.currentStreak}🔥
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Quick Stats - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900">{user.greenScore}</div>
              <div className="text-xs text-gray-500">Points</div>
            </div>
            <div className="text-center">
              <div className={`text-sm font-bold ${user.currentStreak >= 7 ? 'text-green-600' : 'text-gray-900'}`}>
                {user.currentStreak}
              </div>
              <div className="text-xs text-gray-500">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-purple-600">Lv. {user.level}</div>
              <div className="text-xs text-gray-500">Level</div>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
            {(user.name || user.email)?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};