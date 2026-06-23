import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, MessageCircle, Play, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { demoData } from '../data';

const ActiveJobs = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  // Simulated active jobs state to support interactive completion
  const [completedJobIds, setCompletedJobIds] = useState([]);

  const craftId = demoData.user?.craftId || 'c1';

  const getActiveJobsForCraft = (craftId, lang) => {
    switch (craftId) {
      case 'c1': // Plumbing
        return [
          {
            id: 'aj1',
            clientId: 'u1',
            clientName: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
            service: lang === 'ar' ? 'تصليح سخان غاز' : 'Gas Heater Repair',
            status: 'ongoing',
            address: lang === 'ar' ? 'القاهرة، المعادي، شارع 9' : 'Street 9, Maadi, Cairo',
            price: '300',
            startTime: '10:30 AM'
          },
          {
            id: 'aj2',
            clientId: 'u2',
            clientName: lang === 'ar' ? 'هشام ممدوح' : 'Hisham Mamdouh',
            service: lang === 'ar' ? 'تركيب خلاط مياه وتغيير محابس' : 'Water Mixer Installation',
            status: 'ongoing',
            address: lang === 'ar' ? 'الجيزة، الشيخ زايد، الحي الثاني' : 'District 2, Sheikh Zayed, Giza',
            price: '150',
            startTime: '02:15 PM'
          }
        ];
      case 'c2': // Electrical
        return [
          {
            id: 'aj1',
            clientId: 'u1',
            clientName: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
            service: lang === 'ar' ? 'تركيب لوحة مفاتيح كهرباء رئيسية' : 'Main Electrical Panel Installation',
            status: 'ongoing',
            address: lang === 'ar' ? 'القاهرة، مصر الجديدة' : 'Heliopolis, Cairo',
            price: '400',
            startTime: '11:00 AM'
          },
          {
            id: 'aj2',
            clientId: 'u2',
            clientName: lang === 'ar' ? 'هشام ممدوح' : 'Hisham Mamdouh',
            service: lang === 'ar' ? 'تركيب إضاءة مخفية ليد' : 'LED Concealed Light Setup',
            status: 'ongoing',
            address: lang === 'ar' ? 'الجيزة، الشيخ زايد' : 'Sheikh Zayed, Giza',
            price: '200',
            startTime: '03:30 PM'
          }
        ];
      case 'c3': // Carpentry
        return [
          {
            id: 'aj1',
            clientId: 'u1',
            clientName: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
            service: lang === 'ar' ? 'إصلاح دولاب ملابس مكسور' : 'Repairing Broken Wardrobe',
            status: 'ongoing',
            address: lang === 'ar' ? 'القاهرة، المعادي' : 'Maadi, Cairo',
            price: '350',
            startTime: '09:00 AM'
          },
          {
            id: 'aj2',
            clientId: 'u2',
            clientName: lang === 'ar' ? 'هشام ممدوح' : 'Hisham Mamdouh',
            service: lang === 'ar' ? 'تغيير كوالين ومفصلات أبواب' : 'Changing Door Locks & Hinges',
            status: 'ongoing',
            address: lang === 'ar' ? 'الجيزة، الشيخ زايد' : 'Sheikh Zayed, Giza',
            price: '180',
            startTime: '01:00 PM'
          }
        ];
      case 'c4': // Painting
        return [
          {
            id: 'aj1',
            clientId: 'u1',
            clientName: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
            service: lang === 'ar' ? 'دهان غرف أطفال بألوان حديثة' : 'Painting Kids Bedroom with Modern Colors',
            status: 'ongoing',
            address: lang === 'ar' ? 'القاهرة، التجمع الخامس' : '5th Settlement, Cairo',
            price: '1200',
            startTime: '08:30 AM'
          },
          {
            id: 'aj2',
            clientId: 'u2',
            clientName: lang === 'ar' ? 'هشام ممدوح' : 'Hisham Mamdouh',
            service: lang === 'ar' ? 'معالجة رطوبة ودهان حائط تالف' : 'Treating Humidity & Painting Wall',
            status: 'ongoing',
            address: lang === 'ar' ? 'الجيزة، الهرم' : 'Haram, Giza',
            price: '500',
            startTime: '12:45 PM'
          }
        ];
      default:
        return [
          {
            id: 'aj1',
            clientId: 'u1',
            clientName: lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
            service: lang === 'ar' ? 'صيانة عامة وتركيبات' : 'General Maintenance & Setup',
            status: 'ongoing',
            address: lang === 'ar' ? 'القاهرة، المعادي' : 'Maadi, Cairo',
            price: '250',
            startTime: '10:00 AM'
          },
          {
            id: 'aj2',
            clientId: 'u2',
            clientName: lang === 'ar' ? 'هشام ممدوح' : 'Hisham Mamdouh',
            service: lang === 'ar' ? 'خدمة صيانة وتركيب مخصصة' : 'Custom Fitting Service',
            status: 'ongoing',
            address: lang === 'ar' ? 'الجيزة، الشيخ زايد' : 'Sheikh Zayed, Giza',
            price: '150',
            startTime: '03:00 PM'
          }
        ];
    }
  };

  const allJobs = getActiveJobsForCraft(craftId, lang);

  const jobs = allJobs.filter(j => !completedJobIds.includes(j.id));

  const handleFinishJob = (id) => {
    setCompletedJobIds(prev => [...prev, id]);
  };

  return (
    <div className="page-container with-nav-padding pt-8 space-y-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[130px] rounded-full -ml-40 -mt-40 -z-10" />

      <div className="space-y-1 px-1">
        <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
          {t('activeJobs.title')}
        </h2>
        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
          {t('activeJobs.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] p-6 rounded-[48px] shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6"
            >
              {/* Header Info */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                    <Play size={24} fill="currentColor" className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-[var(--text-primary)]">{job.service}</h4>
                    <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60">{job.clientName}</p>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl font-black text-xs">
                  {job.startTime}
                </div>
              </div>

              {/* Address & Actions */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-[var(--bg-color)] rounded-3xl border border-[var(--border-color)]">
                  <MapPin size={18} className="text-primary mt-0.5" />
                  <p className="text-sm font-bold text-[var(--text-primary)]">{job.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="h-14 bg-slate-100 dark:bg-slate-800 text-[var(--text-primary)] rounded-2xl font-black text-sm flex items-center justify-center gap-2"
                  >
                    <Phone size={18} /> {t('activeJobs.call')}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/chat/chat_${job.clientId}`)}
                    className="h-14 bg-primary/10 text-primary rounded-2xl font-black text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} /> {t('activeJobs.chat')}
                  </motion.button>
                </div>
              </div>

              {/* Completion Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFinishJob(job.id)}
                className="w-full h-16 bg-emerald-500 text-white rounded-[24px] font-black text-base shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3"
              >
                <CheckCircle size={20} />
                {t('activeJobs.finish')}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {jobs.length === 0 && (
          <div className="py-20 text-center space-y-4 bg-[var(--bg-color)] rounded-[48px] border-2 border-dashed border-[var(--border-color)]">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <AlertCircle size={32} className="text-slate-300" />
            </div>
            <p className="text-sm font-bold text-[var(--text-secondary)] opacity-40">
              {t('activeJobs.noneFound')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveJobs;

