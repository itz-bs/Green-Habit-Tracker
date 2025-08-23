import React, { useState } from 'react';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { signUp } from '../../services/auth';

interface SignUpProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signUp(formData.email, formData.password, formData.name);
      // Don't call onSuccess - useAuth hook will handle navigation
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <Leaf className="h-6 w-6 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Sign Up</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />

        <Input
          type="email"
          label="Email Address"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          placeholder="Create a password (min 6 characters)"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          required
        />

        <Button 
          onClick={handleSignUp} 
          variant="primary" 
          size="lg" 
          fullWidth
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </div>
  );
};