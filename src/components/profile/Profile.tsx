import React, { useState } from 'react';
import { User, Habit } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ProfileStats } from './ProfileStats';
import { Settings } from './Settings';
import { User as UserIcon, Settings as SettingsIcon, BarChart3 } from 'lucide-react';

interface ProfileProps {
  user: User;
  habits: Habit[];
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

export const Profile: React.FC<ProfileProps> = ({ 
  user, 
  habits, 
  onUpdateUser, 
  onLogout, 
  onThemeToggle, 
  currentTheme 
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile 👤</h1>
        <p className="text-gray-600">Manage your account and track your eco journey</p>
      </div>

      {/* Tab Navigation */}
      <Card className="p-4 mb-8">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'profile'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <UserIcon className="h-4 w-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'stats'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-2" />
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'settings'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <SettingsIcon className="h-4 w-4 inline mr-2" />
              Settings
            </button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                variant={isEditing ? 'primary' : 'secondary'}
                size="sm"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>

            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {(user.name || user.email)?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name || 'Eco Warrior'}</h2>
              <p className="text-gray-600">Level {user.level} • {user.xp} XP</p>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={editedUser.name || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  label="Email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={editedUser.dateOfBirth || ''}
                  onChange={(e) => setEditedUser(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={editedUser.gender || ''}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setEditedUser(prev => ({ ...prev, location: 'urban' }))}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        editedUser.location === 'urban'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      🏙️ Urban
                    </button>
                    <button
                      onClick={() => setEditedUser(prev => ({ ...prev, location: 'rural' }))}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        editedUser.location === 'rural'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      🌾 Rural
                    </button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave} variant="primary" fullWidth>Save</Button>
                  <Button onClick={handleCancel} variant="secondary" fullWidth>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                {user.dateOfBirth && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Birthday:</span>
                    <span className="font-medium">{new Date(user.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                )}
                {user.gender && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium capitalize">{user.gender.replace('-', ' ')}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium capitalize">{user.location}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Achievements & Badges</h3>
            {user.badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="text-center p-4 bg-gradient-to-b from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <p className="font-semibold text-gray-800 text-sm">{badge.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      badge.rarity === 'legendary' ? 'bg-purple-100 text-purple-600' :
                      badge.rarity === 'epic' ? 'bg-red-100 text-red-600' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {badge.rarity}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-gray-500">No badges yet. Keep logging habits to unlock achievements!</p>
              </div>
            )}

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Next Milestone</h4>
              <p className="text-green-600 text-sm">Maintain a 7-day streak to unlock the "Week Warrior" badge! 🔥</p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'stats' && (
        <ProfileStats user={user} habits={habits} />
      )}

      {activeTab === 'settings' && (
        <Settings 
          user={user}
          onLogout={onLogout}
          onThemeToggle={onThemeToggle}
          currentTheme={currentTheme}
        />
      )}
    </div>
  );
};