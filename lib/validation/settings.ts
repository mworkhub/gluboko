import { z } from "zod";

export const contactSettingsSchema = z.object({
  phoneDisplay: z.string().trim().min(1, "Обов'язкове поле"),
  phoneHref: z.string().trim().min(1, "Обов'язкове поле"),
  whatsappHref: z.string().trim(),
  instagramHref: z.string().trim(),
  telegramHref: z.string().trim(),
  viberHref: z.string().trim(),
  messengerHref: z.string().trim(),
  facebookHref: z.string().trim(),
  youtubeHref: z.string().trim(),
  tiktokHref: z.string().trim(),
  city: z.string().trim().min(1, "Обов'язкове поле"),
  hours: z.string().trim().min(1, "Обов'язкове поле"),
});

export const trustBadgeSchema = z.object({
  title: z.string().trim().min(1, "Обов'язкове поле"),
  icon: z.string().trim().min(1, "Обов'язкове поле"),
});

export const aboutSettingsSchema = z.object({
  quote: z.string().trim().min(1, "Обов'язкове поле"),
  signature: z.string().trim().min(1, "Обов'язкове поле"),
  trust_badges: z.array(trustBadgeSchema).min(1),
});

export const advantageItemSchema = z.object({
  title: z.string().trim().min(1, "Обов'язкове поле"),
  desc: z.string().trim().min(1, "Обов'язкове поле"),
  icon: z.string().trim().min(1, "Обов'язкове поле"),
});

export const advantagesSettingsSchema = z.object({
  items: z.array(advantageItemSchema).min(1),
});
