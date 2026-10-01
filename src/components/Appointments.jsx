import React, { useState } from 'react';
import { CalendarCheck, Clock, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Smith', department: 'Cardiology', date: '2026-10-10', time: '10:10 AM', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Robert Chen', department: 'General Checkup', date: '2026-10-05', time: '02:30 PM', status: 'Pending' },
  ]);

  const [form, setForm] = useState({ 
    doctor: 'Dr. Sarah Smith', 
    department: 'Cardiology', 
    date: '', 
    hour: '10', 
    minute: '00', 
    ampm: 'AM' 
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const todayDate = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.date) {
      setError('Please select an appointment date.');
      return;
    }

    let hoursNum = parseInt(form.hour, 10);
    const minsNum = parseInt(form.minute, 10);

    if (form.ampm === 'PM' && hoursNum < 12) hoursNum += 12;
    if (form.ampm === 'AM' && hoursNum === 12) hoursNum = 0;

    if (form.date === todayDate) {
      const now = new Date();
      const selectedTimeMins = hoursNum * 60 + minsNum;
      const currentTimeMins = now.getHours() * 60 + now.getMinutes();

      if (selectedTimeMins <= currentTimeMins) {
        setError('Selected time has already passed for today. Please choose a future time slot.');
        return;
      }
    }

    const formattedTimeStr = `${form.hour}:${form.minute} ${form.ampm}`;
    const newAppt = {
      id: Date.now(),
      doctor: form.doctor,
      department: form.department,
      date: form.date,
      time: formattedTimeStr,
      status: 'Confirmed'
    };

    setAppointments([newAppt, ...appointments]);
    setSubmitted(true);
    setForm({ doctor: 'Dr. Sarah Smith', department: 'Cardiology', date: '', hour: '10', minute: '00', ampm: 'AM' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Appointment Scheduler</h2>
        <p className="text-sm text-slate-500 mt-1">Book and manage consultations with strict date and time validation.</p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">Appointment successfully booked and confirmed!</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span className="text-sm font-semibold">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-cyan-600" />
            Book New Visit
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-sm bg-white"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="General Checkup">General Checkup</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Doctor</label>
              <select
                value={form.doctor}
                onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-sm bg-white"
              >
                <option value="Dr. Sarah Smith">Dr. Sarah Smith (Cardiologist)</option>
                <option value="Dr. Robert Chen">Dr. Robert Chen (General)</option>
                <option value="Dr. Emily Watson">Dr. Emily Watson (Neurologist)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Appointment Date</label>
              <input
                type="date"
                min={todayDate}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Time Slot (Hour : Minute : AM/PM)</label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={form.hour}
                  onChange={(e) => setForm({ ...form, hour: e.target.value })}
                  className="px-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-sm bg-white font-medium"
                >
                  {['01','02','03','04','05','06','07','08','09','10','11','12'].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <select
                  value={form.minute}
                  onChange={(e) => setForm({ ...form, minute: e.target.value })}
                  className="px-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-sm bg-white font-medium"
                >
                  {['00','15','30','45'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select
                  value={form.ampm}
                  onChange={(e) => setForm({ ...form, ampm: e.target.value })}
                  className="px-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden text-sm bg-white font-bold text-cyan-700"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Confirm Booking
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Scheduled Appointments ({appointments.length})</h3>
          <div className="space-y-3">
            {appointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-100 text-cyan-700 p-3 rounded-xl font-bold">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{appt.doctor} <span className="text-xs font-medium text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full ml-2 border border-cyan-200">{appt.department}</span></h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {appt.date} at {appt.time}</span>
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}