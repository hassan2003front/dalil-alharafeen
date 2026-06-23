export const chats = [
  {
    id: 'ch1',
    participants: ['u1', 'm1'],
    messages: [
      { senderId: 'u1', text: 'السلام عليكم، الحنفية لسه بتنقط؟', time: '10:35 AM' },
      { senderId: 'm1', text: 'وعليكم السلام، أنا في الطريق ليك، 10 دقايق وأكون عندك.', time: '10:37 AM' },
    ],
    lastMessage: 'أنا في الطريق ليك، 10 دقايق وأكون عندك.',
    lastTime: '10:37 AM',
    unreadCount: 0,
  },
  {
    id: 'ch2',
    participants: ['u1', 'm2'],
    messages: [
      { senderId: 'm2', text: 'محتاجين نجيب سلك 3 ملي للسخان.', time: 'Yesterday' },
    ],
    lastMessage: 'محتاجين نجيب سلك 3 ملي للسخان.',
    lastTime: 'Yesterday',
    unreadCount: 1,
  },
];
