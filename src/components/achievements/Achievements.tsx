import React, { useState } from 'react';
import { User, Habit } from '../../types';
import { Card } from '../common/Card';
import { CalendarView } from './CalendarView';
import { MilestonesView } from './MilestonesView';
import { Calendar, Trophy, TrendingUp } from 'lucide-react';
import { ImpactChart } from '../impact/ImpactChart';

interface AchievementsProps {
  user: User;
  habits: Habit[];
}

export const Achievements: React.FC<AchievementsProps> = ({ user, habits }) => {
  const [view, setView] = useState<'calendar' | 'milestones' | 'impact'>('calendar');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Green Journey 🏆</h1>
        <p className="text-gray-600">Track your progress and celebrate your achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{user.currentStreak}</p>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-xs text-green-600">Best: {user.longestStreak} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{habits.length}</p>
              <p className="text-sm text-gray-600">Total Habits Logged</p>
              <p className="text-xs text-blue-600">This month: {
                habits.filter(h => {
                  const habitDate = new Date(h.date);
                  const now = new Date();
                  return habitDate.getMonth() === now.getMonth() && habitDate.getFullYear() === now.getFullYear();
                }).length
              }</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{user.badges.length}</p>
              <p className="text-sm text-gray-600">Badges Earned</p>
              <p className="text-xs text-yellow-600">Level {user.level}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* View Toggle */}
      <Card className="p-4 mb-8">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 flex-wrap">
            <button
              onClick={() => setView('calendar')}
              className={`px-6 py-2 rounded-md transition-colors ${
                view === 'calendar'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => setView('milestones')}
              className={`px-6 py-2 rounded-md transition-colors ${
                view === 'milestones'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Trophy className="h-4 w-4 inline mr-2" />
              Milestones
            </button>
            <button
              onClick={() => setView('impact')}
              className={`px-6 py-2 rounded-md transition-colors ${
                view === 'impact'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Impact
            </button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {view === 'calendar' ? (
        <CalendarView habits={habits} user={user} />
      ) : (
        view === 'milestones' ? (
          <MilestonesView user={user} habits={habits} />
        ) : (
          <ImpactChart habits={habits} />
        )
      )}
    </div>
  );
};