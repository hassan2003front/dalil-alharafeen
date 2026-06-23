import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import {
  Star,
  MapPin,
  ChevronLeft,
  MessageCircle,
  Phone,
  Heart,
  PlusCircle,
  MoreVertical,
  CheckCircle,
  ChevronRight,
  Shield,
  Zap,
  Image as ImageIcon
} from 'lucide-react';

const CraftsmanProfile = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const craftsman = demoData.craftsmen.find(m => m.id === id);
  let reviews = demoData.reviews.filter(r => r.craftsmanId === id);
  if (reviews.length === 0) {
    // Generate some fake reviews for the mock craftsmen
    reviews = [
      { id: 'r1', clientName: 'أحمد محمود', rating: 5, comment: 'شغل ممتاز جداً ومواعيد مضبوطة، أنصح بالتعامل معه.', date: '2 days ago' },
      { id: 'r2', clientName: 'سعيد عبد الله', rating: 4, comment: 'محترم وشغله نظيف، بس السعر كان غالي شوية.', date: '1 week ago' },
      { id: 'r3', clientName: 'كريم مجدي', rating: 5, comment: 'أفضل حرفي تعاملت معاه، فاهم شغله كويس.', date: '2 weeks ago' }
    ].slice(0, Math.floor(Math.random() * 3) + 1); // 1 to 3 reviews
  }

  const [isFavorite, setIsFavorite] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  if (!craftsman) return <div className="p-10 text-center font-bold">Craftsman not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container with-nav-padding pt-0 space-y-8 relative"
    >
      {/* Immersive Header / Banner */}
      <div className="relative -mx-6">
        <div className="h-80 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-purple-700" />
          <img src={craftsman.image} alt="Cover" className="w-full h-full object-cover opacity-40 blur-[2px] mix-blend-overlay scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Action Buttons on Banner */}
          <div className="absolute top-8 inset-x-6 flex justify-end items-center z-20">
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-12 h-12 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-lg transition-all ${isFavorite ? 'bg-red-500 text-white border-red-400' : 'bg-white/20 text-white'}`}
              >
                <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg"
                >
                  <MoreVertical size={22} />
                </motion.button>

                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-16 end-0 w-48 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                  >
                    {[
                      { label: 'مشاركة الملف', icon: <PlusCircle size={16} /> },
                      { label: 'إبلاغ عن محتوى', icon: <Shield size={16} /> },
                    ].map((item, idx) => (
                      <button key={idx} className="w-full px-4 py-3 flex items-center gap-3 text-sm font-bold text-[var(--text-primary)] hover:bg-primary/10 rounded-xl transition-colors">
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-16 start-8 flex items-end gap-5 z-30">
          <div className="w-40 h-40 rounded-[48px] border-[12px] border-[var(--bg-color)] shadow-2xl overflow-hidden bg-white dark:bg-slate-800">
            <img src={craftsman.image} alt={craftsman.name} className="w-full h-full object-cover" />
          </div>
          <div className="pb-8">
            {craftsman.verified && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-500 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-xl shadow-green-500/30 border-4 border-[var(--bg-color)]"
              >
                <CheckCircle size={16} fill="white" className="text-green-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t('craftsmen.verified')}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-14 flex flex-col space-y-10">
        {/* Main Info - Enhanced */}
        <div className="flex justify-between items-start gap-4 px-1">
          <div className="space-y-3 flex-1 min-w-0">
            <h1 className="text-4xl font-black tracking-tight text-[var(--text-primary)] leading-tight">{craftsman.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-sm font-black uppercase tracking-wider">
                {lang === 'ar'
                  ? (craftsman.craftNameAr || demoData.crafts.find(c => c.id === craftsman.craftId)?.nameAr)
                  : (craftsman.craftNameEn || demoData.crafts.find(c => c.id === craftsman.craftId)?.nameEn)}
              </div>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full opacity-50" />
              <span className="text-[var(--text-secondary)] font-bold text-sm flex items-center gap-1.5 opacity-70">
                <MapPin size={16} className="text-primary" /> {craftsman.location}
              </span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full opacity-50" />
              <div className="flex items-center gap-2">
                {craftsman.online ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{t('chat.online') || 'متصل الآن'}</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-slate-300 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">
                      {lang === 'ar' ? 'نشط منذ 15 دقيقة' : 'Active 15m ago'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white px-6 py-4 rounded-[32px] flex flex-col items-center justify-center font-black shadow-xl shadow-amber-500/20 border-4 border-[var(--bg-color)] shrink-0">
            <div className="flex items-center gap-1.5">
              <Star size={24} fill="currentColor" />
              <span className="text-3xl tracking-tighter">{craftsman.rating}</span>
            </div>
            <span className="text-[9px] opacity-90 font-black uppercase tracking-tighter mt-0.5">{craftsman.reviewsCount} {t('craftsmen.reviews')}</span>
          </div>
        </div>

        {/* Stats Grid - Premium Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-1">
          {[
            { label: t('craftsmen.jobsDone'), value: craftsman.completedOrders, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
            { label: lang === 'ar' ? 'سنوات الخبرة' : 'Years Exp.', value: craftsman.experienceYears, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
            { label: lang === 'ar' ? 'أعمال مميزة' : 'Featured', value: Math.floor(craftsman.completedOrders / 4), color: 'text-purple-600', bg: 'bg-purple-500/10' },
            { label: t('craftsmen.priceLabel'), value: t('order.priceOnInspection'), isPrice: true, color: 'text-primary', bg: 'bg-primary/10' }
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} p-4 rounded-[32px] flex flex-col items-center justify-center border border-white/50 dark:border-white/5 shadow-sm hover:shadow-md transition-all`}>
              <span className={`${stat.isPrice ? 'text-[9px]' : 'text-xl'} font-black ${stat.color} text-center`}>{stat.value}</span>
              <span className="text-[8px] text-[var(--text-secondary)] font-black uppercase tracking-tighter text-center mt-1 opacity-60 leading-none">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="space-y-4 px-1">
          <h3 className="text-xl font-black text-[var(--text-primary)]">{lang === 'ar' ? 'المهارات والخبرات' : 'Skills & Expertise'}</h3>
          <div className="flex flex-wrap gap-2">
            {craftsman.skills?.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-full text-xs font-bold text-[var(--text-secondary)] shadow-sm">
                #{skill}
              </span>
            ))}
          </div>
        </div>

        {/* About Section - Redesigned */}
        <div className="bg-[var(--surface-color)] p-8 rounded-[40px] border border-[var(--border-color)] space-y-4 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Star size={20} />
            </div>
            <h3 className="text-xl font-black text-[var(--text-primary)]">{t('craftsmen.aboutMe')}</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-bold leading-relaxed opacity-80 relative z-10">
            {craftsman.bio}
          </p>
        </div>

        {/* Services / Offers section removed as requested */}

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-[var(--text-primary)] px-1">{t('craftsmen.portfolio')}</h3>
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-1">
              {(craftsman.portfolio || [1, 2, 3, 4, 5, 6]).map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="aspect-square rounded-[32px] overflow-hidden shadow-xl border-4 border-[var(--surface-color)] relative group"
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={typeof img === 'string' ? img : `https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400&sig=${idx}`}
                    alt="Portfolio"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews - Redesigned */}
        <div className="pb-32 px-1">
          <h3 className="text-2xl font-black text-[var(--text-primary)] mb-6">{t('craftsmen.reviewsTitle')}</h3>
          <div className="flex flex-col space-y-5">
            {reviews.map(review => (
              <div key={review.id} className="bg-[var(--surface-color)] p-6 rounded-[36px] border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-500/10 flex items-center justify-center text-primary font-black text-sm shadow-inner border border-white/50 dark:border-white/5">
                      {(review.clientName || "").charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-base text-[var(--text-primary)]">{review.clientName}</span>
                      <span className="text-[10px] font-bold text-slate-400 opacity-60 uppercase tracking-widest">{t('chat.since')} {t('common.daysAgo', { count: 2 })}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-amber-500 bg-amber-500/5 px-3 py-1.5 rounded-full border border-amber-500/10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "drop-shadow-sm" : "opacity-30"} />
                    ))}
                  </div>
                </div>
                <div className="mb-3 inline-flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1.5 rounded-xl border border-[var(--border-color)] relative z-10">
                  <span className="text-sm font-black text-[var(--text-primary)]">
                    {lang === 'ar' ? 'مهمة منجزة:' : 'Completed Task:'} {lang === 'ar'
                      ? (craftsman.craftNameAr || demoData.crafts.find(c => c.id === craftsman.craftId)?.nameAr)
                      : (craftsman.craftNameEn || demoData.crafts.find(c => c.id === craftsman.craftId)?.nameEn)}
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-80">
                    {lang === 'ar' ? `استغرقت ${Math.floor(Math.random() * 3) + 1} أيام` : `Took ${Math.floor(Math.random() * 3) + 1} days`}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] font-bold italic leading-relaxed opacity-80 pl-4 border-l-4 border-primary/20 relative z-10">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Action Bar - Premium Fixed */}
      <div className="fixed bottom-0 inset-x-0 z-[1001] p-6 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/90 to-transparent pt-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-[600px] mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/5 p-4 rounded-[40px] shadow-2xl flex gap-4 ring-1 ring-black/5"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/chat/${craftsman.id}`)}
            className="w-16 h-16 bg-[var(--surface-color)] text-primary border border-[var(--border-color)] rounded-[28px] flex items-center justify-center shadow-sm group"
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/request/new', { state: { prefilledCraft: craftsman.craftId, craftsmanId: craftsman.id } })}
            className="flex-1 h-16 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[28px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Zap size={22} fill="white" className="opacity-80" />
            <span className="relative z-10">{t('craftsmen.bookNow')}</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CraftsmanProfile;

