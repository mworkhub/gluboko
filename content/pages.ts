// Статичний контент для сторінок "Замовити послугу" та "Контакти" —
// не завʼязаний на конкретну послугу, тому живе окремо від content/services.ts.

export const ORDER_BENEFITS = [
  { title: "Швидка відповідь", desc: "Зв'яжемось протягом 15 хвилин у робочий час", icon: "zap" as const },
  {
    title: "Професійна консультація",
    desc: "Підберемо найкраще рішення для Вас",
    icon: "message-circle" as const,
  },
  { title: "Зручний час для Вас", desc: "Працюємо щодня без вихідних", icon: "calendar" as const },
  {
    title: "Індивідуальний підхід",
    desc: "Враховуємо всі Ваші побажання та особливості",
    icon: "user" as const,
  },
  { title: "Безпечно та екологічно", desc: "Без токсичних речовин, безпечно для всіх", icon: "leaf" as const },
];

export const CONTACT_BENEFITS = ORDER_BENEFITS.slice(0, 4);

export const SAFETY_PRIORITY_POINTS = [
  { title: "Професійне обладнання", icon: "wrench" as const },
  { title: "Безпечні технології", icon: "shield-check" as const },
  { title: "Екологічно та без хімії", icon: "leaf" as const },
  { title: "Гарантія результату", icon: "badge-check" as const },
];
