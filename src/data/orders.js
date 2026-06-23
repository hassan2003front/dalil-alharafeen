const titles = [
  'إصلاح تسريب مياه بالمطبخ', 'تأسيس لوحة كهرباء رئيسية', 'دهان ريسبشن ألوان حديثة', 'تركيب تكييف 2.25 حصان', 'صيانة غسالة أوتوماتيك', 
  'بناء جدار فاصل طوب', 'تنظيف شامل لشقة مفروشة', 'تغيير كوالين أبواب خشبية', 'عزل مائي لسطح المنزل', 'فك وتركيب غرف نوم',
  'صيانة بوتاجاز 5 شعلة', 'تركيب نجف كريستال', 'تأسيس سباكة حمام جديد', 'نقاشة غرف نوم أطفال', 'صيانة ثلاجة نوفروست',
  'تركيب سيراميك أرضيات', 'عمل مكتبة جبس بورد', 'صيانة سخان غاز', 'تركيب فلتر مياه 7 مراحل', 'كشف تسريبات الحمام'
];

const clientIds = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'];
const craftsList = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
const locations = ['القاهرة، المعادي', 'القاهرة، مدينة نصر', 'الجيزة، الهرم', 'الجيزة، الشيخ زايد', 'القاهرة، التجمع الخامس', 'الإسكندرية، سموحة', 'طنطا، الغربية', 'المنصورة، الدقهلية', 'القاهرة، مصر الجديدة', 'الجيزة، فيصل'];

export const orders = Array.from({ length: 80 }).map((_, index) => {
  const id = `o${index + 1}`;
  const title = titles[index % titles.length];
  const craftId = craftsList[index % craftsList.length];
  
  let status;
  const rand = Math.random();
  if (rand < 0.4) status = 'completed';
  else if (rand < 0.6) status = 'pending';
  else if (rand < 0.8) status = 'in_progress';
  else status = 'cancelled';

  // Current user (u1) can be both a client and a craftsman for demo purposes
  const isU1Client = index < 15;
  const clientId = isU1Client ? 'u1' : clientIds[Math.floor(Math.random() * clientIds.length)];
  
  // Assign craftsman based on craftId for realism
  // Craftsman mapping: m1->c1, m2->c2, m3->c3, m4->c4, m5->c5, m6->c6, m7->c7, m8->c8
  // If u1 is craftsman, we give them some jobs in their specialty
  let craftsmanId = null;
  if (status !== 'pending') {
    // If the order craft matches u1's assumed craft (let's say c1), assign some to u1
    if (craftId === 'c1' && index % 3 === 0) {
      craftsmanId = 'u1';
    } else {
      // Otherwise assign to a generated craftsman with matching ID index
      const craftIndex = parseInt(craftId.replace('c', ''));
      craftsmanId = `gen_m${craftIndex}`;
    }
  }

  return {
    id,
    clientId,
    title,
    description: `طلب تنفيذ ${title} بدقة واحترافية. العمل يتطلب فني متخصص ذو خبرة سابقة لضمان جودة النتائج والالتزام بالمواعيد المحددة.`,
    craftId,
    status,
    date: `2026-04-${(index % 28) + 1}`,
    budget: 'inspection',
    totalPrice: 'inspection',
    proposalsCount: Math.floor(Math.random() * 10) + 2,
    location: locations[Math.floor(Math.random() * locations.length)],
    craftsmanId,
  };
});
