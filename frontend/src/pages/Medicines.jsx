import { Search, Pill, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Medicines = () => {
  const [search, setSearch] = useState('');

  const mockMedicines = [
    { id: 1, name: 'Paracetamol 500mg', use: 'Fever & Mild Pain',      dosage: '1 tablet every 6 hours',           sideEffects: ['Nausea', 'Rash'],                type: 'OTC',          color: 'from-emerald-400 to-teal-500',   icon: '💊' },
    { id: 2, name: 'Amoxicillin 250mg', use: 'Bacterial Infections',   dosage: '1 capsule every 8 hours',          sideEffects: ['Diarrhea', 'Upset stomach'],      type: 'Prescription', color: 'from-rose-400 to-pink-500',      icon: '💉' },
    { id: 3, name: 'Ibuprofen 400mg',   use: 'Inflammation & Pain',    dosage: '1 tablet every 8 hours with food', sideEffects: ['Heartburn', 'Dizziness'],         type: 'OTC',          color: 'from-blue-400 to-indigo-500',    icon: '💊' },
    { id: 4, name: 'Omeprazole 20mg',   use: 'Acid Reflux & Ulcers',   dosage: '1 capsule daily before a meal',    sideEffects: ['Headache', 'Abdominal pain'],    type: 'OTC',          color: 'from-amber-400 to-orange-500',   icon: '💊' },
    { id: 5, name: 'Loratadine 10mg',   use: 'Allergies & Hay Fever',  dosage: '1 tablet daily',                   sideEffects: ['Drowsiness', 'Dry mouth'],        type: 'OTC',          color: 'from-violet-400 to-purple-500',  icon: '💊' },
    { id: 6, name: 'Azithromycin 500mg',use: 'Chest Infections',       dosage: '1 tablet daily for 3 days',        sideEffects: ['Vomiting', 'Loss of appetite'],   type: 'Prescription', color: 'from-cyan-400 to-sky-500',       icon: '💉' },
  ];

  const filtered = mockMedicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.use.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
            Medicine <span className="gradient-text">Directory</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Search for medicines, dosages, and side effects</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search treatments or drugs..."
            className="input-premium pl-10 w-full md:w-80 text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((med, i) => (
            <motion.div
              key={med.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="card-premium card-glow group"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${med.color} rounded-t-3xl`} />

              <div className="p-6 relative z-10">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${med.color} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    {med.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    med.type === 'OTC'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/40'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-200 dark:border-rose-700/40'
                  }`}>
                    {med.type === 'OTC' ? '✓ Over-the-Counter' : '⚕ Prescription'}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">{med.name}</h3>
                <p className={`text-sm font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${med.color}`}>{med.use}</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-200">
                      <strong className="font-bold">Dosage:</strong> {med.dosage}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-700/20">
                    <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-200">
                      <strong className="font-bold">Side Effects:</strong> {med.sideEffects.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400 text-3xl">
            🔍
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">No medicines found</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">We couldn't find anything matching "<span className="text-indigo-500">{search}</span>"</p>
        </div>
      )}
    </div>
  );
};

export default Medicines;
