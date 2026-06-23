import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Wrench, Shield, Clock, Sparkles, Smartphone, Heart, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { AnimatedCard } from '../../components/ui/AnimatedCard';
import { Link } from 'react-router-dom';
import { APP_DOWNLOAD_LINK } from '../../config';
const Home = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    return (
        <>
            <Helmet>
                <title>{t('seo.homeTitle')}</title>
                <meta name="description" content={t('seo.homeDesc')} />
                <meta property="og:title" content={t('seo.homeTitle')} />
                <meta property="og:description" content={t('seo.homeDesc')} />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:url" content="https://dalil-marketing.vercel.app/" />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "url": "https://dalil-marketing.vercel.app/",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://dalil-marketing.vercel.app/services?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                })}
                </script>
            </Helmet>

            {/* Hero Section — The "About" style gradient */}
            <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 dark:from-slate-950 dark:to-slate-900 pt-32 pb-32 overflow-hidden">
                <motion.div
                    animate={{ x: [0, 80, -80, 0], y: [0, -60, 60, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 pointer-events-none"
                />
                <motion.div
                    animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 pointer-events-none"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-teal-300" />
                            <span className="text-sm font-bold tracking-wide uppercase">{t('hero.badge')}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[1.1]"
                        >
                            {t('hero.title')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-medium leading-relaxed"
                        >
                            {t('hero.subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
                        >
                            <Link to="/services">
                                <Button size="lg" className="w-full sm:w-auto gap-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xl text-xl py-4 px-10 h-auto rounded-2xl">
                                    {t('hero.cta')}
                                    <ArrowRight className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
                                </Button>
                            </Link>
                            <a href={APP_DOWNLOAD_LINK} download target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 text-xl py-4 px-10 h-auto rounded-2xl">
                                    {t('nav.workers')}
                                </Button>
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", bounce: 0.4, duration: 1.2, delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-20 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 group">
                            <img
                                src="WhatsApp Image 2026-05-03 at 12.48.46 AM.jpeg"
                                alt="Craftsman Quality"
                                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                        </div>
                    </motion.div>
                </div>

                {/* Smooth transition fade */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900 pointer-events-none" />
            </section>

            {/* App Preview Section — New Addition */}
            <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <motion.h2
                                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight"
                            >
                                {t('home.app.title')}
                            </motion.h2>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {t('home.app.subtitle')}
                            </p>
                            <ul className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <motion.li
                                        key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-teal-400">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{t(`home.app.feature${i}`)}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 relative">
                            <motion.div
                                initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
                                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative z-10"
                            >
                                <img
                                    src="home.png"
                                    alt="App UI Preview"
                                    className="rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.4)] border-4 border-slate-200 dark:border-slate-800"
                                />
                            </motion.div>
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            {t('home.stats.title')}
                        </h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                            {t('home.stats.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatedCard delay={0.1} className="p-10 border-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8">
                                <Smartphone className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t('home.features.items.speed.title')}</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{t('home.features.items.speed.desc')}</p>
                        </AnimatedCard>

                        <AnimatedCard delay={0.2} className="p-10 border-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl">
                            <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-8">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t('home.features.items.verified.title')}</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{t('home.features.items.verified.desc')}</p>
                        </AnimatedCard>

                        <AnimatedCard delay={0.3} className="p-10 border-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl">
                            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-8">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{t('home.features.items.quality.title')}</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{t('home.features.items.quality.desc')}</p>
                        </AnimatedCard>
                    </div>
                </div>
            </section>

            {/* FAQ Section — New Addition */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            {t('home.faq.title')}
                        </h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                            {t('home.faq.subtitle')}
                        </p>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                            >
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                    {t(`home.faq.q${i}`)}
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {t(`home.faq.a${i}`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission / Why we build this */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 md:p-20 shadow-2xl border border-slate-100 dark:border-slate-800"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                            {t('home.testimonials.title')}
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-12">
                            {t('home.testimonials.subtitle')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-10">
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-black text-blue-600 dark:text-teal-400 mb-1">01</div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('home.cta.values.transparency')}</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-black text-blue-600 dark:text-teal-400 mb-1">02</div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('home.cta.values.security')}</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-black text-blue-600 dark:text-teal-400 mb-1">03</div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('home.cta.values.growth')}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section — New Addition */}
            <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            {t('home.gallery.title')}
                        </h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400">{t('home.gallery.subtitle')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "WhatsApp Image 2026-05-03 at 12.48.44 AM (1).jpeg",
                            "WhatsApp Image 2026-05-03 at 12.48.44 AM (2).jpeg",
                            "WhatsApp Image 2026-05-03 at 12.48.44 AM (3).jpeg",
                            "WhatsApp Image 2026-05-03 at 12.48.44 AM.jpeg",
                            "WhatsApp Image 2026-05-03 at 12.48.45 AM (1).jpeg",
                            "WhatsApp Image 2026-05-03 at 12.48.45 AM (2).jpeg",
                            "WhatsApp Image 2026-05-03 at 12.48.45 AM.jpeg",
                            "WhatsApp Image 2026-05-03 at 12.48.46 AM.jpeg"
                        ].map((src, i) => (
                            <motion.div
                                key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="group relative aspect-video rounded-3xl overflow-hidden shadow-lg"
                            >
                                <img src={src} alt={t('home.gallery.alt')} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;
