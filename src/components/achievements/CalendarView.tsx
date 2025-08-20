import React, { useState } from 'react';
import { User, Habit } from '../../types';
import { Card } from '../common/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarViewProps {
  user: User;
  habits: Habit[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ user, habits }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getHabitsForDate = (date: Date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return habits.filter(h => h.date === dateString);
  };

  const getStreakIntensity = (date: Date) => {
    if (!date) return '';
    const dayHabits = getHabitsForDate(date);
    if (dayHabits.length === 0) return 'bg-gray-100';
    if (dayHabits.length === 1) return 'bg-green-200';
    if (dayHabits.length === 2) return 'bg-green-300';
    if (dayHabits.length >= 3) return 'bg-green-500';
    return 'bg-gray-100';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = getDaysInMonth(currentMonth);
  const today = new Date();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((date, index) => {
            const dayHabits = date ? getHabitsForDate(date) : [];
            const isToday = date && date.toDateString() === today.toDateString();
            
            return (
              <div
                key={index}
                className={`p-2 h-20 border border-gray-200 rounded-lg relative ${
                  date ? getStreakIntensity(date) : 'bg-gray-50'
                } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
              >
                {date && (
                  <>
                    <div className="text-sm font-medium text-gray-700">
                      {date.getDate()}
                    </div>
                    {dayHabits.length > 0 && (
                      <div className="absolute bottom-1 right-1">
                        <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-green-600">
                          {dayHabits.length}
                        </div>
                      </div>
                    )}
                    {isToday && (
                      <div className="absolute top-1 left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
            <span>No activity</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
            <span>1 habit</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-300 rounded mr-2"></div>
            <span>2 habits</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>3+ habits</span>
          </div>
        </div>
      </Card>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">This Month's Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Active days:</span>
              <span className="font-medium">{
                new Set(habits.filter(h => {
                  const habitDate = new Date(h.date);
                  return habitDate.getMonth() === currentMonth.getMonth() && 
                         habitDate.getFullYear() === currentMonth.getFullYear();
                }).map(h => h.date)).size
              }</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total habits:</span>
              <span className="font-medium">{
                habits.filter(h => {
                  const habitDate = new Date(h.date);
                  return habitDate.getMonth() === currentMonth.getMonth() && 
                         habitDate.getFullYear() === currentMonth.getFullYear();
                }).length
              }</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Points earned:</span>
              <span className="font-medium text-green-600">{
                habits.filter(h => {
                  const habitDate = new Date(h.date);
                  return habitDate.getMonth() === currentMonth.getMonth() && 
                         habitDate.getFullYear() === currentMonth.getFullYear();
                }).reduce((sum, h) => sum + h.points, 0)
              }</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Streak Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current streak:</span>
              <span className="font-medium text-green-600">{user.currentStreak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Longest streak:</span>
              <span className="font-medium text-blue-600">{user.longestStreak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This month's longest:</span>
              <span className="font-medium">{Math.min(user.currentStreak, 31)} days</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};