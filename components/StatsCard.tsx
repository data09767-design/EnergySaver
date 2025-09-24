
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, icon }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center space-x-4 border border-slate-700 hover:border-emerald-500 transition-colors duration-300">
      <div className="bg-slate-900 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">
          {value} <span className="text-lg font-medium text-slate-300">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
