const comments = [
  'شغل ممتاز جداً الله ينور', 'راجل محترم ومواعيد مظبوطة', 'دقة في التنفيذ وأمانة',
  'السعر غالي شوية بس الشغل يستاهل', 'اتأخر نص ساعة بس عوض ده بشغل نضيف',
  'أنصح بالتعامل معه، فنان بجد', 'تجربة سيئة للأسف مخلصش الشغل', 'ما شاء الله تبارك الله، تسلم إيدك',
  'شكراً جزيلاً على المجهود الرائع', 'شخص أمين جداً ومحترف'
];

const clientNames = ['أحمد علي', 'ياسمين ممدوح', 'محمود حسن', 'سارة إبراهيم', 'مصطفى كامل', 'ريهام سعيد', 'خالد يوسف', 'منى عبد الله'];

export const reviews = Array.from({ length: 500 }).map((_, index) => {
  const id = `r${index + 1}`;
  return {
    id,
    craftsmanId: `m${Math.floor(Math.random() * 120) + 1}`,
    clientId: `u${Math.floor(Math.random() * 8) + 1}`,
    clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
    rating: Math.floor(Math.random() * 3) + 3, // 3 to 5 stars
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: `2024-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
  };
});
