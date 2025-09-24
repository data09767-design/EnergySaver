
import React from 'react';
import { UsageData } from '../types';
import { CARBON_EMISSION_FACTOR_KG_PER_KWH } from '../constants';
import StatsCard from './StatsCard';
import UsageChart from './UsageChart';
import CarbonFootprintDonut from './CarbonFootprintDonut';
import AIAssistant from './AIAssistant';

interface DashboardProps {
  usageData: UsageData[];
  onOpenModal: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ usageData, onOpenModal }) => {
  const latestData = usageData.length > 0 ? usageData[usageData.length - 1] : { usageKWh: 0 };
  const totalUsage = usageData.reduce((sum, data) => sum + data.usageKWh, 0);
  const averageUsage = totalUsage / (usageData.length || 1);
  const totalFootprint = totalUsage * CARBON_EMISSION_FACTOR_KG_PER_KWH;

  const currentMonthFootprint = latestData.usageKWh * CARBON_EMISSION_FACTOR_KG_PER_KWH;
  // Goal is 10% reduction from average
  const footprintGoal = (averageUsage * CARBON_EMISSION_FACTOR_KG_PER_KWH) * 0.9;
  
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Energy Dashboard</h1>
          <p className="text-slate-400 mt-1">Your electricity usage and carbon footprint analysis.</p>
        </div>
        <button 
          onClick={onOpenModal}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Add Usage Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard 
          title="Latest Monthly Usage" 
          value={latestData.usageKWh.toLocaleString()} 
          unit="kWh" 
          icon={<BoltIcon />}
        />
        <StatsCard 
          title="Average Monthly Usage" 
          value={averageUsage.toFixed(0)} 
          unit="kWh"
          icon={<ChartBarIcon />}
          />
        <StatsCard 
          title="Total Carbon Footprint" 
          value={(totalFootprint / 1000).toFixed(2)} 
          unit="tonnes CO₂e"
          icon={<CloudIcon />}
          />
      </div>

      {/* Charts and AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Monthly Usage Trend (kWh)</h2>
          <UsageChart data={usageData} />
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-4 text-center">Carbon Footprint Goal</h2>
           <CarbonFootprintDonut
            current={currentMonthFootprint}
            goal={footprintGoal}
          />
        </div>
      </div>
      
      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
         <AIAssistant usageData={usageData} />
      </div>
    </div>
  );
};

// SVG Icons
const BoltIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const CloudIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
);

export default Dashboard;
