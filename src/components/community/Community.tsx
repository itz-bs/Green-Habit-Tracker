import React, { useState } from 'react';
import { User } from '../../types';
import { Card } from '../common/Card';
import { Leaderboard } from './Leaderboard';
import { FriendConnections } from './FriendConnections';
import { CommunityFeed } from './CommunityFeed';
import { Trophy, Users, MessageCircle } from 'lucide-react';

interface CommunityProps {
  user: User;
}

export const Community: React.FC<CommunityProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends' | 'feed'>('leaderboard');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Hub 🌍</h1>
        <p className="text-gray-600">Connect with fellow eco-warriors and share your journey</p>
      </div>

      {/* Tab Navigation */}
      <Card className="p-4 mb-8">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'leaderboard'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Trophy className="h-4 w-4 inline mr-2" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'friends'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Friends
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'feed'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Community Feed
            </button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {activeTab === 'leaderboard' && <Leaderboard user={user} />}
      {activeTab === 'friends' && <FriendConnections user={user} />}
      {activeTab === 'feed' && <CommunityFeed user={user} />}
    </div>
  );
};