import React, { useState } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello John! I am your PulseCare AI Health Assistant. How can I help you understand your health metrics, prescriptions, or symptoms today?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg = { sender: 'user', text: userText };
    
    // Smart context-aware responses
    let replyText = `I understand you are asking about "${userText}". Based on your recent telemetry (Heart rate 72 bpm, BP 120/80), your vital signs are stable. Please ensure you take your scheduled medications or consult Dr. Sarah Smith if symptoms persist.`;
    
    const lower = userText.toLowerCase();
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
      replyText = 'Hello! How are you feeling today? You can ask me about your prescriptions, appointments, or any health symptoms.';
    } else if (lower.includes('headache') || lower.includes('pain')) {
      replyText = 'For headaches or mild pain, ensure you stay hydrated and rest. If pain continues, please book an appointment with our general practitioner or check your active prescriptions.';
    } else if (lower.includes('medication') || lower.includes('pill') || lower.includes('prescription')) {
      replyText = 'You can check your active prescriptions in the Prescriptions tab on the sidebar. Always adhere to your prescribed dosage frequency!';
    }

    const aiMsg = { sender: 'ai', text: replyText };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">AI Health Symptom Assistant</h2>
        <p className="text-sm text-slate-500 mt-1">Interactive AI module simulating context-aware healthcare prompts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[550px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50 rounded-t-2xl">
          <div className="bg-cyan-600 text-white p-2 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">PulseAI Clinical Chatbot</h3>
            <p className="text-xs text-emerald-600 font-medium">● Online & Ready</p>
          </div>
        </div>

        {/* Message Container */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${msg.sender === 'user' ? 'bg-slate-700' : 'bg-cyan-600'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-md p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-tr-xs' : 'bg-slate-100 text-slate-800 rounded-tl-xs'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 flex gap-3 bg-white rounded-b-2xl">
          <input
            type="text"
            placeholder="Ask about your symptoms, meds, or health tips..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-sm"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 shadow-md shadow-cyan-600/20"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}