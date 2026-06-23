import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Bell, Trash2, CheckCircle2, MessageSquare, Briefcase, CreditCard, ShieldCheck, AlertTriangle } from 'lucide-react';
import { demoData } from '../data';

const Notifications = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('demo_notifications');
    return saved ? JSON.parse(saved) : demoData.notifications;
  });

  useEffect(() => {
    localStorage.setItem('demo_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const deleteOne = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleNotificationClick = (n) => {
    // Mark clicked notification as read
    setNotifications(notifications.map(item => item.id === n.id ? { ...item, unread: false } : item));

    const isPro = localStorage.getItem('viewMode') === 'pro' || localStorage.getItem('userRole') === 'craftsman';

    if (n.type === 'message') {
      navigate('/chat');
    } else if (n.type === 'proposal') {
      if (isPro) {
        navigate('/proposals');
      } else {
        const savedOrders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
        if (savedOrders.length > 0) {
          navigate(`/order/${savedOrders[0].id}`);
        } else {
          navigate('/order/o1');
        }
      }
    } else if (n.type === 'payment') {
      navigate('/account');
    } else if (n.type === 'review') {
      navigate('/reviews');
    } else if (n.type === 'system') {
      navigate('/settings/help');
    } else {
      if (isPro) {
        navigate('/craftsman/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'message': return <MessageSquare className="text-blue-500" size={20} />;
      case 'proposal': return <Briefcase className="text-primary" size={20} />;
      case 'payment': return <CreditCard className="text-emerald-500" size={20} />;
      case 'system': return <ShieldCheck className="text-amber-500" size={20} />;
      default: return <AlertTriangle className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />

      <div className="flex flex-col space-y-8 flex-1 min-h-0 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-1 px-1">
            <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
              {t('nav.notifications', lang === 'ar' ? 'الإشعارات' : 'Notifications')}
            </h2>
            <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {t('notifications.new', lang === 'ar' ? 'لديك {{count}} إشعارات غير مقروءة' : 'You have {{count}} unread notifications', { count: notifications.filter(n => n.unread).length })}
            </p>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={markAllRead}
              className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-500/20"
              title={t('notifications.markAllRead', lang === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all as read')}
            >
              <CheckCircle2 size={20} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={clearAll}
              className="w-10 h-10 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center border border-red-500/20"
              title={t('notifications.clearAll', lang === 'ar' ? 'مسح الكل' : 'Clear all')}
            >
              <Trash2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => handleNotificationClick(n)}
                  className={`relative p-6 rounded-[36px] bg-[var(--surface-color)] border border-[var(--border-color)] group hover:border-primary/30 cursor-pointer transition-all flex gap-5 active:scale-[0.99] ${n.unread ? 'shadow-xl shadow-primary/5 border-primary/20' : 'opacity-80'}`}
                >
                  {n.unread && (
                    <div className="absolute top-6 end-6 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[var(--surface-color)] shadow-sm" />
                  )}

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--bg-color)] shadow-inner shrink-0 transition-transform group-hover:scale-110`}>
                    {getIcon(n.type)}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-base text-[var(--text-primary)]">{n.title}</h4>
                      <span className="text-[10px] font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-tighter">{n.time}</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--text-secondary)] opacity-70 leading-relaxed">{n.body}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteOne(n.id);
                      }}
                      className="text-[10px] font-black text-red-500 pt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={12} />
                      {t('notifications.delete', lang === 'ar' ? 'حذف الإشعار' : 'Delete Notification')}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-24 h-24 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[44px] flex items-center justify-center text-slate-200 shadow-sm">
                  <Bell size={44} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xl text-[var(--text-primary)]">
                    {t('notifications.emptyTitle', lang === 'ar' ? 'لا يوجد تنبيهات حالياً' : 'No notifications yet')}
                  </h3>
                  <p className="font-bold text-sm text-[var(--text-secondary)] opacity-40 px-10">
                    {t('notifications.emptyDesc', lang === 'ar' ? 'سوف تظهر هنا كافة التحديثات والرسائل الجديدة فور وصولها.' : 'All updates and messages will appear here once they arrive.')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

