import { createClient, type SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2026-04-25",
      token: process.env.SANITY_API_TOKEN,
      useCdn:
        !process.env.SANITY_API_TOKEN && process.env.NODE_ENV === "production",
      timeout: 8000,
      maxRetries: 0,
    });
  }
  return _client;
}

async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  const client = getClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params ?? {}, {
      timeout: 8000,
      signal: AbortSignal.timeout(8000),
    });
  } catch (e) {
    // Only log a simple error message, not the full error object
    if (e instanceof Error) {
      console.error(`[Sanity] ${e.name}: ${e.message}`);
    } else {
      console.error("[Sanity] Unknown fetch error");
    }
    return null;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityImage = { url: string; alt?: string };

export type SanitySiteImages = {
  hero: SanityImage | null;
  about: SanityImage | null;
  workA: SanityImage | null;
  workB: SanityImage | null;
  process: SanityImage | null;
  feature: SanityImage | null;
  cta: SanityImage | null;
};

export type SanitySeo = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords?: string[] | null;
};

export type SanitySiteSettings = {
  brandName?: string | null;
  brandTagline?: string | null;
  logoAlt?: string | null;
  phone: string;
  email: string;
  address?: string | null;
  googleMap?: string | null;
  whatsappMessage: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  navItems: { label: string; href: string }[];
  footerTagline: string;
  footerHeading?: string | null;
  quickLinksTitle?: string | null;
  servicesTitle?: string | null;
  contactTitle?: string | null;
  whatsappLabel?: string | null;
  copyrightText?: string | null;
  legalLinks?: { label: string; href: string }[] | null;
  ogImageUrl: string | null;
} & SanitySeo;

export const getSiteImages = () =>
  sanityFetch<SanitySiteImages>(
    `*[_type == "siteImages"][0]{
      "hero": {"url": heroImage.asset->url, "alt": heroImageAlt},
      "about": {"url": aboutImage.asset->url, "alt": aboutImageAlt},
      "workA": {"url": workAImage.asset->url, "alt": workAImageAlt},
      "workB": {"url": workBImage.asset->url, "alt": workBImageAlt},
      "process": {"url": processImage.asset->url, "alt": processImageAlt},
      "feature": {"url": featureImage.asset->url, "alt": featureImageAlt},
      "cta": {"url": ctaImage.asset->url, "alt": ctaImageAlt}
    }`,
  );

export type SanityHero = {
  eyebrow?: string | null;
  headline: string;
  subheading: string;
  hinglish: string;
  ctaLabel: string;
  decorativeText?: string | null;
  slides: SanityImage[];
  stats: { value: string; label: string }[];
} & SanitySeo;

export type SanityAbout = {
  eyebrow: string;
  headline: string;
  body1: string;
  body2: string;
  quote: string;
  badgeText: string;
  badgeLabel: string;
  highlights: string[];
  imageUrl: string | null;
} & SanitySeo;

export type SanityService = {
  _id: string;
  title: string;
  slug: string | null;
  location?: string;
  text: string;
  fullDescription?: string | null;
  hinglish?: string;
  badge: string;
  imageUrl: string | null;
  order: number;
} & SanitySeo;

export type SanityProcessStep = {
  _id: string;
  title: string;
  text: string;
  hinglish?: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  caption?: string | null;
  badgeLabel?: string | null;
  order: number;
};

export type SanitySection = {
  _id: string;
  key: string;
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  description?: string | null;
  secondaryText?: string | null;
  quote?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
  trustLine?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  bullets?: string[] | null;
  stats?: { value: string; label: string }[] | null;
  formLabels?: {
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    location?: string | null;
    members?: string | null;
    category?: string | null;
    message?: string | null;
    submit?: string | null;
    sending?: string | null;
    success?: string | null;
    locationRequired?: string | null;
    nameRequired?: string | null;
    phoneRequired?: string | null;
    namePlaceholder?: string | null;
    phonePlaceholder?: string | null;
    emailPlaceholder?: string | null;
    locationPlaceholder?: string | null;
    messagePlaceholder?: string | null;
    phoneHeading?: string | null;
    emailHeading?: string | null;
    addressHeading?: string | null;
  } | null;
  options?: { label: string; value: string }[] | null;
} & SanitySeo;

