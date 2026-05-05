import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  getFaqs,
  getSectionMap,
  getSiteImages,
  getSiteSettings,
} from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const [faqData, sections] = await Promise.all([getFaqs(), getSectionMap()]);
  const primarySeo = faqData?.find((faq) => faq.seoTitle || faq.seoDescription);
  const sectionSeo = sections.faq;

  return {
    title:
      sectionSeo?.seoTitle ??
      primarySeo?.seoTitle ??
      "Catering FAQs | Catering Services in Surat & Navsari",
    description:
      sectionSeo?.seoDescription ??
      primarySeo?.seoDescription ??
      "Find answers about catering services in Surat & Navsari including pricing, booking, menu options and event catering details.",
    keywords: sectionSeo?.keywords?.length
      ? sectionSeo.keywords
      : (faqData?.flatMap((faq) => faq.keywords ?? []) ?? undefined),
    alternates: { canonical: "/faq" },
  };
}

export default async function FAQPage() {
  const [siteSettings, faqData, sections, siteImages] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
    getSectionMap(),
    getSiteImages(),
  ]);

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="pt-20">
        <FAQ
          sanityData={faqData}
          sectionData={sections.faq}
          images={siteImages}
        />
        <Contact sanityData={siteSettings} sectionData={sections.contact} />
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
