import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { demoData, loginAs } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

const Login = ({ onLogin }) => {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const foundUser = demoData.users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      loginAs(foundUser.id);
      onLogin();
    } else {
      setError(t('auth.invalid'));
    }
  };

  return (
    <>
      <SEO
        title="تسجيل الدخول"
        description="سجل دخولك إلى دليل الحرفيين للوصول إلى أفضل الحرفيين الموثقين في مصر."
        url="https://dalil-marketing.vercel.app/login"
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="auth-page h-screen w-full flex flex-col justify-center items-center px-8 relative overflow-hidden bg-[var(--bg-color)] text-[var(--text-primary)]"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="flex flex-col items-center text-center space-y-4 relative z-10 mb-8 w-full max-w-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-[var(--surface-color)] rounded-[24px] flex items-center justify-center shadow-xl border border-slate-100 dark:border-white/5"
        >
          <img src="/favicon.png" alt="شعار دليل الحرفيين" className="w-8 h-8 object-contain" />
        </motion.div>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">{t('login')}</h1>
          <p className="text-[var(--text-secondary)] font-bold text-[10px] px-10 leading-relaxed uppercase tracking-widest opacity-60">
            {t('auth.loginDesc')}
          </p>
        </div>
      </div>

      <div className="space-y-6 relative z-10 w-full max-w-sm mx-auto">
        <form onSubmit={handleLogin} className="space-y-4 bg-[var(--surface-color)] p-6 rounded-[32px] shadow-2xl border border-[var(--border-color)]">
          <div className="space-y-3">
            <div className="relative group">
              <Mail size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'البريد الإلكتروني أو رقم الهاتف' : 'Email or Phone Number'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-xl ps-10 pe-4 outline-none transition-all text-xs font-bold text-[var(--text-primary)] shadow-inner"
                required
              />
            </div>

            <div className="relative group">
              <Lock size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-30 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-xl ps-10 pe-4 outline-none transition-all text-xs font-bold text-[var(--text-primary)] shadow-inner"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 text-red-500 p-2 rounded-lg flex items-center gap-2 text-[9px] font-black border border-red-500/20"
            >
              <AlertCircle size={12} />
              <span>{error}</span>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full h-12 bg-primary text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all mt-2"
          >
            <span>{t('login')}</span>
            <LogIn size={18} />
          </motion.button>
        </form>

        <div className="flex flex-col items-center gap-2">
          <p className="text-[var(--text-secondary)] text-xs font-bold">
            {t('auth.noAccount')}
            <span onClick={() => navigate('/register')} className="text-primary font-black cursor-pointer hover:underline ms-1"> {t('register')}</span>
          </p>

          <button
            onClick={() => {
              setEmail('client.male@example.com');
              setPassword('123');
            }}
            className="text-[9px] font-black text-[var(--text-secondary)] opacity-30 uppercase tracking-[0.2em] hover:text-primary transition-colors mt-2"
          >
            {t('auth.demoLogin')}
          </button>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Login;
