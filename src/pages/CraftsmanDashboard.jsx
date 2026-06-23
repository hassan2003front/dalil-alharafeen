import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  TrendingUp,
  Clock,
  Play,
  MessageSquare,
  MapPin,
  ChevronRight,
  Bell,
  Star,
  HelpCircle,
  Search
} from 'lucide-react';

const CraftsmanDashboard = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const craftsman = demoData.user; // Use the actual logged-in user
  const craftId = craftsman?.craftId || 'c1';

  // Simulation of live market requests based on real demo data
  const liveRequests = demoData.orders
    .filter(o => o.status === 'pending' && o.craftId === craftId)
    .slice(0, 3)
    .map(o => ({
      ...o,
      distance: `${(Math.random() * 5 + 0.5).toFixed(1)} km`,
      time: `${Math.floor(Math.random() * 59) + 1} mins ago`
    }));

  const performanceData = [
    { day: lang === 'ar' ? 'السبت' : 'Sat', value: 40 },
    { day: lang === 'ar' ? 'الأحد' : 'Sun', value: 70 },
    { day: lang === 'ar' ? 'الاثنين' : 'Mon', value: 45 },
    { day: lang === 'ar' ? 'الثلاثاء' : 'Tue', value: 90 },
    { day: lang === 'ar' ? 'الأربعاء' : 'Wed', value: 65 },
    { day: lang === 'ar' ? 'الخميس' : 'Thu', value: 80 },
    { day: lang === 'ar' ? 'الجمعة' : 'Fri', value: 100 },
  ];

  return (
    <div className="page-container with-nav-padding pt-8 space-y-8 overflow-x-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full -mr-48 -z-10" />
      {/* Header Profile Section */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[24px] border-4 border-primary/20 p-1">
            <img src={craftsman.image} className="w-full h-full rounded-[18px] object-cover" alt="Profile" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-[var(--text-primary)]">{craftsman.name}</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{t('dashboard.online')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar for Market */}
      <div className="relative group px-1">
        <div className="absolute inset-y-0 start-5 flex items-center text-slate-400 group-focus-within:text-primary transition-all">
          <Search size={22} className="opacity-40" />
        </div>
        <input
          type="text"
          placeholder={t('dashboard.searchPlaceholder')}
          className="w-full h-16 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl ps-14 pe-6 text-base font-bold shadow-sm transition-all outline-none text-[var(--text-primary)] focus:border-primary/50"
        />
      </div>

      {/* Live Market Section */}
      <section className="space-y-4 px-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{t('dashboard.liveRequests')}</h3>
          <button onClick={() => navigate('/market')} className="text-primary font-black text-xs hover:underline">{t('viewAll')}</button>
        </div>

        <div className="space-y-4">
          {liveRequests.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/order/${order.id}`)}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] p-6 rounded-[40px] space-y-4 relative overflow-hidden group cursor-pointer shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t('dashboard.urgent')}</span>
                  </div>
                  <h4 className="font-black text-lg text-[var(--text-primary)] leading-tight">
                    {lang === 'ar' ? order.title : order.titleEn}
                  </h4>
                </div>
                <div className="bg-primary/5 text-primary px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-primary/10">
                  {t('order.priceOnInspection')}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
                    <Clock size={14} className="text-primary opacity-50" /> {order.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
                    <MapPin size={14} className="text-primary opacity-50" /> {order.distance}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/chat/chat_${order.clientId}`);
                  }}
                  className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center relative z-10"
                >
                  <MessageSquare size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Management Center Section */}
      <section className="space-y-6 px-1 pb-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{t('dashboard.managementCenter')}</h3>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">{t('dashboard.managementDesc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: t('craftsmen.proposalsHistory.title'), icon: <Clock size={24} />, path: '/proposals', color: 'bg-amber-500', shadow: 'shadow-amber-500/20' },
            { label: t('dashboard.activeJobs'), icon: <Play size={24} />, path: '/active-jobs', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
            { label: t('craftsmen.reviewsHistory.title'), icon: <Star size={24} />, path: '/reviews', color: 'bg-blue-500', shadow: 'shadow-blue-500/20' },
            { label: t('nav.support'), icon: <HelpCircle size={24} />, path: '/settings/help', color: 'bg-indigo-500', shadow: 'shadow-indigo-500/20' },
          ].map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center p-6 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[40px] shadow-xl shadow-slate-200/40 dark:shadow-none group transition-all"
            >
              <div className={`w-14 h-14 ${item.color} text-white rounded-[20px] flex items-center justify-center mb-4 ${item.shadow} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="font-black text-sm text-[var(--text-primary)]">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Performance Graph - Redesigned */}
      <section className="bg-gradient-to-br from-primary via-indigo-600 to-purple-700 p-8 rounded-[48px] text-white shadow-2xl shadow-primary/30 relative overflow-hidden mx-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 blur-[80px] rounded-full -ml-24 -mb-24" />

        <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="font-black text-2xl tracking-tight">{t('dashboard.performance')}</h4>
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {t('dashboard.growth')}
              </p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-[22px] flex items-center justify-center border border-white/30 shadow-inner">
              <TrendingUp size={28} className="text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10">
              <p className="text-[8px] font-black opacity-60 uppercase tracking-tighter mb-1">{lang === 'ar' ? 'إجمالي الأرباح' : 'TOTAL EARNINGS'}</p>
              <p className="text-xl font-black">12,450 <span className="text-[10px] opacity-60">{lang === 'ar' ? 'ج.م' : 'EGP'}</span></p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10">
              <p className="text-[8px] font-black opacity-60 uppercase tracking-tighter mb-1">{lang === 'ar' ? 'الطلبات المكتملة' : 'COMPLETED JOBS'}</p>
              <p className="text-xl font-black">24 <span className="text-[10px] opacity-60">{lang === 'ar' ? 'طلب' : 'Jobs'}</span></p>
            </div>
          </div>

          <div className="h-32 flex items-end justify-between px-1">
            {performanceData.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1">
                <div className="w-full px-1.5 h-full flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value}%` }}
                    transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                    className="w-full bg-gradient-to-t from-white/5 to-white/40 rounded-t-xl border-t border-white/20 shadow-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-primary text-[8px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                      {item.value}%
                    </div>
                  </motion.div>
                </div>
                <span className="text-[8px] font-black opacity-60 uppercase tracking-widest">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-10" />

    </div>
  );
};

export default CraftsmanDashboard;

