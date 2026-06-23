import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, ChevronLeft, Bell, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === '/' || location.pathname === '/crafts' || location.pathname === '/chat' || location.pathname === '/account';

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return t('nav.home');
    if (path === '/crafts') return t('crafts.title');
    if (path === '/craftsmen') return t('craftsmen.title');
    if (path === '/chat') return t('chat.title');
    if (path === '/account') return t('account.title');
    if (path === '/notifications') return t('nav.notifications') || 'التنبيهات';
    if (path.includes('/payment')) return t('payment.title');
    if (path.includes('/order/')) return t('order.details');
    if (path.includes('/craftsman/')) return t('craftsmen.profile');
    if (path.includes('/settings/')) return t('account.settings');
    if (path.includes('/request/new')) return t('request.newTitle');
    if (path.includes('/chat/')) return t('chat.chatDetail');
    if (path === '/proposals') return t('nav.jobs');
    if (path === '/active-jobs') return t('nav.jobs');
    if (path === '/reviews') return t('nav.support');
    if (path === '/terms') return t('nav.support');
    return '';
  };

  const notificationCount = JSON.parse(localStorage.getItem('demo_notifications') || '[]').length;

  return (
    <header className="glass sticky top-0 w-full h-20 flex justify-between items-center px-8 z-[1000] border-b border-white/10 shadow-sm">
      {/* Left: Logo/Back */}
      <div className="flex-1 flex justify-start items-center gap-4">
        <AnimatePresence mode="wait">
          {isMainPage ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <img src="/favicon.png" alt="Logo" className="w-7 h-7 object-contain brightness-0 invert" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="w-11 h-11 rounded-[18px] bg-[var(--surface-color)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] shadow-md hover:border-primary/50 transition-all"
              >
                <ChevronLeft size={22} className={lang === 'ar' ? 'rotate-180' : ''} />
              </motion.button>
              <h1 className="font-black text-xl text-[var(--text-primary)] tracking-tight truncate max-w-[150px]">{getPageTitle()}</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Middle: Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-12">
        {[
          { path: '/', label: t('nav.home') },
          { path: '/crafts', label: t('crafts.title') },
          { path: '/chat', label: t('chat.title') },
          { path: '/account', label: t('account.title') },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative py-2 text-sm font-black transition-all ${location.pathname === item.path ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
          >
            {item.label}
            {location.pathname === item.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full shadow-sm shadow-primary/30"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex-1 flex justify-end items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/notifications')}
          className="relative w-11 h-11 rounded-2xl bg-[var(--surface-color)] border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center shadow-sm hover:border-primary/30 transition-all"
        >
          <Bell size={20} className="text-[var(--text-secondary)]" />
          {notificationCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--surface-color)] shadow-sm" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLang}
          className="px-3 h-11 rounded-2xl bg-[var(--surface-color)] border-[var(--border-color)] text-primary font-black text-[10px] tracking-widest shadow-sm hover:border-primary/30 transition-all"
        >
          {lang === 'ar' ? 'EN' : 'AR'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="w-11 h-11 rounded-2xl bg-[var(--surface-color)] border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center shadow-sm hover:border-primary/30 transition-all"
        >
          {theme === 'light' ? <Moon size={20} className="text-slate-400" /> : <Sun size={20} className="text-amber-400" />}
        </motion.button>

        <button onClick={() => navigate('/request/new')} className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-sm">
          <Plus size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;

