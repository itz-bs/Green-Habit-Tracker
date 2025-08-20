export interface User {
  id: string;
  email: string;
  name?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: 'rural' | 'urban';
  joinDate: string;
  greenScore: number;
  currentStreak: number;
  longestStreak: number;
  totalHabitsLogged: number;
  badges: Badge[];
  level: number;
  xp: number;
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  category: HabitCategory;
  date: string;
  mood?: string;
  impact?: string;
  points: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  points: number;
  category: HabitCategory;
  completed?: boolean;
  dueDate?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: HabitCategory;
  funFact?: string;
}

export interface Friend {
  id: string;
  name: string;
  greenScore: number;
  currentStreak: number;
  avatar?: string;
}

export type HabitCategory = 
  | 'transportation'
  | 'energy'
  | 'water'
  | 'waste'
  | 'food'
  | 'shopping'
  | 'nature';

export type Theme = 'light' | 'dark';

export type Tab = 
  | 'dashboard'
  | 'habits'
  | 'achievements'
  | 'challenges'
  | 'suggestions'
  | 'community'
  | 'profile';