import React, { useState, useEffect } from 'react';
import { User, Habit, Challenge, Tab, Theme } from './types';
import { storage } from './utils/storage';
import { calculateLevel, calculateStreak, checkBadgeUnlocks } from './utils/gameLogic';
import { useAuth } from './hooks/useAuth';
import { logout } from './services/auth';

// Components
import { AuthScreen } from './components/auth/AuthScreen';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { HabitLogging } from './components/habits/HabitLogging';
import { Achievements } from './components/achievements/Achievements';
import { Challenges } from './components/challenges/Challenges';
import { Suggestions } from './components/suggestions/Suggestions';
import { Community } from './components/community/Community';
import { Profile } from './components/profile/Profile';

function App() {
  const { user, loading } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize app
  useEffect(() => {
    const savedHabits = storage.getHabits();
    const savedTheme = storage.getTheme();
    const savedTab = storage.getCurrentTab() as Tab;

    setHabits(savedHabits);
    setTheme(savedTheme);
    setCurrentTab(savedTab);

    // Apply theme to document
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Save current tab when it changes
  useEffect(() => {
    storage.setCurrentTab(currentTab);
  }, [currentTab]);

  const handleAuth = () => {
    // Navigation will happen automatically when user state changes
  };

  const handleAddHabit = (habit: Habit) => {
    const updatedHabits = [...habits, habit];
    setHabits(updatedHabits);
    storage.setHabits(updatedHabits);

    if (user) {
      // Update user stats
      const newStreak = calculateStreak(updatedHabits);
      const newXp = user.xp + habit.points;
      const newLevel = calculateLevel(newXp);
      const newGreenScore = user.greenScore + habit.points;
      const newLongestStreak = Math.max(user.longestStreak, newStreak);
      
      // User stats will be updated via Firebase services
      // const updatedUser = { ...user, currentStreak: newStreak, ... };
      // Firebase services will handle user updates
    }
  };

  const handleCompleteChallenge = (challenge: Challenge) => {
    if (user) {
      const points = challenge.points;
      const newXp = user.xp + points;
      const newLevel = calculateLevel(newXp);
      
      // User stats will be updated via Firebase services
      // const updatedUser = { ...user, greenScore: user.greenScore + points, ... };
      // Firebase services will handle user updates
      
      alert(`🎯 Challenge completed! +${points} points earned!`);
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    // User updates will be handled by Firebase services
  };

  const handleLogout = async () => {
    try {
      await logout();
      setHabits([]);
      setCurrentTab('dashboard');
      localStorage.clear();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storage.setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading EcoTracker...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuth={handleAuth} />;
  }

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard user={user} habits={habits} onNavigate={setCurrentTab} />;
      case 'habits':
        return <HabitLogging user={user} onAddHabit={handleAddHabit} />;
      case 'achievements':
        return <Achievements user={user} habits={habits} />;
      case 'challenges':
        return <Challenges user={user} onCompleteChallenge={handleCompleteChallenge} />;
      case 'suggestions':
        return <Suggestions />;
      case 'community':
        return <Community user={user} />;
      case 'profile':
        return (
          <Profile
            user={user}
            habits={habits}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
            onThemeToggle={handleThemeToggle}
            currentTheme={theme}
          />
        );
      default:
        return <Dashboard user={user} habits={habits} onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="lg:flex lg:h-screen">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block">
          <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:flex lg:flex-col lg:overflow-hidden">
          <Header user={user} currentTab={currentTab} />
          
          <main className="flex-1 lg:overflow-y-auto pb-16 lg:pb-0">
            {renderCurrentTab()}
          </main>
        </div>

        {/* Bottom Navigation - Mobile */}
        <div className="lg:hidden">
          <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
        </div>
      </div>
    </div>
  );
}

export default App;