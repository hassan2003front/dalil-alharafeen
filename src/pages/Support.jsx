import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Send, User, MessageCircle, Info, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, text: t('support.welcome'), sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setIsTyping(false);
            const aiMsg = {
                id: Date.now() + 1,
                text: t('support.response'),
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 2000);
    };

    return (
        <div className="page-container h-[calc(100vh-144px)] flex flex-col bg-[var(--bg-color)] relative overflow-hidden px-4 md:px-6">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-0" />

            {/* Header */}
            <div className="pt-8 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-[var(--surface-color)] rounded-xl flex items-center justify-center border border-[var(--border-color)] text-[var(--text-primary)]"
                    >
                        <ChevronRight size={20} className={lang === 'en' ? 'rotate-180' : ''} />
                    </motion.button>
                    <div className="space-y-0.5">
                        <h2 className="text-xl font-black text-[var(--text-primary)]">{t('account.help')}</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{t('support.online')}</span>
                        </div>
                    </div>
                </div>
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                    <Info size={20} />
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-1 py-6 space-y-6 scrollbar-hide relative z-10"
            >
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-[var(--surface-color)] text-primary border border-[var(--border-color)]'}`}>
                                    {msg.sender === 'user' ? <User size={16} /> : <Zap size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl text-sm font-bold shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-[var(--surface-color)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="bg-[var(--surface-color)] p-4 rounded-2xl rounded-tl-none border border-[var(--border-color)] flex gap-1">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[32px] mb-4 mx-1 flex items-center gap-3 shadow-xl relative z-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t('support.placeholder')}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-[var(--text-primary)] placeholder:opacity-40"
                />
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    className="w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
                >
                    <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                </motion.button>
            </div>
        </div>
    );
};

export default Support;

