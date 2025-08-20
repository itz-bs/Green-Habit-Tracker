import { Challenge, Suggestion, Badge, Friend } from '../types';

export const defaultChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Zero Plastic Day',
    description: 'Avoid using any single-use plastic items today',
    type: 'daily',
    points: 50,
    category: 'waste'
  },
  {
    id: '2',
    title: 'Bike to Work Week',
    description: 'Use your bike or walk for transportation 5 times this week',
    type: 'weekly',
    points: 100,
    category: 'transportation'
  },
  {
    id: '3',
    title: 'Vegetarian Tuesday',
    description: 'Have all plant-based meals today',
    type: 'daily',
    points: 30,
    category: 'food'
  },
  {
    id: '4',
    title: 'Energy Saver',
    description: 'Unplug all electronics when not in use today',
    type: 'daily',
    points: 25,
    category: 'energy'
  },
  {
    id: '5',
    title: 'Water Warrior',
    description: 'Take 5-minute showers for 7 days straight',
    type: 'weekly',
    points: 75,
    category: 'water'
  }
];

export const ecoDiceTasks: Challenge[] = [
  {
    id: 'dice-1',
    title: 'Reuse Something Old',
    description: 'Find a creative way to repurpose an item you were going to throw away',
    type: 'daily',
    points: 35,
    category: 'waste'
  },
  {
    id: 'dice-2',
    title: 'Nature Connection',
    description: 'Spend 15 minutes outdoors observing plants or wildlife',
    type: 'daily',
    points: 20,
    category: 'nature'
  },
  {
    id: 'dice-3',
    title: 'Local Hero',
    description: 'Buy one item from a local farmer or small business',
    type: 'daily',
    points: 40,
    category: 'shopping'
  },
  {
    id: 'dice-4',
    title: 'Energy Detective',
    description: 'Find and fix one energy waste in your home (lights, chargers, etc.)',
    type: 'daily',
    points: 30,
    category: 'energy'
  },
  {
    id: 'dice-5',
    title: 'Green Commute',
    description: 'Use public transport, bike, or walk for all trips today',
    type: 'daily',
    points: 45,
    category: 'transportation'
  },
  {
    id: 'dice-6',
    title: 'Kitchen Ninja',
    description: 'Cook a meal using only ingredients you already have',
    type: 'daily',
    points: 25,
    category: 'food'
  }
];

export const suggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Switch to LED Bulbs',
    description: 'Replace incandescent bulbs with LED alternatives',
    impact: 'Saves 80% energy and lasts 25x longer',
    category: 'energy',
    funFact: 'One LED bulb prevents 1,000 lbs of CO2 over its lifetime!'
  },
  {
    id: '2',
    title: 'Bring Your Own Bag',
    description: 'Use reusable bags for all shopping trips',
    impact: 'Prevents 170 plastic bags from entering landfills per year',
    category: 'waste',
    funFact: 'A single reusable bag can replace 2,700 plastic bags over its lifetime'
  },
  {
    id: '3',
    title: 'Take Shorter Showers',
    description: 'Reduce shower time to 5 minutes or less',
    impact: 'Saves 1,000+ gallons of water per month',
    category: 'water',
    funFact: 'A 2-minute reduction saves enough water to drink for 50+ days!'
  },
  {
    id: '4',
    title: 'Meatless Monday',
    description: 'Go vegetarian for one day each week',
    impact: 'Reduces carbon footprint by 1,900 lbs CO2 annually',
    category: 'food',
    funFact: 'One day without meat saves 1,100 gallons of water!'
  },
  {
    id: '5',
    title: 'Digital Receipts',
    description: 'Choose email receipts instead of paper ones',
    impact: 'Saves 6 trees per year if everyone switched',
    category: 'waste',
    funFact: 'Receipt paper contains BPA - keeping it digital is healthier too!'
  },
  {
    id: '6',
    title: 'Unplug Electronics',
    description: 'Unplug devices when not in use',
    impact: 'Reduces phantom load by up to 10% of electricity bill',
    category: 'energy',
    funFact: 'Phantom loads cost Americans $3 billion annually!'
  }
];

