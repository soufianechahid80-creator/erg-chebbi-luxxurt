-- ==========================================
-- CLEAN DATABASE (REMOVE OLD TABLES)
-- ==========================================

drop table if exists public.page_events cascade;
drop table if exists public.booking_status_history cascade;
drop table if exists public.booking_requests cascade;
drop table if exists public.contact_messages cascade;
drop table if exists public.visitor_sessions cascade;
drop table if exists public.payment_links cascade;
drop table if exists public.availability_calendar cascade;
drop table if exists public.media_assets cascade;
drop table if exists public.admin_recent_activity cascade;

drop type if exists public.booking_status cascade;
drop type if exists public.message_status cascade;

create extension if not exists pgcrypto;

-- ==========================================
-- ENUM TYPES
-- ==========================================

create type public.booking_status as enum (
'new',
'pending',
'confirmed',
'cancelled'
);

create type public.message_status as enum (
'new',
'read',
'replied',
'archived'
);

-- ==========================================
-- VISITOR SESSIONS
-- ==========================================

create table public.visitor_sessions (
id uuid primary key default gen_random_uuid(),
session_token text,
ip_address text,
user_agent text,
referrer text,
landing_page text,
locale text,
country text,
device_type text,
created_at timestamptz default now()
);

-- ==========================================
-- PAGE EVENTS (ANALYTICS)
-- ==========================================

create table public.page_events (
id uuid primary key default gen_random_uuid(),
session_id uuid references visitor_sessions(id) on delete cascade,
page_path text,
event_type text default 'page_view',
event_label text,
metadata jsonb default '{}'::jsonb,
created_at timestamptz default now()
);

create index idx_page_events_session on page_events(session_id);
create index idx_page_events_path on page_events(page_path);

-- ==========================================
-- BOOKING REQUESTS
-- ==========================================

create table public.booking_requests (

id uuid primary key default gen_random_uuid(),

booking_reference text,

full_name text not null,
email text not null,
phone text,
whatsapp text,
country text,

preferred_language text,

experience_slug text,
experience_title text,

check_in_date date,
check_out_date date,

nights integer default 0,

adults integer default 1,
children integer default 0,

special_requests text,

currency text default 'EUR',

subtotal numeric default 0,
addons_total numeric default 0,
estimated_total numeric default 0,

payment_method text,
payment_status text default 'unpaid',

booking_status booking_status default 'new',

created_at timestamptz default now()

);

create index idx_booking_status on booking_requests(booking_status);
create index idx_booking_email on booking_requests(email);

-- ==========================================
-- BOOKING STATUS HISTORY
-- ==========================================

create table public.booking_status_history (

id uuid primary key default gen_random_uuid(),
booking_id uuid references booking_requests(id) on delete cascade,
previous_status booking_status,
new_status booking_status,
note text,
created_at timestamptz default now()

);

-- ==========================================
-- CONTACT MESSAGES
-- ==========================================

create table public.contact_messages (

id uuid primary key default gen_random_uuid(),

full_name text,
email text,
phone text,
country text,

subject text,
message text,

preferred_language text,

status message_status default 'new',

created_at timestamptz default now()

);

create index idx_contact_status on contact_messages(status);

-- ==========================================
-- PAYMENT LINKS
-- ==========================================

create table public.payment_links (

id uuid primary key default gen_random_uuid(),

provider text unique,
label text,

payment_url text,

is_active boolean default false,

created_at timestamptz default now()

);

insert into payment_links (provider,label,payment_url,is_active) values
('pay_later','Pay Later / Confirm Reservation',null,true),
('stripe','Credit Card / Stripe',null,false),
('paypal','PayPal',null,false),
('bank_transfer','Bank Transfer',null,false),
('cmi','CMI Morocco Payment',null,false);

-- ==========================================
-- AVAILABILITY CALENDAR
-- ==========================================

create table public.availability_calendar (

id uuid primary key default gen_random_uuid(),

experience_slug text,

available_date date,

is_available boolean default true,

price_override numeric,

inventory integer,

created_at timestamptz default now()

);

create index idx_availability_date on availability_calendar(available_date);

-- ==========================================
-- MEDIA ASSETS
-- ==========================================

create table public.media_assets (

id uuid primary key default gen_random_uuid(),

key text unique,
title text,

file_path text,

category text,

alt_text text,

sort_order integer default 0,

is_active boolean default true,

created_at timestamptz default now()

);

-- ==========================================
-- ADMIN ACTIVITY
-- ==========================================

create table public.admin_recent_activity (

id uuid primary key default gen_random_uuid(),

activity_type text,
entity_type text,
entity_id uuid,

description text,

metadata jsonb default '{}'::jsonb,

created_at timestamptz default now()

);