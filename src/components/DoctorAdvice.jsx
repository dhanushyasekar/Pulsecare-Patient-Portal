import React, { useState, useEffect } from 'react';
import { Stethoscope, CheckCircle2, HeartPulse, Apple, AlertCircle } from 'lucide-react';

export default function DoctorAdvice() {
  const [adviceList, setAdviceList] = useState(() => {
    const saved = localStorage.getItem('pulse_doctor_advice');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'Low Sodium Diet', category: 'Dietary', doctor: 'Dr. Sarah Smith', notes: 'Reduce salt intake to manage blood pressure. Avoid processed foods and pickles.', date: '2026-09-25', priority: 'High' },
      { id: 2, title: 'Morning Walk Routine', category: 'Exercise', doctor: 'Dr. Robert Chen', notes: 'Walk briskly for 30 minutes every morning to maintain heart health.', date: '2026-09-20', priority: 'Medium' },
      { id: 3, title: 'Hydration Goal', category: 'General', doctor: 'Dr. Sarah Smith', notes: 'Drink at least 2.5 to 3 liters of water daily.', date: '2026-09-18', priority: 'Normal' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('pulse_doctor_advice', JSON.stringify(adviceList));
  }, [adviceList]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Doctor's Advice & Care Plan</h2>
        <p className="text-sm text-slate-500 mt-1">Direct health recommendations, diet guidelines, and lifestyle notes from your physicians.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Active Care Guidelines ({adviceList.length})</h3>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-xl border border-cyan-200">
            <Stethoscope className="w-4 h-4 text-cyan-600" />
            Physician Verified Notes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adviceList.map((item) => (
            <div key={item.id} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-base">{item.title}</h4>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/60">
                  "{item.notes}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                <span className="font-medium text-slate-700">{item.doctor}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}