export const availableBadges: Badge[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Log your first eco-friendly habit',
    icon: '🌱',
    unlockedAt: '',
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    unlockedAt: '',
    rarity: 'common'
  },
  {
    id: '3',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    unlockedAt: '',
    rarity: 'rare'
  },
  {
    id: '4',
    name: 'Challenge Champion',
    description: 'Complete 10 challenges',
    icon: '⭐',
    unlockedAt: '',
    rarity: 'rare'
  },
  {
    id: '5',
    name: 'Eco Legend',
    description: 'Reach 100 day streak',
    icon: '👑',
    unlockedAt: '',
    rarity: 'legendary'
  }
];

export const mockFriends: Friend[] = [
  { id: '1', name: 'Sarah Green', greenScore: 1250, currentStreak: 15 },
  { id: '2', name: 'Mike Earth', greenScore: 980, currentStreak: 8 },
  { id: '3', name: 'Luna Forest', greenScore: 2100, currentStreak: 45 },
  { id: '4', name: 'Alex Rivers', greenScore: 750, currentStreak: 3 },
  { id: '5', name: 'Emma Leaf', greenScore: 1800, currentStreak: 22 }
];

export const ecoTips = [
  "Every ton of recycled paper saves 17 trees! 🌳",
  "Carpooling just twice a week can reduce CO2 emissions by 1,590 lbs per year! 🚗",
  "A reusable water bottle can save 1,460 plastic bottles annually! 💧",
  "Switching off lights when leaving a room can save 10% on electricity bills! 💡",
  "Growing your own herbs can reduce grocery trips and packaging waste! 🌿",
  "Air-drying clothes saves 700 lbs of CO2 per year compared to electric dryers! 👕"
];

export const mockUsers = [
  {
    email: 'sarah.green@example.com',
    password: 'password123',
    userData: {
      id: 'user-sarah',
      email: 'sarah.green@example.com',
      name: 'Sarah Green',
      dateOfBirth: '1995-06-15',
      gender: 'female',
      location: 'urban' as const,
      joinDate: '2024-01-15T00:00:00.000Z',
      greenScore: 1250,
      currentStreak: 15,
      longestStreak: 28,
      totalHabitsLogged: 85,
      badges: [
        {
          id: '1',
          name: 'First Steps',
          description: 'Log your first eco-friendly habit',
          icon: '🌱',
          unlockedAt: '2024-01-16T00:00:00.000Z',
          rarity: 'common' as const
        },
        {
          id: '2',
          name: 'Week Warrior',
          description: 'Maintain a 7-day streak',
          icon: '🔥',
          unlockedAt: '2024-01-23T00:00:00.000Z',
          rarity: 'common' as const
        }
      ],
      level: 13,
      xp: 1250
    }
  },
  {
    email: 'mike.earth@example.com',
    password: 'ecolife456',
    userData: {
      id: 'user-mike',
      email: 'mike.earth@example.com',
      name: 'Mike Earth',
      dateOfBirth: '1988-03-22',
      gender: 'male',
      location: 'rural' as const,
      joinDate: '2024-02-01T00:00:00.000Z',
      greenScore: 980,
      currentStreak: 8,
      longestStreak: 15,
      totalHabitsLogged: 62,
      badges: [
        {
          id: '1',
          name: 'First Steps',
          description: 'Log your first eco-friendly habit',
          icon: '🌱',
          unlockedAt: '2024-02-02T00:00:00.000Z',
          rarity: 'common' as const
        }
      ],
      level: 10,
      xp: 980
    }
  },
  {
    email: 'luna.forest@example.com',
    password: 'nature789',
    userData: {
      id: 'user-luna',
      email: 'luna.forest@example.com',
      name: 'Luna Forest',
      dateOfBirth: '1992-09-08',
      gender: 'female',
      location: 'urban' as const,
      joinDate: '2023-12-10T00:00:00.000Z',
      greenScore: 2100,
      currentStreak: 45,
      longestStreak: 67,
      totalHabitsLogged: 156,
      badges: [
        {
          id: '1',
          name: 'First Steps',
          description: 'Log your first eco-friendly habit',
          icon: '🌱',
          unlockedAt: '2023-12-11T00:00:00.000Z',
          rarity: 'common' as const
        },
        {
          id: '2',
          name: 'Week Warrior',
          description: 'Maintain a 7-day streak',
          icon: '🔥',
          unlockedAt: '2023-12-18T00:00:00.000Z',
          rarity: 'common' as const
        },
        {
          id: '3',
          name: 'Month Master',
          description: 'Maintain a 30-day streak',
          icon: '🏆',
          unlockedAt: '2024-01-10T00:00:00.000Z',
          rarity: 'rare' as const
        }
      ],
      level: 21,
      xp: 2100
    }
  },
  {
    email: 'demo@ecotracker.com',
    password: 'demo',
    userData: {
      id: 'user-demo',
      email: 'demo@ecotracker.com',
      name: 'Demo User',
      dateOfBirth: '1990-01-01',
      gender: 'prefer-not-to-say',
      location: 'urban' as const,
      joinDate: '2024-01-01T00:00:00.000Z',
      greenScore: 500,
      currentStreak: 5,
      longestStreak: 12,
      totalHabitsLogged: 35,
      badges: [
        {
          id: '1',
          name: 'First Steps',
          description: 'Log your first eco-friendly habit',
          icon: '🌱',
          unlockedAt: '2024-01-02T00:00:00.000Z',
          rarity: 'common' as const
        }
      ],
      level: 5,
      xp: 500
    }
  }
];

