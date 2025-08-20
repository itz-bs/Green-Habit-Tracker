import { User, Habit, Challenge, Suggestion, Badge, Friend } from '../types';

const STORAGE_KEYS = {
  USER: 'ecoapp_user',
  HABITS: 'ecoapp_habits',
  CHALLENGES: 'ecoapp_challenges',
  THEME: 'ecoapp_theme',
  CURRENT_TAB: 'ecoapp_current_tab'
};

export const storage = {
  // User management
  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Habits management
  getHabits: (): Habit[] => {
    const habits = localStorage.getItem(STORAGE_KEYS.HABITS);
    return habits ? JSON.parse(habits) : [];
  },

  setHabits: (habits: Habit[]): void => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  },

  addHabit: (habit: Habit): void => {
    const habits = storage.getHabits();
    habits.push(habit);
    storage.setHabits(habits);
  },

  // Challenges management
  getChallenges: (): Challenge[] => {
    const challenges = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    return challenges ? JSON.parse(challenges) : [];
  },

  setChallenges: (challenges: Challenge[]): void => {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  },

  // Theme management
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Current tab
  getCurrentTab: (): string => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_TAB) || 'dashboard';
  },

  setCurrentTab: (tab: string): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TAB, tab);
  }
};