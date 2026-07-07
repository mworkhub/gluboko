// Плейсхолдер-фото з Unsplash (безкоштовна ліцензія, без атрибуції).
// Замінити на фото клієнта: досить підмінити значення `src` на локальний
// шлях (наприклад "/images/shared/hero.jpg") — верстка не зміниться.

export function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?fm=jpg&q=80&w=${w}&auto=format&fit=crop`;
}

export const HERO_IMAGE = {
  src: "/images/home-hero.jpg",
  alt: "Жінка у шовковому халаті відпочиває на кремовому дивані у світлій вітальні з видом на Київ",
};

export const OZONE_VISUAL = {
  src: "/images/ozone-hero.jpg",
  alt: "Затишна вітальня з двома кремовими диванами та м'яким природним освітленням",
};

export const DRY_CLEANING_VISUAL = {
  src: "/images/dry-cleaning-hero.jpg",
  alt: "Майстер у рукавичках проводить хімчистку оббивки дивана",
};
