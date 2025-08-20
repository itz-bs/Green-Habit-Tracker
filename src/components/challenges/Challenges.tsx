import React, { useState } from 'react';
import { User, Challenge } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { EcoDice } from './EcoDice';
import { ChallengeList } from './ChallengeList';
import { Target, Dice6 } from 'lucide-react';

interface ChallengesProps {
  user: User;
  onCompleteChallenge: (challenge: Challenge) => void;
}

export const Challenges: React.FC<ChallengesProps> = ({ user, onCompleteChallenge }) => {
  const [view, setView] = useState<'list' | 'dice'>('list');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Eco Challenges 🎯</h1>
        <p className="text-gray-600">Take on challenges and roll the eco dice for random tasks!</p>
      </div>

      {/* View Toggle */}
      <Card className="p-4 mb-8">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setView('list')}
              className={`px-6 py-2 rounded-md transition-colors ${
                view === 'list'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Target className="h-4 w-4 inline mr-2" />
              Challenges
            </button>
            <button
              onClick={() => setView('dice')}
              className={`px-6 py-2 rounded-md transition-colors ${
                view === 'dice'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Dice6 className="h-4 w-4 inline mr-2" />
              Eco Dice
            </button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {view === 'list' ? (
        <ChallengeList user={user} onCompleteChallenge={onCompleteChallenge} />
      ) : (
        <EcoDice user={user} onCompleteChallenge={onCompleteChallenge} />
      )}
    </div>
  );
};