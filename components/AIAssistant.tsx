
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UsageData } from '../types';
import { getEnergySavingTips } from '../services/geminiService';

interface AIAssistantProps {
    usageData: UsageData[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ usageData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getEnergySavingTips(input, usageData);
      const modelMessage: ChatMessage = { role: 'model', text: aiResponse };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <SparklesIcon />
        <h2 className="text-xl font-semibold ml-2">AI Conservation Assistant</h2>
      </div>
      <div className="h-80 bg-slate-900 rounded-lg p-4 overflow-y-auto flex flex-col space-y-4 border border-slate-700">
        {messages.length === 0 && (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-slate-400 text-center">Ask me anything about reducing your energy consumption! <br/> e.g., "How can I lower my electricity bill?"</p>
            </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
              <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
         {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-md p-3 rounded-lg bg-slate-700 text-slate-200 flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2 delay-150"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for energy-saving tips..."
          className="flex-grow bg-slate-700 border border-slate-600 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} className="bg-emerald-500 text-white p-2 rounded-r-lg hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed">
          {isLoading ? <SpinnerIcon /> : <SendIcon />}
        </button>
      </form>
    </div>
  );
};

// SVG Icons
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01-1.414 1.414L12 6.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 5m0 14l2.293-2.293a1 1 0 011.414 1.414L12 17.586l2.293-2.293a1 1 0 011.414 1.414L14 19m-4-5l2.293-2.293a1 1 0 011.414 1.414L12 13.586l2.293-2.293a1 1 0 011.414 1.414L14 15" />
    </svg>
);

export default AIAssistant;
