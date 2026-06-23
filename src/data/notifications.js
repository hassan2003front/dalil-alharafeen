const types = ['proposal', 'message', 'system', 'payment', 'review'];
const bodies = [
  'وصلك عرض جديد على طلبك', 'لديك رسالة جديدة من الحرفي', 'تم تحديث حالة طلبك إلى مكتمل',
  'تم إضافة رصيد جديد لمحفظتك', 'قام أحد العملاء بتقييم شغلك', 'تم توثيق بروفايلك بنجاح',
  'انتبه، هناك مشكلة في الدفع', 'أهلاً بك في تطبيقنا المتطور'
];

export const notifications = Array.from({ length: 50 }).map((_, index) => {
  const id = `n${index + 1}`;
  return {
    id,
    type: types[Math.floor(Math.random() * types.length)],
    title: index % 5 === 0 ? 'تنبيه هام' : 'إشعار جديد',
    body: bodies[Math.floor(Math.random() * bodies.length)],
    time: `${index + 1} hours ago`,
    unread: index < 5,
  };
});
