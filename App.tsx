
import React, { useState } from 'react';
import { INITIAL_USAGE_DATA } from './constants';
import { UsageData } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddUsageModal from './components/AddUsageModal';

const App: React.FC = () => {
  const [usageData, setUsageData] = useState<UsageData[]>(INITIAL_USAGE_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addUsageData = (newData: Omit<UsageData, 'id'>) => {
    setUsageData(prevData => [
      ...prevData,
      { ...newData, id: `data-${Date.now()}` }
    ].sort((a, b) => new Date(a.year, getMonthIndex(a.month)).getTime() - new Date(b.year, getMonthIndex(b.month)).getTime()));
  };
  
  const getMonthIndex = (month: string) => {
    return new Date(`${month} 1, 2000`).getMonth();
  };


  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Dashboard 
          usageData={usageData} 
          onOpenModal={() => setIsModalOpen(true)}
        />
      </main>
      {isModalOpen && (
        <AddUsageModal
          onClose={() => setIsModalOpen(false)}
          onAddData={addUsageData}
        />
      )}
    </div>
  );
};

export default App;
