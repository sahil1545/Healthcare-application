import { Star, Clock, Video, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Doctors = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const mockDoctors = [
    { id: 1,  name: 'Dr. Sarah Wilson',   spec: 'Cardiologist',      img: 'https://i.pravatar.cc/150?img=1',  rating: 4.9, exp: '10 Yrs', color: 'from-rose-400 to-pink-500' },
    { id: 2,  name: 'Dr. James Smith',    spec: 'Neurologist',        img: 'https://i.pravatar.cc/150?img=11', rating: 4.8, exp: '15 Yrs', color: 'from-indigo-400 to-blue-500' },
    { id: 3,  name: 'Dr. Emily Chen',     spec: 'Pediatrician',       img: 'https://i.pravatar.cc/150?img=5',  rating: 4.7, exp: '8 Yrs',  color: 'from-emerald-400 to-teal-500' },
    { id: 4,  name: 'Dr. Michael Brown',  spec: 'General Physician',  img: 'https://i.pravatar.cc/150?img=8',  rating: 4.6, exp: '12 Yrs', color: 'from-violet-400 to-purple-500' },
    { id: 5,  name: 'Dr. Robert Davis',   spec: 'Orthopedist',        img: 'https://i.pravatar.cc/150?img=60', rating: 4.9, exp: '20 Yrs', color: 'from-amber-400 to-orange-500' },
    { id: 6,  name: 'Dr. Lisa Taylor',    spec: 'Dermatologist',      img: 'https://i.pravatar.cc/150?img=43', rating: 4.8, exp: '9 Yrs',  color: 'from-cyan-400 to-sky-500' },
    { id: 7,  name: 'Dr. William Moore',  spec: 'Psychiatrist',       img: 'https://i.pravatar.cc/150?img=52', rating: 4.5, exp: '14 Yrs', color: 'from-blue-400 to-indigo-500' },
    { id: 8,  name: 'Dr. Karen White',    spec: 'Gynecologist',       img: 'https://i.pravatar.cc/150?img=44', rating: 4.9, exp: '18 Yrs', color: 'from-pink-400 to-rose-500' },
    { id: 9,  name: 'Dr. Daniel Harris',  spec: 'Ophthalmologist',    img: 'https://i.pravatar.cc/150?img=68', rating: 4.7, exp: '11 Yrs', color: 'from-teal-400 to-emerald-500' },
    { id: 10, name: 'Dr. Nancy Clark',    spec: 'Endocrinologist',    img: 'https://i.pravatar.cc/150?img=32', rating: 4.8, exp: '16 Yrs', color: 'from-fuchsia-400 to-violet-500' },
    { id: 11, name: 'Dr. Edward Lewis',   spec: 'ENT Specialist',     img: 'https://i.pravatar.cc/150?img=53', rating: 4.6, exp: '7 Yrs',  color: 'from-lime-400 to-green-500' },
    { id: 12, name: 'Dr. Jessica Walker', spec: 'Gastroenterologist', img: 'https://i.pravatar.cc/150?img=21', rating: 4.9, exp: '13 Yrs', color: 'from-orange-400 to-amber-500' },
  ];

  const filtered = mockDoctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.spec.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
            Find your <span className="gradient-text">Doctor</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Book appointments with top specialists instantly</p>
        </div>
        <div className="relative">
          <svg className="absolute left-3.5 top-3.5 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="input-premium pl-10 w-72 text-sm"
          />
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-premium card-glow group"
          >
            {/* Gradient top bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${doc.color} rounded-t-3xl`} />

            <div className="p-6 relative z-10">
              {/* Doctor Info */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-800 shadow" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{doc.name}</h3>
                  <p className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${doc.color}`}>{doc.spec}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-semibold">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span>{doc.exp} exp</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-5">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/25 border border-emerald-200 dark:border-emerald-700/40 px-2.5 py-1 rounded-full">
                  <Video size={11} /> Virtual
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/25 border border-blue-200 dark:border-blue-700/40 px-2.5 py-1 rounded-full">
                  <Clock size={11} /> Available Today
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/25 border border-violet-200 dark:border-violet-700/40 px-2.5 py-1 rounded-full">
                  <CheckCircle size={11} /> Verified
                </span>
              </div>

              {/* Book Button */}
              <button
                onClick={() => {
                  toast.success(`Appointment confirmed with ${doc.name}!`);
                  navigate('/appointment-details', { state: { doctor: doc } });
                }}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-r ${doc.color}`}
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">No doctors found</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Try a different name or specialty</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;
