import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Clock, CheckCircle2, XCircle, ChevronRight, MessageSquare, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { demoData } from '../data';

const ProposalsHistory = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const currentUserId = localStorage.getItem('userId') || 'm1';
    const craftId = demoData.user?.craftId || 'c1';

    const getProposalsForCraft = (craftId, lang, currentUserId) => {
      switch (craftId) {
        case 'c1': // Plumbing
          return [
            {
              id: 'prop_mock_1',
              orderId: 'o1',
              clientId: 'u1',
              craftsmanId: currentUserId,
              price: 'inspection',
              message: lang === 'ar' ? 'قرأت تفاصيل طلبك وجاهز للحضور غداً لتحديد تكلفة المواد وبدء العمل.' : 'I read your request details and I am ready to come tomorrow to estimate the materials and start working.',
              status: 'pending',
              date: lang === 'ar' ? '١٥/٥/٢٠٢٦' : '15/5/2026',
              title: lang === 'ar' ? 'تأسيس سباكة حمام جديد بالكامل' : 'Plumbing installation for a new bathroom'
            },
            {
              id: 'prop_mock_2',
              orderId: 'o2',
              clientId: 'u2',
              craftsmanId: currentUserId,
              price: 250,
              message: lang === 'ar' ? 'سعر الخدمة ٢٥٠ ج.م شاملة المصنعية مع ضمان لمدة ٦ أشهر على التركيب.' : 'The service price is 250 EGP including labor with a 6-month warranty on installation.',
              status: 'accepted',
              date: lang === 'ar' ? '١٢/٥/٢٠٢٦' : '12/5/2026',
              title: lang === 'ar' ? 'إصلاح تسريب مياه خلف الحوض' : 'Repairing water leak behind the sink'
            },
            {
              id: 'prop_mock_3',
              orderId: 'o3',
              clientId: 'u3',
              craftsmanId: currentUserId,
              price: 150,
              message: lang === 'ar' ? 'أهلاً بك، جاهز لتنفيذ طلبك فوراً بأحدث الأدوات لضمان أعلى جودة.' : 'Welcome, I am ready to execute your request immediately using the latest tools to ensure top quality.',
              status: 'rejected',
              date: lang === 'ar' ? '١٠/٥/٢٠٢٦' : '10/5/2026',
              title: lang === 'ar' ? 'تركيب خلاط مياه وتغيير محابس' : 'Installing water mixer and changing valves'
            }
          ];
        case 'c2': // Electrical
          return [
            {
              id: 'prop_mock_1',
              orderId: 'o1',
              clientId: 'u1',
              craftsmanId: currentUserId,
              price: 'inspection',
              message: lang === 'ar' ? 'مستعد للحضور لمعاينة وتخطيط لوحة المفاتيح والشبكة بالكامل.' : 'I am ready to come inspect and plan the panel and full network.',
              status: 'pending',
              date: lang === 'ar' ? '١٥/5/٢٠٢٦' : '15/5/2026',
              title: lang === 'ar' ? 'تأسيس شبكة كهرباء شقة كاملة' : 'Complete Apartment Wiring Installation'
            },
            {
              id: 'prop_mock_2',
              orderId: 'o2',
              clientId: 'u2',
              craftsmanId: currentUserId,
              price: 300,
              message: lang === 'ar' ? 'السعر ٣٠٠ ج.م لتغيير المفاتيح وتأمين التوصيلات مع ضمان الأمان.' : 'Price is 300 EGP to replace switches and secure connections with safety guarantee.',
              status: 'accepted',
              date: lang === 'ar' ? '١٢/5/٢٠٢٦' : '12/5/2026',
              title: lang === 'ar' ? 'تغيير مفاتيح كهرباء تالفة وتأمين توصيلات' : 'Replacing Damaged Electrical Switches'
            },
            {
              id: 'prop_mock_3',
              orderId: 'o3',
              clientId: 'u3',
              craftsmanId: currentUserId,
              price: 100,
              message: lang === 'ar' ? 'تركيب النجفة بدقة متناهية مع ضبط الاتزان والتحميل.' : 'Chandelier installation with perfect balance and load testing.',
              status: 'rejected',
              date: lang === 'ar' ? '١٠/5/٢٠٢٦' : '10/5/2026',
              title: lang === 'ar' ? 'تركيب نجفة كريستال كبيرة بالريسبشن' : 'Installing Large Crystal Chandelier'
            }
          ];
        case 'c3': // Carpentry
          return [
            {
              id: 'prop_mock_1',
              orderId: 'o1',
              clientId: 'u1',
              craftsmanId: currentUserId,
              price: 'inspection',
              message: lang === 'ar' ? 'أهلاً بك، يمكنني الحضور وتفصيل وتصميم المكتبة كما في الكتالوج.' : 'Welcome, I can come design and custom-build the library as in the catalog.',
              status: 'pending',
              date: lang === 'ar' ? '١٥/5/٢٠٢٦' : '15/5/2026',
              title: lang === 'ar' ? 'تصميم وتركيب مكتبة خشبية كلاسيك' : 'Designing and Installing Classic Wooden Library'
            },
            {
              id: 'prop_mock_2',
              orderId: 'o2',
              clientId: 'u2',
              craftsmanId: currentUserId,
              price: 450,
              message: lang === 'ar' ? 'سعر التركيب وتعديل المفصلات ٤٥٠ ج.م للغرفة كاملة.' : 'Installation and hinge adjustment is 450 EGP for the entire room.',
              status: 'accepted',
              date: lang === 'ar' ? '١٢/5/٢٠٢٦' : '12/5/2026',
              title: lang === 'ar' ? 'فك وتركيب غرفة نوم كاملة' : 'Dismantling and Assembling Master Bedroom'
            },
            {
              id: 'prop_mock_3',
              orderId: 'o3',
              clientId: 'u3',
              craftsmanId: currentUserId,
              price: 120,
              message: lang === 'ar' ? 'تغيير قلب الباب وتزييت الكوالين ليعمل بسلاسة.' : 'Changing lock core and oiling locks to work smoothly.',
              status: 'rejected',
              date: lang === 'ar' ? '١٠/5/٢٠٢٦' : '10/5/2026',
              title: lang === 'ar' ? 'إصلاح كالون باب وتغيير قلب المفتاح' : 'Repairing Door Lock and Key Core'
            }
          ];
        case 'c4': // Painting
          return [
            {
              id: 'prop_mock_1',
              orderId: 'o1',
              clientId: 'u1',
              craftsmanId: currentUserId,
              price: 'inspection',
              message: lang === 'ar' ? 'معاينة مجانية للمساحات ونقاش الألوان قبل البدء.' : 'Free inspection of areas and color coordination discussion before starting.',
              status: 'pending',
              date: lang === 'ar' ? '١٥/5/٢٠٢٦' : '15/5/2026',
              title: lang === 'ar' ? 'دهان شقة كاملة بأسلوب حديث وجذاب' : 'Painting Entire Apartment with Modern Design'
            },
            {
              id: 'prop_mock_2',
              orderId: 'o2',
              clientId: 'u2',
              craftsmanId: currentUserId,
              price: 800,
              message: lang === 'ar' ? 'السعر يشمل معالجة الرطوبة والتقشير مع الدهان الأساسي.' : 'Price includes humidity treatment, peeling fix, and primary painting.',
              status: 'accepted',
              date: lang === 'ar' ? '١٢/5/٢٠٢٦' : '12/5/2026',
              title: lang === 'ar' ? 'معالجة رطوبة ودهان غرف النوم' : 'Humidity Treatment and Painting Bedrooms'
            },
            {
              id: 'prop_mock_3',
              orderId: 'u3',
              craftsmanId: currentUserId,
              price: 200,
              message: lang === 'ar' ? 'نقاشة باب الشقة وتجديد رونقه بأجود خامات الدهان.' : 'Painting apartment main door and renewing its shine using premium paints.',
              status: 'rejected',
              date: lang === 'ar' ? '١٠/5/٢٠٢٦' : '10/5/2026',
              title: lang === 'ar' ? 'تجديد دهان باب الشقة الخشبي الخارجي' : 'Renewing Exterior Wooden Door Paint'
            }
          ];
        default:
          return [
            {
              id: 'prop_mock_1',
              orderId: 'o1',
              clientId: 'u1',
              craftsmanId: currentUserId,
              price: 'inspection',
              message: lang === 'ar' ? 'مستعد للمعاينة وتحديد التفاصيل بدقة.' : 'Ready to inspect and determine details accurately.',
              status: 'pending',
              date: lang === 'ar' ? '١٥/5/٢٠٢٦' : '15/5/2026',
              title: lang === 'ar' ? 'طلب صيانة وخدمة فنية مخصصة' : 'Custom Maintenance and Technical Service'
            },
            {
              id: 'prop_mock_2',
              orderId: 'o2',
              clientId: 'u2',
              craftsmanId: currentUserId,
              price: 200,
              message: lang === 'ar' ? 'جاهز للتنفيذ الفوري مع ضمان الجودة.' : 'Ready for immediate execution with quality guarantee.',
              status: 'accepted',
              date: lang === 'ar' ? '١٢/5/٢٠٢٦' : '12/5/2026',
              title: lang === 'ar' ? 'تصليح وصيانة قطع منزلية تالفة' : 'Repairing Damaged Household Items'
            },
            {
              id: 'prop_mock_3',
              orderId: 'u3',
              clientId: 'u3',
              craftsmanId: currentUserId,
              price: 150,
              message: lang === 'ar' ? 'توفير أفضل المواد والتركيب السريع.' : 'Providing best materials and fast installation.',
              status: 'rejected',
              date: lang === 'ar' ? '١٠/5/٢٠٢٦' : '10/5/2026',
              title: lang === 'ar' ? 'صيانة طارئة وفورية للمنزل' : 'Emergency Home Maintenance'
            }
          ];
      }
    };

    const defaultProposals = getProposalsForCraft(craftId, lang, currentUserId);

    const saved = JSON.parse(localStorage.getItem('demo_proposals') || '[]')
      .filter(p => p.craftsmanId === currentUserId)
      .map(p => {
        const order = demoData.orders.find(o => o.id === p.orderId) || 
                      JSON.parse(localStorage.getItem('demo_orders') || '[]').find(o => o.id === p.orderId);
        return {
          ...p,
          clientId: order?.clientId || 'u1',
          status: p.status || 'pending',
          date: new Date(p.createdAt || Date.now()).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US'),
          title: order ? (lang === 'ar' ? order.title : (order.titleEn || order.title)) : (lang === 'ar' ? 'طلب صيانة منزلية' : 'Home Maintenance Request')
        };
      });

    const merged = [...saved];
    if (saved.length === 0) {
      merged.push(...defaultProposals);
    }
    setProposals(merged);
  }, [lang]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-emerald-500 bg-emerald-500/10';
      case 'rejected': return 'text-red-500 bg-red-500/10';
      default: return 'text-amber-500 bg-amber-500/10';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'accepted': return t('proposals.accepted');
      case 'rejected': return t('proposals.rejected');
      default: return t('proposals.pending');
    }
  };

  return (
    <div className="page-container with-nav-padding pt-8 space-y-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />

      <div className="space-y-1 px-1">
        <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
          {t('proposals.title')}
        </h2>
        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
          {t('proposals.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {proposals.length > 0 ? (
          proposals.map((prop, i) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] p-6 rounded-[40px] space-y-4 relative overflow-hidden group shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-black text-base text-[var(--text-primary)]">
                    {prop.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] opacity-60 font-bold">
                    <Clock size={12} /> {prop.date}
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest ${getStatusColor(prop.status)}`}>
                  {getStatusLabel(prop.status)}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-1.5 text-primary font-black">
                  <DollarSign size={16} />
                  <span className="text-sm">{prop.price === 'inspection' ? t('order.priceOnInspection') : prop.price}</span>
                  {prop.price !== 'inspection' && <span className="text-[10px] opacity-60 uppercase">{t('account.currency')}</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/chat/chat_${prop.clientId}`)}
                    className="w-10 h-10 bg-[var(--bg-color)] text-[var(--text-secondary)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <MessageSquare size={18} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/order/${prop.orderId}`)}
                    className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4 bg-[var(--bg-color)] rounded-[48px] border-2 border-dashed border-[var(--border-color)]">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Clock size={32} className="text-slate-300" />
            </div>
            <p className="text-sm font-bold text-[var(--text-secondary)] opacity-40">
              {t('proposals.empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalsHistory;

