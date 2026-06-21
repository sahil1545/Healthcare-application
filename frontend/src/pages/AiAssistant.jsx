import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! 👋 I am your **Wellness AI**, powered by Google Gemini. Ask me anything about medicines, symptoms, or general health questions. Remember — I provide general information, not a substitute for professional medical advice.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    const newChat = [...messages, { role: 'user', content: userMsg }];
    setMessages(newChat);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', { message: userMsg });
      setMessages([...newChat, { role: 'assistant', content: res.data.reply }]);
    } catch (e) {
      setMessages([...newChat, { role: 'assistant', content: '⚠️ Sorry, I am having trouble connecting. Please make sure you are logged in and the server is running.' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What is Aspirin used for?",
    "Side effects of Ibuprofen?",
    "How to treat a fever at home?",
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white shadow-glow-indigo mb-4 animate-float"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          <Bot size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          Wellness <span className="gradient-text">AI Assistant</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Powered by Google Gemini — your intelligent health companion
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white dark:bg-slate-800/80 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/60 overflow-hidden flex flex-col h-[65vh]">
        {/* Chat Header Bar */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))' }}>
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="font-bold text-slate-800 dark:text-white text-sm">Wellness AI · Online</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">
            <Sparkles size={12} />
            <span>Gemini Powered</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2.5 max-w-[82%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    ${m.role === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium
                    ${m.role === 'user'
                      ? 'text-white rounded-br-none shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700/80 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-600/50'}
                  `}
                    style={m.role === 'user' ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' } : {}}>
                    {m.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400">
                  <Bot size={14} />
                </div>
                <div className="bg-slate-100 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600/50 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1.5 items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60">
          {/* Quick suggestions (only when 1 message = just greeting) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-semibold"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about a medicine, symptom, or health topic..."
              className="input-premium flex-1 text-sm"
            />
            <button
              disabled={loading || !input.trim()}
              type="submit"
              className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minWidth: '48px' }}
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
            <Info size={11} /> General health information only — not a substitute for professional advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
