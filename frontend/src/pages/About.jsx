import { HeartPulse, ShieldCheck, Users, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: <ShieldCheck size={36} />,
      title: 'Verified Excellence',
      desc: 'Every doctor on our platform is thoroughly vetted, ensuring you receive the highest standard of medical care from licensed professionals.',
      color: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: <Users size={36} />,
      title: 'Patient First',
      desc: 'We put privacy and convenience first, allowing you to instantly book appointments and chat with our encrypted medical intelligence model.',
      color: 'from-blue-400 to-indigo-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: <Sparkles size={36} />,
      title: 'AI-Powered Insights',
      desc: 'Powered by Google Gemini, our AI provides real-time health analysis, symptom checking, and personalized medical guidance.',
      color: 'from-violet-400 to-purple-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
  ];

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex justify-center items-center w-24 h-24 rounded-[2rem] text-white shadow-glow-indigo mb-4 animate-float"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <HeartPulse size={44} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white"
        >
          Transforming <span className="gradient-text">Healthcare</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          WellnessHub is a next-generation healthcare platform that seamlessly connects patients with top-tier medical professionals while providing advanced AI-powered health insights.
        </motion.p>
      </div>

      {/* Values Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="card-premium card-glow p-8 group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${v.bg} ${v.iconColor} group-hover:scale-110 transition-transform duration-300`}>
              {v.icon}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">{v.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{v.desc}</p>
            <div className={`mt-6 h-1 w-10 rounded-full bg-gradient-to-r ${v.color} group-hover:w-full transition-all duration-500`} />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden p-14"
        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #0c4a6e)' }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />

        <div className="relative z-10">
          <p className="text-indigo-300 font-bold text-sm uppercase tracking-widest mb-4">Get Started Today</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to take control of <br className="hidden md:block" /> your health?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-black px-8 py-4 rounded-xl transition-all shadow-xl hover:-translate-y-0.5 text-base"
          >
            Join WellnessHub Today
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
