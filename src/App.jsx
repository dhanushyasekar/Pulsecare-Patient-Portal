import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Stethoscope, 
  CalendarCheck, 
  FileText, 
  Bot, 
  Activity, 
  Bell, 
  X, 
  Plus, 
  CheckCircle2, 
  Search, 
  Download, 
  Send, 
  User,
  Clock,
  AlertCircle,
  ShieldAlert,
  PhoneCall,
  Award
} from 'lucide-react';

// --- SIDEBAR COMPONENT ---
function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/advice', name: "Doctor's Advice", icon: Stethoscope },
    { path: '/appointments', name: 'Appointments', icon: CalendarCheck },
    { path: '/vault', name: 'Document Vault', icon: FileText },
    { path: '/ai-assistant', name: 'AI Health Assistant', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-20">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800">
        <div className="bg-cyan-500 p-2 rounded-xl text-white shadow-lg shadow-cyan-500/30">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">PulseCare</h1>
          <p className="text-xs text-cyan-400 font-medium">Patient Portal</p>
        </div>
      </div>
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
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        Fanam Frontend Evaluation
      </div>
    </aside>
  );
}

// --- NAVBAR COMPONENT (With Clickable Patient Profile Modal) ---
function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const location = useLocation();

  // Automatically close popovers when navigating pages
  useEffect(() => {
    setShowNotifications(false);
    setShowProfileModal(false);
  }, [location]);

  const [notifications] = useState([
    { id: 1, text: 'Dr. Sarah Smith confirmed your appointment for Oct 10.', time: '10m ago' },
    { id: 2, text: 'Care plan updated by Dr. Robert Chen.', time: '1h ago' },
  ]);

  return (
    <>
      <header className="ml-64 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 fixed top-0 right-0 left-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Portal Mode:</span>
          <span className="bg-cyan-50 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full border border-cyan-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping"></span> Patient Active
          </span>
        </div>
        <div className="flex items-center gap-4 relative">
          {/* Emergency SOS Button */}
          <button 
            onClick={() => setShowSOSModal(true)}
            className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs animate-pulse"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" /> Emergency SOS
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            {/* Viewport-Safe Fixed Notification Dropdown */}
            {showNotifications && (
              <div className="fixed right-16 top-20 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-[9999] max-h-[65vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm">Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="py-2 space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex flex-col gap-1">
                      <p className="font-medium">{n.text}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clickable Patient Profile Section */}
          <div 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-3 pl-4 border-l border-slate-200 py-2 whitespace-nowrap cursor-pointer hover:bg-slate-50 px-3 rounded-xl transition"
            title="Click to view patient details"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center font-bold justify-center shadow-xs shrink-0">
              JD
            </div>
            <div className="text-left leading-tight">
              <h4 className="text-sm font-bold text-slate-800">John Doe</h4>
              <p className="text-xs text-slate-500">Patient ID: #PC-8492</p>
            </div>
          </div>
        </div>
      </header>

      {/* Patient Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                <User className="w-5 h-5 text-cyan-600" /> Patient Profile Information
              </div>
              <button onClick={() => setShowProfileModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-14 h-14 rounded-full bg-cyan-600 text-white flex items-center text-lg font-bold justify-center shadow-md">
                JD
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">John Doe</h3>
                <p className="text-xs text-cyan-700 font-medium">Patient ID: #PC-8492</p>
                <p className="text-xs text-slate-500">Primary Care Registered</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-500">Full Name:</span>
                <span className="font-bold text-slate-800">John Doe</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-500">Age / Gender:</span>
                <span className="font-bold text-slate-800">34 Years / Male</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-500">Patient ID:</span>
                <span className="font-bold text-cyan-700">#PC-8492</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-500">Blood Group:</span>
                <span className="font-bold text-slate-800">O Positive (O+)</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-500">Contact Number:</span>
                <span className="font-bold text-slate-800">+91 93453 34567</span>
              </div>
            </div>

            <button 
              onClick={() => setShowProfileModal(false)}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl text-sm transition cursor-pointer shadow-md shadow-cyan-600/20"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* Emergency SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[99999] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-100 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <ShieldAlert className="w-6 h-6 animate-bounce" /> Emergency Assistance Dispatched
              </div>
              <button onClick={() => setShowSOSModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your emergency signal has been received by PulseCare Emergency Dispatch. Our rapid response team and Dr. Sarah Smith's cardiology unit have been alerted.
            </p>
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl space-y-2 text-xs text-red-800">
              <p className="font-bold flex items-center gap-2"><PhoneCall className="w-4 h-4" /> 24/7 Emergency Helpline: 1800-PULSE-SOS</p>
              <p>Ambulance dispatched to your registered address: <b>Block 4, Healthcare Avenue</b>.</p>
            </div>
            <button 
              onClick={() => setShowSOSModal(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl text-sm transition cursor-pointer shadow-md shadow-red-600/20"
            >
              Close / False Alarm
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// --- DASHBOARD VIEW ---
function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Patient Health Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">Real-time telemetry and health vitals monitoring.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Heart Rate</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">72 <span className="text-sm font-normal text-slate-500">bpm</span></h3>
          </div>
          <span className="inline-block mt-4 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold w-fit">Normal Range</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Blood Pressure</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-2 tracking-tight">120/80 <span className="text-xs font-normal text-slate-500">mmHg</span></h3>
          </div>
          <span className="inline-block mt-4 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold w-fit">Optimal</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Blood Glucose</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">98 <span className="text-sm font-normal text-slate-500">mg/dL</span></h3>
          </div>
          <span className="inline-block mt-4 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold w-fit">Normal</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Oxygen Saturation</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">98%</h3>
          </div>
          <span className="inline-block mt-4 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold w-fit">Healthy</span>
        </div>
      </div>
    </div>
  );
}

// --- DOCTOR'S ADVICE VIEW ---
function DoctorAdvice() {
  const [adviceList] = useState([
    { id: 1, title: 'Low Sodium Diet', category: 'Dietary', doctor: 'Dr. Sarah Smith', notes: 'Reduce salt intake to manage blood pressure. Avoid processed foods and pickles.', date: '2026-09-25', priority: 'High' },
    { id: 2, title: 'Morning Walk Routine', category: 'Exercise', doctor: 'Dr. Robert Chen', notes: 'Walk briskly for 30 minutes every morning to maintain cardiovascular health.', date: '2026-09-20', priority: 'Medium' },
    { id: 3, title: 'Hydration Goal', category: 'General', doctor: 'Dr. Sarah Smith', notes: 'Drink at least 2.5 to 3 liters of water daily.', date: '2026-09-18', priority: 'Normal' },
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Doctor's Advice & Care Plan</h2>
        <p className="text-sm text-slate-500 mt-1">Direct health recommendations, diet guidelines, and lifestyle notes from your physicians.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Active Care Guidelines ({adviceList.length})</h3>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-xl border border-cyan-200">
            <Stethoscope className="w-4 h-4 text-cyan-600" />
            Physician Verified Notes
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {adviceList.map((item) => (
            <div key={item.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-slate-800 text-base">{item.title}</h4>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.priority === 'High' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/60">
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

// --- APPOINTMENTS VIEW (Persistent State across Tab Switches) ---
function Appointments() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppts = localStorage.getItem('pulse_appointments');
    if (savedAppts) return JSON.parse(savedAppts);
    return [
      { id: 1, doctor: 'Dr. Sarah Smith', department: 'Cardiology', date: '2026-10-10', time: '10:10', status: 'Confirmed' },
      { id: 2, doctor: 'Dr. Robert Chen', department: 'General Checkup', date: '2026-10-15', time: '14:00', status: 'Confirmed' },
    ];
  });

  const [form, setForm] = useState({ doctor: 'Dr. Sarah Smith', department: 'Cardiology', date: '', time: '10:00' });
  const [submitted, setSubmitted] = useState(false);
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    localStorage.setItem('pulse_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time) return;
    
    const newAppt = {
      id: Date.now(),
      ...form,
      status: 'Pending Doctor Approval'
    };

    setAppointments([newAppt, ...appointments]);
    setSubmitted(true);
    setForm({ doctor: 'Dr. Sarah Smith', department: 'Cardiology', date: '', time: '10:00' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Appointment Scheduler</h2>
        <p className="text-sm text-slate-500 mt-1">Book consultations subject to physician schedule verification.</p>
      </div>
      {submitted && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="text-sm font-semibold">Appointment requested successfully! Status is currently <b>Pending Doctor Approval</b> based on physician schedule.</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><CalendarCheck className="w-5 h-5 text-cyan-600" /> Book Visit</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
              <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white">
                <option value="Cardiology">Cardiology</option>
                <option value="General Checkup">General Checkup</option>
                <option value="Neurology">Neurology</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Doctor</label>
              <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white">
                <option value="Dr. Sarah Smith">Dr. Sarah Smith</option>
                <option value="Dr. Robert Chen">Dr. Robert Chen</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Date</label>
              <input type="date" min={todayDate} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Time</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm" required />
            </div>
            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"><Plus className="w-4 h-4" /> Request Booking</button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Scheduled Appointments ({appointments.length})</h3>
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center flex-wrap gap-2">
                    {a.doctor} 
                    <span className="text-xs text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">{a.department}</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{a.date} at {a.time}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
                  a.status === 'Confirmed' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- DOCUMENT VAULT VIEW (With Fully Populated PDF Content) ---
function Vault() {
  const [searchQuery, setSearchQuery] = useState('');
  const documents = [
    { 
      id: 1, 
      title: 'Annual Blood Panel Report', 
      date: '2026-08-14', 
      doctor: 'Dr. Robert Chen', 
      type: 'Lab Result', 
      content: 'Complete Blood Count (CBC) and Lipid Profile results are within optimal target ranges. Glucose levels: 98 mg/dL. Cholesterol: Normal.' 
    },
    { 
      id: 2, 
      title: 'Chest X-Ray Scan Results', 
      date: '2026-07-22', 
      doctor: 'Dr. Sarah Smith', 
      type: 'Imaging', 
      content: 'Radiology evaluation shows clear lung fields with no acute infiltrates or pleural effusion. Cardiac shadow is within normal limits.' 
    },
  ];

  const filteredDocuments = React.useMemo(() => {
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleDownload = (doc) => {
    // Valid minimal PDF structure with embedded font and rich clinical text content
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 280 >>
stream
BT
/F1 16 Tf
50 730 Td
(PulseCare Enterprise Medical Report) Tj
0 -35 Td
/F1 12 Tf
(Report Title: ${doc.title}) Tj
0 -22 Td
(Patient Name: John Doe (Patient ID: #PC-8492)) Tj
0 -22 Td
(Attending Physician: ${doc.doctor} | Date: ${doc.date}) Tj
0 -22 Td
(Record Category: ${doc.type}) Tj
0 -40 Td
(Clinical Findings & Summary:) Tj
0 -22 Td
(${doc.content}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000074 00000 n 
0000000120 00000 n 
0000000223 00000 n 
0000000295 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
645
%%EOF`;

    const element = document.createElement("a");
    const file = new Blob([pdfContent], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Medical Document Vault</h2>
        <p className="text-sm text-slate-500 mt-1">Download your medical documents and test results in PDF format.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input type="text" placeholder="Search records..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent border-none focus:outline-hidden text-sm" />
        </div>
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <div>
                <h4 className="font-bold text-slate-800">{doc.title} <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md ml-2">{doc.type}</span></h4>
                <p className="text-xs text-slate-500">Issued by {doc.doctor} on {doc.date}</p>
              </div>
              <button 
                onClick={() => handleDownload(doc)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- AI ASSISTANT VIEW (With Direct Hospital Helpline & Emergency Routing) ---
function AIAssistant() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('pulse_chat_history');
    if (saved) return JSON.parse(saved);
    return [
      { sender: 'ai', text: 'Hello John! I am your PulseCare Clinical Assistant. I am here to help you triage symptoms, check doctor availability, or guide you through your hospital care plan. What is on your mind today?' }
    ];
  });
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('pulse_chat_history', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleClearChat = () => {
    const initialMsg = [{ sender: 'ai', text: 'Hello John! I am your PulseCare Clinical Assistant. I am here to help you triage symptoms, check doctor availability, or guide you through your hospital care plan. What is on your mind today?' }];
    setMessages(initialMsg);
    localStorage.removeItem('pulse_chat_history');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMsg = { sender: 'user', text: userText };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let replyText = "I have noted your details in your patient log. To speak directly with our medical desk for immediate guidance, please call our hospital helpline at **1800-PULSE-CARE**.";

      if (lower.includes('call') || lower.includes('phone') || lower.includes('number') || lower.includes('helpline') || lower.includes('contact')) {
        replyText = "📞 **PulseCare Hospital Direct Contacts:**\n\n• **24/7 Emergency & Ambulance:** 1800-PULSE-SOS (Ext. 9)\n• **General Medical Desk:** 1800-PULSE-CARE (Ext. 1)\n• **Cardiology Helpline:** 1800-PULSE-HEART\n\nYou can also click the **Emergency SOS** button on the top right header for immediate rapid-response dispatch.";
      }
      else if (lower.includes('admit') || lower.includes('admission') || lower.includes('hospitalize') || lower.includes('stay') || lower.includes('inpatient')) {
        replyText = "🏥 **Hospital Admission Guidance:** \n\nFor admission support or bed availability, please call our Admission Desk directly at **1800-PULSE-CARE (Ext. 2)** or report to our Emergency & Trauma Care unit.";
      }
      else if (lower === 'he' || lower === 'hey' || lower.includes('hi') || lower.includes('hello') || lower.includes('good morning') || lower.includes('good evening')) {
        replyText = "Hello John! I'm monitoring your health portal feed. Are you experiencing any specific symptoms today, or would you like to speak with our support desk?";
      } 
      else if (lower.includes('chest') || lower.includes('heart attack') || lower.includes('severe chest pain') || lower.includes('breathless') || lower.includes('unconscious') || lower.includes('stroke') || lower.includes('accident')) {
        replyText = "🚨 **CRITICAL MEDICAL EMERGENCY:** \n\nPlease call our emergency hotline immediately at **1800-PULSE-SOS** or proceed to our Emergency Room instantly. Dr. Sarah Smith's cardiology team has been alerted.";
      } 
      else if (lower.includes('asthma') || lower.includes('wheez') || lower.includes('shortness of breath') || lower.includes('lung') || lower.includes('breathing')) {
        replyText = "Breathing difficulties require urgent care. Please sit upright, use your rescue inhaler, and if symptoms do not ease, call our Pulmonary Care desk at **1800-PULSE-CARE** or use Emergency SOS.";
      }
      else if (lower.includes('blood pressure') || lower.includes('hypertension') || lower.includes('bp')) {
        replyText = "For blood pressure fluctuations, rest quietly and review your dashboard. If readings remain critically high, please call Dr. Sarah Smith's clinic or our medical helpline.";
      }
      else if (lower.includes('muscle') || lower.includes('muscular') || lower.includes('body ache') || lower.includes('body pain') || lower.includes('sore')) {
        replyText = "Muscular soreness often results from overexertion. Rest and hydrate. For physician consultation or physical therapy guidance, please call our Orthopedics department at ext. #402.";
      }
      else if (lower.includes('headache') || lower.includes('dizz') || lower.includes('head') || lower.includes('migraine')) {
        replyText = "Rest in a quiet, dark room and drink water. If migraines recur frequently, please call Neurology to schedule a direct consultation.";
      }
      else if (lower.includes('stomach') || lower.includes('belly') || lower.includes('gastric') || lower.includes('digestion') || lower.includes('vomit') || lower.includes('nausea')) {
        replyText = "Stick to bland foods and electrolyte fluids. If discomfort persists, please call our General Checkup desk to speak with a nurse.";
      }
      else if (lower.includes('skin') || lower.includes('rash') || lower.includes('itch') || lower.includes('allergy')) {
        replyText = "For allergic reactions or skin conditions, please contact our Dermatology clinic directly for an expedited checkup.";
      }
      else if (lower.includes('fever') || lower.includes('cold') || lower.includes('cough') || lower.includes('throat')) {
        replyText = "Stay hydrated and rest well. You can call Dr. Robert Chen's clinic at extension #201 for immediate prescription inquiries.";
      }
      else if (lower.includes('appointment') || lower.includes('book') || lower.includes('schedule') || lower.includes('doctor')) {
        replyText = "You can schedule consultations via the 'Appointments' tab on your sidebar, or call our booking desk at **1800-PULSE-CARE**.";
      }
      else if (lower.includes('prescription') || lower.includes('medication') || lower.includes('medicine')) {
        replyText = "View your care guidelines under the 'Doctor's Advice' tab, or call our hospital pharmacy at extension #505.";
      }
      else if (lower.includes('report') || lower.includes('document') || lower.includes('vault')) {
        replyText = "Your medical records are stored in the 'Document Vault'. For technical record requests, call our IT medical records desk.";
      }

      const aiMsg = { sender: 'ai', text: replyText };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickPrompt = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">AI Health Symptom Assistant</h2>
          <p className="text-sm text-slate-500 mt-0.5">Real-time clinical triage assistant for interactive patient guidance.</p>
        </div>
        <button 
          onClick={handleClearChat}
          className="text-xs font-semibold px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
          title="Start a fresh conversation"
        >
          🔄 New Chat
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[540px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-3.5 border-b border-slate-200 bg-slate-50/80 font-bold text-sm text-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-600" /> PulseAI Clinical Chatbot
          </div>
          <span className="text-[11px] font-normal text-slate-500 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online & Active
          </span>
        </div>

        {/* Scrollable messages area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${m.sender === 'user' ? 'bg-slate-700' : 'bg-cyan-600'}`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-md p-3.5 rounded-2xl text-sm leading-relaxed ${m.sender === 'user' ? 'bg-cyan-600 text-white rounded-tr-xs' : 'bg-slate-100 text-slate-800 rounded-tl-xs'}`}>
                {m.text}
              </div>
            </div>
          ))}

          {/* Real-time Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 text-slate-500 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2">
                <span>PulseAI is analyzing symptoms</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 flex-wrap shrink-0">
          <span className="text-[11px] font-semibold text-slate-500 self-center mr-1">Quick prompts:</span>
          <button onClick={() => handleQuickPrompt("What is the hospital emergency number?")} className="text-xs bg-white border border-slate-200 hover:bg-cyan-50 text-slate-700 px-3 py-1 rounded-full transition cursor-pointer">Helpline Numbers</button>
          <button onClick={() => handleQuickPrompt("I need to admit in the hospital")} className="text-xs bg-white border border-slate-200 hover:bg-cyan-50 text-slate-700 px-3 py-1 rounded-full transition cursor-pointer">Hospital Admission</button>
          <button onClick={() => handleQuickPrompt("I have severe muscular pain")} className="text-xs bg-white border border-slate-200 hover:bg-cyan-50 text-slate-700 px-3 py-1 rounded-full transition cursor-pointer">Muscular Pain</button>
          <button onClick={() => handleQuickPrompt("How do I book an appointment?")} className="text-xs bg-white border border-slate-200 hover:bg-cyan-50 text-slate-700 px-3 py-1 rounded-full transition cursor-pointer">Booking Help</button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex gap-3 bg-white shrink-0">
          <input 
            type="text" 
            placeholder="Type your symptoms or questions here..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            disabled={isTyping}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-hidden disabled:bg-slate-50" 
          />
          <button type="submit" disabled={isTyping} className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition shadow-md shadow-cyan-600/20 shrink-0 text-sm cursor-pointer">
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}

// --- MAIN APP ROUTER COMPONENT ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col pl-64">
          <Navbar />
          <main className="mt-20 p-8 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/advice" element={<DoctorAdvice />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/vault" element={<Vault />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}