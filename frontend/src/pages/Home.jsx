import { motion } from 'framer-motion';
import { ArrowRight, Activity, CalendarDays, Bot, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: "Top Specialists",
      desc: "Access the best doctors across multiple specialties — cardiologists, neurologists, and more.",
      icon: <Activity size={28} />,
      color: "from-rose-500 to-pink-500",
      bg: "bg-rose-50 dark:bg-rose-900/20",
      iconBg: "bg-rose-100 dark:bg-rose-900/40 text-rose-500 dark:text-rose-400",
    },
    {
      title: "Instant Booking",
      desc: "No more waiting on hold. Real-time slot availability with instant confirmation.",
      icon: <CalendarDays size={28} />,
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500 dark:text-indigo-400",
    },
    {
      title: "Gemini AI Health Chat",
      desc: "Get immediate triage, medicine advice and personalized insights from our smart AI.",
      icon: <Bot size={28} />,
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-500 dark:text-emerald-400",
    },
  ];

  const stats = [
    { value: "500+", label: "Verified Doctors" },
    { value: "50K+", label: "Happy Patients" },
    { value: "99.9%", label: "Uptime Guaranteed" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <div className="flex flex-col gradient-bg-hero">
      {/* ===== HERO SECTION ===== */}
      <section className="relative flex flex-col items-center text-center space-y-8 py-20 px-4 overflow-hidden">
        {/* Floating blobs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-bold border border-indigo-200 dark:border-indigo-700/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span>Powered by Google Gemini AI</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-tight text-slate-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Your Health,{' '}
          <br className="hidden md:block" />
          <span className="gradient-text">Reimagined</span>
        </motion.h1>

        <motion.p
          className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Book expert doctors, get smart AI medicine recommendations, and manage your medical journey — all in one beautiful platform.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/doctors" className="btn-primary text-base px-8 py-4 group w-full sm:w-auto">
            Find Doctors
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link
            to="/ai-assistant"
            className="btn-outline text-base px-8 py-4 w-full sm:w-auto dark:text-indigo-300 dark:border-indigo-500/40 dark:hover:bg-indigo-900/20"
          >
            <Bot className="mr-2" size={20} />
            Ask AI Assistant
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-slate-500 dark:text-slate-400"
        >
          <span className="flex items-center gap-1.5 font-medium"><Shield size={15} className="text-emerald-500" /> HIPAA Compliant</span>
          <span className="flex items-center gap-1.5 font-medium"><Zap size={15} className="text-amber-500" /> Instant Results</span>
          <span className="flex items-center gap-1.5 font-medium"><Bot size={15} className="text-indigo-500" /> Gemini Powered</span>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-6 bg-white dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm"
            >
              <p className="text-3xl font-black gradient-text">{stat.value}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-12 px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            Everything you need, <span className="gradient-text">in one place</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-xl mx-auto">
            WellnessHub combines expert care and cutting-edge AI for a seamless health experience.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`card-premium card-glow p-8 group cursor-default`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
              <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-500`} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
