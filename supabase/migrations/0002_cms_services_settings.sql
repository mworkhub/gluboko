-- ГЛИБОКО CMS — крок 1: таблиці для керованого контенту (послуги, тексти сайту)
-- + бакет Supabase Storage під фото послуг.
--
-- Модель безпеки та сама, що й для лідів (0001_init.sql): RLS увімкнено,
-- публічних policy на insert/update/delete немає. Увесь запис іде через
-- Server Actions на service-role ключі. Публічні сторінки теж читають
-- через service-role в Server Components (той самий патерн, що вже
-- використовує адмінка) — це безпечніше за анонімний SELECT-policy і не
-- заважає кешуванню/ISR, бо читання відбувається на сервері.

-- ============================================================
-- 1. site_settings — key/value для розділів "Контакти", "Про нас", "Переваги"
-- ============================================================

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_settings_set_updated_at on site_settings;
create trigger site_settings_set_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

alter table site_settings enable row level security;

insert into site_settings (key, value) values
  ('contact', '{
    "phoneDisplay": "+38 (0__) ___-__-__",
    "phoneHref": "tel:+380000000000",
    "whatsappHref": "https://wa.me/380000000000",
    "instagramHref": "https://instagram.com/gluboko",
    "telegramHref": "https://t.me/gluboko",
    "city": "Київ та Київська область"
  }'),
  ('about', '{
    "quote": "Ми створюємо бездоганну чистоту, щоб ви насолоджувалися найважливішим — життям.",
    "signature": "команда ГЛИБОКО",
    "trust_badges": [
      {"title": "Професіонали своєї справи", "icon": "award"},
      {"title": "100% гарантія результату", "icon": "shield-check"},
      {"title": "Зручне планування виїзду", "icon": "calendar-check"},
      {"title": "Довіра клієнтів та рекомендації", "icon": "heart-handshake"}
    ]
  }'),
  ('advantages', '{
    "items": [
      {"title": "Преміальна якість", "desc": "Професійне обладнання та засоби найвищого рівня", "icon": "gem"},
      {"title": "Екологічно та безпечно", "desc": "Турбота про здоров''я вашої родини та довкілля", "icon": "leaf"},
      {"title": "Економія вашого часу", "desc": "Оперативний виїзд та зручний сервіс без зайвого клопоту", "icon": "clock"},
      {"title": "Конфіденційності", "desc": "Повна дискретність і повага до вашого простору", "icon": "lock"}
    ]
  }')
on conflict (key) do nothing;

-- ============================================================
-- 2. services — типи послуг обох напрямків (заміна content/services.ts)
-- ============================================================

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('ozone', 'dry_cleaning')),
  slug text not null,
  title text not null,
  description text not null default '',
  meta text,
  price_from integer,
  icon text not null default 'sparkles',
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category, slug)
);

create index if not exists services_category_sort_idx on services (category, sort_order);

drop trigger if exists services_set_updated_at on services;
create trigger services_set_updated_at
  before update on services
  for each row execute function set_updated_at();

alter table services enable row level security;

