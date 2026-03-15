# Erg Chebbi Luxury

A premium multilingual desert tourism booking platform for **Merzouga / Erg Chebbi, Morocco**.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Resend
- Vercel-ready deployment

## Included features

- Luxury public website in 4 languages: English, French, Spanish, Arabic
- RTL support for Arabic
- Real booking flow with server-side pricing logic
- Contact form
- Visitor/session tracking hooks
- Payment-ready architecture
- Protected owner dashboard at `/admin`
- Booking status updates + CSV export
- Supabase schema with analytics + operational tables
- Branded customer and owner booking emails
- Media replacement system for video and photography

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

### Core app
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Email
- `RESEND_API_KEY`
- `BOOKING_FROM_EMAIL`
- `BOOKING_REPLY_TO`
- `OWNER_NOTIFICATION_EMAIL`

### Admin auth
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

### Payment placeholders
- `PAYMENT_STRIPE_URL`
- `PAYMENT_PAYPAL_URL`
- `PAYMENT_BANK_TRANSFER_URL`
- `PAYMENT_CMI_URL`

## Important email note

Because you do **not** yet have a verified sending domain, the safest testing setup is:

- keep `OWNER_NOTIFICATION_EMAIL=soufianechahid80@gmail.com`
- keep `BOOKING_REPLY_TO=soufianechahid80@gmail.com`
- use `BOOKING_FROM_EMAIL=Erg Chebbi Luxury <onboarding@resend.dev>` for testing with Resend

Once `ergchebbiluxury.com` is live and verified on your email provider, replace it with something like:

```env
BOOKING_FROM_EMAIL=Erg Chebbi Luxury <bookings@ergchebbiluxury.com>
```

## Database setup

1. Create a Supabase project
2. Open the SQL editor
3. Run `supabase/schema.sql`
4. Add your environment variables

## Media replacement

The design ships with a premium art direction and **replacement-ready media slots** to avoid bundling unlicensed stock assets.

Place your own licensed files here:

- `public/media/hero/hero-desert.mp4`
- `public/media/hero/hero-poster.jpg`
- `public/media/camp/`
- `public/media/camel/`
- `public/media/quad/`
- `public/media/tours/`
- `public/media/gallery/`

You can also edit media references in:
- `src/content/media.ts`
- `src/content/gallery.ts`

## Where to edit business content

- Brand + business details: `src/lib/site.ts`
- Experiences + pricing: `src/content/experiences.ts`
- Translations: `src/content/translations/*`
- FAQs: `src/content/faqs.ts`
- Payment methods: `src/lib/payments.ts`

## Admin access

- Login page: `/admin/login`
- Dashboard: `/admin`

The dashboard is protected by a secure signed cookie session and is not visible to public visitors.

## Deployment on Vercel

1. Push this project to GitHub
2. Import the repo in Vercel
3. Add environment variables
4. Deploy

## Suggested next upgrades after launch

- Connect Stripe or CMI checkout
- Add real availability blocking to the dashboard
- Upload licensed gallery photography and a cinematic hero reel
- Add verified customer reviews
- Connect Google Analytics / Meta Pixel if desired
