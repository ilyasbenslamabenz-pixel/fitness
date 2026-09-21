-- EVO Fit Coach — Supabase setup
create table if not exists public.evo_user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.evo_user_data enable row level security;

drop policy if exists "Users can read own EVO Fit data" on public.evo_user_data;
create policy "Users can read own EVO Fit data"
on public.evo_user_data for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own EVO Fit data" on public.evo_user_data;
create policy "Users can insert own EVO Fit data"
on public.evo_user_data for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own EVO Fit data" on public.evo_user_data;
create policy "Users can update own EVO Fit data"
on public.evo_user_data for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
