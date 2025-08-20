import React, { useState } from 'react';
import { User, Habit, HabitCategory } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { SwipeCards } from './SwipeCards';
import { DragDropHabits } from './DragDropHabits';
import { Plus, Smile, MapPin } from 'lucide-react';
import { HabitImpactDisplay } from './HabitImpactDisplay';

interface HabitLoggingProps {
  user: User;
  onAddHabit: (habit: Habit) => void;
}

export const HabitLogging: React.FC<HabitLoggingProps> = ({ user, onAddHabit }) => {
  const [mode, setMode] = useState<'manual' | 'swipe' | 'drag'>('manual');
  const [habitTitle, setHabitTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory>('energy');
  const [selectedMood, setSelectedMood] = useState('');
  const [impact, setImpact] = useState('');

  const categories: { value: HabitCategory; label: string; icon: string }[] = [
    { value: 'transportation', label: 'Transportation', icon: '🚗' },
    { value: 'energy', label: 'Energy', icon: '⚡' },
    { value: 'water', label: 'Water', icon: '💧' },
    { value: 'waste', label: 'Waste', icon: '♻️' },
    { value: 'food', label: 'Food', icon: '🍃' },
    { value: 'shopping', label: 'Shopping', icon: '🛒' },
    { value: 'nature', label: 'Nature', icon: '🌳' }
  ];

  const moods = ['🌞', '😊', '😐', '😞', '😴'];

  const locationSuggestions = [
    'Carpooled to work',
    'Used public transportation',
    'Brought reusable water bottle',
    'Turned off unused lights',
    'Composted food scraps',
    'Bought local produce',
    'Took a nature walk'
  ];

  const handleManualSubmit = () => {
    if (!habitTitle.trim()) return;

    const points = Math.floor(Math.random() * 30) + 10; // 10-40 points
    
    const habit: Habit = {
      id: `habit-${Date.now()}`,
      userId: user.id,
      title: habitTitle,
      category: selectedCategory,
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      impact,
      points
    };

    // Show impact preview before adding
    const impactPreview = document.createElement('div');
    impactPreview.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 1000;">
        <h3 style="color: #059669; margin-bottom: 10px;">🎉 Habit Logged Successfully!</h3>
        <p style="margin-bottom: 15px;">You've made a positive environmental impact:</p>
        <div id="impact-display"></div>
        <button onclick="this.parentElement.parentElement.remove()" style="background: #059669; color: white; border: none; padding: 8px 16px; border-radius: 6px; margin-top: 15px; cursor: pointer;">Continue</button>
      </div>
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 999;" onclick="this.remove()"></div>
    `;
    document.body.appendChild(impactPreview);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (impactPreview.parentNode) {
        impactPreview.remove();
      }
    }, 3000);
    onAddHabit(habit);
    
    // Reset form
    setHabitTitle('');
    setImpact('');
    setSelectedMood('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setHabitTitle(suggestion);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Log Your Eco Actions 🌱</h1>
        <p className="text-gray-600">Track your sustainable habits and reflect on your impact</p>
      </div>

      {/* Mode Selection */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Logging Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setMode('manual')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              mode === 'manual'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Plus className="h-6 w-6 mx-auto mb-2" />
            <p className="font-medium">Manual Entry</p>
            <p className="text-xs text-gray-500">Type your own actions</p>
          </button>
          
          <button
            onClick={() => setMode('swipe')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              mode === 'swipe'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-2">👆</div>
            <p className="font-medium">Swipe Cards</p>
            <p className="text-xs text-gray-500">Swipe left/right to log</p>
          </button>
          
          <button
            onClick={() => setMode('drag')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              mode === 'drag'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-2">🎯</div>
            <p className="font-medium">Drag & Drop</p>
            <p className="text-xs text-gray-500">Gamified logging</p>
          </button>
        </div>
      </Card>

      {/* Manual Entry Mode */}
      {mode === 'manual' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Habit</h3>
            
            <Input
              label="What eco-friendly action did you take?"
              placeholder="e.g., Used public transport, recycled plastic bottles..."
              value={habitTitle}
              onChange={(e) => setHabitTitle(e.target.value)}
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      selectedCategory === cat.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-lg mr-2">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Impact Description (Optional)"
              placeholder="e.g., Saved 5L of water, reduced 2kg CO2..."
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Smile className="inline h-4 w-4 mr-1" />
                How are you feeling?
              </label>
              <div className="flex space-x-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`p-3 text-2xl rounded-lg border-2 transition-colors ${
                      selectedMood === mood
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleManualSubmit} variant="primary" fullWidth>
              Log Habit (+10-40 pts)
            </Button>
            
            {/* Impact Preview */}
            {habitTitle && (
              <div className="mt-4">
                <HabitImpactDisplay 
                  habit={{
                    id: 'preview',
                    userId: user.id,
                    title: habitTitle,
                    category: selectedCategory,
                    date: new Date().toISOString().split('T')[0],
                    points: 0
                  }}
                  showDetailed={false}
                />
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              <MapPin className="inline h-5 w-5 mr-2" />
              Quick Suggestions
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Based on your location and popular eco-actions:
            </p>
            <div className="space-y-2">
              {locationSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <span className="text-gray-800">{suggestion}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Swipe Mode */}
      {mode === 'swipe' && (
        <SwipeCards onAddHabit={onAddHabit} user={user} />
      )}

      {/* Drag & Drop Mode */}
      {mode === 'drag' && (
        <DragDropHabits onAddHabit={onAddHabit} user={user} />
      )}
    </div>
  );
};