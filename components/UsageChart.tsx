
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { UsageData } from '../types';

interface UsageChartProps {
  data: UsageData[];
}

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  const chartData = data.map(d => ({
    name: `${d.month.substring(0, 3)} ${d.year}`,
    usage: d.usageKWh,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
          <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: '#1f2937', 
                borderColor: '#4b5563',
                color: '#f9fafb'
            }}
            itemStyle={{ color: '#f9fafb' }}
            labelStyle={{ color: '#d1d5db' }}
          />
          <Legend />
          <Line type="monotone" dataKey="usage" stroke="#10B981" strokeWidth={2} activeDot={{ r: 8 }} dot={{ fill: '#10B981' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
