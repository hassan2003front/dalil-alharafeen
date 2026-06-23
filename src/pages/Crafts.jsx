import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Crafts = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { crafts, craftsmen } = demoData;
  const [searchTerm, setSearchTerm] = useState('');

  // Count craftsmen for each craft
  const craftWithCount = useMemo(() => {
    return crafts.map(craft => ({
      ...craft,
      count: craftsmen.filter(c => c.craftId === craft.id).length
    }));
  }, [crafts, craftsmen]);

  const filteredCrafts = useMemo(() => {
    return craftWithCount.filter(craft =>
      craft.nameAr.includes(searchTerm) || craft.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [craftWithCount, searchTerm]);

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 relative z-10"
      >
        <div className="space-y-1 px-1">
          <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {t('crafts.title')}
          </h2>
          <p className="text-[var(--text-secondary)] font-bold text-sm opacity-60">
            {t('crafts.desc')}
          </p>
        </div>

        <div className="relative group px-1">
          <Search size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-40 group-focus-within:text-primary transition-all" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search')}
            className="w-full h-16 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[24px] ps-14 pe-4 text-sm font-bold outline-none focus:border-primary/50 transition-all shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 px-1">
          {filteredCrafts.map((craft, i) => (
            <motion.div
              key={craft.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/craftsmen?craft=${craft.id}`)}
              className="flex flex-col p-4 bg-[var(--surface-color)] rounded-[40px] border border-[var(--border-color)] hover:border-primary/30 transition-all cursor-pointer group shadow-sm hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />

              <div className="w-full aspect-square bg-[var(--bg-color)] rounded-[32px] flex items-center justify-center p-0 overflow-hidden relative z-10 mb-4 shadow-inner">
                <img
                  src={craft.image}
                  alt={craft.nameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1 relative z-10 px-1">
                <h4 className="font-black text-lg text-[var(--text-primary)] leading-tight truncate">
                  {lang === 'ar' ? craft.nameAr : craft.nameEn}
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-primary uppercase">
                    {craft.count} {t('auth.craftsman')}
                  </p>
                  <ArrowRight size={14} className={`text-primary opacity-40 group-hover:opacity-100 transition-all ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Crafts;

