import { createAdminClient } from "@/lib/supabase/admin";
import type { AboutSettings, AdvantagesSettings, ContactSettings } from "@/lib/types";

export async function getSiteSetting<T>(key: string): Promise<T | null> {
  const supabase = createAdminClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", key).single();
  return (data?.value as T) ?? null;
}

// Used only if the Supabase read fails (network issue, outage) so the public
// site degrades gracefully instead of crashing — normal operation always
// reads the live, admin-edited values above.
export const FALLBACK_CONTACT: ContactSettings = {
  phoneDisplay: "+38 (0__) ___-__-__",
  phoneHref: "tel:+380000000000",
  // Social/messenger links are left blank rather than pointing at guessed
  // URLs — BrandIcons.tsx hides an icon whenever its href is empty, so these
  // simply don't render until the admin fills in the real ones.
  whatsappHref: "",
  instagramHref: "",
  telegramHref: "",
  viberHref: "",
  messengerHref: "",
  facebookHref: "",
  youtubeHref: "",
  city: "Київ та Київська область",
  hours: "Щодня 8:00 – 20:00",
};

export const FALLBACK_ABOUT: AboutSettings = {
  quote: "Ми створюємо бездоганну чистоту, щоб ви насолоджувалися найважливішим — життям.",
  signature: "команда ГЛИБОКО",
  trust_badges: [
    { title: "Професіонали своєї справи", icon: "award" },
    { title: "100% гарантія результату", icon: "shield-check" },
    { title: "Зручне планування виїзду", icon: "calendar-check" },
    { title: "Довіра клієнтів та рекомендації", icon: "heart-handshake" },
  ],
};

export const FALLBACK_ADVANTAGES: AdvantagesSettings = {
  items: [
    { title: "Преміальна якість", desc: "Професійне обладнання та засоби найвищого рівня", icon: "gem" },
    { title: "Екологічно та безпечно", desc: "Турбота про здоров'я вашої родини та довкілля", icon: "leaf" },
    {
      title: "Економія вашого часу",
      desc: "Оперативний виїзд та зручний сервіс без зайвого клопоту",
      icon: "clock",
    },
    { title: "Конфіденційності", desc: "Повна дискретність і повага до вашого простору", icon: "lock" },
  ],
};