-- Сідинг поточними даними з content/services.ts, щоб крок 4 (фронтенд на БД)
-- не втратив жодного існуючого фото/опису/ціни.
insert into services (category, slug, title, description, meta, price_from, icon, image_url, sort_order) values
  ('ozone', 'kvartyry-ta-budynky', 'Озонування квартир та будинків', 'Комплексне очищення повітря та поверхонь у житлових приміщеннях.', 'Площа: до 100 м²', 800, 'home', 'https://images.unsplash.com/photo-1754613389131-ea9b5f234cda?fm=jpg&q=80&w=700&auto=format&fit=crop', 1),
  ('ozone', 'avtomobili', 'Озонування автомобілів', 'Усуває запахи, бактерії та алергени в салоні автомобіля.', null, 600, 'car', 'https://images.unsplash.com/photo-1758228655476-6b51e2303a0e?fm=jpg&q=80&w=700&auto=format&fit=crop', 2),
  ('ozone', 'ofisy-ta-kabinety', 'Озонування офісів та кабінетів', 'Створює чисте та безпечне середовище для співробітників та клієнтів.', 'Площа: до 100 м²', 1000, 'briefcase', 'https://images.unsplash.com/photo-1746021535489-00edc5efb203?fm=jpg&q=80&w=700&auto=format&fit=crop', 3),
  ('ozone', 'hoteli-ta-nomery', 'Озонування готелів та номерів', 'Дезінфекція повітря та поверхонь для комфорту гостей.', null, 700, 'bed-double', 'https://images.unsplash.com/photo-1668089677938-b52086753f77?fm=jpg&q=80&w=700&auto=format&fit=crop', 4),
  ('ozone', 'skladski-prymischennya', 'Озонування складських приміщень', 'Усуває цвіль, запахи та бактерії, зберігає якість продукції.', null, 1200, 'package', 'https://images.unsplash.com/photo-1672552226380-486fe900b322?fm=jpg&q=80&w=700&auto=format&fit=crop', 5),

  ('dry_cleaning', 'myaki-mebli', 'Хімчистка м''яких меблів', 'Дивани, крісла, пуфи, стільці, м''які куточки. Видалення плям, запахів та пилу.', null, null, 'sofa', 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?fm=jpg&q=80&w=700&auto=format&fit=crop', 1),
  ('dry_cleaning', 'kylymy-ta-kylymovi-pokryttya', 'Хімчистка килимів та килимових покриттів', 'Глибоке очищення ворсу, усунення плям та неприємних запахів.', null, null, 'layout-grid', 'https://images.unsplash.com/photo-1690268798551-90e0fa935c4d?fm=jpg&q=80&w=700&auto=format&fit=crop', 2),
  ('dry_cleaning', 'dytyachi-krisla', 'Хімчистка дитячих крісел', 'Безпечне очищення від забруднень, плям та бактерій.', null, null, 'baby', 'https://images.unsplash.com/photo-1619719287848-883c8f26efbc?fm=jpg&q=80&w=700&auto=format&fit=crop', 3),
  ('dry_cleaning', 'dytyachi-lizhechka', 'Хімчистка дитячих ліжечок', 'Очищення бортиків, матраців та текстильних елементів.', null, null, 'bed-single', 'https://images.unsplash.com/photo-1618480633001-b81e7ce07f71?fm=jpg&q=80&w=700&auto=format&fit=crop', 4),
  ('dry_cleaning', 'matratsy', 'Хімчистка матраців', 'Видалення пилових кліщів, плям, алергенів та запахів.', null, null, 'bed-double', 'https://images.unsplash.com/photo-1759176170879-6bd7073ab4f4?fm=jpg&q=80&w=700&auto=format&fit=crop', 5),
  ('dry_cleaning', 'stiltsi', 'Хімчистка стільців', 'Тканинні та м''які стільці. Чистота та свіжість без пошкоджень.', null, null, 'armchair', 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?fm=jpg&q=80&w=700&auto=format&fit=crop', 6)
on conflict (category, slug) do nothing;

-- ============================================================
-- 3. Supabase Storage — бакет "images" під фото послуг
-- ============================================================
-- storage.buckets/storage.objects — звичайні таблиці в тій самій БД,
-- тож бакет і policy теж накатуються цим SQL-скриптом, без окремого
-- походу в Dashboard.

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Публічне читання файлів бакета (потрібно для показу фото на сайті).
-- Завантаження/видалення відбувається лише через Server Action на
-- service-role ключі (крок 3) — той обходить RLS, тож окремих policy
-- на insert/update/delete для anon/authenticated навмисно не додаємо.
drop policy if exists "Public read access for images bucket" on storage.objects;
create policy "Public read access for images bucket"
  on storage.objects for select
  using (bucket_id = 'images');
