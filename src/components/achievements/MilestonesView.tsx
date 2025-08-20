import React from 'react';
import { User, Habit } from '../../types';
import { Card } from '../common/Card';
import { Trophy, Star, Target, Zap, Calendar, Award } from 'lucide-react';
import { getXpForNextLevel } from '../../utils/gameLogic';

interface MilestonesViewProps {
  user: User;
  habits: Habit[];
}

export const MilestonesView: React.FC<MilestonesViewProps> = ({ user, habits }) => {
  const milestones = [
    {
      id: 'streak_7',
      title: 'Week Warrior',
      description: '7-day streak',
      icon: '🔥',
      target: 7,
      current: user.currentStreak,
      completed: user.currentStreak >= 7,
      category: 'streak'
    },
    {
      id: 'streak_30',
      title: 'Month Master',
      description: '30-day streak',
      icon: '🏆',
      target: 30,
      current: user.currentStreak,
      completed: user.currentStreak >= 30,
      category: 'streak'
    },
    {
      id: 'streak_100',
      title: 'Century Saver',
      description: '100-day streak',
      icon: '👑',
      target: 100,
      current: user.currentStreak,
      completed: user.currentStreak >= 100,
      category: 'streak'
    },
    {
      id: 'habits_50',
      title: 'Half Century',
      description: '50 habits logged',
      icon: '📝',
      target: 50,
      current: habits.length,
      completed: habits.length >= 50,
      category: 'habits'
    },
    {
      id: 'habits_100',
      title: 'Habit Master',
      description: '100 habits logged',
      icon: '⭐',
      target: 100,
      current: habits.length,
      completed: habits.length >= 100,
      category: 'habits'
    },
    {
      id: 'points_1000',
      title: 'Green Guru',
      description: '1,000 points earned',
      icon: '🌟',
      target: 1000,
      current: user.greenScore,
      completed: user.greenScore >= 1000,
      category: 'points'
    },
    {
      id: 'level_5',
      title: 'Rising Star',
      description: 'Reach level 5',
      icon: '🚀',
      target: 5,
      current: user.level,
      completed: user.level >= 5,
      category: 'level'
    },
    {
      id: 'level_10',
      title: 'Eco Champion',
      description: 'Reach level 10',
      icon: '🏅',
      target: 10,
      current: user.level,
      completed: user.level >= 10,
      category: 'level'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'streak': return <Zap className="h-5 w-5" />;
      case 'habits': return <Target className="h-5 w-5" />;
      case 'points': return <Star className="h-5 w-5" />;
      case 'level': return <Award className="h-5 w-5" />;
      default: return <Trophy className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'streak': return 'text-orange-600 bg-orange-100';
      case 'habits': return 'text-blue-600 bg-blue-100';
      case 'points': return 'text-green-600 bg-green-100';
      case 'level': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const completedMilestones = milestones.filter(m => m.completed);
  const upcomingMilestones = milestones.filter(m => !m.completed);

  return (
    <div className="space-y-8">
      {/* Level Progress */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Level {user.level}</h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">XP: {user.xp}</p>
            <p className="text-xs text-gray-500">{getXpForNextLevel(user.xp)} XP to next level</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(user.xp % 100)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Level {user.level}</span>
          <span>Level {user.level + 1}</span>
        </div>
      </Card>

      {/* Badges */}
      {user.badges.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-600" />
            Your Badges ({user.badges.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges.map((badge) => (
              <div key={badge.id} className="text-center p-4 bg-gradient-to-b from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{badge.name}</p>
                <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  badge.rarity === 'legendary' ? 'bg-purple-100 text-purple-600' :
                  badge.rarity === 'epic' ? 'bg-red-100 text-red-600' :
                  badge.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {badge.rarity}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Completed Milestones */}
      {completedMilestones.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-green-600" />
            Completed Milestones ({completedMilestones.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedMilestones.map((milestone) => (
              <div key={milestone.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(milestone.category)}`}>
                      {getCategoryIcon(milestone.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="text-3xl">{milestone.icon}</div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1 text-right">
                    {milestone.current}/{milestone.target} ✓
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Upcoming Milestones */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="h-6 w-6 mr-2 text-blue-600" />
          Next Goals ({upcomingMilestones.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMilestones.map((milestone) => {
            const progress = Math.min((milestone.current / milestone.target) * 100, 100);
            
            return (
              <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(milestone.category)}`}>
                      {getCategoryIcon(milestone.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="text-3xl opacity-60">{milestone.icon}</div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-right">
                    {milestone.current}/{milestone.target} ({Math.round(progress)}%)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Special Dates */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-green-600" />
          Eco Calendar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-white rounded-lg">
            <p className="font-medium text-gray-800">🌍 Earth Day</p>
            <p className="text-gray-600">April 22 - Join millions worldwide!</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="font-medium text-gray-800">🌊 World Oceans Day</p>
            <p className="text-gray-600">June 8 - Protect our oceans</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="font-medium text-gray-800">♻️ Global Recycling Day</p>
            <p className="text-gray-600">March 18 - Reduce, reuse, recycle</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="font-medium text-gray-800">🌳 International Forest Day</p>
            <p className="text-gray-600">March 21 - Plant for the future</p>
          </div>
        </div>
      </Card>
    </div>
  );
};