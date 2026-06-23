const names = [
  'أحمد', 'محمد', 'محمود', 'إبراهيم', 'مصطفى', 'خالد', 'علي', 'عمر',
  'كريم', 'حسين', 'هاني', 'يوسف', 'حمزة', 'شريف', 'تامر', 'وائل',
  'جمال', 'سامي', 'باسل', 'ياسر', 'مازن', 'سيد', 'عادل', 'سعيد',
  'أشرف', 'مجدي', 'صلاح', 'كمال', 'رفعت', 'مدحت', 'خليل', 'باسم',
  'هشام', 'عماد', 'طارق', 'رامي', 'نور الدين', 'سامح', 'فاروق', 'جلال',
  'جاد', 'ياسين', 'سامر', 'عوني', 'نبيل', 'حسام', 'سراج', 'وسيم',
  'حاتم', 'ممدوح', 'عبد الرحمن', 'حازم', 'عصام', 'منير', 'ماهر', 'يحيى',
  'زكريا', 'مروان', 'هيثم', 'رؤوف', 'ناجي', 'فوزي', 'عوض', 'عيد',
  'طلعت', 'صبحي', 'فتحي', 'إيهاب', 'علاء', 'مدحت', 'شادي', 'مازن',
  'باهر', 'منصور', 'راضي', 'منتصر', 'وجدي', 'مختار', 'يسري'
];

const craftsList = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
const locations = [
  'القاهرة، المعادي', 'القاهرة، مدينة نصر', 'الجيزة، الهرم', 'الجيزة، الشيخ زايد',
  'القاهرة، التجمع الخامس', 'الإسكندرية، سموحة', 'طنطا، الغربية', 'المنصورة، الدقهلية',
  'القاهرة، مصر الجديدة', 'الجيزة، فيصل', 'المنوفية، شبين الكوم', 'السويس، بور توفيق',
  'بورسعيد، حي العرب', 'الإسماعيلية، حي أول', 'القليوبية، بنها', 'دمياط، ميدان الساعة'
];

// Highly specific portfolio images for each craft
const craftPortfolios = {
  c1: ['1584622650085-04589943384f', '1504148455328-c376907d081c', '1607472586893-edb57bdc0e39', '1585533844147-aa17336d1362'], // Plumbing
  c2: ['1621905251189-08b45d6a269e', '1558211583-d28f967813b1', '1544724569-5f546fd6f2b5', '1460518451285-97b627178677'], // Electrical
  c3: ['1533090161767-e6ffed986c88', '1581244277943-fe4a9c777189', '1426927308491-6380b6a9936f', '1589939705384-5185137a7f0f'], // Carpentry
  c4: ['1589939705384-5185137a7f0f', '1562259949-e8e7689d7828', '1595113316349-9fa4eb24f884', '1516962215378-7fa2e1372cf5'], // Painting
  c5: ['1581094288338-2314dddb7e8b', '1631541486121-827725916962', '1599833552251-582845c08643', '1581092580497-e0d23cb9d430'], // AC Repair
  c6: ['1584622781564-1d987f7333c1', '1581578731548-c64695cc6954', '1527515637462-cff94eecc1ac', '1584622650111-993a426fbf0a'], // Ceramic
  c7: ['1585320806297-9794b3e4eeae', '1592419044706-39796d40f98c', '1591857177580-dc82b9ac4e17', '1598902108854-10e335adac99'], // Alumetal
  c8: ['1541888941259-7b9f1207e33a', '1502005229762-cf1b2da7c5d6', '1600585154340-be6161a56a0c', '1516455590571-18256e5bb9ff'], // Gypsum
  c9: ['1502005090153-bf915a23e595', '1600607687920-4e2a09cf159d', '1534349735244-26958f24b4ee', '1603513361100-349f43058957'], // Parquet
  c10: ['1504328345606-18bbc8c9d7d1', '1535119024890-73534e674e3c', '1493070129024-7df09c3f0b20', '1517146705904-937000889f07'], // Upholstery
};

const craftSkills = {
  c1: ['تسليك البالوعات', 'تركيب السباكة', 'إصلاح الحنفيات', 'تأسيس شبكات مياه'],
  c2: ['تركيب لوحات كهرباء', 'إصلاح أعطال الإنارة', 'تأسيس كهرباء شقق', 'تركيب أجهزة'],
  c3: ['صيانة أثاث', 'تركيب أبواب', 'تصميم مطابخ', 'نجارة عمارة'],
  c4: ['دهانات حوائط', 'ديكورات جبس', 'ورق حائط', 'عزل أسطح'],
  c5: ['شحن فريون', 'تنظيف فلاتر', 'إصلاح بوردة', 'تركيب تكييف'],
  c6: ['تركيب سيراميك', 'رخام وجرانيت', 'بورسلين', 'عزل حمامات'],
  c7: ['أبواب وشبابيك', 'مطابخ الوميتال', 'شيش حصيرة', 'صيانة'],
  c8: ['أسقف معلقة', 'بيت نور', 'فواصل جبس', 'كرانيش'],
  c9: ['تركيب باركيه', 'صيانة باركيه', 'أرضيات خشب', 'تلميع'],
  c10: ['تنجيد انتريهات', 'ستائر', 'تجديد مراتب', 'تفصيل كنب'],
};

export const craftsmen = Array.from({ length: 120 }).map((_, index) => {
  const id = `gen_m${index + 1}`;
  const firstName = names[index % names.length];
  const lastName = names[(index + 5) % names.length];
  const craftId = craftsList[index % craftsList.length];
  const rating = (4 + Math.random()).toFixed(1);
  const completed = Math.floor(Math.random() * 500) + 50;
  const reviewsCount = Math.floor(completed * (0.4 + Math.random() * 0.5));
  const price = 100 + Math.floor(Math.random() * 400);

  const serviceExamples = [
    { id: 1, title: 'فحص وصيانة عامة', titleEn: 'General Maintenance', price: price, type: 'hour' },
    { id: 2, title: 'تركيب وتأسيس', titleEn: 'Installation', price: price * 3, type: 'fixed' },
    { id: 3, title: 'إصلاح أعطال مفاجئة', titleEn: 'Emergency Repair', price: price * 1.5, type: 'hour' },
  ];

  const faceIndex = 20 + (index % 60);
  const profileImg = `https://randomuser.me/api/portraits/men/${faceIndex}.jpg`;

  const portfolioIds = craftPortfolios[craftId] || [];
  const finalPortfolio = portfolioIds.map(imgId => `https://images.unsplash.com/photo-${imgId}?w=600&h=600&fit=crop&q=80`);

  return {
    id,
    name: `${firstName} ${lastName}`,
    craftId,
    rating: parseFloat(rating),
    reviewsCount,
    image: profileImg,
    verified: Math.random() > 0.3,
    bio: `فني محترف، يتميز بالخبرة العالية والالتزام بالمواعيد. متخصص في كافة الأعمال الفنية بدقة وإتقان لتلبية احتياجاتكم.`,
    location: locations[Math.floor(Math.random() * locations.length)],
    pricePerHour: price,
    completedOrders: completed,
    badges: index % 5 === 0 ? ['Top Rated', 'Expert'] : ['Trusted'],
    services: serviceExamples.sort(() => 0.5 - Math.random()).slice(0, 3),
    portfolio: finalPortfolio,
    skills: craftSkills[craftId] || [],
    experienceYears: 5 + Math.floor(Math.random() * 15),
  };
});
