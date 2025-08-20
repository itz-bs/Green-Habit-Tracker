import React, { useState } from 'react';
import { User, Habit, HabitCategory } from '../../types';
import { Card } from '../common/Card';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { getCategoryColor } from '../../utils/gameLogic';

interface SwipeCardsProps {
  user: User;
  onAddHabit: (habit: Habit) => void;
}

const swipeActions = [
  { title: 'Used public transport instead of car', category: 'transportation' as HabitCategory, points: 25 },
  { title: 'Turned off lights when leaving room', category: 'energy' as HabitCategory, points: 15 },
  { title: 'Used reusable water bottle', category: 'water' as HabitCategory, points: 20 },
  { title: 'Composted food scraps', category: 'waste' as HabitCategory, points: 30 },
  { title: 'Ate a plant-based meal', category: 'food' as HabitCategory, points: 35 },
  { title: 'Bought from local farmers market', category: 'shopping' as HabitCategory, points: 40 },
  { title: 'Spent time in nature', category: 'nature' as HabitCategory, points: 25 },
  { title: 'Carpooled with friends', category: 'transportation' as HabitCategory, points: 30 },
  { title: 'Unplugged electronics overnight', category: 'energy' as HabitCategory, points: 20 },
  { title: 'Fixed a leaky faucet', category: 'water' as HabitCategory, points: 45 }
];

export const SwipeCards: React.FC<SwipeCardsProps> = ({ user, onAddHabit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<{ action: typeof swipeActions[0]; decision: 'yes' | 'no' }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentAction = swipeActions[currentIndex];

  const handleSwipe = (decision: 'yes' | 'no') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      if (decision === 'yes') {
        const habit: Habit = {
          id: `habit-${Date.now()}`,
          userId: user.id,
          title: currentAction.title,
          category: currentAction.category,
          date: new Date().toISOString().split('T')[0],
          points: currentAction.points
        };
        onAddHabit(habit);
      }

      setSwipedCards(prev => [...prev, { action: currentAction, decision }]);
      setCurrentIndex(prev => (prev + 1) % swipeActions.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSwipedCards([]);
  };

  const yesCount = swipedCards.filter(card => card.decision === 'yes').length;
  const noCount = swipedCards.filter(card => card.decision === 'no').length;

  return (
    <div className="max-w-md mx-auto">
      {/* Stats */}
      <div className="flex justify-center space-x-8 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{yesCount}</div>
          <div className="text-sm text-gray-500">Completed ✅</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">{noCount}</div>
          <div className="text-sm text-gray-500">Skipped ❌</div>
        </div>
      </div>

      {/* Swipe Card */}
      <div className="relative h-96 mb-8">
        <Card className={`absolute inset-0 p-8 ${isAnimating ? 'transition-transform duration-300' : ''}`}>
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className={`w-20 h-20 ${getCategoryColor(currentAction.category)} rounded-full flex items-center justify-center text-white text-2xl mb-6`}>
              {currentAction.category === 'transportation' && '🚗'}
              {currentAction.category === 'energy' && '⚡'}
              {currentAction.category === 'water' && '💧'}
              {currentAction.category === 'waste' && '♻️'}
              {currentAction.category === 'food' && '🍃'}
              {currentAction.category === 'shopping' && '🛒'}
              {currentAction.category === 'nature' && '🌳'}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Did you...
            </h3>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {currentAction.title}?
            </p>
            
            <div className="text-center">
              <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                +{currentAction.points} points
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Swipe Controls */}
      <div className="flex justify-center space-x-8 mb-6">
        <button
          onClick={() => handleSwipe('no')}
          className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        
        <button
          onClick={handleReset}
          className="w-16 h-16 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
          disabled={isAnimating}
        >
          <RotateCcw className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => handleSwipe('yes')}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
          disabled={isAnimating}
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        Swipe ← for No, → for Yes, or use buttons
      </div>

      {/* Recent Swipes */}
      {swipedCards.length > 0 && (
        <Card className="p-4 mt-8">
          <h4 className="font-semibold text-gray-800 mb-3">Recent Actions</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {swipedCards.slice(-5).reverse().map((card, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="flex-1 truncate">{card.action.title}</span>
                <span className={`ml-2 ${card.decision === 'yes' ? 'text-green-600' : 'text-red-500'}`}>
                  {card.decision === 'yes' ? '✅' : '❌'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};