import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Search, MapPin, Clock, Filter, ChevronRight, Inbox, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { demoData } from '../data';

const Market = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const craftsman = demoData.user;
  const craftId = craftsman?.craftId || 'c1';

  // Simulation of live market requests filtered by craftsman specialty
  const [allRequests] = useState(demoData.orders
    .filter(o => o.status === 'pending' && o.craftId === craftId)
    .map(o => ({
      ...o,
      titleEn: o.title,
      distance: `${(Math.random() * 5 + 0.5).toFixed(1)} km`,
      time: `${Math.floor(Math.random() * 59) + 1} mins ago`,
      category: demoData.crafts.find(c => c.id === o.craftId)?.[lang === 'ar' ? 'nameAr' : 'nameEn'] || 'General'
    }))
  );

  const filteredRequests = allRequests.filter(req =>
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (req.titleEn && req.titleEn.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page-container with-nav-padding pt-6 pb-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[120px] rounded-full -mr-40 -mt-40 -z-10" />

      <div className="space-y-6 px-1 relative z-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {t('market.title')}
          </h2>
          <p className="text-[10px] font-black text-[var(--text-secondary)] opacity-50 uppercase tracking-widest leading-relaxed">
            {t('market.subtitle')}
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-40 group-focus-within:text-primary transition-all" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('market.searchPlaceholder')}
              className="w-full h-16 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[24px] ps-14 pe-6 text-sm font-bold outline-none focus:border-primary/50 transition-all shadow-sm"
            />
          </div>
          <button className="w-16 h-16 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[24px] flex items-center justify-center text-[var(--text-secondary)]">
            <Filter size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredRequests.map((order, i) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/order/${order.id}`)}
                className="bg-[var(--surface-color)] border border-[var(--border-color)] p-6 rounded-[44px] space-y-4 relative overflow-hidden group cursor-pointer shadow-xl shadow-slate-200/20 dark:shadow-none hover:border-primary/30 transition-all"
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-primary fill-primary" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t('market.urgent')}</span>
                    </div>
                    <h4 className="font-black text-lg text-[var(--text-primary)] leading-tight group-hover:text-primary transition-colors">
                      {lang === 'ar' ? order.title : order.titleEn}
                    </h4>
                  </div>
                  <div className="bg-primary/5 text-primary px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-primary/10">
                    {t('order.priceOnInspection')}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
                      <Clock size={14} className="opacity-50" /> {order.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
                      <MapPin size={14} className="opacity-50" /> {order.distance}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredRequests.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-[var(--bg-color)] rounded-[48px] flex items-center justify-center text-slate-200">
                <Inbox size={48} />
              </div>
              <div className="space-y-1 px-10">
                <h3 className="text-xl font-black text-[var(--text-primary)]">{t('market.noJobs')}</h3>
                <p className="text-sm text-[var(--text-secondary)] font-bold opacity-60">
                  {t('market.noJobsDesc')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Market;

