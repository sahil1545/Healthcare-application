import { Calendar, Clock, Activity, FileText, ArrowRight, Stethoscope, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const userName = user?.name || 'User';

  const stats = [
    {
      icon: <Calendar size={22} />,
      label: 'Upcoming Appointments',
      value: '2',
      color: 'from-blue-400 to-indigo-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: <Activity size={22} />,
      label: 'Health Status',
      value: 'Good',
      color: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: <FileText size={22} />,
      label: 'Lab Reports',
      value: '5',
      color: 'from-violet-400 to-purple-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
  ];

  const appointments = [
    { doctor: 'Dr. Sarah Wilson', spec: 'Cardiologist',     time: 'Oct 24, 2026 — 10:00 AM', status: 'Confirmed', statusColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
    { doctor: 'Dr. Emily Chen',   spec: 'Pediatrician',     time: 'Nov 02, 2026 — 02:30 PM', status: 'Pending',   statusColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
    { doctor: 'Dr. James Smith',  spec: 'Neurologist',      time: 'Nov 15, 2026 — 09:00 AM', status: 'Confirmed', statusColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
            Patient <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            👋 Welcome back, <strong className="text-slate-800 dark:text-slate-200">{userName}</strong>
          </p>
        </div>
        <Link to="/doctors" className="btn-primary text-sm px-6 py-3">
          <Calendar size={16} className="mr-2" />
          New Appointment
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium p-6 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`} />
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.bg} ${stat.iconColor}`}>
              {stat.icon}
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className={`text-3xl font-black mt-1 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/symptom-checker" className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-rose-200 dark:border-rose-800/50 bg-rose-50 dark:bg-rose-900/15 hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-200 hover:shadow-md hover:shadow-rose-200/50 dark:hover:shadow-rose-900/30">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md" style={{ background: 'linear-gradient(135deg, #f43f5e, #f97316)' }}>
            <Stethoscope size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-slate-900 dark:text-white">Check Symptoms</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Get AI-powered diagnosis</p>
          </div>
          <ArrowRight size={18} className="text-rose-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link to="/ai-assistant" className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-900/15 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-200 hover:shadow-md hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Bot size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-slate-900 dark:text-white">AI Assistant</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ask Gemini anything about health</p>
          </div>
          <ArrowRight size={18} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-premium overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Recent Appointments</h2>
          <Link to="/doctors" className="text-sm text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Book New →
          </Link>
        </div>
        <div>
          {appointments.map((apt, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, #6366f1, #8b5cf6)` }}>
                  {apt.doctor.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm">{apt.doctor}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{apt.spec}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm font-semibold">
                <Clock size={14} />
                {apt.time}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${apt.statusColor}`}>
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
