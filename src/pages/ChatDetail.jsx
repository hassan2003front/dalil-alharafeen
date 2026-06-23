import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Send, MoreVertical, Image as ImageIcon, Smile } from 'lucide-react';

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const scrollRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const chat = demoData.chats.find(c => c.id === id);
  const partnerId = chat?.participants.find(p => p !== demoData.user.id);
  const partner = demoData.users.find(u => u.id === partnerId) || demoData.craftsmen.find(m => m.id === partnerId);

  // Initialize messages from localStorage or demoData
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`chat_messages_${id}`);
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, text: chat?.lastMessage || t('chat.welcome') || "مرحباً! كيف يمكنني مساعدتك؟", sender: 'partner', time: '10:00 AM' }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMsg = {
          id: Date.now(),
          image: event.target.result,
          sender: 'me',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Polling for simulated messages
  useEffect(() => {
    const pollInterval = setInterval(() => {
      const saved = localStorage.getItem(`chat_messages_${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > messages.length) {
          setMessages(parsed);
        }
      }
    }, 2000);
    return () => clearInterval(pollInterval);
  }, [id, messages.length]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`chat_messages_${id}`, JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, id]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputText('');

    // Auto-reply logic
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const replies = [
          t('chat.replies.ok') || "تمام، جاري العمل على طلبك",
          t('chat.replies.working') || "سأكون هناك في الموعد المحدد",
          t('chat.replies.gotIt') || "فهمت التفاصيل، شكراً لك",
          t('chat.replies.welcome') || "أهلاً بك في أي وقت"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const replyMsg = {
          id: Date.now() + 1,
          text: randomReply,
          sender: 'partner',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, replyMsg]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const clearChat = () => {
    const initialMsg = [{ id: 1, text: t('chat.welcome') || "مرحباً! كيف يمكنني مساعدتك؟", sender: 'partner', time: '10:00 AM' }];
    setMessages(initialMsg);
    localStorage.setItem(`chat_messages_${id}`, JSON.stringify(initialMsg));
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[var(--bg-color)] overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -z-10" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full -ml-24 -z-10" />

      {/* Fixed Header with Partner Info */}
      <div className="h-20 glass border-b border-white/10 z-[1001] flex items-center px-4 shrink-0 relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl">
        <div className="w-full flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-primary transition-colors bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl shadow-sm"
          >
            <ChevronLeft size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </motion.button>

          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative shrink-0">
              <img
                src={partner?.image || `https://ui-avatars.com/api/?name=${partner?.name || 'U'}&background=random`}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-sm"
                alt={partner?.name}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="min-w-0">
              <h4 className="font-black text-[var(--text-primary)] text-sm truncate leading-tight">{partner?.name}</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-green-500 font-black uppercase tracking-wider">{t('chat.online') || 'متصل الآن'}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface-color)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-sm"
            >
              <MoreVertical size={18} />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-14 end-0 w-48 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  <button
                    onClick={clearChat}
                    className="w-full text-start px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
                  >
                    <span>{t('chat.clear') || 'مسح الدردشة'}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 space-y-6 scroll-smooth py-6 scrollbar-hide"
      >
        <div className="w-full flex flex-col gap-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${msg.image ? 'p-1' : 'px-4 py-2.5'} rounded-2xl shadow-sm relative group ${msg.sender === 'me'
                ? 'bg-primary text-white rounded-br-none'
                : 'bg-[var(--surface-color)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-bl-none'
                }`}>
                {/* Bubble Tail */}
                <div className={`absolute bottom-0 w-3 h-3 ${msg.sender === 'me'
                  ? '-right-1.5 bg-primary'
                  : '-left-1.5 bg-[var(--surface-color)] border-b border-l border-[var(--border-color)]'
                  }`} style={{ clipPath: msg.sender === 'me' ? 'polygon(0 0, 0% 100%, 100% 100%)' : 'polygon(100% 0, 0 100%, 100% 100%)' }} />

                {msg.image ? (
                  <div className="rounded-xl overflow-hidden">
                    <img src={msg.image} alt="Sent" className="w-full max-h-64 object-cover" />
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 block opacity-40 ${msg.sender === 'me' ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                      {msg.time}
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                    <span className={`text-[8px] font-black uppercase tracking-widest mt-1 block opacity-40 ${msg.sender === 'me' ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                      {msg.time}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-[var(--surface-color)] p-5 rounded-[28px] rounded-bl-none border border-[var(--border-color)] shadow-sm">
                <div className="flex gap-1.5">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area - Sticky Bottom Bar */}
      <div className="glass border-t border-white/10 px-4 pt-3 pb-8 shrink-0 z-[1000] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl">
        <div className="max-w-[600px] mx-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-11 h-11 bg-primary/10 text-primary rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shrink-0"
            >
              <ImageIcon size={20} />
            </motion.button>

            <div className="flex-1 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl flex items-center px-3 shadow-inner">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('chat.typeMessage') || 'اكتب رسالتك هنا...'}
                className="flex-1 h-11 bg-transparent outline-none font-bold text-sm text-[var(--text-primary)]"
              />
              <button type="button" className="p-2 text-[var(--text-secondary)] hover:text-primary transition-colors">
                <Smile size={20} />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!inputText.trim()}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0 ${inputText.trim() ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
            >
              <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;

