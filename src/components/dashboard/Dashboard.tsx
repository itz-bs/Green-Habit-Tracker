import React from 'react';
import { User, Habit } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { TrendingUp, Target, Award, Smile, Plus } from 'lucide-react';
import { ecoTips } from '../../utils/data';
import { getStreakColor } from '../../utils/gameLogic';
import { ImpactDashboard } from '../impact/ImpactDashboard';
import { calculateTotalImpact, formatImpactValue } from '../../utils/impactCalculator';

interface DashboardProps {
  user: User;
  habits: Habit[];
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, habits, onNavigate }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayHabits = habits.filter(h => h.date === today);
  const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
  const recentHabits = habits.slice(-5).reverse();
  const totalImpact = calculateTotalImpact(habits);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user.name}! 🌱
        </h1>
        <p className="text-gray-600">Let's make today count for our planet</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{user.currentStreak}</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
            <div className={`w-12 h-12 rounded-full ${getStreakColor(user.currentStreak)} flex items-center justify-center`}>
              🔥
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Green Score</p>
              <p className="text-2xl font-bold text-gray-900">{user.greenScore}</p>
              <p className="text-xs text-green-600">Level {user.level}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Today's Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{todayHabits.length}</p>
              <p className="text-xs text-gray-500">completed</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Badges</p>
              <p className="text-2xl font-bold text-gray-900">{user.badges.length}</p>
              <p className="text-xs text-gray-500">unlocked</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">CO₂ Saved</p>
              <p className="text-2xl font-bold text-gray-900">{formatImpactValue(totalImpact.co2Saved, 'kg')}</p>
              <p className="text-xs text-green-600">Environmental Impact</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              🌍
            </div>
          </div>
        </Card>
      </div>

      {/* Environmental Impact Section */}
      <div className="mb-8">
        <ImpactDashboard habits={habits} />
      </div>

      {/* Tip of the Day */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              💡
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">💚 Tip of the Day</h3>
            <p className="text-gray-600">{randomTip}</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('habits')}
              variant="primary"
              fullWidth
              className="flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Log Today's Action
            </Button>
            <Button
              onClick={() => onNavigate('challenges')}
              variant="secondary"
              fullWidth
              className="flex items-center justify-center"
            >
              🎲 Roll Eco Dice
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <Smile className="h-5 w-5 text-gray-400" />
          </div>
          {recentHabits.length > 0 ? (
            <div className="space-y-3">
              {recentHabits.map((habit) => (
                <div key={habit.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{habit.title}</p>
                    <p className="text-xs text-gray-500">{new Date(habit.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {habit.mood && <span className="text-lg">{habit.mood}</span>}
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      +{habit.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No activities yet. Start logging your eco-friendly habits!
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};