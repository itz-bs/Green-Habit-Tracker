import React, { useState } from 'react';
import { User, Challenge } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { defaultChallenges } from '../../utils/data';
import { getCategoryColor } from '../../utils/gameLogic';
import { Clock, CheckCircle, Star, Calendar } from 'lucide-react';

interface ChallengeListProps {
  user: User;
  onCompleteChallenge: (challenge: Challenge) => void;
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ user, onCompleteChallenge }) => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly'>('all');

  const filteredChallenges = defaultChallenges.filter(challenge => 
    filter === 'all' || challenge.type === filter
  );

  const handleCompleteChallenge = (challenge: Challenge) => {
    if (!completedChallenges.includes(challenge.id)) {
      setCompletedChallenges(prev => [...prev, challenge.id]);
      onCompleteChallenge(challenge);
    }
  };

  const isCompleted = (challengeId: string) => completedChallenges.includes(challengeId);

  const getTotalPoints = () => {
    return completedChallenges.reduce((total, id) => {
      const challenge = defaultChallenges.find(c => c.id === id);
      return total + (challenge?.points || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedChallenges.length}</p>
              <p className="text-sm text-gray-600">Challenges Completed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{getTotalPoints()}</p>
              <p className="text-sm text-gray-600">Challenge Points</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{defaultChallenges.length - completedChallenges.length}</p>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                filter === 'all'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Challenges
            </button>
            <button
              onClick={() => setFilter('daily')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                filter === 'daily'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setFilter('weekly')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                filter === 'weekly'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>
      </Card>

      {/* Challenge List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => {
          const completed = isCompleted(challenge.id);
          
          return (
            <Card key={challenge.id} className={`p-6 transition-all ${completed ? 'bg-green-50 border-green-200' : 'hover:shadow-lg'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${getCategoryColor(challenge.category)} rounded-full flex items-center justify-center text-white mr-3`}>
                    {challenge.category === 'transportation' && '🚗'}
                    {challenge.category === 'energy' && '⚡'}
                    {challenge.category === 'water' && '💧'}
                    {challenge.category === 'waste' && '♻️'}
                    {challenge.category === 'food' && '🍃'}
                    {challenge.category === 'shopping' && '🛒'}
                    {challenge.category === 'nature' && '🌳'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-800">{challenge.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        challenge.type === 'daily' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        <Clock className="h-3 w-3 inline mr-1" />
                        {challenge.type}
                      </span>
                    </div>
                  </div>
                </div>
                {completed && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {challenge.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold">
                  +{challenge.points} points
                </span>
                <Button
                  onClick={() => handleCompleteChallenge(challenge)}
                  variant={completed ? 'success' : 'primary'}
                  size="sm"
                  disabled={completed}
                >
                  {completed ? '✓ Completed' : 'Mark Complete'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No challenges available for this filter.</p>
        </Card>
      )}
    </div>
  );
};