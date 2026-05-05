# Rasvaad - Catering Services Website

Rasvaad is a modern marketing website for a catering company serving Surat and Navsari, Gujarat. It is built with Next.js, Tailwind CSS, Framer Motion, Sanity CMS, and Nodemailer.

## Tech Stack

- Next.js 16 with the App Router
- Tailwind CSS v4
- Framer Motion for animations
- Sanity v3 for content management
- Nodemailer for contact form email delivery
- TypeScript

## Features

- Responsive landing page with hero, about, services, process, gallery, testimonials, FAQ, blog, and contact sections
- Location-specific pages for Surat and Navsari
- Embedded Sanity Studio at `/studio`
- Server-side contact form email delivery through Gmail
- SEO metadata and local business structured data
- Page transitions with `next-view-transitions`

## Environment Variables

Create a `.env.local` file in the project root using the same keys as `.env.local.example`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_viewer_token_here

EMAIL_USER=your.gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_TO=rasvaad@gmail.com
```

Notes:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are required for the site and Studio to load Sanity content.
- `SANITY_API_TOKEN` is used for server-side Sanity fetches.
- `EMAIL_USER` and `EMAIL_PASS` must be a Gmail address plus an App Password, not your normal Gmail password.
- `EMAIL_TO` is optional and defaults to `rasvaad@gmail.com` if omitted.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

### Build and start production

```bash
pnpm build
pnpm start
```

### Lint the project

```bash
pnpm lint
```

## Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── blog/
│   ├── catering-services-navsari/
│   ├── catering-services-surat/
│   ├── contact/
│   ├── faq/
│   ├── services/
│   ├── studio/
│   └── api/contact/
├── components/
├── lib/
└── sanity/
```

## Content Management

Sanity Studio is available at `/studio`. It manages the site settings, hero, about section, images, gallery items, testimonials, blog content, FAQs, services, and other structured content defined under `src/sanity/schemaTypes`.

## Contact

Rasvaad Catering

- Phone: +91 94084 36937
- Email: rasvaad@gmail.com
- WhatsApp: https://wa.me/919408436937
- Serving: Surat and Navsari, Gujarat
