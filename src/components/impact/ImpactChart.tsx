import React from 'react';
import { Habit } from '../../types';
import { Card } from '../common/Card';
import { getMonthlyImpactTrend } from '../../utils/impactCalculator';
import { BarChart3, TrendingUp } from 'lucide-react';

interface ImpactChartProps {
  habits: Habit[];
}

export const ImpactChart: React.FC<ImpactChartProps> = ({ habits }) => {
  const monthlyTrend = getMonthlyImpactTrend(habits, 6);
  
  // Find max values for scaling
  const maxCO2 = Math.max(...monthlyTrend.map(m => m.impact.co2Saved));
  const maxWater = Math.max(...monthlyTrend.map(m => m.impact.waterSaved));
  const maxWaste = Math.max(...monthlyTrend.map(m => m.impact.wasteSaved));

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
        Environmental Impact Trend
      </h3>

      {/* CO₂ Savings Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">CO₂ Emissions Saved (kg)</h4>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Total: {monthlyTrend.reduce((sum, m) => sum + m.impact.co2Saved, 0).toFixed(1)} kg</span>
          </div>
        </div>
        <div className="flex items-end justify-between space-x-2 h-32">
          {monthlyTrend.map((month, index) => {
            const height = maxCO2 > 0 ? (month.impact.co2Saved / maxCO2) * 100 : 0;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '100px' }}>
                  <div className="text-xs text-gray-600 mb-1">
                    {month.impact.co2Saved > 0 ? month.impact.co2Saved.toFixed(1) : ''}
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%`, minHeight: month.impact.co2Saved > 0 ? '4px' : '0px' }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{month.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Water Savings Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">Water Saved (L)</h4>
          <div className="flex items-center text-sm text-blue-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Total: {monthlyTrend.reduce((sum, m) => sum + m.impact.waterSaved, 0).toLocaleString()} L</span>
          </div>
        </div>
        <div className="flex items-end justify-between space-x-2 h-32">
          {monthlyTrend.map((month, index) => {
            const height = maxWater > 0 ? (month.impact.waterSaved / maxWater) * 100 : 0;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '100px' }}>
                  <div className="text-xs text-gray-600 mb-1">
                    {month.impact.waterSaved > 0 ? month.impact.waterSaved.toLocaleString() : ''}
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%`, minHeight: month.impact.waterSaved > 0 ? '4px' : '0px' }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{month.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Waste Reduction Chart */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">Waste Avoided (kg)</h4>
          <div className="flex items-center text-sm text-purple-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Total: {monthlyTrend.reduce((sum, m) => sum + m.impact.wasteSaved, 0).toFixed(1)} kg</span>
          </div>
        </div>
        <div className="flex items-end justify-between space-x-2 h-32">
          {monthlyTrend.map((month, index) => {
            const height = maxWaste > 0 ? (month.impact.wasteSaved / maxWaste) * 100 : 0;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center justify-end" style={{ height: '100px' }}>
                  <div className="text-xs text-gray-600 mb-1">
                    {month.impact.wasteSaved > 0 ? month.impact.wasteSaved.toFixed(1) : ''}
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${height}%`, minHeight: month.impact.wasteSaved > 0 ? '4px' : '0px' }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{month.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Legend */}
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-emerald-400 rounded mr-2"></div>
          <span className="text-gray-600">CO₂ Saved</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-cyan-400 rounded mr-2"></div>
          <span className="text-gray-600">Water Saved</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-t from-purple-500 to-pink-400 rounded mr-2"></div>
          <span className="text-gray-600">Waste Avoided</span>
        </div>
      </div>
    </Card>
  );
};