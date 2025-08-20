import React from 'react';
import { Habit } from '../../types';
import { Card } from '../common/Card';
import { calculateTotalImpact, getImpactByTimeframe, formatImpactValue } from '../../utils/impactCalculator';
import { Leaf, Droplets, Trash2, Car, TreePine, TrendingUp } from 'lucide-react';

interface ImpactDashboardProps {
  habits: Habit[];
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ habits }) => {
  const totalImpact = calculateTotalImpact(habits);
  const weeklyImpact = getImpactByTimeframe(habits, 7);
  const monthlyImpact = getImpactByTimeframe(habits, 30);

  const impactCards = [
    {
      title: 'CO₂ Saved',
      value: totalImpact.co2Saved,
      unit: 'kg',
      icon: Leaf,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      weekly: weeklyImpact.co2Saved,
      description: 'Carbon emissions prevented'
    },
    {
      title: 'Water Saved',
      value: totalImpact.waterSaved,
      unit: 'L',
      icon: Droplets,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      weekly: weeklyImpact.waterSaved,
      description: 'Liters of water conserved'
    },
    {
      title: 'Waste Avoided',
      value: totalImpact.wasteSaved,
      unit: 'kg',
      icon: Trash2,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      weekly: weeklyImpact.wasteSaved,
      description: 'Waste diverted from landfills'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className={`p-6 ${card.bgColor} border-l-4 border-l-green-500`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${card.textColor}`}>
                    {formatImpactValue(card.value, card.unit)}
                  </div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">This week:</span>
                  <span className={`font-medium ${card.textColor}`}>
                    {formatImpactValue(card.weekly, card.unit)}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Equivalent Impact */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
          Your Environmental Impact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div className="flex items-center">
                <TreePine className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">Trees Planted Equivalent</p>
                  <p className="text-sm text-gray-600">Based on CO₂ absorption</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {totalImpact.treesEquivalent.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">trees</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">Cars Off Road</p>
                  <p className="text-sm text-gray-600">Equivalent daily impact</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {totalImpact.carsOffRoad.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">days</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Monthly Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This month:</span>
                  <span className="font-medium text-green-600">
                    {formatImpactValue(monthlyImpact.co2Saved, 'kg')} CO₂
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Water saved:</span>
                  <span className="font-medium text-blue-600">
                    {formatImpactValue(monthlyImpact.waterSaved, 'L')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Waste avoided:</span>
                  <span className="font-medium text-purple-600">
                    {formatImpactValue(monthlyImpact.wasteSaved, 'kg')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Fun Facts</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>🌍 You've saved enough water to fill {Math.floor(totalImpact.waterSaved / 250)} bathtubs!</p>
                <p>♻️ Your waste reduction equals {Math.floor(totalImpact.wasteSaved / 0.5)} plastic bottles!</p>
                <p>🚗 You've prevented {Math.floor(totalImpact.co2Saved / 2.3)} km of car emissions!</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};