
import { GoogleGenAI } from "@google/genai";
import { UsageData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getEnergySavingTips = async (userQuery: string, usageData: UsageData[]): Promise<string> => {
  try {
    const usageDataSummary = usageData
      .slice(-6) // Get last 6 months of data
      .map(d => `- ${d.month} ${d.year}: ${d.usageKWh} kWh`)
      .join('\n');

    const systemInstruction = `You are an expert AI assistant specializing in energy conservation and carbon footprint reduction for businesses and individuals. Your goal is to provide actionable, specific, and easy-to-understand advice. Analyze the provided energy usage data and the user's query to generate relevant recommendations.`;

    const prompt = `Here is the user's recent electricity usage data:
${usageDataSummary}

User's Question: "${userQuery}"

Based on this data and the user's question, provide a concise, friendly, and helpful response. If the user is asking for tips, provide a list of 3-5 high-impact recommendations to help them reduce their electricity consumption. For each recommendation, briefly explain why it's effective. Format your response using markdown for readability (e.g., use headings, bold text, and bullet points).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, but I'm having trouble connecting to my knowledge base right now. Please check your API key and try again later.";
  }
};
