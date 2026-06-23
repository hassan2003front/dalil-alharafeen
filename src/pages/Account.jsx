import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import {
    Settings,
    Wallet,
    Clock,
    CheckCircle,
    XCircle,
    ChevronRight,
    Camera,
    Plus,
    Inbox,
    LogOut,
    HelpCircle,
    Shield,
    Star,
    MapPin,
    TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = ({ onLogout }) => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const { user, orders } = demoData;
    const [userImage, setUserImage] = useState(user.image);
    const [activeTab, setActiveTab] = useState('active');
    const [viewMode, setViewMode] = useState('client'); // 'client' or 'pro'
    const isCraftsman = localStorage.getItem('userRole') === 'craftsman';
    const fileInputRef = React.useRef(null);

    const [localOrders, setLocalOrders] = useState(() => {
        return JSON.parse(localStorage.getItem('demo_orders') || '[]');
    });

    useEffect(() => {
        const checkLocal = () => {
            const saved = JSON.parse(localStorage.getItem('demo_orders') || '[]');
            if (saved.length !== localOrders.length) {
                setLocalOrders(saved);
            }
        };
        const interval = setInterval(checkLocal, 3000);
        return () => clearInterval(interval);
    }, [localOrders.length]);

    const userOrders = useMemo(() => {
        const combined = [...localOrders, ...orders];
        if (viewMode === 'pro') {
            const craftId = user?.craftId || 'c1';
            return combined.filter(o => o.craftId === craftId);
        }
        return combined.filter(o => o.clientId === 'u1');
    }, [localOrders, orders, viewMode, user]);

    const filteredOrders = useMemo(() => {
        if (activeTab === 'active') return userOrders.filter(o => o.status === 'pending' || o.status === 'in_progress');
        if (activeTab === 'completed') return userOrders.filter(o => o.status === 'completed');
        if (activeTab === 'cancelled') return userOrders.filter(o => o.status === 'cancelled');
        return [];
    }, [userOrders, activeTab]);

    useEffect(() => {
        const savedImage = localStorage.getItem(`userImage_${user.id}`);
        if (savedImage) setUserImage(savedImage);
    }, [user.id]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target?.result;
                setUserImage(imageData);
                localStorage.setItem(`userImage_${user.id}`, imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const tabs = viewMode === 'client' ? [
        { id: 'active', label: t('account.activeRequests'), icon: <Clock size={16} /> },
        { id: 'completed', label: t('account.completedRequests'), icon: <CheckCircle size={16} /> },
        { id: 'cancelled', label: t('account.cancelledRequests'), icon: <XCircle size={16} /> },
    ] : [
        { id: 'active', label: t('account.inProgress'), icon: <TrendingUp size={16} /> },
        { id: 'completed', label: t('account.delivered'), icon: <CheckCircle size={16} /> },
        { id: 'cancelled', label: t('account.failed'), icon: <XCircle size={16} /> },
    ];

    return (
        <div className="page-container with-nav-padding pt-0 px-0 space-y-0 relative overflow-x-hidden min-h-screen">
            {/* Immersive Header */}
            <div className="relative h-[320px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 dark:bg-black">
                    <img
                        src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop"
                        className="w-full h-full object-cover opacity-60 dark:opacity-40 scale-110"
                        alt="Profile Backdrop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-[var(--bg-color)]" />
                </div>

                <div className="absolute top-8 left-6 right-6 flex justify-between items-center z-20">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/settings')}
                        className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-[var(--text-primary)]"
                    >
                        <Settings size={22} />
                    </motion.button>
                </div>

                <div className="absolute -bottom-1 inset-x-0 flex flex-col items-center">
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 rounded-[44px] border-[8px] border-[var(--surface-color)] shadow-2xl overflow-hidden relative z-10"
                        >
                            <img src={userImage} alt={user.name} className="w-full h-full object-cover" />
                        </motion.div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 -right-1 w-11 h-11 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-[var(--surface-color)] shadow-xl z-20 hover:scale-110 transition-transform"
                        >
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="mt-4 text-center space-y-1 pb-6">
                        <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{user.name}</h2>
                        <div className="flex flex-col items-center justify-center gap-2">
                            {user.role === 'craftsman' && (
                                <div className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-wider">
                                    {lang === 'ar'
                                        ? (user.craftNameAr || demoData.crafts.find(c => c.id === user.craftId)?.nameAr)
                                        : (user.craftNameEn || demoData.crafts.find(c => c.id === user.craftId)?.nameEn)}
                                </div>
                            )}
                            <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest opacity-60">
                                <MapPin size={12} className="text-primary" /> {user.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

            {/* Main Content Area */}
            <div className="px-6 space-y-10 pt-4">
                {/* Toggle View for Craftsman */}
                {isCraftsman && (
                    <div className="bg-[var(--surface-color)] p-1.5 rounded-3xl border border-[var(--border-color)] flex gap-2 shadow-inner">
                        <button
                            onClick={() => setViewMode('client')}
                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'client' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-[var(--text-secondary)] opacity-40'}`}
                        >
                            {t('account.personalRequests')}
                        </button>
                        <button
                            onClick={() => setViewMode('pro')}
                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'pro' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-[var(--text-secondary)] opacity-40'}`}
                        >
                            {t('account.professionalJobs')}
                        </button>
                    </div>
                )}

                {/* Requests Section */}
                <div className="space-y-6">
                    {/* <div className="flex justify-between items-end px-1">
                <div>
                    <h3 className="text-xl font-black text-[var(--text-primary)]">{lang === 'ar' ? 'طلباتي' : 'My Requests'}</h3>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">{lang === 'ar' ? 'تابع حالة طلباتك الحالية' : 'TRACK YOUR ACTIVE JOBS'}</p>
                </div>
                {activeTab === 'active' && filteredOrders.length > 0 && (
                     <button onClick={() => navigate('/request/new')} className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-sm">
                        <Plus size={20} />
                    </button>
                )}
            </div> */}

                    <div className="flex border-b border-[var(--border-color)]">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 pb-4 pt-2 text-[10px] sm:text-xs font-black transition-all uppercase tracking-widest relative ${activeTab === tab.id ? 'text-primary' : 'text-[var(--text-secondary)] opacity-60 hover:opacity-100'}`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div layoutId="account-tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(99,102,241,0.5)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {filteredOrders.length > 0 ? (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    {filteredOrders.map((order) => (
                                        <motion.div
                                            key={order.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => navigate(`/order/${order.id}`)}
                                            className="bg-[var(--surface-color)] p-5 rounded-[40px] border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex justify-between items-center relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-[var(--bg-color)] text-primary rounded-[20px] flex items-center justify-center shrink-0 shadow-inner">
                                                    <Inbox size={24} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-black text-base text-[var(--text-primary)] truncate max-w-[150px]">{order.title}</h4>
                                                    <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] font-bold opacity-60">
                                                        <span>{order.date}</span>
                                                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                        <span className="text-primary">{t('order.priceOnInspection')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-2xl bg-[var(--bg-color)] flex items-center justify-center text-[var(--text-secondary)] opacity-40 group-hover:bg-primary group-hover:text-white group-hover:opacity-100 transition-all shadow-sm">
                                                <ChevronRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-24 h-24 bg-primary/5 rounded-[48px] flex items-center justify-center text-primary/20">
                                        <Inbox size={48} />
                                    </div>
                                    <div className="space-y-2 px-10">
                                        <h3 className="text-xl font-black text-[var(--text-primary)]">{t('account.noRequests')}</h3>
                                        <p className="text-xs text-[var(--text-secondary)] font-bold opacity-60 leading-relaxed">
                                            {t('account.noRequestsDesc')}
                                        </p>
                                    </div>
                                    {activeTab === 'active' && (
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate('/request/new')}
                                            className="px-10 h-14 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 flex items-center gap-3"
                                        >
                                            <Plus size={20} />
                                            {t('home.newRequest')}
                                        </motion.button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Account;

