-- ГЛИБОКО: ліди розділені по напрямках у двох окремих таблицях.

create extension if not exists pgcrypto;

create table if not exists ozone_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  service_type text,
  name text not null,
  phone text not null,
  comment text,
  source_page text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done', 'rejected'))
);

create table if not exists dry_cleaning_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  service_type text,
  name text not null,
  phone text not null,
  comment text,
  source_page text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done', 'rejected'))
);

create index if not exists ozone_leads_created_at_idx on ozone_leads (created_at desc);
create index if not exists dry_cleaning_leads_created_at_idx on dry_cleaning_leads (created_at desc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists ozone_leads_set_updated_at on ozone_leads;
create trigger ozone_leads_set_updated_at
  before update on ozone_leads
  for each row execute function set_updated_at();

drop trigger if exists dry_cleaning_leads_set_updated_at on dry_cleaning_leads;
create trigger dry_cleaning_leads_set_updated_at
  before update on dry_cleaning_leads
  for each row execute function set_updated_at();

-- RLS увімкнено, без policy: жоден анонімний/authenticated клієнт не має
-- прямого доступу. Увесь insert/select/update іде через сервер (Next.js
-- Server Actions і admin server components), який використовує
-- SUPABASE_SERVICE_ROLE_KEY і тому обходить RLS.
alter table ozone_leads enable row level security;
alter table dry_cleaning_leads enable row level security;
