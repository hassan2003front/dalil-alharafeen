export const proposals = Array.from({ length: 50 }).map((_, index) => {
  const id = `p${index + 1}`;
  return {
    id,
    orderId: `o${Math.floor(Math.random() * 50) + 1}`,
    craftsmanId: `m${Math.floor(Math.random() * 50) + 1}`,
    price: (index + 1) * 50,
    comment: 'أنا جاهز للشغل ده وممكن أبدأ فوراً، شغلي عليه ضمان لمدة سنة.',
    status: index % 10 === 0 ? 'accepted' : 'pending',
    date: `2023-10-${(index % 28) + 1}T10:00:00`,
  };
});
