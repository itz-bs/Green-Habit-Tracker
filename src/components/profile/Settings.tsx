import React from 'react';
import { User } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { LogOut, Moon, Sun, Bell, Shield, HelpCircle, Trash2 } from 'lucide-react';

interface SettingsProps {
  user: User;
  onLogout: () => void;
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

export const Settings: React.FC<SettingsProps> = ({
  user,
  onLogout,
  onThemeToggle,
  currentTheme
}) => {
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be lost.'
    );
    
    if (confirmed) {
      // In a real app, this would call an API to delete the account
      alert('Account deletion would be processed. (This is a demo)');
    }
  };

  const handleExportData = () => {
    // In a real app, this would generate and download user data
    alert('Data export would begin. (This is a demo)');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Appearance */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {currentTheme === 'light' ? (
                <Sun className="h-5 w-5 text-yellow-500 mr-3" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-800">Theme</p>
                <p className="text-sm text-gray-600">
                  Choose between light and dark mode
                </p>
              </div>
            </div>
            <Button onClick={onThemeToggle} variant="secondary">
              {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Bell className="h-6 w-6 mr-2" />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Daily Reminders</p>
              <p className="text-sm text-gray-600">Get reminded to log your eco habits</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Challenge Notifications</p>
              <p className="text-sm text-gray-600">Be notified about new challenges</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Friend Activity</p>
              <p className="text-sm text-gray-600">See when friends complete challenges</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Shield className="h-6 w-6 mr-2" />
          Privacy & Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Profile Visibility</p>
              <p className="text-sm text-gray-600">Who can see your eco achievements</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Friends Only</option>
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Data Collection</p>
              <p className="text-sm text-gray-600">Allow anonymous usage analytics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Export Data</p>
              <p className="text-sm text-gray-600">Download all your eco tracking data</p>
            </div>
            <Button onClick={handleExportData} variant="secondary">
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Data Backup</p>
              <p className="text-sm text-gray-600">Automatically backup your progress</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Help & Support */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <HelpCircle className="h-6 w-6 mr-2" />
          Help & Support
        </h3>
        <div className="space-y-4">
          <Button variant="secondary" fullWidth>
            📚 User Guide
          </Button>
          <Button variant="secondary" fullWidth>
            💬 Contact Support
          </Button>
          <Button variant="secondary" fullWidth>
            🐛 Report Bug
          </Button>
          <Button variant="secondary" fullWidth>
            ⭐ Rate the App
          </Button>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="p-6 border-red-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Account Actions</h3>
        <div className="space-y-4">
          <Button
            onClick={onLogout}
            variant="secondary"
            fullWidth
            className="flex items-center justify-center border-gray-300 hover:border-gray-400"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
          
          <Button
            onClick={handleDeleteAccount}
            variant="danger"
            fullWidth
            className="flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700 text-sm">
            ⚠️ <strong>Warning:</strong> Deleting your account will permanently remove all your data, 
            including habits, streaks, badges, and friend connections. This action cannot be undone.
          </p>
        </div>
      </Card>
    </div>
  );
};