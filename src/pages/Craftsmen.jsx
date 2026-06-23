import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { Search, Star, MapPin, Filter, X, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Craftsmen = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCraft = searchParams.get('craft');
  const initialSearch = searchParams.get('search');

  const { craftsmen, crafts } = demoData;
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [selectedCraft, setSelectedCraft] = useState(initialCraft || 'all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (initialCraft) setSelectedCraft(initialCraft);
    if (initialSearch) setSearchTerm(initialSearch);
  }, [initialCraft, initialSearch]);

  const filteredCraftsmen = useMemo(() => {
    return craftsmen.filter(m => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = m.name.toLowerCase().includes(term) || m.location.toLowerCase().includes(term);
      const matchesCraft = selectedCraft === 'all' || m.craftId === selectedCraft;
      return matchesSearch && matchesCraft;
    });
  }, [craftsmen, searchTerm, selectedCraft]);

  return (
    <div className="page-container with-nav-padding pt-6 pb-24 relative overflow-hidden">
      {/* Immersive background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />

      {/* Header & Search Area */}
      <div className="space-y-6 px-1 relative z-10">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {t('craftsmen.title')}
          </h2>
          <p className="text-[10px] font-black text-[var(--text-secondary)] opacity-50 uppercase tracking-widest leading-relaxed">
            {t('craftsmen.subtitle')}
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-40 group-focus-within:text-primary transition-all" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('search')}
              className="w-full h-16 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[24px] ps-14 pe-6 text-sm font-bold outline-none focus:border-primary/50 transition-all shadow-sm"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all border ${showFilters ? 'bg-primary text-white border-primary shadow-lg' : 'bg-[var(--surface-color)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-primary'}`}
          >
            <Filter size={24} />
          </motion.button>
        </div>

        {/* Category Quick Chips */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCraft('all')}
            className={`shrink-0 px-6 h-11 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${selectedCraft === 'all'
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
              : 'bg-[var(--surface-color)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-primary/30'}`}
          >
            {t('craftsmen.all')}
          </motion.button>
          {crafts.map((craft) => (
            <motion.button
              key={craft.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCraft(craft.id)}
              className={`shrink-0 px-6 h-11 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border flex items-center gap-2 ${selectedCraft === craft.id
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-[var(--surface-color)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-primary/30'}`}
            >
              <span>{lang === 'ar' ? craft.nameAr : craft.nameEn}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Craftsmen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 mt-4 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredCraftsmen.map((m, i) => (
            <motion.div
              layout
              key={m.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/craftsman/${m.id}`)}
              className="bg-[var(--surface-color)] rounded-[48px] border border-[var(--border-color)] p-6 flex flex-col gap-6 cursor-pointer group hover:shadow-2xl hover:border-primary/20 transition-all shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

              <div className="flex gap-5 items-center relative z-10">
                <div className="relative">
                  <div className="w-24 h-24 rounded-[36px] overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-xl">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-lg">
                    <TrendingUp size={14} className="text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-xl text-[var(--text-primary)] truncate max-w-[150px]">{m.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
                      <Star size={14} fill="currentColor" /> {m.rating}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-black uppercase tracking-widest">
                      {lang === 'ar'
                        ? (m.craftNameAr || crafts.find(c => c.id === m.craftId)?.nameAr)
                        : (m.craftNameEn || crafts.find(c => c.id === m.craftId)?.nameEn)}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[var(--text-secondary)] rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {m.location.split('،')[1] || m.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60 leading-relaxed line-clamp-2 px-1 relative z-10">
                {m.bio || t('craftsmen.bioFallback')}
              </p>

              <div className="pt-4 border-t border-dashed border-[var(--border-color)] flex justify-between items-center relative z-10">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-widest mb-0.5">{t('craftsmen.pricing')}</span>
                  <span className="text-[10px] font-black text-primary uppercase">{t('order.priceOnInspection')}</span>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-[var(--text-secondary)] rounded-2xl flex items-center justify-center border border-[var(--border-color)] hover:text-primary transition-all"
                  >
                    <MessageSquare size={20} />
                  </motion.button>
                  <motion.div whileHover={{ x: 5 }} className="px-6 h-12 rounded-2xl bg-primary text-white flex items-center gap-2 font-black text-xs shadow-lg shadow-primary/20">
                    <span>{t('craftsmen.bookNow')}</span>
                    <ArrowRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCraftsmen.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 bg-[var(--bg-color)] rounded-[48px] flex items-center justify-center text-slate-300">
            <Search size={48} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[var(--text-primary)]">{t('craftsmen.noneFound')}</h3>
            <p className="text-sm text-[var(--text-secondary)] font-bold opacity-60">{t('craftsmen.noneFoundDesc')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Craftsmen;

