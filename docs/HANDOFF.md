# ACRES Registration System — Setup & Handoff

What was built: attendee / exhibitor / vendor registration forms, a Supabase
backend, QR + unique-code issuance and confirmation email for attendees, a
gate check-in page, and an admin dashboard (counts, lists, CSV export).

## 1. One-time setup

### Supabase (database + admin login)
1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](../supabase/schema.sql), and run it. This creates
   the `attendees`, `exhibitors`, and `vendors` tables.
3. Under **Authentication → Users**, add one user manually (email + password)
   for whoever will log into `/admin` — the boss or manager. This is the only
   account that should exist; there is no public sign-up.
4. Under **Project Settings → API**, copy the **Project URL**, **anon public**
   key, and **service_role** key into `.env.local` (see below).

### Resend (confirmation emails)
1. Create a free account at [resend.com](https://resend.com) and generate an
   API key under **API Keys**.
2. Until a real sending domain is verified, leave `RESEND_FROM_EMAIL` as
   `onboarding@resend.dev` — Resend's shared test sender. **It only delivers
   to the email address the Resend account was signed up with.** This is a
   Resend restriction, not a bug — every attendee test registration will land
   in that one inbox until a domain is added.
3. Once a domain is available: **Domains → Add Domain** in Resend, add the
   DNS records it gives you wherever the domain is managed, wait for
   verification, then change `RESEND_FROM_EMAIL` to an address on that
   domain (e.g. `noreply@acresafrica.com`). No code changes needed.

### Environment variables
Copy `.env.example` to `.env.local` and fill in the values from the two
steps above, plus `NEXT_PUBLIC_SITE_URL` (the deployed site's URL — this is
what gets encoded into each attendee's QR check-in link, so it must be
correct before the event).

### Deploy
Push to a Vercel project (or any Next.js host) and add the same environment
variables there under **Project Settings → Environment Variables**.

## 2. What's where

| Route | Purpose |
|---|---|
| `/register` | Category picker |
| `/register/attendee` | Attendee form → saves, emails QR + code |
| `/register/exhibitor` | Exhibitor form → saves |
| `/register/vendor` | Vendor form → saves, shows bank payment details |
| `/checkin/[code]` | Opened by scanning an attendee's QR at the gate |
| `/admin/login` | Admin sign-in |
| `/admin` | Overview: counts per category, checked-in count |
| `/admin/attendees` `/admin/exhibitors` `/admin/vendors` | Full lists + CSV export |

## 3. Known limitations / things to revisit

- **Vendor payment account** (`lib/payment-info.ts`): pulled directly from the
  brief (Access Bank, "The Green Hub Services", 1489304476). Confirm this is
  correct and current before the form goes live — it's the only detail in
  this build that wasn't independently verified.
- **Gate check-in page has no staff login.** It relies on the QR code itself
  being unguessable (an 8-character random code) and only ever displaying an
  attendee's name, not other personal details. Fine for a single-event MVP;
  if this becomes a recurring system, add a staff PIN before check-in pages
  go further.
- **No automatic payment verification** for vendors/exhibitors — registering
  and paying are two separate manual steps, matching the original paper form.
- **Email volume**: Resend and Supabase free tiers comfortably cover a
  single-event registration volume. If registrations run into the
  thousands, check both dashboards' usage before the event date.
