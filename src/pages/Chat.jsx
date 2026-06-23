import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { Search, CheckCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { user, craftsmen, users } = demoData;

  const [activeChats, setActiveChats] = React.useState(() => {
    const saved = JSON.parse(localStorage.getItem('demo_chats') || '[]');
    // Merge with demoData.chats if not already present
    const combined = [...saved];
    demoData.chats.forEach(c => {
      if (!combined.find(savedChat => savedChat.id === c.id)) {
        combined.push(c);
      }
    });
    return combined;
  });

  React.useEffect(() => {
    const checkChats = () => {
      const saved = JSON.parse(localStorage.getItem('demo_chats') || '[]');
      const combined = [...saved];
      demoData.chats.forEach(c => {
        if (!combined.find(savedChat => savedChat.id === c.id)) {
          combined.push(c);
        }
      });
      setActiveChats(combined);
    };

    const interval = setInterval(checkChats, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPartner = (chat) => {
    const pId = chat.participants.find(id => id !== user.id);
    return users.find(u => u.id === pId) || craftsmen.find(m => m.id === pId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container with-nav-padding pt-8 space-y-8 relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-[120px] rounded-full -mr-36 -mt-36 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[150px] rounded-full -z-10" />

      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
          {t('chat.title')}
        </h2>
        <p className="text-[var(--text-secondary)] font-bold text-sm">
          {t('chat.desc')}
        </p>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 start-4 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
          <Search size={22} />
        </div>
        <input
          type="text"
          placeholder={t('chat.search')}
          className="w-full h-16 bg-[var(--surface-color)] border-2 border-transparent focus:border-primary/20 focus:bg-[var(--bg-color)] rounded-3xl ps-14 pe-6 text-base font-bold shadow-sm transition-all outline-none text-[var(--text-primary)]"
        />
      </div>

      <div className="flex flex-col space-y-4">
        {activeChats.map((chat) => {
          const partner = getPartner(chat);
          return (
            <motion.div
              key={chat.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="flex items-center gap-5 p-6 rounded-[48px] bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-primary/20 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-[32px] overflow-hidden border-4 border-[var(--bg-color)] shadow-xl group-hover:scale-105 transition-transform bg-white dark:bg-slate-800">
                  <img
                    src={partner?.image}
                    className="w-full h-full object-cover"
                    alt={partner?.name}
                  />
                </div>
                {chat.unreadCount > 0 && (
                  <span className="absolute -top-1 -end-1 w-7 h-7 bg-primary text-white text-[11px] font-black rounded-full flex items-center justify-center border-4 border-[var(--bg-color)] shadow-xl z-10">
                    {chat.unreadCount}
                  </span>
                )}
                {partner?.online && (
                  <span className="absolute -bottom-1 -end-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[var(--bg-color)] z-10 shadow-sm" />
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5 relative z-10">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-black text-lg text-[var(--text-primary)] truncate group-hover:text-primary transition-colors tracking-tight">{partner?.name}</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60 bg-[var(--bg-color)] px-2 py-0.5 rounded-full border border-[var(--border-color)]">{chat.lastTime}</span>
                </div>

                <p className={`text-sm truncate leading-snug tracking-tight ${chat.unreadCount > 0 ? 'text-[var(--text-primary)] font-black' : 'text-[var(--text-secondary)] font-bold opacity-50'}`}>
                  {chat.lastMessage}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCheck size={16} className={`${chat.unreadCount > 0 ? 'text-slate-300' : 'text-primary'} opacity-80`} />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-40">
                      {t('chat.since')} {chat.lastTime}
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[var(--bg-color)] text-slate-300 group-hover:bg-primary group-hover:text-white transition-all border border-[var(--border-color)] group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                    <ChevronRight size={20} className={`${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Chat;

