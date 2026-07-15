// Плейсхолдер-фото з Unsplash (безкоштовна ліцензія, без атрибуції).
// Замінити на фото клієнта: досить підмінити значення `src` на локальний
// шлях (наприклад "/images/shared/hero.jpg") — верстка не зміниться.

export function unsplash(id: string, w: number) {
  return `https://images.unsplash.com/${id}?fm=jpg&q=80&w=${w}&auto=format&fit=crop`;
}

export const HERO_IMAGE = {
  src: "/images/11.png",
  alt: "Жінка у шовковому халаті відпочиває на кремовому дивані у світлій вітальні з видом на Київ",
};

export const HERO_IMAGE_DESKTOP = {
  src: "/images/Gemini_Generated_Image_9isyov9isyov9isy.png",
  alt: "Жінка у шовковому халаті відпочиває на кремовому дивані у світлій вітальні з видом на Київ",
};

export const OZONE_VISUAL = {
  src: "/images/ozone-hero2.png",
  alt: "Світла вітальня з кремовим диваном, де серед сонячного проміння витає легка хмара озону з бульбашками та листям",
};

export const DRY_CLEANING_VISUAL = {
  src: "/images/dry-cleaning-hero3.png",
  alt: "Хімчистка оббивки дивана спеціальним пристроєм",
};
