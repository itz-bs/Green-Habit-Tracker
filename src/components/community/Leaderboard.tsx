import React, { useState } from 'react';
import { User } from '../../types';
import { Card } from '../common/Card';
import { mockFriends } from '../../utils/data';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

interface LeaderboardProps {
  user: User;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'all-time'>('weekly');

  // Create combined leaderboard with user and friends
  const leaderboardData = [
    {
      id: user.id,
      name: user.name || 'You',
      greenScore: user.greenScore,
      currentStreak: user.currentStreak,
      isCurrentUser: true
    },
    ...mockFriends.map(friend => ({ ...friend, isCurrentUser: false }))
  ].sort((a, b) => b.greenScore - a.greenScore);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-orange-500" />;
      default: return <Award className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-red-500 text-white';
    return 'bg-gray-100 text-gray-600';
  };

  const userRank = leaderboardData.findIndex(item => item.isCurrentUser) + 1;

  return (
    <div className="space-y-6">
      {/* Time Frame Filter */}
      <Card className="p-4">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setTimeFrame('daily')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                timeFrame === 'daily'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeFrame('weekly')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                timeFrame === 'weekly'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFrame('all-time')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                timeFrame === 'all-time'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All-Time
            </button>
          </div>
        </div>
      </Card>

      {/* User's Current Position */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your Position</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">#{userRank}</div>
              <div className="text-sm text-gray-600">Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{user.greenScore}</div>
              <div className="text-sm text-gray-600">Green Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{user.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Top 3 Podium */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">🏆 Top Eco-Warriors</h3>
        <div className="flex justify-center items-end space-x-4 mb-8">
          {/* Second Place */}
          {leaderboardData[1] && (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg h-24 flex flex-col justify-center">
                <p className="font-semibold text-sm text-gray-800">{leaderboardData[1].name}</p>
                <p className="text-xs text-gray-600">{leaderboardData[1].greenScore} pts</p>
                <p className="text-xs text-gray-500">{leaderboardData[1].currentStreak}🔥</p>
              </div>
            </div>
          )}

          {/* First Place */}
          {leaderboardData[0] && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg h-32 flex flex-col justify-center border-2 border-yellow-300">
                <p className="font-bold text-gray-800">{leaderboardData[0].name}</p>
                <p className="text-sm text-gray-600">{leaderboardData[0].greenScore} pts</p>
                <p className="text-sm text-gray-500">{leaderboardData[0].currentStreak}🔥</p>
                <p className="text-xs text-yellow-600 font-semibold">👑 Champion</p>
              </div>
            </div>
          )}

          {/* Third Place */}
          {leaderboardData[2] && (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg h-24 flex flex-col justify-center">
                <p className="font-semibold text-sm text-gray-800">{leaderboardData[2].name}</p>
                <p className="text-xs text-gray-600">{leaderboardData[2].greenScore} pts</p>
                <p className="text-xs text-gray-500">{leaderboardData[2].currentStreak}🔥</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Full Leaderboard */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Full Rankings</h3>
        <div className="space-y-3">
          {leaderboardData.map((person, index) => {
            const rank = index + 1;
            return (
              <div
                key={person.id}
                className={`flex items-center p-4 rounded-lg transition-colors ${
                  person.isCurrentUser
                    ? 'bg-green-50 border-2 border-green-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                    {rank <= 3 ? getRankIcon(rank) : <span className="font-bold">{rank}</span>}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-800">{person.name}</p>
                      {person.isCurrentUser && (
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">You</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">{person.greenScore} points</span>
                      <span className="text-sm text-gray-500">{person.currentStreak} day streak 🔥</span>
                    </div>
                  </div>
                </div>

                {rank === 1 && <span className="text-2xl">👑</span>}
                {rank === 2 && <span className="text-2xl">🥈</span>}
                {rank === 3 && <span className="text-2xl">🥉</span>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievement Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="text-center">
          <h4 className="font-bold text-blue-800 mb-2">🎯 Leaderboard Rewards</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg">
              <div className="text-lg mb-1">🥇</div>
              <p className="font-semibold text-gray-800">1st Place</p>
              <p className="text-gray-600">Extra 100 XP bonus</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-lg mb-1">🏆</div>
              <p className="font-semibold text-gray-800">Top 3</p>
              <p className="text-gray-600">Special badge unlock</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="text-lg mb-1">⭐</div>
              <p className="font-semibold text-gray-800">Top 10</p>
              <p className="text-gray-600">Featured profile</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};