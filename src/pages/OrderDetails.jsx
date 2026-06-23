import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, MapPin, Clock, CreditCard, User, CheckCircle2, MessageCircle, Star, StopCircle, XCircle, MoreVertical, AlertCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem('demo_orders') || '[]').find(o => o.id === id) ||
    demoData.orders.find(o => o.id === id);
  const craftsman = demoData.craftsmen.find(m => m.id === order?.craftsmanId);
  const userRole = localStorage.getItem('userRole') || 'client';
  const client = demoData.users.find(u => u.id === order?.clientId);

  const [proposals, setProposals] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ show: false, type: null }); // type: 'stop' or 'cancel'
  const [proposalModal, setProposalModal] = useState({ show: false, price: '', message: '' });

  useEffect(() => {
    const fetchProposals = () => {
      const savedProposals = JSON.parse(localStorage.getItem('demo_proposals') || '[]');
      const filtered = savedProposals.filter(p => p.orderId === id);

      // Map to full craftsman data
      const enriched = filtered.map(p => ({
        ...p,
        craftsman: demoData.craftsmen.find(m => m.id === p.craftsmanId)
      }));
      setProposals(enriched);
    };

    fetchProposals();
    const interval = setInterval(fetchProposals, 3000); // Check for new proposals every 3 seconds
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <div className="p-10 text-center font-black">{t('order.notFound')}</div>;

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return lang === 'ar' ? 'بانتظار العروض' : 'Pending Offers';
      case 'in_progress': return lang === 'ar' ? 'قيد التنفيذ والعمل' : 'Job In Progress';
      case 'completed': return lang === 'ar' ? 'مكتمل' : 'Completed';
      case 'cancelled': return lang === 'ar' ? 'ملغي' : 'Cancelled';
      case 'stopped': return lang === 'ar' ? 'متوقف' : 'Stopped';
      default: return status;
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'cancelled': return 'bg-red-500 shadow-red-500/30';
      case 'stopped': return 'bg-amber-500 shadow-amber-500/30';
      case 'in_progress': return 'bg-blue-500 shadow-blue-500/30';
      case 'completed': return 'bg-emerald-500 shadow-emerald-500/30';
      default: return 'bg-primary shadow-primary/30';
    }
  };

  const steps = [
    { label: lang === 'ar' ? 'تم تقديم الطلب' : 'Request Placed', time: '10:00 AM', completed: true },
    { label: lang === 'ar' ? 'استقبال عروض الحرفيين' : 'Receiving Proposals', time: '10:15 AM', completed: order.status !== 'stopped' && order.status !== 'cancelled' },
    { label: lang === 'ar' ? 'قيد التنفيذ والعمل' : 'Job In Progress', time: order.status === 'in_progress' || order.status === 'completed' ? '11:00 AM' : '--', completed: order.status === 'in_progress' || order.status === 'completed' },
    { label: lang === 'ar' ? 'تم اكتمال المهمة بنجاح' : 'Task Completed', time: order.status === 'completed' ? '12:30 PM' : '--', completed: order.status === 'completed' },
  ];

  const handleConfirmAction = () => {
    const isStop = confirmModal.type === 'stop';
    const newStatus = isStop ? 'stopped' : 'cancelled';

    const updatedOrder = { ...order, status: newStatus };
    const saved = JSON.parse(localStorage.getItem('demo_orders') || '[]');
    const idx = saved.findIndex(o => o.id === id);
    if (idx > -1) {
      saved[idx] = updatedOrder;
    } else {
      saved.push(updatedOrder);
    }
    localStorage.setItem('demo_orders', JSON.stringify(saved));
    setConfirmModal({ show: false, type: null });
    toast.success(lang === 'ar' ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated successfully');
    window.location.reload();
  };

  const handleSubmitProposal = () => {
    if (!proposalModal.price || !proposalModal.message) {
      toast.error(lang === 'ar' ? 'الرجاء إدخال السعر والرسالة' : 'Please enter price and message');
      return;
    }

    const newProposal = {
      id: `prop_${Date.now()}`,
      orderId: id,
      craftsmanId: demoData.user.id, // Currently logged in user
      price: proposalModal.price,
      message: proposalModal.message,
      status: 'pending',
      date: new Date().toISOString()
    };

    const savedProposals = JSON.parse(localStorage.getItem('demo_proposals') || '[]');
    savedProposals.push(newProposal);
    localStorage.setItem('demo_proposals', JSON.stringify(savedProposals));

    // Update local state immediately
    const fullProposal = {
      ...newProposal,
      craftsman: demoData.user
    };
    setProposals([...proposals, fullProposal]);

    setProposalModal({ show: false, price: '', message: '' });
    toast.success(lang === 'ar' ? 'تم تقديم العرض بنجاح!' : 'Your proposal has been submitted successfully!');
  };

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-primary/5 blur-[150px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-8 flex-1 min-h-0 relative z-10"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-12 h-12 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl flex items-center justify-center text-[var(--text-primary)] shadow-sm"
            >
              <ChevronLeft size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
            </motion.button>
            <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
                {t('order.details')}
              </h2>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                #{id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="w-12 h-12 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl flex items-center justify-center text-[var(--text-primary)] shadow-sm"
            >
              <MoreVertical size={24} />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-14 end-0 w-56 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[24px] shadow-2xl z-50 overflow-hidden py-2"
                  >
                    <button
                      onClick={() => { setConfirmModal({ show: true, type: 'stop' }); setShowMenu(false); }}
                      disabled={order.status === 'in_progress' || order.status === 'stopped' || order.status === 'cancelled' || order.status === 'completed'}
                      className="w-full flex items-center gap-3 px-5 py-4 text-sm font-black text-amber-500 hover:bg-amber-500/5 transition-colors disabled:opacity-30"
                    >
                      <StopCircle size={18} />
                      {t('request.stop')}
                    </button>
                    <button
                      onClick={() => { setConfirmModal({ show: true, type: 'cancel' }); setShowMenu(false); }}
                      disabled={order.status === 'cancelled' || order.status === 'completed'}
                      className="w-full flex items-center gap-3 px-5 py-4 text-sm font-black text-red-500 hover:bg-red-500/5 transition-colors disabled:opacity-30"
                    >
                      <XCircle size={18} />
                      {t('request.cancel')}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Map / Visual Banner - Enhanced */}
        <div className="h-64 w-full rounded-[48px] overflow-hidden relative shadow-2xl border-4 border-[var(--surface-color)] bg-slate-100 dark:bg-slate-900">
          <div className="absolute inset-0 opacity-20 dark:opacity-40" style={{ backgroundImage: 'radial-gradient(var(--primary-color) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200"
            alt="Map Background"
            className="w-full h-full object-cover opacity-50 dark:opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Animated Path on Map */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <motion.path
              d="M100,50 Q150,150 250,100 T400,180"
              fill="none"
              stroke="var(--primary-color)"
              strokeWidth="4"
              strokeDasharray="10, 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>

          <div className="absolute top-6 end-6">
            <div className={`px-5 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl border-2 border-white/20 text-white ${getStatusColorClass(order.status)}`}>
              {getStatusLabel(order.status)}
            </div>
          </div>

          {/* Pulsing Dot on Map - Represents User */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-primary rounded-full animate-ping absolute opacity-40" />
            <div className="w-6 h-6 bg-primary rounded-full relative border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Destination Marker */}
          <div className="absolute bottom-10 right-20">
            <MapPin size={32} className="text-red-500 drop-shadow-lg" fill="currentColor" fillOpacity={0.2} />
          </div>
        </div>

        {/* Profile Card based on Role and Status */}
        {userRole === 'craftsman' && order.status === 'pending' ? (
          <div className="bg-[var(--surface-color)] rounded-[40px] p-6 border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-5 relative z-10">
              <div className="relative">
                <img
                  src={client?.image || 'https://ui-avatars.com/api/?name=C&background=random'}
                  alt={client?.name || 'Client'}
                  className="w-16 h-16 rounded-[24px] object-cover border-2 border-[var(--bg-color)] shadow-md"
                />
              </div>
              <div className="flex-1 space-y-0.5">
                <h4 className="font-black text-xl text-[var(--text-primary)] leading-tight">{client?.name || (lang === 'ar' ? 'العميل' : 'Client')}</h4>
                <p className="text-xs font-bold text-primary uppercase tracking-widest opacity-80">
                  {lang === 'ar' ? 'صاحب الطلب' : 'Job Owner'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-6 border-t border-dashed border-[var(--border-color)] relative z-10">
              <div className="flex-1 flex flex-col items-center p-3 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-1">{t('request.date')}</span>
                <div className="flex items-center gap-1.5 font-black text-sm text-[var(--text-primary)]">
                  <Clock size={14} className="text-primary" /> {order.date}
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center p-3 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-1">{t('payment.total')}</span>
                <div className="flex items-center gap-1.5 font-black text-sm text-primary">
                  <CreditCard size={14} />
                  <span className="text-[10px]">{t('order.priceOnInspection')}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--surface-color)] rounded-[40px] p-6 border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
            {craftsman ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="relative">
                    <img
                      src={craftsman?.image}
                      alt={craftsman?.name}
                      className="w-16 h-16 rounded-[24px] object-cover border-2 border-[var(--bg-color)] shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">✓</div>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h4 className="font-black text-xl text-[var(--text-primary)] leading-tight">{craftsman?.name}</h4>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest opacity-80">
                      {lang === 'ar'
                        ? (craftsman?.craftNameAr || demoData.crafts.find(c => c.id === craftsman?.craftId)?.nameAr)
                        : (craftsman?.craftNameEn || demoData.crafts.find(c => c.id === craftsman?.craftId)?.nameEn)}
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/chat/${craftsman?.id}`)}
                    className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all"
                  >
                    <MessageCircle size={24} />
                  </motion.button>
                </div>

                <div className="flex gap-4 mt-6 pt-6 border-t border-dashed border-[var(--border-color)] relative z-10">
                  <div className="flex-1 flex flex-col items-center p-3 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]">
                    <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-1">{t('request.date')}</span>
                    <div className="flex items-center gap-1.5 font-black text-sm text-[var(--text-primary)]">
                      <Clock size={14} className="text-primary" /> {order.date}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center p-3 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]">
                    <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-1">{t('payment.total')}</span>
                    <div className="flex items-center gap-1.5 font-black text-sm text-primary">
                      <CreditCard size={14} />
                      <span className="text-[10px]">{t('order.priceOnInspection')}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 space-y-2">
                <div className="w-16 h-16 bg-[var(--bg-color)] rounded-2xl flex items-center justify-center border border-dashed border-[var(--border-color)]">
                  <User size={24} className="text-[var(--text-secondary)] opacity-30" />
                </div>
                <p className="font-black text-sm text-[var(--text-secondary)] opacity-60">
                  {lang === 'ar' ? 'بانتظار تحديد حرفي' : 'Waiting for craftsman assignment'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Proposals Section - "Life" in the app */}
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <div>
              <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{lang === 'ar' ? 'العروض المقدمة' : 'Craftsman Proposals'}</h3>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">{lang === 'ar' ? 'حرفيين مهتمين بطلبك' : 'Experts interested in your job'}</p>
            </div>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black">
              {proposals.length} {lang === 'ar' ? 'عروض' : 'Offers'}
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {proposals.map((prop, i) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[var(--surface-color)] p-5 rounded-[40px] border border-[var(--border-color)] shadow-sm flex items-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-[var(--bg-color)] shadow-md relative z-10 shrink-0">
                    <img src={prop.craftsman?.image} alt={prop.craftsman?.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-black text-base text-[var(--text-primary)] truncate">{prop.craftsman?.name}</h5>
                      <div className="flex items-center gap-1 text-amber-500 font-black text-[10px]">
                        <Star size={12} fill="currentColor" /> {prop.craftsman?.rating}
                      </div>
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold mb-2 line-clamp-1 opacity-70">
                      "{prop.message}"
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-black text-[10px] uppercase">
                        {t('order.priceOnInspection')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 relative z-10">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate(`/chat/chat_${prop.craftsmanId}`)}
                      className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20 hover:bg-primary hover:text-white transition-all"
                    >
                      <MessageCircle size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {proposals.length === 0 && (
              <div className="py-8 text-center bg-[var(--bg-color)] rounded-[40px] border border-dashed border-[var(--border-color)]">
                <p className="text-xs font-bold text-[var(--text-secondary)] opacity-40 italic">
                  {lang === 'ar' ? 'بانتظار وصول عروض من الحرفيين...' : 'Waiting for craftsmen to apply...'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Section - Premium List */}
        <div className="space-y-5">
          <h3 className="text-xl font-black text-[var(--text-primary)] px-2">{t('order.liveTracking')}</h3>
          <div className="bg-[var(--surface-color)] rounded-[40px] p-8 border border-[var(--border-color)] shadow-sm space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-20 pointer-events-none" />
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 relative">
                {i !== steps.length - 1 && (
                  <div className={`absolute start-[15px] top-9 w-0.5 h-10 ${step.completed ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                )}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 z-10 shadow-lg ${step.completed ? 'bg-primary text-white shadow-primary/20' : 'bg-[var(--bg-color)] text-[var(--text-secondary)] opacity-40 border border-[var(--border-color)]'}`}>
                  {step.completed ? <CheckCircle2 size={18} /> : <div className="w-2.5 h-2.5 bg-current rounded-full" />}
                </div>
                <div className="flex-1 -mt-1 space-y-0.5">
                  <div className="flex justify-between items-center">
                    <b className={`text-base font-black ${step.completed ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-60'}`}>{step.label}</b>
                    <span className="text-[10px] font-black text-[var(--text-secondary)] opacity-50">{step.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">
                    {step.completed ? t('order.stageCompleted') : t('order.pendingStage')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {userRole === 'craftsman' && order.status === 'pending' ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setProposalModal({ show: true, price: '', message: '' })}
            className="w-full h-16 bg-primary text-white font-black text-base rounded-[32px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={20} />
            {lang === 'ar' ? 'تقديم عرض للعمل' : 'Submit Job Proposal'}
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full h-16 bg-[var(--surface-color)] border-2 border-[var(--border-color)] rounded-[32px] text-[var(--text-secondary)] font-black text-base hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
          >
            {t('order.contactSupport')}
          </motion.button>
        )}

        {/* Confirmation Modal */}
        <AnimatePresence>
          {confirmModal.show && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmModal({ show: false, type: null })}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-[var(--surface-color)] border border-[var(--border-color)] w-full max-w-sm rounded-[40px] p-8 shadow-2xl relative z-10"
              >
                <div className={`w-16 h-16 rounded-3xl mb-6 flex items-center justify-center ${confirmModal.type === 'stop' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">
                  {confirmModal.type === 'stop' ? (lang === 'ar' ? 'إيقاف الطلب؟' : 'Stop Request?') : (lang === 'ar' ? 'إلغاء الطلب؟' : 'Cancel Request?')}
                </h3>
                <p className="text-sm font-bold text-[var(--text-secondary)] opacity-60 leading-relaxed mb-8">
                  {confirmModal.type === 'stop'
                    ? (lang === 'ar' ? 'هل أنت متأكد من إيقاف استقبال العروض لهذا الطلب؟ يمكنك تفعيله لاحقاً.' : 'Are you sure you want to stop receiving offers for this request?')
                    : (lang === 'ar' ? 'هل أنت متأكد من إلغاء هذا الطلب نهائياً؟ لا يمكن التراجع عن هذه الخطوة.' : 'Are you sure you want to cancel this request permanently? This action cannot be undone.')}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setConfirmModal({ show: false, type: null })}
                    className="flex-1 h-14 rounded-2xl font-black text-sm text-[var(--text-primary)] bg-[var(--bg-color)] border border-[var(--border-color)]"
                  >
                    {lang === 'ar' ? 'تراجع' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    className={`flex-1 h-14 rounded-2xl font-black text-sm text-white shadow-lg ${confirmModal.type === 'stop' ? 'bg-amber-500 shadow-amber-500/20' : 'bg-red-500 shadow-red-500/20'}`}
                  >
                    {lang === 'ar' ? 'تأكيد' : 'Confirm'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Submit Proposal Modal */}
        <AnimatePresence>
          {proposalModal.show && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setProposalModal({ show: false, price: '', message: '' })}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-[var(--surface-color)] border border-[var(--border-color)] w-full max-w-sm rounded-[40px] p-8 shadow-2xl relative z-10 space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black text-[var(--text-primary)]">
                    {lang === 'ar' ? 'تفاصيل العرض' : 'Proposal Details'}
                  </h3>
                  <button
                    onClick={() => setProposalModal({ show: false, price: '', message: '' })}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-color)] text-[var(--text-secondary)]"
                  >
                    <XCircle size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest px-2">
                      {lang === 'ar' ? 'السعر المقترح (ج.م)' : 'Proposed Price (EGP)'}
                    </label>
                    <input
                      type="number"
                      value={proposalModal.price}
                      onChange={(e) => setProposalModal({ ...proposalModal, price: e.target.value })}
                      placeholder={lang === 'ar' ? 'مثال: 150' : 'e.g. 150'}
                      className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-primary)] h-14 rounded-2xl px-5 font-black placeholder:font-normal focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest px-2">
                      {lang === 'ar' ? 'رسالة للعميل' : 'Message to Client'}
                    </label>
                    <textarea
                      value={proposalModal.message}
                      onChange={(e) => setProposalModal({ ...proposalModal, message: e.target.value })}
                      placeholder={lang === 'ar' ? 'اكتب تفاصيل عرضك هنا...' : 'Write your proposal details here...'}
                      className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-primary)] h-28 rounded-2xl p-5 font-bold text-sm placeholder:font-normal focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitProposal}
                  className="w-full h-14 rounded-2xl font-black text-sm text-white bg-primary shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {lang === 'ar' ? 'إرسال العرض' : 'Send Proposal'}
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="pb-10" />
      </motion.div>
    </div>
  );
};

export default OrderDetails;

