import React, { useState } from 'react';
import { User } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { mockFriends } from '../../utils/data';
import { UserPlus, Mail, QrCode, Link, Users, TrendingUp, BarChart3 } from 'lucide-react';

interface FriendConnectionsProps {
  user: User;
}

export const FriendConnections: React.FC<FriendConnectionsProps> = ({ user }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteLink, setShowInviteLink] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const inviteLink = `https://ecotracker.app/invite/${user.id}`;

  const handleEmailInvite = () => {
    if (inviteEmail) {
      // Simulate sending email invite
      alert(`Invite sent to ${inviteEmail}!`);
      setInviteEmail('');
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  const generateQR = () => {
    // In a real app, this would generate a QR code
    alert('QR Code generated! (This is a demo)');
  };

  return (
    <div className="space-y-6">
      {/* Invite Friends */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <UserPlus className="h-6 w-6 mr-2 text-blue-600" />
          Invite Friends to Join
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">📧 Email Invite</h4>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="friend@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Button onClick={handleEmailInvite} variant="primary">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">🔗 Share Link</h4>
            <div className="space-y-2">
              <Button onClick={() => setShowInviteLink(!showInviteLink)} variant="secondary" fullWidth>
                <Link className="h-4 w-4 mr-2" />
                {showInviteLink ? 'Hide Link' : 'Generate Link'}
              </Button>
              {showInviteLink && (
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-600 mb-2">Your invite link:</p>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 text-xs bg-gray-100 p-2 rounded">{inviteLink}</code>
                    <Button onClick={copyInviteLink} size="sm">Copy</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button onClick={generateQR} variant="secondary" className="flex items-center mx-auto">
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR Code
          </Button>
        </div>
      </Card>

      {/* Your Eco Circle */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Users className="h-6 w-6 mr-2 text-green-600" />
          Your Eco Circle ({mockFriends.length} friends)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockFriends.map((friend) => (
            <Card
              key={friend.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedFriend === friend.id ? 'ring-2 ring-green-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedFriend(friend.id === selectedFriend ? null : friend.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {friend.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{friend.name}</p>
                  <p className="text-sm text-gray-600">{friend.currentStreak} day streak</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Green Score:</span>
                  <span className="font-medium text-green-600">{friend.greenScore}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Streak:</span>
                  <span className="font-medium text-orange-600">{friend.currentStreak} days 🔥</span>
                </div>
              </div>

              {selectedFriend === friend.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="secondary">Message</Button>
                    <Button size="sm" variant="secondary">Compare</Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Peer Comparison */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
          Compare Your Impact
        </h3>

        {selectedFriend ? (
          <div className="space-y-6">
            {(() => {
              const friend = mockFriends.find(f => f.id === selectedFriend);
              if (!friend) return null;

              const categories = [
                { name: 'Green Score', user: user.greenScore, friend: friend.greenScore, max: Math.max(user.greenScore, friend.greenScore) },
                { name: 'Current Streak', user: user.currentStreak, friend: friend.currentStreak, max: Math.max(user.currentStreak, friend.currentStreak) },
                { name: 'Longest Streak', user: user.longestStreak, friend: friend.currentStreak, max: Math.max(user.longestStreak, friend.currentStreak) },
                { name: 'Total Habits', user: user.totalHabitsLogged, friend: Math.floor(Math.random() * 100) + 20, max: Math.max(user.totalHabitsLogged, 50) }
              ];

              return (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">You vs {friend.name}</h4>
                  <div className="space-y-4">
                    {categories.map((category, index) => {
                      const userPercentage = category.max > 0 ? (category.user / category.max) * 100 : 0;
                      const friendPercentage = category.max > 0 ? (category.friend / category.max) * 100 : 0;
                      
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-gray-600">You: {category.user} | {friend.name}: {category.friend}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 w-8">You</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${userPercentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 w-8">{friend.name.split(' ')[0]}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${friendPercentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Select a friend to compare your eco-impact!</p>
          </div>
        )}
      </Card>

      {/* Motivational Stats */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🌟 Your Eco Network Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{mockFriends.length + 1}</div>
            <div className="text-sm text-gray-600">Eco Warriors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {mockFriends.reduce((sum, f) => sum + f.greenScore, user.greenScore)}
            </div>
            <div className="text-sm text-gray-600">Combined Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {Math.floor((mockFriends.reduce((sum, f) => sum + f.currentStreak, user.currentStreak)) / (mockFriends.length + 1))}
            </div>
            <div className="text-sm text-gray-600">Avg Streak</div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-green-600 font-medium">
            Together, you're making a real difference! 🌍💚
          </p>
        </div>
      </Card>
    </div>
  );
};