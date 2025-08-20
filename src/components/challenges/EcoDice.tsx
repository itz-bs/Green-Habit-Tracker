import React, { useState } from 'react';
import { User, Challenge } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ecoDiceTasks } from '../../utils/data';
import { getCategoryColor } from '../../utils/gameLogic';
import { Dice6, RotateCcw, CheckCircle } from 'lucide-react';

interface EcoDiceProps {
  user: User;
  onCompleteChallenge: (challenge: Challenge) => void;
}

export const EcoDice: React.FC<EcoDiceProps> = ({ user, onCompleteChallenge }) => {
  const [currentTask, setCurrentTask] = useState<Challenge | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [rollHistory, setRollHistory] = useState<Challenge[]>([]);

  const rollDice = () => {
    setIsRolling(true);
    
    // Simulate dice rolling animation
    setTimeout(() => {
      const randomTask = ecoDiceTasks[Math.floor(Math.random() * ecoDiceTasks.length)];
      setCurrentTask(randomTask);
      setRollHistory(prev => [randomTask, ...prev.slice(0, 4)]); // Keep last 5 rolls
      setIsRolling(false);
    }, 1000);
  };

  const completeTask = () => {
    if (currentTask && !completedTasks.includes(currentTask.id)) {
      setCompletedTasks(prev => [...prev, currentTask.id]);
      onCompleteChallenge(currentTask);
    }
  };

  const isTaskCompleted = currentTask && completedTasks.includes(currentTask.id);

  const getTotalPoints = () => {
    return completedTasks.reduce((total, taskId) => {
      const task = ecoDiceTasks.find(t => t.id === taskId);
      return total + (task?.points || 0);
    }, 0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="text-3xl font-bold text-purple-600">{rollHistory.length}</div>
          <div className="text-sm text-gray-600">Total Rolls</div>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="text-3xl font-bold text-green-600">{completedTasks.length}</div>
          <div className="text-sm text-gray-600">Tasks Completed</div>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="text-3xl font-bold text-orange-600">{getTotalPoints()}</div>
          <div className="text-sm text-gray-600">Dice Points</div>
        </Card>
      </div>

      {/* Dice Container */}
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🎲 Roll Your Eco Task!</h2>
        
        <div className="mb-8">
          <div className={`inline-block w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center text-4xl text-white transition-transform duration-1000 ${
            isRolling ? 'animate-spin scale-110' : 'hover:scale-105'
          }`}>
            {isRolling ? '🎲' : '🌿'}
          </div>
        </div>

        <Button
          onClick={rollDice}
          disabled={isRolling}
          variant="primary"
          size="lg"
          className="mb-6"
        >
          <Dice6 className="h-5 w-5 mr-2" />
          {isRolling ? 'Rolling...' : 'Roll Eco Dice'}
        </Button>
      </Card>

      {/* Current Task */}
      {currentTask && (
        <Card className={`p-6 ${isTaskCompleted ? 'bg-green-50 border-green-200' : ''}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${getCategoryColor(currentTask.category)} rounded-full flex items-center justify-center text-white text-xl mr-4`}>
                {currentTask.category === 'transportation' && '🚗'}
                {currentTask.category === 'energy' && '⚡'}
                {currentTask.category === 'water' && '💧'}
                {currentTask.category === 'waste' && '♻️'}
                {currentTask.category === 'food' && '🍃'}
                {currentTask.category === 'shopping' && '🛒'}
                {currentTask.category === 'nature' && '🌳'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{currentTask.title}</h3>
                <p className="text-sm text-gray-500 capitalize">{currentTask.category} • {currentTask.type}</p>
              </div>
            </div>
            {isTaskCompleted && <CheckCircle className="h-8 w-8 text-green-500" />}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {currentTask.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-green-600">
              +{currentTask.points} points
            </span>
            <div className="space-x-3">
              <Button
                onClick={rollDice}
                variant="secondary"
                size="sm"
                disabled={isRolling}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Re-roll
              </Button>
              <Button
                onClick={completeTask}
                variant={isTaskCompleted ? 'success' : 'primary'}
                disabled={isTaskCompleted}
              >
                {isTaskCompleted ? '✓ Completed' : 'Mark Complete'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Roll History */}
      {rollHistory.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Rolls</h3>
          <div className="space-y-3">
            {rollHistory.map((task, index) => (
              <div key={`${task.id}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 ${getCategoryColor(task.category)} rounded-full flex items-center justify-center text-white text-sm mr-3`}>
                    {task.category === 'transportation' && '🚗'}
                    {task.category === 'energy' && '⚡'}
                    {task.category === 'water' && '💧'}
                    {task.category === 'waste' && '♻️'}
                    {task.category === 'food' && '🍃'}
                    {task.category === 'shopping' && '🛒'}
                    {task.category === 'nature' && '🌳'}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{task.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600">+{task.points}</span>
                  {completedTasks.includes(task.id) && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="text-center">
          <h4 className="font-bold text-blue-800 mb-2">🎯 How It Works</h4>
          <p className="text-blue-600 text-sm">
            Click "Roll Eco Dice" to get a random sustainable task! Complete the task to earn points. 
            Each roll gives you a unique challenge to help build your eco-friendly habits.
          </p>
        </div>
      </Card>
    </div>
  );
};