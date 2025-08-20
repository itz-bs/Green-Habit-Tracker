import React from 'react';
import { Habit } from '../../types';
import { calculateHabitImpact, formatImpactValue } from '../../utils/impactCalculator';
import { Leaf, Droplets, Trash2, TreePine } from 'lucide-react';

interface HabitImpactDisplayProps {
  habit: Habit;
  showDetailed?: boolean;
}

export const HabitImpactDisplay: React.FC<HabitImpactDisplayProps> = ({ 
  habit, 
  showDetailed = false 
}) => {
  const impact = calculateHabitImpact(habit);

  if (!showDetailed) {
    // Compact display for habit cards
    return (
      <div className="flex items-center space-x-3 text-xs">
        {impact.co2Saved > 0 && (
          <div className="flex items-center text-green-600">
            <Leaf className="h-3 w-3 mr-1" />
            <span>{formatImpactValue(impact.co2Saved, 'kg')} CO₂</span>
          </div>
        )}
        {impact.waterSaved > 0 && (
          <div className="flex items-center text-blue-600">
            <Droplets className="h-3 w-3 mr-1" />
            <span>{formatImpactValue(impact.waterSaved, 'L')}</span>
          </div>
        )}
        {impact.wasteSaved > 0 && (
          <div className="flex items-center text-purple-600">
            <Trash2 className="h-3 w-3 mr-1" />
            <span>{formatImpactValue(impact.wasteSaved, 'kg')}</span>
          </div>
        )}
      </div>
    );
  }

  // Detailed display for habit details
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
        <TreePine className="h-4 w-4 mr-2" />
        Environmental Impact
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impact.co2Saved > 0 && (
          <div className="text-center p-3 bg-white rounded-lg">
            <Leaf className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">
              {formatImpactValue(impact.co2Saved, 'kg')}
            </div>
            <div className="text-xs text-gray-600">CO₂ Saved</div>
          </div>
        )}
        
        {impact.waterSaved > 0 && (
          <div className="text-center p-3 bg-white rounded-lg">
            <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">
              {formatImpactValue(impact.waterSaved, 'L')}
            </div>
            <div className="text-xs text-gray-600">Water Saved</div>
          </div>
        )}
        
        {impact.wasteSaved > 0 && (
          <div className="text-center p-3 bg-white rounded-lg">
            <Trash2 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">
              {formatImpactValue(impact.wasteSaved, 'kg')}
            </div>
            <div className="text-xs text-gray-600">Waste Avoided</div>
          </div>
        )}
      </div>

      {/* Equivalent Impact */}
      {(impact.treesEquivalent > 0.01 || impact.carsOffRoad > 0.01) && (
        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="text-sm text-green-700 space-y-1">
            {impact.treesEquivalent > 0.01 && (
              <p>🌳 Equivalent to {impact.treesEquivalent.toFixed(2)} trees planted</p>
            )}
            {impact.carsOffRoad > 0.01 && (
              <p>🚗 Like taking a car off the road for {impact.carsOffRoad.toFixed(3)} days</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};