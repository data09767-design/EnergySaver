
import { UsageData } from './types';

// Average kg of CO2 equivalent per kilowatt-hour. 
// This value can vary significantly by region.
export const CARBON_EMISSION_FACTOR_KG_PER_KWH = 0.4;

export const INITIAL_USAGE_DATA: UsageData[] = [
  { id: 'data-1', month: 'January', year: 2024, usageKWh: 1250 },
  { id: 'data-2', month: 'February', year: 2024, usageKWh: 1180 },
  { id: 'data-3', month: 'March', year: 2024, usageKWh: 1300 },
  { id: 'data-4', month: 'April', year: 2024, usageKWh: 1280 },
  { id: 'data-5', month: 'May', year: 2024, usageKWh: 1350 },
  { id: 'data-6', month: 'June', year: 2024, usageKWh: 1420 },
];
