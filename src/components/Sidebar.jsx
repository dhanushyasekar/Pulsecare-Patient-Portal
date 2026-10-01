import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Pill, 
  CalendarCheck, 
  FileText, 
  Bot, 
  Activity 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/advice', name: "Doctor's Advice", icon: Stethoscope }, // Ippadi update pannunga
    { path: '/appointments', name: 'Appointments', icon: CalendarCheck },
    { path: '/vault', name: 'Document Vault', icon: FileText },
    { path: '/ai-assistant', name: 'AI Health Assistant', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
        <div className="bg-cyan-500 p-2 rounded-xl text-white shadow-lg shadow-cyan-500/30">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">PulseCare</h1>
          <p className="text-xs text-cyan-400 font-medium">Patient Portal</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        Fanam Frontend Evaluation
      </div>
    </aside>
  );
}