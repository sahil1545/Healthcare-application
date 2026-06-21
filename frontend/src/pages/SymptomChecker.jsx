import { useState } from 'react';
import { Activity, Stethoscope, AlertCircle, ArrowRight, Loader, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/predict', { symptoms });
      setResult(res.data);
    } catch (err) {
      setError('Our AI engine failed to analyze the symptoms. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const exampleSymptoms = [
    "Severe headache, nausea, light sensitivity",
    "Chest pain, shortness of breath, fatigue",
    "Rash, itching, watery eyes",
    "Fever, cough, sore throat",
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] text-white shadow-glow-rose mb-6 animate-float"
          style={{ background: 'linear-gradient(135deg, #f43f5e, #f97316)' }}>
          <Activity size={38} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          AI <span className="gradient-text-warm">Symptom Checker</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Describe your symptoms in detail. Our Gemini-powered AI will predict potential conditions and connect you with the right specialist.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white dark:bg-slate-800/80 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/60 overflow-hidden mb-8">
        {/* Card Header */}
        <div className="px-8 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.06), rgba(249,115,22,0.04))' }}>
          <Sparkles size={16} className="text-rose-500" />
          <span className="text-sm font-bold text-rose-700 dark:text-rose-400">Gemini AI Analysis</span>
        </div>

        <form onSubmit={handlePredict} className="p-8">
          <label className="block text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3 uppercase tracking-wider">
            What are you experiencing?
          </label>
          <textarea
            rows="5"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="input-premium resize-none text-base"
            placeholder="e.g. I have a severe headache, nausea, and sensitivity to light that started 2 hours ago."
          />

          {/* Quick Examples */}
          <div className="mt-4 mb-6">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Quick Examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleSymptoms.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSymptoms(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-600 transition-colors font-semibold"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading || !symptoms.trim()}
              type="submit"
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 text-base gap-2"
              style={{ background: loading || !symptoms.trim() ? undefined : 'linear-gradient(135deg, #f43f5e, #f97316)' }}
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Stethoscope size={20} />}
              <span>{loading ? 'Analyzing Symptoms...' : 'Run AI Analysis'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 p-5 rounded-2xl text-center font-semibold border border-rose-200 dark:border-rose-800/50"
          >
            ⚠️ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Possible Conditions */}
            <div className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/60 p-8 shadow-md">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <AlertCircle className="text-amber-500" size={22} />
                <span>Possible Conditions</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {(result.conditions || []).map((cond, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-bold border"
                    style={{
                      background: `hsl(${230 + i * 30}, 80%, 96%)`,
                      color: `hsl(${230 + i * 30}, 70%, 40%)`,
                      borderColor: `hsl(${230 + i * 30}, 60%, 88%)`,
                    }}
                  >
                    {cond}
                  </span>
                ))}
              </div>
            </div>

            {/* Specialist */}
            <div className="rounded-3xl p-8 text-white shadow-glow-indigo relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10" />
              <div className="relative z-10">
                <p className="text-indigo-100 text-sm font-bold mb-2 uppercase tracking-wider">Recommended Specialist</p>
                <p className="text-4xl font-black mb-5 text-white">{result.specialist || 'General Physician'}</p>
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-6 py-3 rounded-xl transition-all shadow-md"
                >
                  Find a {result.specialist || 'Doctor'}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Advice */}
            <div className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/60 p-8 shadow-md">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-emerald-500" size={22} />
                <span>Immediate Advice</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium text-base">{result.advice}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-5 italic border-t border-slate-100 dark:border-slate-700 pt-4">
                * Disclaimer: This is an AI prediction, not a certified medical diagnosis. Always consult a licensed physician.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SymptomChecker;
