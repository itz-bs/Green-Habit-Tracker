import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { SignUp } from './SignUp';
import { Login } from './Login';
import { Button } from '../common/Button';

interface AuthScreenProps {
  onAuth: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuth }) => {
  const [mode, setMode] = useState<'welcome' | 'login' | 'signup'>('welcome');

  if (mode === 'login') {
    return <Login onSuccess={onAuth} onBack={() => setMode('welcome')} />;
  }

  if (mode === 'signup') {
    return <SignUp onSuccess={onAuth} onBack={() => setMode('welcome')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">EcoTracker</h1>
          <p className="text-gray-600">Build sustainable habits, save the planet</p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => setMode('login')}
            variant="primary"
            size="lg"
            fullWidth
          >
            Login to Your Account
          </Button>
          
          <Button
            onClick={() => setMode('signup')}
            variant="secondary"
            size="lg"
            fullWidth
          >
            Create New Account
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Join thousands of eco-warriors making a difference! 🌍
          </p>
        </div>
      </div>
    </div>
  );
};