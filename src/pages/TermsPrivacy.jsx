import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

const TermsPrivacy = () => {
  const { lang } = useLanguage();

  const sections = [
    {
      title: t('terms.privacy.title'),
      icon: <Lock className="text-primary" />,
      content: t('terms.privacy.content')
    },
    {
      title: t('terms.terms.title'),
      icon: <FileText className="text-indigo-500" />,
      content: t('terms.terms.content')
    },
    {
      title: t('terms.security.title'),
      icon: <Shield className="text-emerald-500" />,
      content: t('terms.security.content')
    }
  ];

  return (
    <div className="page-container with-nav-padding pt-8 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />

      <div className="space-y-1 px-1">
        <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
          {t('terms.title')}
        </h2>
        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
          {t('terms.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[var(--surface-color)] border border-[var(--border-color)] p-8 rounded-[48px] shadow-xl shadow-slate-200/40 dark:shadow-none space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--bg-color)] rounded-2xl flex items-center justify-center shadow-inner">
                {section.icon}
              </div>
              <h3 className="font-black text-lg text-[var(--text-primary)]">{section.title}</h3>
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed opacity-80">
              {section.content}
            </p>
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
              <CheckCircle size={14} /> {t('terms.verified')}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pb-10" />
    </div>
  );
};

export default TermsPrivacy;

