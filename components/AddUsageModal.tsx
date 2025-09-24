
import React, { useState } from 'react';

interface AddUsageModalProps {
  onClose: () => void;
  onAddData: (data: { month: string; year: number; usageKWh: number }) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AddUsageModal: React.FC<AddUsageModalProps> = ({ onClose, onAddData }) => {
  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [usage, setUsage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usageKWh = parseInt(usage, 10);
    if (!month || !year || isNaN(usageKWh) || usageKWh <= 0) {
      alert("Please fill in all fields with valid data.");
      return;
    }
    onAddData({ month, year, usageKWh });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add New Usage Data</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-slate-300 mb-1">Month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            >
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-slate-300 mb-1">Year</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
              placeholder="e.g., 2024"
            />
          </div>
          <div>
            <label htmlFor="usage" className="block text-sm font-medium text-slate-300 mb-1">Usage (kWh)</label>
            <input
              type="number"
              id="usage"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
              placeholder="e.g., 1500"
            />
          </div>
          <div className="flex justify-end pt-4 space-x-2">
             <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsageModal;
