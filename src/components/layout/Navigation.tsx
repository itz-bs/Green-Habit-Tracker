import React from 'react';
import { Tab } from '../../types';
import { Home, Plus, Trophy, Target, Lightbulb, Users, User } from 'lucide-react';

interface NavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: Home, color: 'text-green-600' },
    { id: 'habits' as Tab, label: 'Log Habits', icon: Plus, color: 'text-blue-600' },
    { id: 'achievements' as Tab, label: 'Progress', icon: Trophy, color: 'text-yellow-600' },
    { id: 'challenges' as Tab, label: 'Challenges', icon: Target, color: 'text-purple-600' },
    { id: 'suggestions' as Tab, label: 'Tips', icon: Lightbulb, color: 'text-orange-600' },
    { id: 'community' as Tab, label: 'Community', icon: Users, color: 'text-pink-600' },
    { id: 'profile' as Tab, label: 'Profile', icon: User, color: 'text-gray-600' }
  ];

  return (
    <nav className="bg-white shadow-lg border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 lg:relative lg:shadow-none lg:border-t-0 lg:border-r lg:border-gray-200 lg:w-64 lg:h-screen lg:flex-shrink-0">
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible lg:h-full lg:py-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start space-y-1 lg:space-y-0 lg:space-x-3 px-3 py-2 lg:py-3 lg:px-6 lg:mx-3 lg:rounded-lg transition-colors whitespace-nowrap min-w-0 flex-1 lg:flex-initial ${
                isActive
                  ? `${tab.color} bg-gray-50 lg:bg-green-50 lg:border-r-2 lg:border-green-500`
                  : 'text-gray-500 hover:text-gray-700 lg:hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-5 w-5 lg:h-5 lg:w-5 ${isActive ? tab.color : ''}`} />
              <span className="text-xs lg:text-sm font-medium lg:font-normal truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};