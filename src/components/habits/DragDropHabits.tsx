import React, { useState } from 'react';
import { User, Habit, HabitCategory } from '../../types';
import { Card } from '../common/Card';
import { getCategoryColor } from '../../utils/gameLogic';

interface DragDropHabitsProps {
  user: User;
  onAddHabit: (habit: Habit) => void;
}

const habitOptions = [
  { id: '1', title: 'Recycled plastic bottles', category: 'waste' as HabitCategory, points: 25 },
  { id: '2', title: 'Walked to the store', category: 'transportation' as HabitCategory, points: 20 },
  { id: '3', title: 'Used cold water for laundry', category: 'water' as HabitCategory, points: 15 },
  { id: '4', title: 'Ate local organic food', category: 'food' as HabitCategory, points: 35 },
  { id: '5', title: 'Turned off AC for an hour', category: 'energy' as HabitCategory, points: 30 },
  { id: '6', title: 'Planted a tree', category: 'nature' as HabitCategory, points: 50 },
  { id: '7', title: 'Used cloth shopping bags', category: 'shopping' as HabitCategory, points: 20 },
  { id: '8', title: 'Composted kitchen scraps', category: 'waste' as HabitCategory, points: 25 }
];

export const DragDropHabits: React.FC<DragDropHabitsProps> = ({ user, onAddHabit }) => {
  const [availableHabits, setAvailableHabits] = useState(habitOptions);
  const [completedHabits, setCompletedHabits] = useState<typeof habitOptions>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent, habitId: string) => {
    setDraggedItem(habitId);
    e.dataTransfer.setData('text/plain', habitId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zone: 'completed' | 'available') => {
    e.preventDefault();
    const habitId = e.dataTransfer.getData('text/plain');
    const habit = availableHabits.find(h => h.id === habitId) || completedHabits.find(h => h.id === habitId);
    
    if (!habit) return;

    if (zone === 'completed' && !completedHabits.find(h => h.id === habitId)) {
      // Move to completed
      setAvailableHabits(prev => prev.filter(h => h.id !== habitId));
      setCompletedHabits(prev => [...prev, habit]);
      setScore(prev => prev + habit.points);
      
      // Log the habit
      const newHabit: Habit = {
        id: `habit-${Date.now()}-${habitId}`,
        userId: user.id,
        title: habit.title,
        category: habit.category,
        date: new Date().toISOString().split('T')[0],
        points: habit.points
      };
      onAddHabit(newHabit);
    } else if (zone === 'available' && !availableHabits.find(h => h.id === habitId)) {
      // Move back to available
      setCompletedHabits(prev => prev.filter(h => h.id !== habitId));
      setAvailableHabits(prev => [...prev, habit]);
      setScore(prev => prev - habit.points);
    }
    
    setDraggedItem(null);
  };

  const handleReset = () => {
    setAvailableHabits(habitOptions);
    setCompletedHabits([]);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Score Display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold">Today's Score: {score} points</h2>
          <p className="text-green-100">Drag habits to the completed zone!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Habits */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            🌱 Available Actions
          </h3>
          <div
            className={`min-h-96 p-4 rounded-lg border-2 border-dashed transition-colors ${
              draggedItem && !completedHabits.find(h => h.id === draggedItem)
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'available')}
          >
            <div className="grid grid-cols-1 gap-3">
              {availableHabits.map((habit) => (
                <div
                  key={habit.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, habit.id)}
                  className={`p-4 rounded-lg cursor-move transition-all duration-200 ${
                    draggedItem === habit.id ? 'opacity-50 scale-95' : 'hover:scale-105'
                  } ${getCategoryColor(habit.category)} text-white shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{habit.title}</span>
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                      +{habit.points}
                    </span>
                  </div>
                  <div className="text-xs mt-1 opacity-80 capitalize">
                    {habit.category.replace('-', ' ')}
                  </div>
                </div>
              ))}
            </div>
            {availableHabits.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <p>🎉 All habits completed!</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Reset Game
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Completed Zone */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            ✅ Completed Today
          </h3>
          <div
            className={`min-h-96 p-4 rounded-lg border-2 border-dashed transition-colors ${
              draggedItem && availableHabits.find(h => h.id === draggedItem)
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'completed')}
          >
            <div className="grid grid-cols-1 gap-3">
              {completedHabits.map((habit) => (
                <div
                  key={`completed-${habit.id}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, habit.id)}
                  className={`p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg cursor-move transition-all duration-200 shadow-md ${
                    draggedItem === habit.id ? 'opacity-50 scale-95' : 'hover:scale-105'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">✅</span>
                      <span className="font-medium">{habit.title}</span>
                    </div>
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                      +{habit.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {completedHabits.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">🎯</div>
                <p>Drag eco-actions here when completed!</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
        <div className="text-center">
          <h4 className="font-bold text-blue-800 mb-2">🎮 How to Play</h4>
          <p className="text-blue-600 text-sm">
            Drag eco-friendly actions from the left to the right when you complete them. 
            Each action gives you points based on its environmental impact. You can drag items back if needed!
          </p>
        </div>
      </Card>
    </div>
  );
};