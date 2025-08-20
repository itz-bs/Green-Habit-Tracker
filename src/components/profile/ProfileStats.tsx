import React from 'react';
import { User, Habit, HabitCategory } from '../../types';
import { Card } from '../common/Card';
import { TrendingUp, Calendar, Target, Award, BarChart3 } from 'lucide-react';
import { getCategoryColor } from '../../utils/gameLogic';
import { calculateTotalImpact, formatImpactValue } from '../../utils/impactCalculator';

interface ProfileStatsProps {
  user: User;
  habits: Habit[];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ user, habits }) => {
  // Calculate category distribution
  const categoryStats = habits.reduce((acc, habit) => {
    acc[habit.category] = (acc[habit.category] || 0) + 1;
    return acc;
  }, {} as Record<HabitCategory, number>);

  const categories = Object.entries(categoryStats).map(([category, count]) => ({
    category: category as HabitCategory,
    count,
    percentage: (count / habits.length) * 100
  })).sort((a, b) => b.count - a.count);

  // Calculate monthly trend
  const monthlyData = habits.reduce((acc, habit) => {
    const month = new Date(habit.date).toISOString().slice(0, 7); // YYYY-MM format
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toISOString().slice(0, 7);
  }).reverse();

  const monthlyTrend = last6Months.map(month => ({
    month: new Date(month + '-01').toLocaleDateString('en', { month: 'short' }),
    count: monthlyData[month] || 0
  }));

  // Calculate mood patterns
  const moodStats = habits.filter(h => h.mood).reduce((acc, habit) => {
    if (habit.mood) {
      acc[habit.mood] = (acc[habit.mood] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalPoints = habits.reduce((sum, habit) => sum + habit.points, 0);
  const averagePoints = habits.length > 0 ? Math.round(totalPoints / habits.length) : 0;
  const totalImpact = calculateTotalImpact(habits);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{habits.length}</p>
              <p className="text-sm text-gray-600">Habits Logged</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{averagePoints}</p>
              <p className="text-sm text-gray-600">Avg Points/Habit</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{user.badges.length}</p>
              <p className="text-sm text-gray-600">Badges Earned</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
              🌍
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatImpactValue(totalImpact.co2Saved, 'kg')}</p>
              <p className="text-sm text-gray-600">CO₂ Saved</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Environmental Impact Summary */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Your Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{formatImpactValue(totalImpact.co2Saved, 'kg')}</div>
            <div className="text-sm text-gray-600">CO₂ Emissions Saved</div>
            <div className="text-xs text-gray-500 mt-1">
              = {totalImpact.treesEquivalent.toFixed(1)} trees planted
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{formatImpactValue(totalImpact.waterSaved, 'L')}</div>
            <div className="text-sm text-gray-600">Water Conserved</div>
            <div className="text-xs text-gray-500 mt-1">
              = {Math.floor(totalImpact.waterSaved / 250)} bathtubs filled
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{formatImpactValue(totalImpact.wasteSaved, 'kg')}</div>
            <div className="text-sm text-gray-600">Waste Avoided</div>
            <div className="text-xs text-gray-500 mt-1">
              = {Math.floor(totalImpact.wasteSaved / 0.5)} plastic bottles
            </div>
          </div>
        </div>
      </Card>

      {/* Category Distribution */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="h-6 w-6 mr-2" />
          Habit Categories
        </h3>
        {categories.length > 0 ? (
          <div className="space-y-4">
            {categories.map(({ category, count, percentage }) => (
              <div key={category} className="flex items-center">
                <div className={`w-8 h-8 ${getCategoryColor(category)} rounded-full flex items-center justify-center text-white text-sm mr-3`}>
                  {category === 'transportation' && '🚗'}
                  {category === 'energy' && '⚡'}
                  {category === 'water' && '💧'}
                  {category === 'waste' && '♻️'}
                  {category === 'food' && '🍃'}
                  {category === 'shopping' && '🛒'}
                  {category === 'nature' && '🌳'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800 capitalize">
                      {category.replace('-', ' ')}
                    </span>
                    <span className="text-sm text-gray-600">{count} habits ({Math.round(percentage)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getCategoryColor(category).replace('bg-', 'bg-').replace('-500', '-400')}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No habit data available yet.</p>
        )}
      </Card>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Activity Trend</h3>
        <div className="flex items-end justify-between space-x-2 h-48">
          {monthlyTrend.map((month, index) => {
            const maxCount = Math.max(...monthlyTrend.map(m => m.count));
            const height = maxCount > 0 ? (month.count / maxCount) * 100 : 0;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '180px' }}>
                  <div className="text-xs text-gray-600 mb-2">{month.count}</div>
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%`, minHeight: month.count > 0 ? '8px' : '0px' }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{month.month}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Mood Patterns */}
      {Object.keys(moodStats).length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Mood Patterns</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(moodStats).map(([mood, count]) => (
              <div key={mood} className="text-center">
                <div className="text-4xl mb-2">{mood}</div>
                <div className="text-lg font-bold text-gray-800">{count}</div>
                <div className="text-sm text-gray-600">times</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Streak History */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Streak Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <div className="text-4xl font-bold text-orange-600 mb-2">{user.currentStreak}</div>
            <div className="text-gray-600 mb-2">Current Streak</div>
            <div className="text-sm text-gray-500">
              {user.currentStreak === 1 ? 'Keep it up!' : 
               user.currentStreak < 7 ? 'Almost to a week!' :
               user.currentStreak < 30 ? 'Great momentum!' :
               'You\'re on fire! 🔥'}
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">{user.longestStreak}</div>
            <div className="text-gray-600 mb-2">Longest Streak</div>
            <div className="text-sm text-gray-500">
              {user.longestStreak === user.currentStreak ? 'Personal best!' : 'Can you beat this?'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};