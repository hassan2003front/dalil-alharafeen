import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, MessageCircle, User, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const { t } = useLanguage();

  const isCraftsman = localStorage.getItem('userRole') === 'craftsman';
  
  const navItems = isCraftsman ? [
    { path: '/', icon: <Home size={24} />, label: t('nav.home') },
    { path: '/active-jobs', icon: <Briefcase size={24} />, label: t('nav.jobs') || 'أعمالي' },
    { path: '/chat', icon: <MessageCircle size={24} />, label: t('chat.title') },
    { path: '/account', icon: <User size={24} />, label: t('account.title') },
  ] : [
    { path: '/', icon: <Home size={24} />, label: t('home.title') },
    { path: '/crafts', icon: <Grid size={24} />, label: t('crafts.title') },
    { path: '/chat', icon: <MessageCircle size={24} />, label: t('chat.title') },
    { path: '/account', icon: <User size={24} />, label: t('account.title') },
  ];

  return (
    <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] h-20 glass rounded-[32px] px-8 flex justify-between items-center z-[1000] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 transition-all duration-500 ${isActive ? 'text-primary' : 'text-[var(--text-secondary)] opacity-40'}`
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                animate={isActive ? { y: -5, scale: 1.15 } : { y: 0, scale: 1 }}
                className={`p-2.5 rounded-[20px] transition-all duration-500 relative ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-transparent'}`}
              >
                {React.cloneElement(item.icon, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
                {isActive && (
                  <motion.div 
                    layoutId="nav-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  />
                )}
              </motion.div>
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0.5 scale-105' : 'opacity-40'}`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;

