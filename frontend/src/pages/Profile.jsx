import { useState, useEffect } from 'react';
import { User, Mail, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', role: '', specialization: '' });

  useEffect(() => {
    // In a real app, fetch from /api/auth/me or pull from Context
    const savedInfo = localStorage.getItem('userInfo');
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      setProfile({
        name: parsed.name || '',
        email: parsed.email || '',
        role: parsed.role || 'Patient',
        specialization: parsed.specialization || ''
      });
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Profile</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">Manage your personal information and preferences.</p>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
        <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
          <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl font-bold">
            {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={40} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{profile.name || 'Set your name'}</h2>
            <div className="flex items-center mt-2 space-x-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium flex items-center">
                <Shield size={14} className="mr-1" />
                {profile.role || 'User'}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
               <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white transition-all" />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                 <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="pl-10 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white transition-all" />
               </div>
            </div>
            {profile.role === 'Doctor' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Specialization</label>
                <input type="text" value={profile.specialization} onChange={e => setProfile({...profile, specialization: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white transition-all" placeholder="e.g. Cardiologist" />
              </div>
            )}
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl shadow-md transition-colors">
              <Save size={18} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
