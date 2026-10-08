create table if not exists public.demoapp_users (
  id text primary key,
  onboarding_completed boolean not null default false
);

alter table public.demoapp_users enable row level security;
revoke all on table public.demoapp_users from public, anon, authenticated, service_role;
grant select, insert, update on table public.demoapp_users to service_role;
