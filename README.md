# Rasvaad — Catering Services Website

A modern, SEO-optimized marketing website for **Rasvaad**, a professional catering company serving Surat & Navsari, Gujarat. Built with Next.js 16, Tailwind CSS, Framer Motion, and Sanity CMS.

---

## Tech Stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **CMS** — Sanity v3 (for gallery & testimonials)
- **Email** — Nodemailer (contact form)
- **Language** — TypeScript

---

## Features

- Fully responsive landing page with hero, services, process, gallery, testimonials, blog, and contact sections
- Page transitions via `next-view-transitions`
- Sanity Studio embedded at `/studio` for content management
- Contact form with server-side email delivery
- SEO-ready with structured metadata and location-specific pages (`/catering-services-surat`, `/catering-services-navsari`)

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
CONTACT_TO_EMAIL=rasvaad@gmail.com
```

### Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home page
│   ├── about/
│   ├── services/
│   ├── work/
│   ├── blog/
│   ├── faq/
│   ├── contact/
│   ├── catering-services-surat/
│   ├── catering-services-navsari/
│   ├── api/contact/      # Contact form API route
│   └── studio/           # Sanity Studio
├── components/           # UI components
├── lib/                  # Content, animations, SEO, Sanity client
└── sanity/               # Sanity schema types
```

---

## Content Management

Sanity Studio is available at `/studio`. It manages:

- **Gallery items** — event photos and labels
- **Testimonials** — client reviews

To configure Sanity, update `sanity.config.ts` with your project ID and dataset.

---

## Contact

**Rasvaad Catering**
- Phone: +91 94084 36937
- Email: rasvaad@gmail.com
- WhatsApp: [Chat with us](https://wa.me/919408436937)
- Serving: Surat & Navsari, Gujarat
# Rasvaad
