# ГЛИБОКО — сайт (озонування + хімчистка меблів)

Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion + Supabase.

## Структура

- `app/(site)/` — публічний сайт: головна (`/`), `/ozonuvannya`, `/himchistka-mebliv`.
- `app/admin/` — адмінка лідів, захищена Supabase Auth + `middleware.ts`.
- `content/services.ts` — єдине джерело даних по типах послуг обох напрямків.
- `content/contact.ts` — телефон/соцмережі; **заповнити реальними даними перед запуском**.
- `lib/actions/leads.ts` — Server Actions для сабміту заявки та зміни статусу.
- `lib/supabase/` — `client.ts` (браузер), `server.ts` (auth-сесія, SSR), `admin.ts` (service-role, обхід RLS).
- `supabase/migrations/0001_init.sql` — схема двох таблиць лідів.
- `public/images/README.md` — точний список імен файлів під фото клієнта.

## Локальний запуск

```bash
npm install
cp .env.example .env.local   # заповнити ключами Supabase (крок нижче)
npm run dev
```

## Розгортання: крок за кроком

### 1. Supabase

1. Створити проєкт на [supabase.com](https://supabase.com).
2. У SQL Editor виконати `supabase/migrations/0001_init.sql`.
3. Authentication → Users → **Invite user** — створити єдиний акаунт адміна (публічної реєстрації в проєкті немає).
4. Забрати з Project Settings → API: `Project URL`, `anon public` ключ, `service_role` ключ.

### 2. Змінні оточення

Покласти значення з кроку 1 у `.env.local` (локально) і у Vercel Project Settings → Environment Variables (Production + Preview):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — позначити як **Sensitive**, ніколи не `NEXT_PUBLIC_*`.

### 3. Vercel

1. Імпортувати репозиторій у Vercel.
2. Framework preset — Next.js (визначиться автоматично).
3. Додати змінні оточення з кроку 2.
4. Deploy.

### 4. Домен

Коли домен буде куплено — додати його в Project → Domains у Vercel і виставити DNS-записи за інструкцією, яку Vercel покаже одразу після додавання домену. Коду це не стосується.

## Кешування в Next.js 15 (важливо для стабільності)

- Публічні сторінки (`/`, `/ozonuvannya`, `/himchistka-mebliv`) не звертаються до БД при рендері — вони повністю статичні й кешуються на CDN Vercel автоматично. Перевірити це можна в виводі `npm run build`: вони позначені `○ (Static)`.
- Сторінки адмінки (`/admin`, `/admin/ozone`, `/admin/dry-cleaning`) явно позначені `export const dynamic = "force-dynamic"`, тому завжди читають актуальні дані з Supabase і не потрапляють у Full Route Cache — інакше різні адміни могли б побачити чужий закешований знімок лідів.
- Форма заявки працює через Server Action (`lib/actions/leads.ts`) — кешування там не задіяне за визначенням, кожен сабміт завжди пише свіжий рядок.

## Безпека лідів

RLS увімкнено на обох таблицях лідів без жодної публічної policy (deny-all). Це означає:
- Анонімний ключ (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) не може ні читати, ні писати заявки напряму.
- Увесь insert/select/update іде через сервер (`SUPABASE_SERVICE_ROLE_KEY`, ніколи не потрапляє в браузер).
- Захист від спаму у формі: приховане honeypot-поле + перевірка мінімального часу заповнення (1.5с).

## Перед запуском клієнту

- [ ] Замінити плейсхолдери в `content/contact.ts` (телефон, WhatsApp/Instagram/Telegram).
- [ ] Додати реальні фото за `public/images/README.md` і підключити їх у `ServiceTypeCard.tsx`.
- [ ] Створити production Supabase-проєкт (якщо розробка велась на тестовому) і накатити міграцію.
- [ ] Створити адмін-акаунт(и) через Supabase Auth → Invite user.
