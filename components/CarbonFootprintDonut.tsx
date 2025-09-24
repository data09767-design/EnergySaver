
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface CarbonFootprintDonutProps {
  current: number;
  goal: number;
}

const CarbonFootprintDonut: React.FC<CarbonFootprintDonutProps> = ({ current, goal }) => {
  const isOverGoal = current > goal;
  const percentage = isOverGoal ? 100 : (current / goal) * 100;

  const data = [
    { name: 'Current Footprint', value: percentage },
    { name: 'Remaining to Goal', value: 100 - percentage },
  ];
  
  const COLORS = ['#10B981', '#475569'];

  const CustomLegend = () => (
    <div className="text-center mt-4 space-y-1 text-sm text-slate-300">
      <p>Current: <span className="font-bold text-white">{current.toFixed(1)} kg CO₂e</span></p>
      <p>Goal: <span className="font-bold text-white">{goal.toFixed(1)} kg CO₂e</span></p>
       {isOverGoal && <p className="text-red-400 font-semibold">Over goal by {(current - goal).toFixed(1)} kg CO₂e</p>}
    </div>
  );

  return (
    <div style={{ width: '100%', height: 250 }} className="flex flex-col items-center">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
           <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-2xl font-bold">
            {`${percentage.toFixed(0)}%`}
          </text>
        </PieChart>
      </ResponsiveContainer>
      <CustomLegend/>
    </div>
  );
};

export default CarbonFootprintDonut;