export const mockHabitsData = {
  'user-sarah': [
    {
      id: 'habit-sarah-1',
      userId: 'user-sarah',
      title: 'Used reusable water bottle',
      category: 'waste' as const,
      date: '2025-01-09',
      mood: '😊',
      impact: 'Saved 1 plastic bottle',
      points: 20
    },
    {
      id: 'habit-sarah-2',
      userId: 'user-sarah',
      title: 'Biked to work',
      category: 'transportation' as const,
      date: '2025-01-09',
      mood: '🌞',
      impact: 'Reduced 5kg CO2 emissions',
      points: 35
    },
    {
      id: 'habit-sarah-3',
      userId: 'user-sarah',
      title: 'Composted food scraps',
      category: 'waste' as const,
      date: '2025-01-08',
      mood: '😊',
      impact: 'Diverted 0.5kg from landfill',
      points: 25
    },
    {
      id: 'habit-sarah-4',
      userId: 'user-sarah',
      title: 'Took shorter shower',
      category: 'water' as const,
      date: '2025-01-08',
      mood: '😊',
      impact: 'Saved 50L of water',
      points: 30
    },
    {
      id: 'habit-sarah-5',
      userId: 'user-sarah',
      title: 'Ate plant-based meal',
      category: 'food' as const,
      date: '2025-01-07',
      mood: '🌞',
      impact: 'Reduced environmental footprint',
      points: 40
    }
  ],
  'user-mike': [
    {
      id: 'habit-mike-1',
      userId: 'user-mike',
      title: 'Turned off lights',
      category: 'energy' as const,
      date: '2025-01-09',
      mood: '😊',
      impact: 'Saved 2kWh energy',
      points: 15
    },
    {
      id: 'habit-mike-2',
      userId: 'user-mike',
      title: 'Bought local produce',
      category: 'food' as const,
      date: '2025-01-08',
      mood: '🌞',
      impact: 'Supported local farmers',
      points: 30
    },
    {
      id: 'habit-mike-3',
      userId: 'user-mike',
      title: 'Used cloth shopping bags',
      category: 'shopping' as const,
      date: '2025-01-08',
      mood: '😊',
      impact: 'Avoided 5 plastic bags',
      points: 25
    }
  ],
  'user-luna': [
    {
      id: 'habit-luna-1',
      userId: 'user-luna',
      title: 'Planted a tree',
      category: 'nature' as const,
      date: '2025-01-09',
      mood: '🌞',
      impact: 'Added oxygen production',
      points: 40
    },
    {
      id: 'habit-luna-2',
      userId: 'user-luna',
      title: 'Used cloth shopping bags',
      category: 'shopping' as const,
      date: '2025-01-09',
      mood: '😊',
      impact: 'Avoided 5 plastic bags',
      points: 20
    },
    {
      id: 'habit-luna-3',
      userId: 'user-luna',
      title: 'Took shorter shower',
      category: 'water' as const,
      date: '2025-01-08',
      mood: '😊',
      impact: 'Saved 15L of water',
      points: 25
    },
    {
      id: 'habit-luna-4',
      userId: 'user-luna',
      title: 'Used public transport',
      category: 'transportation' as const,
      date: '2025-01-07',
      mood: '😊',
      impact: 'Reduced car emissions',
      points: 35
    },
    {
      id: 'habit-luna-5',
      userId: 'user-luna',
      title: 'Recycled plastic bottles',
      category: 'waste' as const,
      date: '2025-01-07',
      mood: '🌞',
      impact: 'Diverted waste from landfill',
      points: 30
    }
  ]
};