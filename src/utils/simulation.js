import { demoData } from '../data';

// Simulation Service to mock real-time activity
const getSmartResponse = (orderTitle, craftId, index) => {
  const craft = demoData.crafts.find(c => c.id === craftId);
  const craftName = craft?.nameAr || "هذا المجال";
  
  const templates = [
    [
      `أهلاً بك، قرأت بخصوص "${orderTitle}" وجاهز للمساعدة فوراً كفني ${craftName}.`,
      `السلام عليكم، يسعدني تنفيذ طلب الـ ${craftName} الخاص بك بأعلى جودة.`,
      `معك خبير في ${craftName}، هل يمكنني معرفة تفاصيل أكثر عن "${orderTitle}"؟`,
      `متاح حالياً للقيام بمهام ${craftName}. هل المكان بعيد عن وسط المدينة؟`
    ],
    [
      `بخصوص "${orderTitle}"، عندي خبرة كبيرة في حالات مشابهة ولدي كل المعدات.`,
      "أقدر أجيلك النهاردة لو تحب نعاين المكان ونبدأ شغل.",
      "سعري مناسب جداً وجودة شغلي مضمونة، تقدر تشوف تقييماتي.",
      "هل القطع المطلوبة متوفرة أم أشتريها معي وأنا قادم؟"
    ]
  ];

  const pool = templates[index % templates.length];
  return pool[Math.floor(Math.random() * pool.length)];
};

export const startOrderSimulation = (orderId, craftId) => {
  const order = JSON.parse(localStorage.getItem('demo_orders') || '[]').find(o => o.id === orderId) || 
                demoData.orders.find(o => o.id === orderId);
                
  if (!order) return;

  const matchingCraftsmen = demoData.craftsmen.filter(m => m.craftId === craftId);
  
  matchingCraftsmen.slice(0, 4).forEach((craftsman, index) => {
    const delay = (index + 1) * (8000 + Math.random() * 12000); // 8-20s intervals
    
    setTimeout(() => {
      const proposals = JSON.parse(localStorage.getItem('demo_proposals') || '[]');
      const smartMsg = getSmartResponse(order.title, craftId, index);

      const newProposal = {
        id: `prop_${Date.now()}_${index}`,
        orderId,
        craftsmanId: craftsman.id,
        price: 'inspection', // Special value
        message: smartMsg,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      proposals.push(newProposal);
      localStorage.setItem('demo_proposals', JSON.stringify(proposals));
      
      addNotification({
        id: Date.now(),
        type: 'proposal',
        title: 'عرض ذكي جديد',
        body: `قدم ${craftsman.name} عرضاً متخصصاً بخصوص "${order.title}"`,
        time: 'الآن',
        orderId
      });

      if (index < 3) {
        setTimeout(() => {
          simulateCraftsmanMessage(craftsman.id, smartMsg);
        }, 3000);
      }
      
    }, delay);
  });
};

export const simulateCraftsmanMessage = (craftsmanId, message) => {
  const chatId = `chat_${craftsmanId}`;
  const messages = JSON.parse(localStorage.getItem(`chat_messages_${chatId}`) || '[]');
  
  const newMsg = {
    id: Date.now(),
    text: message,
    sender: 'partner',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  messages.push(newMsg);
  localStorage.setItem(`chat_messages_${chatId}`, JSON.stringify(messages));
  
  const chats = JSON.parse(localStorage.getItem('demo_chats') || '[]');
  const chatIndex = chats.findIndex(c => c.id === chatId);
  
  if (chatIndex > -1) {
    chats[chatIndex].lastMessage = message;
    chats[chatIndex].unread = true;
    chats[chatIndex].lastTime = 'الآن';
  } else {
    chats.unshift({
      id: chatId,
      participants: ['u1', craftsmanId],
      lastMessage: message,
      unread: true,
      lastTime: 'الآن'
    });
  }
  localStorage.setItem('demo_chats', JSON.stringify(chats));

  addNotification({
    id: Date.now() + 1,
    type: 'message',
    title: `رسالة من ${demoData.craftsmen.find(m => m.id === craftsmanId)?.name}`,
    body: message,
    time: 'الآن'
  });
};

export const addNotification = (notification) => {
  const notifications = JSON.parse(localStorage.getItem('demo_notifications') || '[]');
  notifications.unshift(notification);
  localStorage.setItem('demo_notifications', JSON.stringify(notifications));
};

export const simulateCraftsmanArrival = (craftsmanId) => {
  setTimeout(() => {
    simulateCraftsmanMessage(craftsmanId, 'أنا في الطريق لحضرتك، قدامي 10 دقائق وهكون عندك.');
  }, 5000);
};
