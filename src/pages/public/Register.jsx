import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { loginAs } from '../../data';
import { crafts } from '../../data/crafts';
import { User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

const Register = ({ onRegister }) => {
  const { t, lang } = useLanguage();
  const [role, setRole] = useState('client');
  const [selectedCraft, setSelectedCraft] = useState(crafts[0]?.id || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }

    const newUser = {
      id: 'u_' + Date.now(),
      name,
      email,
      password,
      role,
      craftId: role === 'craftsman' ? selectedCraft : null,
      balance: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      image: role === 'client'
        ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
        : 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop'
    };

    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(existingUsers));

    // Persist role immediately so reload will route to correct interface
    localStorage.setItem('userRole', role);
    // call login helper to set userId/token and reload
    loginAs(newUser.id);
  };

  return (
    <>
      <SEO
        title="إنشاء حساب"
        description="أنشئ حسابك في دليل الحرفيين الآن لتتمكن من العثور على أفضل الحرفيين الموثقين أو تقديم خدماتك كحرفي."
        url="https://dalil-marketing.vercel.app/register"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="auth-page h-screen w-full flex flex-col justify-center items-center px-8 relative overflow-hidden bg-[var(--bg-color)] text-[var(--text-primary)]"
      >
        {/* Background Decorative Blurs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

        <div className="flex flex-col items-center text-center space-y-3 relative z-10 mb-6 w-full max-w-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-[var(--surface-color)] rounded-[24px] flex items-center justify-center shadow-xl border border-slate-100 dark:border-white/5"
          >
            <img src="/favicon.png" alt="شعار دليل الحرفيين" className="w-8 h-8 object-contain" />
          </motion.div>
          <div className="space-y-0.5">
            <h1 className="text-3xl font-black tracking-tight">{t('register')}</h1>
            <p className="text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest opacity-60">{t('auth.registerDesc')}</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10 w-full max-w-sm mx-auto">
          <div className="flex bg-[var(--surface-color)] p-1 rounded-xl border border-[var(--border-color)] shadow-inner">
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-black transition-all text-[10px] ${role === 'client' ? 'bg-primary text-white shadow-md' : 'text-[var(--text-secondary)] opacity-60'}`}
              onClick={() => setRole('client')}
            >
              <User size={14} />
              <span>{t('auth.client')}</span>
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-black transition-all text-[10px] ${role === 'craftsman' ? 'bg-primary text-white shadow-md' : 'text-[var(--text-secondary)] opacity-60'}`}
              onClick={() => setRole('craftsman')}
            >
              <Briefcase size={14} />
              <span>{t('auth.craftsman')}</span>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-3 bg-[var(--surface-color)] p-6 rounded-[32px] shadow-2xl border border-[var(--border-color)]">
            <div className="space-y-3">
              <div className="relative group">
                <User size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder={t('auth.fullName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-xl ps-10 pe-4 outline-none transition-all font-bold text-xs text-[var(--text-primary)] shadow-inner"
                  required
                />
              </div>

              <div className="relative group">
                <Mail size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'البريد الإلكتروني أو رقم الهاتف' : 'Email or Phone Number'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-xl ps-10 pe-4 outline-none transition-all font-bold text-xs text-[var(--text-primary)] shadow-inner"
                  required
                />
              </div>

              {role === 'craftsman' && (
                <div className="relative group">
                  <label className="text-[var(--text-secondary)] text-[10px] font-black mb-1 block">{lang === 'ar' ? 'اختر حرفتك' : 'Select your craft'}</label>
                  <select
                    value={selectedCraft}
                    onChange={(e) => setSelectedCraft(e.target.value)}
                    className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-xl ps-4 pe-4 outline-none transition-all font-bold text-xs text-[var(--text-primary)] shadow-inner"
                  >
                    {crafts.map((c) => (
                      <option key={c.id} value={c.id}>
                        {lang === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="relative group">
                <Lock size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder={t('auth.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-xl ps-10 pe-4 outline-none transition-all font-bold text-xs text-[var(--text-primary)] shadow-inner"
                  required
                />
              </div>

              <div className="relative group">
                <Lock size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder={t('auth.confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-xl ps-10 pe-4 outline-none transition-all font-bold text-xs text-[var(--text-primary)] shadow-inner"
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-[10px] font-bold text-center"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-12 bg-primary text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30 mt-2"
            >
              <span>{t('register')}</span>
              <ArrowRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
            </motion.button>
          </form>

          <div className="text-center">
            <p className="text-[var(--text-secondary)] text-xs font-bold">
              {t('auth.hasAccount')}
              <span onClick={() => navigate('/login')} className="text-primary font-black cursor-pointer hover:underline ms-1"> {t('login')}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Register;
