-- AJ Lee Property — listings table + storage bucket
create extension if not exists pgcrypto;

create table public.listings (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  status      text not null check (status in
              ('For Sale','For Lease','Under Offer','Sold','Leased')),
  address     text not null,
  suburb      text not null,
  beds        integer not null default 0,
  baths       integer not null default 0,
  parking     integer not null default 0,
  price       text not null default '',
  published   boolean not null default false,
  featured    boolean not null default false,
  images      jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index listings_pub_idx     on public.listings(published) where published;
create index listings_feat_idx    on public.listings(featured)  where featured and published;
create index listings_created_idx on public.listings(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger listings_set_updated_at
  before update on public.listings
  for each row execute procedure public.set_updated_at();

alter table public.listings enable row level security;

create policy "anon reads published listings"
  on public.listings for select to anon
  using (published = true);

create policy "authenticated reads published listings"
  on public.listings for select to authenticated
  using (published = true);

insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

create policy "anon reads listing images"
  on storage.objects for select to anon
  using (bucket_id = 'listing-images');
