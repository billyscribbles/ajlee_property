-- AJ Lee Property — add realestate.com.au listing URL
alter table public.listings
  add column if not exists rea_url text not null default '';
