import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Camera, Shield, Bell, HelpCircle, Zap, LogOut, ArrowRight, Check } from 'lucide-react';
import { demoData } from '../data';

const SettingsPage = () => {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: demoData.user.name,
      email: demoData.user.email,
      phone: demoData.user.phone || '01234567890',
      location: demoData.user.location || 'القاهرة'
    },
    notifications: {
      app: true,
      email: true,
      chat: true,
      orders: true
    },
    security: {
      biometric: false,
      twoFactor: true
    }
  });

  const updateProfile = (field, value) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const toggleSetting = (category, field) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: !prev[category][field] }
    }));
  };

  const saveSettings = () => {
    // Persist profile changes to localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const currentUserId = localStorage.getItem('userId') || 'u1';

    // Find or create user entry
    let userIndex = registeredUsers.findIndex(u => u.id === currentUserId);
    const updatedUser = {
      ...demoData.user,
      ...settings.profile,
      id: currentUserId
    };

    if (userIndex > -1) {
      registeredUsers[userIndex] = updatedUser;
    } else {
      registeredUsers.push(updatedUser);
    }

    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      window.location.reload(); // Reload to apply changes across app
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  const getTitle = () => {
    switch (id) {
      case 'profile': return t('account.editProfile');
      case 'pro-profile': return t('settings.proProfile');
      case 'notifications': return t('account.notifications');
      case 'security': return t('account.security');
      case 'help': return t('account.help');
      default: return t('account.settings');
    }
  };

  const title = getTitle();

  const Toggle = ({ label, active, onToggle }) => (
    <div className="flex justify-between items-center py-5 border-b border-[var(--border-color)] last:border-0">
      <span className="font-bold text-[var(--text-primary)] text-sm">{label}</span>
      <button
        onClick={onToggle}
        className={`w-14 h-8 rounded-full transition-all relative ${active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}
      >
        <motion.div
          animate={{ x: active ? (lang === 'ar' ? -28 : 28) : 0 }}
          className="absolute top-1 start-1 w-6 h-6 rounded-full bg-white shadow-md"
        />
      </button>
    </div>
  );

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden min-h-screen">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-8 flex-1 min-h-0 relative z-10"
      >
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-4">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">{title}</h2>
              <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
                {t('settings.desc')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[32px] md:rounded-[48px] p-5 md:p-8 shadow-2xl neo-shadow">
          {!id && (
            <div className="flex flex-col space-y-10">
              {/* GENERAL SECTION */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-4 opacity-70">
                  {t('settings.general')}
                </h3>
                <div className="flex flex-col space-y-3">
                  {[
                    { id: 'profile', label: t('account.editProfile'), icon: <Camera size={20} />, color: 'text-primary', bg: 'bg-primary/10' },
                    ...(localStorage.getItem('userRole') === 'craftsman' ? [{ id: 'pro-profile', label: t('settings.proProfile'), icon: <Zap size={20} />, color: 'text-indigo-500', bg: 'bg-indigo-500/10', labelDesc: t('settings.proProfileDesc') }] : []),
                    { id: 'notifications', label: t('account.notifications'), icon: <Bell size={20} />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  ].map((item) => (
                    <motion.div
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/settings/${item.id}`)}
                      className="flex items-center gap-5 p-5 rounded-[36px] bg-[var(--bg-color)] border border-[var(--border-color)] hover:border-primary/20 transition-all cursor-pointer group"
                    >
                      <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-black text-base text-[var(--text-primary)]">{item.label}</span>
                        <p className="text-[10px] text-[var(--text-secondary)] font-bold opacity-40 uppercase tracking-widest">{item.labelDesc || t('account.customize')}</p>
                      </div>
                      <ArrowRight size={18} className={`text-slate-300 group-hover:text-primary transition-colors ${lang === 'ar' ? 'rotate-180' : ''}`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SECURITY SECTION */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-4 opacity-70">
                  {t('settings.securityPrivacy')}
                </h3>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/settings/security')}
                  className="flex items-center gap-5 p-5 rounded-[36px] bg-[var(--bg-color)] border border-[var(--border-color)] hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <Shield size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="font-black text-base text-[var(--text-primary)]">{t('account.security')}</span>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">{t('settings.viewMore')}</p>
                  </div>
                  <ArrowRight size={18} className={`text-slate-300 group-hover:text-primary transition-colors ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </motion.div>
              </div>

              {/* HELP SECTION */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-4 opacity-70">
                  {t('settings.helpCenter')}
                </h3>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/settings/help')}
                  className="flex items-center gap-5 p-5 rounded-[36px] bg-[var(--bg-color)] border border-[var(--border-color)] hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <HelpCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="font-black text-base text-[var(--text-primary)]">{t('account.help')}</span>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">{t('settings.viewMore')}</p>
                  </div>
                  <ArrowRight size={18} className={`text-slate-300 group-hover:text-primary transition-colors ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </motion.div>
              </div>

              {/* LOGOUT */}
              <div className="pt-4 border-t border-dashed border-[var(--border-color)]">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex items-center gap-5 p-5 rounded-[36px] bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-red-500/10 group-hover:bg-white/20 text-red-500 group-hover:text-white rounded-2xl flex items-center justify-center shrink-0">
                    <LogOut size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="font-black text-base">{t('settings.logout')}</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-500 group-hover:text-white">{t('settings.viewMore')}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {(id === 'profile' || id === 'pro-profile' || id === 'notifications' || id === 'security') && (
            <div className="space-y-8">
              {id === 'profile' && (
                <div className="flex flex-col items-center gap-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[48px] border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                      <img src={demoData.user.image} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageData = event.target.result;
                            const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
                            const currentUserId = localStorage.getItem('userId') || 'u1';
                            let userIndex = registeredUsers.findIndex(u => u.id === currentUserId);
                            if (userIndex > -1) {
                              registeredUsers[userIndex].image = imageData;
                            } else {
                              registeredUsers.push({ id: currentUserId, image: imageData });
                            }
                            localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
                            window.location.reload();
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => document.getElementById('avatar-upload').click()}
                      className="absolute -bottom-2 -end-2 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-[var(--surface-color)] shadow-xl"
                    >
                      <Camera size={20} />
                    </motion.button>
                  </div>

                  <div className="w-full space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-3">{t('auth.fullName')}</label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                        className="w-full h-14 md:h-16 bg-[var(--surface-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-2xl md:rounded-[28px] px-5 outline-none font-black text-sm md:text-base transition-all text-[var(--text-primary)] shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-3">{t('auth.email')}</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        className="w-full h-14 md:h-16 bg-[var(--surface-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-2xl md:rounded-[28px] px-5 outline-none font-black text-sm md:text-base transition-all text-[var(--text-primary)] shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-3">{t('settings.phone')}</label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        className="w-full h-14 md:h-16 bg-[var(--surface-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-2xl md:rounded-[28px] px-5 outline-none font-black text-sm md:text-base transition-all text-[var(--text-primary)] shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-3">{t('auth.location') || (lang === 'ar' ? 'الموقع' : 'Location')}</label>
                      <input
                        type="text"
                        value={settings.profile.location}
                        onChange={(e) => updateProfile('location', e.target.value)}
                        className="w-full h-14 md:h-16 bg-[var(--surface-color)] border border-[var(--border-color)] focus:border-primary/50 rounded-2xl md:rounded-[28px] px-5 outline-none font-black text-sm md:text-base transition-all text-[var(--text-primary)] shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {id === 'notifications' && (
                <div className="flex flex-col gap-2">
                  <Toggle
                    label={t('settings.notifications.app')}
                    active={settings.notifications.app}
                    onToggle={() => toggleSetting('notifications', 'app')}
                  />
                  <Toggle
                    label={t('settings.notifications.email')}
                    active={settings.notifications.email}
                    onToggle={() => toggleSetting('notifications', 'email')}
                  />
                  <Toggle
                    label={t('settings.notifications.chat')}
                    active={settings.notifications.chat}
                    onToggle={() => toggleSetting('notifications', 'chat')}
                  />
                  <Toggle
                    label={t('settings.notifications.orders')}
                    active={settings.notifications.orders}
                    onToggle={() => toggleSetting('notifications', 'orders')}
                  />
                </div>
              )}

              {id === 'security' && (
                <div className="flex flex-col gap-6">
                  <Toggle
                    label={t('settings.security.biometric')}
                    active={settings.security.biometric}
                    onToggle={() => toggleSetting('security', 'biometric')}
                  />
                  <Toggle
                    label={t('settings.security.twoFactor')}
                    active={settings.security.twoFactor}
                    onToggle={() => toggleSetting('security', 'twoFactor')}
                  />
                  <div className="pt-6 border-t border-[var(--border-color)]">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">{t('settings.security.changePassword')}</h4>
                    <div className="space-y-4">
                      <input type="password" placeholder={t('settings.security.currentPassword')} className="w-full h-14 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl px-6 outline-none font-bold text-sm" />
                      <input type="password" placeholder={t('settings.security.newPassword')} className="w-full h-14 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl px-6 outline-none font-bold text-sm" />
                    </div>
                  </div>
                </div>
              )}

              {id === 'pro-profile' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2">{t('settings.pro.jobTitle')}</label>
                    <input
                      type="text"
                      defaultValue={t('settings.pro.plumber')}
                      className="w-full h-14 md:h-16 bg-[var(--bg-color)] border-2 border-[var(--border-color)] focus:border-primary/20 rounded-2xl md:rounded-[24px] px-5 outline-none font-bold text-sm md:text-base transition-all text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2">{t('settings.pro.bioLabel')}</label>
                    <textarea
                      rows={4}
                      defaultValue={t('craftsmen.bioFallback')}
                      className="w-full bg-[var(--bg-color)] border-2 border-[var(--border-color)] focus:border-primary/20 rounded-[24px] px-6 py-4 outline-none font-bold text-sm transition-all text-[var(--text-primary)]"
                    />
                  </div>
                </div>
              )}

              <div className="pt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={saveSettings}
                  className={`w-full h-14 md:h-16 rounded-[20px] md:rounded-[24px] font-black text-base md:text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${isSaved ? 'bg-emerald-500 text-white' : 'bg-primary text-white shadow-primary/20'}`}
                >
                  {isSaved ? (
                    <>
                      <Check size={24} />
                      <span>{t('settings.saved')}</span>
                    </>
                  ) : (
                    <span>{t('settings.save')}</span>
                  )}
                </motion.button>
              </div>
            </div>
          )}

          {id === 'help' && (
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                {[
                  { q: t('settings.help.q1'), a: t('settings.help.a1') },
                  { q: t('settings.help.q2'), a: t('settings.help.a2') },
                  { q: t('settings.help.q3'), a: t('settings.help.a3') }
                ].map((item, index) => (
                  <div key={index} className="p-6 bg-[var(--bg-color)] rounded-[32px] border border-[var(--border-color)]">
                    <h5 className="font-black text-sm text-[var(--text-primary)] mb-2">{item.q}</h5>
                    <p className="text-xs text-[var(--text-secondary)] font-bold opacity-60 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/settings/help')}
                className="w-full h-16 bg-[var(--surface-color)] text-[var(--text-primary)] border-2 border-[var(--border-color)] rounded-[24px] font-black text-sm flex items-center justify-center gap-3 shadow-xl"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <HelpCircle size={20} />
                </div>
                {t('settings.help.contact')}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;

