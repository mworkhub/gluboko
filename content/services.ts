export type ServiceCategory = "ozone" | "dry_cleaning";

export const CATEGORY_META = {
  ozone: {
    slug: "ozonuvannya",
    label: "Озонування",
    title: "ОЗОНУВАННЯ, ЯКЕ ВИРІШУЄ ВАШІ ПРОБЛЕМИ",
    subtitle: "Чисте повітря. Без запахів. Без бактерій.",
    intro:
      "Професійне озонування приміщень для усунення запахів, дезінфекції та створення здорового мікроклімату у вашому просторі.",
    ctaLabel: "Замовити озонування",
    features: [
      { title: "Безпечно", desc: "Для людей, тварин та рослин", icon: "shield" as const },
      { title: "Екологічно", desc: "Без хімії та шкідливих речовин", icon: "leaf" as const },
      { title: "Швидко", desc: "Видимий результат після першої обробки", icon: "clock" as const },
      { title: "Ефективно", desc: "Усуває до 99% бактерій, вірусів та запахів", icon: "sparkles" as const },
      {
        title: "Озон — природний дезінфектор",
        desc: "Повертає свіжість та безпеку вашому простору без хімії",
        icon: "atom" as const,
      },
    ],
  },
  dry_cleaning: {
    slug: "himchistka-mebliv",
    label: "Хімчистка меблів",
    title: "ХІМЧИСТКА МЕБЛІВ ТА ТЕКСТИЛЮ НА ВИЇЗД",
    subtitle: "Повертаємо чистоту. Зберігаємо красу ваших речей.",
    intro:
      "Професійна хімчистка для дому, офісу та авто. Видаляємо складні плями, запахи та алергени. Безпечно для людей, дітей і тварин.",
    ctaLabel: "Замовити хімчистку",
    features: [
      { title: "Безпечно", desc: "Без токсичних речовин", icon: "shield" as const },
      { title: "Екологічно", desc: "Безпечні засоби для людей і тварин", icon: "leaf" as const },
      { title: "Ефективно", desc: "Видалення до 99% плям і запахів", icon: "sparkles" as const },
      { title: "Швидко", desc: "Меблі готові до використання вже за 2–6 годин", icon: "clock" as const },
      { title: "На виїзд", desc: "Працюємо у Києві та по області", icon: "truck" as const },
    ],
  },
} as const;

export const OZONE_PROCESS_STEPS = [
  { title: "Консультація", desc: "Оцінка об'єкта" },
  { title: "Підготовка", desc: "Підготовка приміщення" },
  { title: "Озонування", desc: "Професійним обладнанням" },
  { title: "Провітрювання", desc: "Та завершення" },
  { title: "Результат", desc: "Чистий та безпечний простір для вас" },
];

// "Де використовується озонування" — легкий список об'єктів (без цін/фото),
// повертає у полегшеному вигляді стару об'єктну категоризацію послуг.
export const OZONE_WHERE_USED = [
  { title: "Квартири та будинки", icon: "home" as const },
  { title: "Офіси та кабінети", icon: "briefcase" as const },
  { title: "Автомобілі", icon: "car" as const },
  { title: "Готелі та номери", icon: "bed-double" as const },
  { title: "Склади та комерційні приміщення", icon: "warehouse" as const },
  { title: "Дитячі кімнати та садочки", icon: "baby" as const },
  { title: "Медичні заклади", icon: "hospital" as const },
  { title: "Кафе та ресторани", icon: "utensils" as const },
];

// "Безпечно для людей, тварин і рослин" — банер на сторінці озонування.
export const OZONE_SAFETY_POINTS = [
  { text: "Після озонування озон розкладається на кисень", icon: "atom" as const },
  { text: "Залишається лише чисте повітря, свіжість та безпека", icon: "wind" as const },
  { text: "Без хімії та токсинів", icon: "shield-check" as const },
  { text: "100% екологічно та природно", icon: "leafy-green" as const },
  { text: "Не залишає слідів і запаху", icon: "sparkles" as const },
  { text: "Безпечно після провітрювання", icon: "badge-check" as const },
];

// Індивідуальні типи послуг (назви/опис/ціни/фото) тепер керуються з
// адмінки і живуть у таблиці `services` — див. lib/services.ts. Тут
// лишається тільки статичний контент рівня категорії (заголовки лендингів,
// фічі, кроки процесу), який не редагується через CMS.
