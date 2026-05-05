import type { Metadata, Viewport } from "next";
import type { SanitySiteSettings } from "@/lib/sanity";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rasvaad.com";

const fallbackKeywords = [
  "catering services surat",
  "best caterers in surat",
  "wedding catering navsari",
  "corporate catering surat",
  "premium catering services",
  "rasvaad catering",
  "catering services in Surat Navsari",
  "wedding caterers Surat",
  "catering Navsari",
];

export function buildBaseMetadata(settings?: SanitySiteSettings | null): Metadata {
  const title = settings?.seoTitle ?? "Best Catering Services in Surat & Navsari | Wedding Caterers";
  const description =
    settings?.seoDescription ??
    "Looking for catering services in Surat & Navsari? We provide premium wedding, corporate & event catering with customized menus and professional service.";
  const keywords = settings?.keywords?.length ? settings.keywords : fallbackKeywords;
  const ogImage = settings?.ogImageUrl ?? "/images/catering.jpg";
  const brandName = settings?.brandName ?? "Rasvaad Catering";

  return {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${brandName}`,
  },
  description,
  keywords,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    images: [{ url: ogImage, width: 1200, height: 630 }],
    siteName: brandName,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
};
}

export const baseMetadata: Metadata = buildBaseMetadata();

export const baseViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function localBusinessJsonLd(settings?: SanitySiteSettings | null) {
  const brandName = settings?.brandName ?? "Rasvaad Catering";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": brandName,
    "areaServed": ["Surat", "Navsari"],
    "serviceType": "Catering Services",
    "url": siteUrl,
    "telephone": settings?.phone ? `+91${settings.phone}` : "+919408436937",
    "email": settings?.email ?? "rasvaad@gmail.com",
    "address": settings?.address,
  };
}
