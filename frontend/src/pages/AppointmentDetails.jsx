import { CheckCircle, Calendar, Clock, Video, FileText, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const AppointmentDetails = () => {
  const location = useLocation();
  const selectedDoctor = location.state?.doctor;

  const details = {
    doctorName: selectedDoctor ? selectedDoctor.name : 'Dr. Sarah Wilson',
    specialty: selectedDoctor ? selectedDoctor.spec : 'Cardiologist',
    date: 'Oct 24, 2026',
    time: '10:00 AM - 10:30 AM',
    meetingLink: 'https://zoom.us/j/1234567890',
    recommendation: 'Please ensure you have your recent medical reports and history ready before the call. Ensure a stable internet connection for the video consultation.',
    status: 'Confirmed',
    color: selectedDoctor?.color || 'from-emerald-400 to-teal-500',
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* Back link */}
      <Link to="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to Doctors
      </Link>

      <motion.div
        initial={{ scale: 0.97, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700/60 overflow-hidden"
      >
        {/* Success Header */}
        <div className="relative p-10 text-center text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-8 -translate-x-8" />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/25 rounded-full mb-4"
            >
              <CheckCircle size={40} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-black mb-2">Appointment Confirmed!</h1>
            <p className="text-emerald-100 text-lg font-medium">Your consultation has been successfully scheduled.</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Doctor Info */}
          <div className="flex items-center gap-5 pb-7 border-b border-slate-100 dark:border-slate-700">
            {selectedDoctor?.img ? (
              <img src={selectedDoctor.img} alt={details.doctorName} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <User size={32} className="text-slate-500" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{details.doctorName}</h2>
              <span className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-extrabold text-white bg-gradient-to-r ${details.color}`}>
                {details.specialty}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  ✓ {details.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/15 border border-indigo-100 dark:border-indigo-800/40">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">Scheduled Date</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">{details.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-violet-50 dark:bg-violet-900/15 border border-violet-100 dark:border-violet-800/40">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-violet-500 dark:text-violet-400 uppercase tracking-wider mb-1">Time Slot</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">{details.time}</p>
              </div>
            </div>

            <div className="md:col-span-2 flex items-start gap-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-800/40">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
                <Video size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-1">Virtual Meeting Link</p>
                <a
                  href={details.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-bold text-blue-700 dark:text-blue-300 hover:underline break-all"
                >
                  {details.meetingLink}
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Join 5 minutes before the scheduled time.</p>
              </div>
            </div>
          </div>

          {/* Doctor's Note */}
          <div className="bg-amber-50 dark:bg-amber-900/15 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/40">
            <h3 className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-extrabold mb-3">
              <FileText size={18} />
              Doctor's Preparation Note
            </h3>
            <p className="text-amber-900 dark:text-amber-300 leading-relaxed font-medium">
              {details.recommendation}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/dashboard"
              className="flex-1 px-6 py-3.5 text-center font-bold rounded-xl transition-all text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/doctors"
              className="flex-1 btn-primary py-3.5 text-sm"
            >
              Browse More Doctors
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentDetails;
