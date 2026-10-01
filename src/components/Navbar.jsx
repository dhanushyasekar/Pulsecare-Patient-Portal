import React, { useState } from 'react';
import { Bell, CheckCircle, X } from 'lucide-react';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Dr. Sarah Smith confirmed your appointment for Oct 2.', time: '10m ago' },
    { id: 2, text: 'Refill reminder: Take Lisinopril at 8:00 PM.', time: '1h ago' },
  ]);

  return (
    <header className="ml-64 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 fixed top-0 right-0 left-0 z-10 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Portal Mode:</span>
        <span className="bg-cyan-50 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full border border-cyan-200">Patient Active</span>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Notification Bell Button */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm">Notifications</h4>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="py-2 space-y-2 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex flex-col gap-1">
                      <p className="font-medium">{n.text}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-cyan-600 text-white flex items-center font-bold justify-center shadow-xs">
            JD
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-800 leading-tight">John Doe</h4>
            <p className="text-xs text-slate-500">Patient ID: #PC-8492</p>
          </div>
        </div>
      </div>
    </header>
  );
}