export type SanityGalleryItem = {
  _id: string;
  title: string;
  label: string;
  imageUrl: string;
};

export type SanityTestimonial = {
  _id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string | null;
  rating?: number;
};

export type SanityFaq = {
  _id: string;
  question: string;
  answer: string;
  hinglishAnswer?: string;
} & SanitySeo;

export type SanityBlogPost = {
  _id: string;
  title: string;
  slug: string;
  hinglish: string | null;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
} & SanitySeo;

// ─── Queries ─────────────────────────────────────────────────────────────────

export const getSiteSettings = () =>
  sanityFetch<SanitySiteSettings>(
    `*[_type == "siteSettings"][0]{
      brandName, brandTagline, logoAlt,
      phone, email, address, googleMap, whatsappMessage, socials, navItems, footerTagline,
      footerHeading, quickLinksTitle, servicesTitle, contactTitle, whatsappLabel,
      copyrightText, legalLinks,
      seoTitle, seoDescription, keywords,
      "ogImageUrl": ogImage.asset->url
    }`,
  );

export const getHero = () =>
  sanityFetch<SanityHero>(
    `*[_type == "heroSection"][0]{
      eyebrow, headline, subheading, hinglish, ctaLabel, decorativeText,
      "slides": slides[]{ "url": image.asset->url, alt },
      stats,
      seoTitle, seoDescription, keywords
    }`,
  );

export const getAbout = () =>
  sanityFetch<SanityAbout>(
    `*[_type == "aboutSection"][0]{
      eyebrow, headline, body1, body2, quote,
      badgeText, badgeLabel, highlights,
      "imageUrl": image.asset->url,
      seoTitle, seoDescription, keywords
    }`,
  );

export const getServices = () =>
  sanityFetch<SanityService[]>(
    `*[_type == "service"] | order(order asc){
      _id, title, "slug": slug.current, location, text, fullDescription,
      hinglish, badge, order,
      "imageUrl": image.asset->url,
      seoTitle, seoDescription, keywords
    }`,
  );

export const getProcessSteps = () =>
  sanityFetch<SanityProcessStep[]>(
    `*[_type == "processStep"] | order(order asc){
      _id, title, text, hinglish, order, imageAlt, caption, badgeLabel,
      "imageUrl": image.asset->url
    }`,
  );

export const getSections = () =>
  sanityFetch<SanitySection[]>(
    `*[_type == "siteSection"] | order(order asc){
      _id, key, eyebrow, title, highlight, description, secondaryText, quote,
      ctaLabel, ctaHref, secondaryCtaLabel, secondaryCtaHref, trustLine,
      imageAlt, bullets, stats, formLabels, options,
      seoTitle, seoDescription, keywords,
      "imageUrl": image.asset->url
    }`,
  );

export const getSectionMap = async () => {
  const sections = await getSections();
  return Object.fromEntries(
    (sections ?? []).map((section) => [section.key, section]),
  );
};

export const getGalleryItems = () =>
  sanityFetch<SanityGalleryItem[]>(
    `*[_type == "galleryItem"] | order(order asc){
      _id, title, label,
      "imageUrl": image.asset->url
    }`,
  );

export const getTestimonials = () =>
  sanityFetch<SanityTestimonial[]>(
    `*[_type == "testimonial"] | order(order asc){
      _id, name, role, quote, rating,
      "avatarUrl": avatar.asset->url
    }`,
  );

export const getFaqs = () =>
  sanityFetch<SanityFaq[]>(
    `*[_type == "faq"] | order(order asc){
      _id, question, answer, hinglishAnswer,
      seoTitle, seoDescription, keywords
    }`,
  );

export const getBlogPosts = () =>
  sanityFetch<SanityBlogPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc){
      _id, title, "slug": slug.current,
      hinglish, excerpt,
      "coverImageUrl": coverImage.asset->url,
      publishedAt,
      seoTitle, seoDescription, keywords
    }`,
  );

export const getBlogPost = (slug: string) =>
  sanityFetch<SanityBlogPost & { body: unknown }>(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id, title, "slug": slug.current,
      hinglish, excerpt,
      "coverImageUrl": coverImage.asset->url,
      publishedAt,
      seoTitle, seoDescription, keywords,
      body[]{
        ...,
        _type == "image" => {
          ...,
          "asset": asset->{url}
        }
      }
    }`,
    { slug },
  );
