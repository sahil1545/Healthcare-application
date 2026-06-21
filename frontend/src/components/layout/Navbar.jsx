import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, Menu, X, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userInfo');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `relative font-semibold text-sm transition-colors duration-200 pb-0.5
    ${isActive(path)
      ? 'text-indigo-600 dark:text-indigo-400'
      : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="p-2 rounded-xl text-white shadow-glow-indigo transition-transform group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <HeartPulse size={22} />
            </div>
            <span className="text-xl font-extrabold tracking-tight gradient-text">
              WellnessHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/about" className={navLinkClass('/about')}>About</Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
                <Link to="/doctors" className={navLinkClass('/doctors')}>Doctors</Link>
                <Link to="/medicines" className={navLinkClass('/medicines')}>Medicines</Link>
                <Link to="/ai-assistant" className={navLinkClass('/ai-assistant')}>AI Assistant</Link>
                <Link
                  to="/symptom-checker"
                  className={`flex items-center px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200
                    ${isActive('/symptom-checker')
                      ? 'bg-rose-500 text-white shadow-glow-rose'
                      : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white'}`}
                >
                  🩺 Symptoms
                </Link>
              </>
            )}

            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-700 pl-5">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-sm px-5 py-2.5"
                  >
                    Sign Up Free
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <UserIcon size={16} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass flex flex-col py-5 px-5 space-y-3 shadow-xl border-t border-slate-200 dark:border-slate-700 rounded-b-2xl">
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1">About Us</Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1">Dashboard</Link>
                <Link to="/doctors" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1">Find Doctors</Link>
                <Link to="/medicines" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1">Medicines</Link>
                <Link to="/ai-assistant" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1">AI Assistant</Link>
                <Link to="/symptom-checker" onClick={() => setIsOpen(false)} className="text-base font-bold text-rose-600 dark:text-rose-400 py-1">🩺 Check Symptoms</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1">Profile</Link>
              </>
            )}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-700 dark:text-slate-200">Sign In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-sm w-full">Sign Up Free</Link>
                </>
              ) : (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-base font-bold text-rose-500 hover:text-rose-400">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
