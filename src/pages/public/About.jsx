import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Users, Shield, Sparkles, Star, Eye, BookOpen } from 'lucide-react';
import SEO from '../../components/SEO';

const About = () => {
  const { t } = useTranslation();
  const teamMembers = t('about.members', { returnObjects: true }) || [];
  const journeyItems = t('about.journey', { returnObjects: true }) || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "عن دليل الحرفيين",
    "description": "تعرف على فريق دليل الحرفيين ورؤيتنا ورسالتنا في تقديم أفضل خدمات الصيانة المنزلية في مصر",
    "publisher": {
      "@type": "Organization",
      "name": "دليل الحرفيين",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dalil-marketing.vercel.app/favicon.png"
      }
    }
  };

  const getMemberImage = (name) => {
    const manNames = [
      "محمد أحمد  المشد", "Mohamed Ahmed El-Mashad",
      "حسن محمد عبد العاطي ", "Hassan Mohamed Abdel-Aty",
      "عبدالوهاب إدريس الحسنين", "Abdel-Wahab Idriss El-Hassanein"
    ];
    const girlNames = [
      "هبة الله محمد برغش", "Heba-Allah Mohamed Barghash",
      "سما محمد بدر", "Sama Mohamed Badr",
      "نورهان أشرف البسيوني", "Nourhan Ashraf El-Bassiouny"
    ];

    if (manNames.includes(name)) return "/founder-man.png";
    if (girlNames.includes(name)) return "/founder-girl.png";
    return null;
  };

  return (
    <>
      <SEO
        title="عن دليل الحرفيين"
        description="تعرف على فريق دليل الحرفيين ورؤيتنا ورسالتنا في تقديم أفضل خدمات الصيانة المنزلية في مصر. نبني الثقة من خلال الجودة والامان."
        url="https://dalil-marketing.vercel.app/about"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Hero — works in both light and dark mode */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 dark:from-slate-950 dark:to-slate-900 pt-32 pb-28 overflow-hidden">
        <motion.div animate={{ x: [0, 80, -80, 0], y: [0, -60, 60, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-700 rounded-full mix-blend-multiply filter blur-[140px] opacity-30 pointer-events-none" />
        <motion.div animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-600 rounded-full mix-blend-multiply filter blur-[140px] opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
            {t('about.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            {t('about.description')}
          </motion.p>
        </div>
        {/* fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-b from-transparent to-white dark:to-slate-950 pointer-events-none" />
      </section>

      {/* Re-adding decorative image */}
      <section className="bg-white dark:bg-slate-900 pt-10 px-4">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800"
          >
            <img
              src="/about-hero.png"
              alt="فريق دليل الحرفيين يعملون معاً على تطوير المنصة"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section — No Emojis */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-16">{t('about.valuesTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { key: 'trust', icon: <Shield className="w-12 h-12" />, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
              { key: 'integrity', icon: <Sparkles className="w-12 h-12" />, color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20' },
              { key: 'excellence', icon: <Star className="w-12 h-12" />, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' }
            ].map((v, i) => (
              <motion.div key={v.key}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="space-y-6 flex flex-col items-center"
              >
                <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center ${v.color}`}>
                  {v.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t(`about.values.${v.key}`)}</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xs">{t(`about.values.${v.key}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Story */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-10">
              {[
                { key: 'vision', icon: <Eye className="w-7 h-7 text-white" />, color: 'from-blue-500 to-cyan-400' },
                { key: 'story', icon: <BookOpen className="w-7 h-7 text-white" />, color: 'from-teal-500 to-emerald-400' },
              ].map(({ key, icon, color }, i) => (
                <motion.div key={key}
                  initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', bounce: 0.4, delay: i * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-700"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-md`}>
                    {icon}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{t(`about.${key}`)}</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{t(`about.${key}Desc`)}</p>
                </motion.div>
              ))}
            </div>

            {/* Rolling/Laughing Icon Section */}
            <div className="flex flex-col items-center justify-center space-y-8 py-10">
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 15, 0, 360],
                  x: [0, 10, -10, 10, 0, 80, -80, 0],
                  y: [0, -10, 10, -10, 0, -30, 0],
                  scale: [1, 1.1, 0.9, 1.2, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-40 h-40 bg-gradient-to-br from-blue-600 to-teal-400 rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(13,148,136,0.4)] border-8 border-white/20"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Users className="w-20 h-20 text-white" />
                </motion.div>
              </motion.div>
              <div className="text-center">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{t('about.team')}</h3>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xs">{t('about.teamDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section — Professional Timeline */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{t('about.journeyTitle')}</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400">{t('about.journeySubtitle')}</p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-teal-400 to-purple-500 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-20">
              {journeyItems && journeyItems.map((item, i) => {
                const side = i % 2 === 0 ? 'left' : 'right';
                return (
                  <div key={i} className={`flex items-center justify-between w-full ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block w-5/12" />
                    <div className="z-20 flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-full border-4 border-blue-500 shadow-xl">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="w-full md:w-5/12 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800"
                    >
                      <span className="text-blue-600 dark:text-teal-400 font-black text-2xl">{item.year}</span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2 mb-3">{item.title}</h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section — Updated with provided images */}
      {teamMembers && teamMembers.length > 0 && (
        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ type: 'spring', bounce: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/40 dark:to-teal-900/40 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                    {getMemberImage(member.name) ? (
                      <img 
                        src={getMemberImage(member.name)} 
                        alt={`${member.name} - عضو مؤسس في دليل الحرفيين`} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <Users className="w-10 h-10 text-blue-600 dark:text-teal-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-teal-400 text-sm font-black justify-center">
                      <Users className="w-4 h-4 shrink-0" />
                      {t('about.foundingMember')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
    </>
  );
};

export default About;
