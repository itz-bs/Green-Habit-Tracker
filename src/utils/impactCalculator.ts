import { Habit, HabitCategory } from '../types';

// Standard environmental impact factors
export const IMPACT_FACTORS = {
  transportation: {
    co2PerKm: 0.21, // kg CO2 per km for average car
    waterSaved: 0, // L
    wasteSaved: 0 // kg
  },
  energy: {
    co2PerKwh: 0.5, // kg CO2 per kWh
    waterSaved: 4, // L per kWh saved
    wasteSaved: 0 // kg
  },
  water: {
    co2Saved: 0.0036, // kg CO2 per L water saved
    waterSaved: 1, // L (direct)
    wasteSaved: 0 // kg
  },
  waste: {
    co2Saved: 2.5, // kg CO2 per kg waste recycled/avoided
    waterSaved: 50, // L per kg waste avoided
    wasteSaved: 1 // kg (direct)
  },
  food: {
    co2Saved: 3.3, // kg CO2 per plant-based meal
    waterSaved: 1100, // L per plant-based meal
    wasteSaved: 0.2 // kg food waste avoided
  },
  shopping: {
    co2Saved: 0.5, // kg CO2 per reusable item used
    waterSaved: 20, // L per reusable item
    wasteSaved: 0.1 // kg packaging avoided
  },
  nature: {
    co2Saved: 0.5, // kg CO2 offset per nature activity
    waterSaved: 0, // L
    wasteSaved: 0 // kg
  }
};

// Habit-specific impact multipliers
export const HABIT_MULTIPLIERS = {
  'Used public transport': { distance: 20 }, // 20km average trip
  'Biked to work': { distance: 15 },
  'Walked instead of driving': { distance: 5 },
  'Carpooled': { distance: 25, efficiency: 0.5 }, // Split emissions
  'Used reusable water bottle': { items: 3 }, // 3 bottles saved per day
  'Took shorter shower': { water: 50 }, // 50L saved
  'Fixed leaky faucet': { water: 100 }, // 100L saved per day
  'Composted food scraps': { waste: 0.5 }, // 0.5kg composted
  'Recycled plastic bottles': { waste: 0.2 }, // 0.2kg recycled
  'Ate plant-based meal': { meals: 1 },
  'Bought local produce': { meals: 0.5 },
  'Used cloth shopping bags': { items: 5 }, // 5 bags avoided
  'Planted a tree': { co2: 10 }, // 10kg CO2 offset potential
  'Turned off lights': { energy: 2 }, // 2kWh saved
  'Unplugged electronics': { energy: 1 } // 1kWh saved
};

export interface EnvironmentalImpact {
  co2Saved: number; // kg
  waterSaved: number; // L
  wasteSaved: number; // kg
  treesEquivalent: number; // trees
  carsOffRoad: number; // days
}

export const calculateHabitImpact = (habit: Habit): EnvironmentalImpact => {
  const factors = IMPACT_FACTORS[habit.category];
  const multiplier = HABIT_MULTIPLIERS[habit.title as keyof typeof HABIT_MULTIPLIERS] || { items: 1 };
  
  let co2Saved = 0;
  let waterSaved = 0;
  let wasteSaved = 0;

  // Calculate based on category and specific habit
  switch (habit.category) {
    case 'transportation':
      const distance = multiplier.distance || 10;
      const efficiency = multiplier.efficiency || 1;
      co2Saved = (factors.co2PerKm * distance) * efficiency;
      break;
      
    case 'energy':
      const energy = multiplier.energy || 1;
      co2Saved = factors.co2PerKwh * energy;
      waterSaved = factors.waterSaved * energy;
      break;
      
    case 'water':
      const water = multiplier.water || 20; // Default 20L saved
      waterSaved = water;
      co2Saved = factors.co2Saved * water;
      break;
      
    case 'waste':
      const waste = multiplier.waste || 0.3; // Default 0.3kg
      wasteSaved = waste;
      co2Saved = factors.co2Saved * waste;
      waterSaved = factors.waterSaved * waste;
      break;
      
    case 'food':
      const meals = multiplier.meals || 1;
      co2Saved = factors.co2Saved * meals;
      waterSaved = factors.waterSaved * meals;
      wasteSaved = factors.wasteSaved * meals;
      break;
      
    case 'shopping':
      const items = multiplier.items || 1;
      co2Saved = factors.co2Saved * items;
      waterSaved = factors.waterSaved * items;
      wasteSaved = factors.wasteSaved * items;
      break;
      
    case 'nature':
      const co2Direct = multiplier.co2 || factors.co2Saved;
      co2Saved = co2Direct;
      break;
  }

  // Convert to equivalent metrics
  const treesEquivalent = co2Saved / 22; // 1 tree absorbs ~22kg CO2/year
  const carsOffRoad = co2Saved / 4.6; // Average car emits 4.6 tons CO2/year

  return {
    co2Saved: Math.round(co2Saved * 100) / 100,
    waterSaved: Math.round(waterSaved),
    wasteSaved: Math.round(wasteSaved * 100) / 100,
    treesEquivalent: Math.round(treesEquivalent * 100) / 100,
    carsOffRoad: Math.round(carsOffRoad * 1000) / 1000
  };
};

export const calculateTotalImpact = (habits: Habit[]): EnvironmentalImpact => {
  return habits.reduce((total, habit) => {
    const impact = calculateHabitImpact(habit);
    return {
      co2Saved: total.co2Saved + impact.co2Saved,
      waterSaved: total.waterSaved + impact.waterSaved,
      wasteSaved: total.wasteSaved + impact.wasteSaved,
      treesEquivalent: total.treesEquivalent + impact.treesEquivalent,
      carsOffRoad: total.carsOffRoad + impact.carsOffRoad
    };
  }, {
    co2Saved: 0,
    waterSaved: 0,
    wasteSaved: 0,
    treesEquivalent: 0,
    carsOffRoad: 0
  });
};

export const getImpactByTimeframe = (habits: Habit[], days: number): EnvironmentalImpact => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const recentHabits = habits.filter(habit => 
    new Date(habit.date) >= cutoffDate
  );
  
  return calculateTotalImpact(recentHabits);
};

export const getMonthlyImpactTrend = (habits: Habit[], months: number = 6): Array<{
  month: string;
  impact: EnvironmentalImpact;
}> => {
  const result = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = date.toISOString().slice(0, 7); // YYYY-MM
    const monthName = date.toLocaleDateString('en', { month: 'short', year: '2-digit' });
    
    const monthHabits = habits.filter(habit => 
      habit.date.startsWith(monthKey)
    );
    
    result.push({
      month: monthName,
      impact: calculateTotalImpact(monthHabits)
    });
  }
  
  return result;
};

export const formatImpactValue = (value: number, unit: string): string => {
  if (value === 0) return `0 ${unit}`;
  
  if (unit === 'kg' && value >= 1000) {
    return `${(value / 1000).toFixed(1)} tons`;
  }
  
  if (unit === 'L' && value >= 1000) {
    return `${(value / 1000).toFixed(1)} m³`;
  }
  
  if (value < 0.01) {
    return `<0.01 ${unit}`;
  }
  
  if (value < 1) {
    return `${value.toFixed(2)} ${unit}`;
  }
  
  if (value < 10) {
    return `${value.toFixed(1)} ${unit}`;
  }
  
  return `${Math.round(value)} ${unit}`;
};