import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Mail, MessageCircle, Send, Link2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from '../../components/SEO';

// ── EmailJS Configuration ─────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_m9dm7rx';
const EMAILJS_TEMPLATE_ID = 'template_6kgqgsi';
const EMAILJS_PUBLIC_KEY = 'ADy1G7-h7rjO-W7sl';
// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
  const { t, lang } = useLanguage();
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "تواصل معنا",
    "description": "تواصل مع فريق دليل الحرفيين لأي استفسار أو اقتراح",
    "publisher": {
      "@type": "Organization",
      "name": "دليل الحرفيين",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dalil-marketing.vercel.app/favicon.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+201211810733",
        "contactType": "customer service",
        "areaServed": "EG",
        "availableLanguage": ["Arabic", "English"],
        "email": "dalilalharafeen@gmail.com"
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      })
      .catch(() => {
        // Fallback: open mailto
        const form = formRef.current;
        const name = form.from_name?.value || '';
        const email = form.from_email?.value || '';
        const message = form.message?.value || '';
        window.location.href = `mailto:dalilalharafeen@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
        setSubmitted(true);
        setIsSubmitting(false);
      });
  };

  const contactItems = [
    { icon: <MapPin className="w-7 h-7" />, bg: 'bg-blue-500', titleKey: 'contact.office', descKey: 'contact.officeValue' },
    { icon: <Link2 className="w-7 h-7" />, bg: 'bg-blue-600', titleKey: 'contact.linkedin', descKey: 'contact.linkedinValue', link: 'https://linkedin.com' },
    { icon: <Mail className="w-7 h-7" />, bg: 'bg-purple-500', titleKey: 'contact.email', descKey: 'contact.emailValue', link: 'mailto:dalilalharafeen@gmail.com' },
    { icon: <MessageCircle className="w-7 h-7" />, bg: 'bg-orange-500', titleKey: 'contact.hours', descKey: 'contact.hoursValue' },
  ];

  return (
    <>
      <SEO
        title="تواصل معنا"
        description="تواصل مع فريق دليل الحرفيين لأي استفسار أو اقتراح. نحن هنا لمساعدتك في العثور على أفضل الحرفيين في مصر."
        url="https://dalil-marketing.vercel.app/contact"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white dark:bg-slate-950 overflow-y-auto pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 dark:from-slate-950 dark:to-slate-900 pt-20 pb-20 overflow-hidden text-center">
        <motion.div
          animate={{ x: [0, 80, -80, 0], y: [0, -80, 80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"
        />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-teal-400 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-4"
          >
            {t('contact.title')}
          </motion.h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            {t('contact.subtitle')}
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-slate-950 pointer-events-none" />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 p-8 shadow-2xl border border-white/10">
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-white mb-2">{t('contact.talkTitle')}</h2>
                <p className="text-slate-400 text-lg">{t('contact.talkSubtitle')}</p>
              </div>
            </div>

            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-5 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800"
              >
                <div className={`w-14 h-14 ${item.bg} text-white rounded-2xl flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-lg">{t(item.titleKey)}</h3>
                  {item.link ? (
                    <a href={item.link} className="text-blue-600 dark:text-blue-400 hover:underline">{t(item.descKey)}</a>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">{t(item.descKey)}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Panel - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-16 space-y-6">
                  <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Send size={40} />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white">{t('contact.successTitle')}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400">{t('contact.successDesc')}</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">{t('contact.formTitle')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('contact.form.name')}</label>
                      <input type="text" name="from_name" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all" placeholder={t('contact.form.namePlaceholder')} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('contact.form.email')}</label>
                      <input type="email" name="from_email" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all" placeholder={t('contact.form.emailPlaceholder')} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('contact.form.message')}</label>
                    <textarea name="message" rows={6} required className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-primary outline-none transition-all resize-none" placeholder={t('contact.form.messagePlaceholder')} />
                  </div>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full h-16 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? '...' : <><Send size={20} /> {t('contact.form.submit')}</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
