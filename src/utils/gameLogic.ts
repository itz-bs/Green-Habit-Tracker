import { User, Habit, Badge } from '../types';
import { availableBadges } from './data';

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

export const getXpForNextLevel = (currentXp: number): number => {
  const currentLevel = calculateLevel(currentXp);
  return currentLevel * 100 - currentXp;
};

export const calculateStreak = (habits: Habit[]): number => {
  if (habits.length === 0) return 0;
  
  const sortedHabits = habits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let streak = 0;
  let currentDate = new Date();
  
  for (const habit of sortedHabits) {
    const habitDate = new Date(habit.date);
    const diffInDays = Math.floor((currentDate.getTime() - habitDate.getTime()) / (1000 * 3600 * 24));
    
    if (diffInDays === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const checkBadgeUnlocks = (user: User, habits: Habit[]): Badge[] => {
  const newBadges: Badge[] = [];
  const currentTime = new Date().toISOString();
  
  // Check each available badge
  availableBadges.forEach(badge => {
    // Skip if already unlocked
    if (user.badges.some(b => b.id === badge.id)) return;
    
    let shouldUnlock = false;
    
    switch (badge.id) {
      case '1': // First Steps
        shouldUnlock = habits.length >= 1;
        break;
      case '2': // Week Warrior
        shouldUnlock = user.currentStreak >= 7;
        break;
      case '3': // Month Master
        shouldUnlock = user.currentStreak >= 30;
        break;
      case '4': // Challenge Champion
        shouldUnlock = user.totalHabitsLogged >= 50; // Using total habits as proxy for challenges
        break;
      case '5': // Eco Legend
        shouldUnlock = user.currentStreak >= 100;
        break;
    }
    
    if (shouldUnlock) {
      newBadges.push({
        ...badge,
        unlockedAt: currentTime
      });
    }
  });
  
  return newBadges;
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    transportation: 'bg-blue-500',
    energy: 'bg-yellow-500',
    water: 'bg-cyan-500',
    waste: 'bg-green-500',
    food: 'bg-orange-500',
    shopping: 'bg-purple-500',
    nature: 'bg-emerald-500'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-500';
};

export const getStreakColor = (streak: number): string => {
  if (streak >= 100) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
  if (streak >= 30) return 'bg-gradient-to-r from-green-400 to-emerald-500';
  if (streak >= 7) return 'bg-gradient-to-r from-blue-400 to-cyan-500';
  return 'bg-gray-300';
};