import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import { Sun, Moon, Globe, LogIn, UserPlus, Info, Phone, Home, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PublicHeader = () => {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isRtl = lang === 'ar';
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  const navItems = [
    { path: '/', label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: <Home size={18} /> },
    { path: '/about', label: lang === 'ar' ? 'من نحن' : 'About', icon: <Info size={18} /> },
    { path: '/contact', label: lang === 'ar' ? 'تواصل معنا' : 'Contact', icon: <Phone size={18} /> },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 inset-x-0 h-20 z-[1000] transition-all duration-300 ${isAuthPage ? 'bg-transparent' : 'glass border-b border-[var(--glass-border)] shadow-lg'} px-4 md:px-8 flex justify-between items-center`}>
      {/* Left: Logo or Back */}
      <div className="flex items-center gap-4">
        {isAuthPage ? (
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-[var(--surface-color)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:bg-primary/5 shadow-sm transition-all"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
        ) : (
          <div
            className="flex items-center gap-3 cursor-pointer group relative z-[1001]"
            onClick={() => handleNavigate('/')}
          >
            <div className="w-16 h-16 bg-[var(--surface-color)] rounded-[24px] flex items-center justify-center shadow-xl border border-[var(--border-color)]">
              <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="font-black text-lg text-[var(--text-primary)] tracking-tight hidden sm:block">
              {t('nav.brand')}
            </span>
          </div>
        )}
      </div>

      {/* Middle: Navigation Links (Desktop) - Hidden on Auth Pages */}
      {!isAuthPage && (
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`text-sm font-black uppercase tracking-widest transition-all relative py-2 ${location.pathname === item.path ? 'text-primary' : 'text-[var(--text-secondary)] opacity-50 hover:opacity-100'}`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div layoutId="public-nav-indicator" className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4 relative z-[1001]">
        {/* Lang Toggle */}
        <button
          onClick={toggleLang}
          className="w-10 h-10 sm:w-auto sm:px-4 h-11 rounded-xl flex items-center justify-center shadow-sm transition-all gap-2 border bg-[var(--surface-color)] border-[var(--border-color)] text-[var(--text-primary)] hover:bg-primary/5"
        >
          <Globe size={18} />
          <span className="text-[10px] font-black uppercase hidden sm:block">{lang === 'ar' ? 'English' : 'عربي'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all border bg-[var(--surface-color)] border-[var(--border-color)] text-[var(--text-primary)] hover:bg-primary/5 shadow-sm"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Auth Buttons or Mobile Menu */}
        {!isAuthPage ? (
          <>
            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => handleNavigate('/login')}
                className="text-sm font-black text-[var(--text-secondary)] hover:text-primary transition-colors px-4 py-2"
              >
                {t('login')}
              </button>
              <button
                onClick={() => handleNavigate('/register')}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-xl shadow-primary/30 hover:scale-105 transition-transform flex items-center gap-2"
              >
                <UserPlus size={16} />
                <span className="uppercase tracking-widest">{t('register')}</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        ) : null}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {!isAuthPage && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 inset-x-0 bg-[var(--surface-color)] border-b border-[var(--border-color)] p-6 md:hidden flex flex-col gap-6 shadow-2xl z-[1000]"
          >
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-4 text-sm font-black uppercase tracking-widest ${location.pathname === item.path ? 'text-primary' : 'text-[var(--text-secondary)]'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <hr className="border-[var(--border-color)]" />
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigate('/login')}
                className="w-full h-14 rounded-2xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm font-black uppercase tracking-widest text-[var(--text-primary)]"
              >
                {t('login')}
              </button>
              <button
                onClick={() => handleNavigate('/register')}
                className="w-full h-14 rounded-2xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                {t('register')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default PublicHeader;
