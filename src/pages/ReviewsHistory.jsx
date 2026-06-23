import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Star, User, Quote, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReviewsHistory = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();

    const reviews = [
        { id: 1, user: lang === 'ar' ? 'خالد م.' : 'Khaled M.', rating: 5, comment: lang === 'ar' ? 'عمل ممتاز وسريع جداً، التزم بالمواعيد وكان محترفاً جداً.' : 'Excellent and very fast work, committed to deadlines and was very professional.', date: lang === 'ar' ? 'منذ يومين' : '2 days ago' },
        { id: 2, user: lang === 'ar' ? 'سارة أ.' : 'Sarah A.', rating: 4, comment: lang === 'ar' ? 'خدمة جيدة جداً، السعر كان مناسباً جداً للجودة.' : 'Very good service, the price was very suitable for the quality.', date: lang === 'ar' ? 'منذ أسبوع' : 'A week ago' },
        { id: 3, user: lang === 'ar' ? 'محمد هـ.' : 'Mohamed H.', rating: 5, comment: lang === 'ar' ? 'أنصح بالتعامل معه، فنان في شغله.' : 'I recommend dealing with him, an artist in his work.', date: lang === 'ar' ? 'منذ أسبوعين' : '2 weeks ago' },
    ];

    return (
        <div className="page-container with-nav-padding pt-8 space-y-8 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />

            <div className="space-y-1 px-1">
                <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
                    {t('reviewsHistory.title')}
                </h2>
                <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
                    {t('reviewsHistory.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {reviews.map((rev, i) => (
                    <motion.div
                        key={rev.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] space-y-4 relative overflow-hidden shadow-sm"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[var(--text-secondary)]">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h5 className="font-black text-sm text-[var(--text-primary)]">{rev.user}</h5>
                                    <div className="flex items-center gap-0.5 text-amber-500">
                                        {[...Array(rev.rating)].map((_, idx) => <Star key={idx} size={12} fill="currentColor" />)}
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-40">{rev.date}</span>
                        </div>

                        <div className="relative">
                            <Quote size={24} className="absolute -top-2 -left-2 text-primary/10" />
                            <p className="text-sm font-bold text-[var(--text-primary)] leading-relaxed relative z-10 ps-4">
                                {rev.comment}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsHistory;

