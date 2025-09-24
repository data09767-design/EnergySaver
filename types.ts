
export interface UsageData {
  id: string;
  month: string;
  year: number;
  usageKWh: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
