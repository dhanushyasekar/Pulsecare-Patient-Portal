import React, { useState, useMemo } from 'react';
import { FileText, Search, Download, ShieldCheck } from 'lucide-react';

export default function Vault() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const documents = [
    { id: 1, title: 'Annual Blood Panel Report', date: '2026-08-14', doctor: 'Dr. Robert Chen', type: 'Lab Result' },
    { id: 2, title: 'Chest X-Ray Scan Results', date: '2026-07-22', doctor: 'Dr. Sarah Smith', type: 'Imaging' },
    { id: 3, title: 'Cardiology Consultation Notes', date: '2026-06-10', doctor: 'Dr. Sarah Smith', type: 'Doctor Notes' },
    { id: 4, title: 'Vaccination Certificate (Tdap)', date: '2026-01-15', doctor: 'Clinic Administration', type: 'Immunization' },
  ];

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, documents]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Medical Document Vault</h2>
        <p className="text-sm text-slate-500 mt-1">Instant record searching utilizing advanced React hooks (`useMemo`).</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {/* Search & Badge row (Fixed layout boundary) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-96 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-cyan-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search records by title, type, or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-hidden text-sm text-slate-700"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2.5 rounded-xl border border-emerald-200 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            End-to-End Encrypted Storage
          </div>
        </div>

        <div className="space-y-3">
          {filteredDocuments.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No matching medical records found.</p>
          ) : (
            filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-100 text-cyan-700 p-3 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{doc.title} <span className="text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md ml-2">{doc.type}</span></h4>
                    <p className="text-xs text-slate-500 mt-0.5">Issued by {doc.doctor} on {doc.date}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}