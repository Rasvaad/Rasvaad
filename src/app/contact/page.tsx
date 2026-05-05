import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSectionMap, getSiteSettings } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, sections] = await Promise.all([getSiteSettings(), getSectionMap()]);
  const sectionSeo = sections.contact;

  return {
    title: sectionSeo?.seoTitle ?? settings?.seoTitle ?? "Contact Rasvaad Catering",
    description:
      sectionSeo?.seoDescription ??
      settings?.seoDescription ??
      "Contact Rasvaad Catering for wedding, corporate and event catering quotes in Surat and Navsari.",
    keywords: sectionSeo?.keywords?.length ? sectionSeo.keywords : settings?.keywords ?? undefined,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const [siteSettings, sections] = await Promise.all([getSiteSettings(), getSectionMap()]);

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="pt-20">
        <Contact sanityData={siteSettings} sectionData={sections.contact} />
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
