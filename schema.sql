-- ═══════════════════════════════════════════════════════
--  JC RESOURCE LAB — PASTE THIS IN SUPABASE SQL EDITOR
-- ═══════════════════════════════════════════════════════

create table if not exists users (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text unique not null,
  phone      text,
  approved   boolean not null default false,
  password   text not null,
  role       text not null default 'student',
  created_at timestamptz default now()
);

create table if not exists resources (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  type        text not null,
  class       text,
  board       text,
  subject     text,
  stream      text,
  chapter     text,
  faculty     text,
  file_url    text,
  file_name   text,
  file_size   bigint,
  uploaded_by uuid references users(id),
  created_at  timestamptz default now()
);

create table if not exists videos (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  url         text not null,
  subject     text,
  class       text,
  board       text,
  stream      text,
  chapter     text,
  faculty     text,
  uploaded_by uuid references users(id),
  created_at  timestamptz default now()
);

create table if not exists chapters (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  class      text,
  board      text,
  subject    text,
  stream     text,
  sort_order integer default 1,
  created_at timestamptz default now()
);

create table if not exists feedback (
  id         uuid primary key default gen_random_uuid(),
  name       text default 'Anonymous',
  email      text,
  rating     integer check (rating between 1 and 5),
  message    text not null,
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  phone      text,
  message    text not null,
  created_at timestamptz default now()
);

-- Storage bucket for PDFs (1 GB free)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resources','resources',true,52428800,
  array['application/pdf','image/jpeg','image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do nothing;

create policy "Public read" on storage.objects for select using (bucket_id='resources');
create policy "Auth upload"  on storage.objects for insert with check (bucket_id='resources');
create policy "Auth delete"  on storage.objects for delete using (bucket_id='resources');

-- Seed admin user  (password = admin123)
insert into users (name, email, password, role)
values ('Admin','admin@jcrl.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHuy','admin')
on conflict (email) do nothing;
