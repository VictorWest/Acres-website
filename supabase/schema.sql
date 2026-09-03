-- ACRES registration system schema
-- Run this once in the Supabase project's SQL Editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

-- 1. Attendees --------------------------------------------------------------
create table if not exists attendees (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  country_city text,
  referral_source text,
  unique_code text not null unique,
  qr_data_url text,
  checked_in_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists attendees_unique_code_idx on attendees (unique_code);
create index if not exists attendees_created_at_idx on attendees (created_at desc);

-- 2. Exhibitors ---------------------------------------------------------------
create table if not exists exhibitors (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  nature_of_business text,
  contact_person text not null,
  contact_title text,
  email text not null,
  phone text not null,
  company_address text,
  products_services text,
  booth_tier text not null,
  sponsorship_tier text,
  representatives_count integer,
  special_requirements text,
  created_at timestamptz not null default now()
);

create index if not exists exhibitors_created_at_idx on exhibitors (created_at desc);

-- 3. Vendors ------------------------------------------------------------------
create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  items_sold text[] not null default '{}',
  other_items text,
  contact_person text not null,
  phone text not null,
  email text not null,
  space_requirement text,
  food_safety_permit text,
  availability text,
  created_at timestamptz not null default now()
);

create index if not exists vendors_created_at_idx on vendors (created_at desc);

-- Row Level Security ----------------------------------------------------------
-- Enabled with no policies: nothing is reachable through the public anon key.
-- All reads/writes happen server-side (API routes, admin dashboard) using the
-- service_role key, which bypasses RLS by design. This keeps registrant data
-- unreachable directly from the browser even if someone finds the anon key.
alter table attendees enable row level security;
alter table exhibitors enable row level security;
alter table vendors enable row level security;
