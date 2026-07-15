export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  service_type: string | null;
  name: string;
  phone: string;
  comment: string | null;
  source_page: string | null;
  status: "new" | "in_progress" | "done" | "rejected";
};

export type ContactSettings = {
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  instagramHref: string;
  telegramHref: string;
  viberHref: string;
  messengerHref: string;
  facebookHref: string;
  youtubeHref: string;
  tiktokHref: string;
  city: string;
  hours: string;
};

export type TrustBadge = { title: string; icon: string };

export type AboutSettings = {
  quote: string;
  signature: string;
  trust_badges: TrustBadge[];
};

export type AdvantageItem = { title: string; desc: string; icon: string };

export type AdvantagesSettings = {
  items: AdvantageItem[];
};

export type ServiceOption = { slug: string; title: string };

export type Service = {
  id: string;
  category: "ozone" | "dry_cleaning";
  slug: string;
  title: string;
  description: string;
  meta: string | null;
  price_from: number | null;
  icon: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
