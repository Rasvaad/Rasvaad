import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";
import { getSectionMap, getServices, getSiteSettings } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const [servicesData, sections] = await Promise.all([getServices(), getSectionMap()]);
  const primarySeo = servicesData?.find((service) => service.seoTitle || service.seoDescription);
  const sectionSeo = sections.services;

  return {
    title: sectionSeo?.seoTitle ?? primarySeo?.seoTitle ?? "Catering Services in Surat & Navsari | Wedding & Corporate Catering",
    description:
      sectionSeo?.seoDescription ??
      primarySeo?.seoDescription ??
      "Explore catering services in Surat & Navsari including wedding catering, corporate catering, live counters and custom menus.",
    keywords: sectionSeo?.keywords?.length ? sectionSeo.keywords : servicesData?.flatMap((service) => service.keywords ?? []) ?? undefined,
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [siteSettings, servicesData, sections] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getSectionMap(),
  ]);

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="pt-20">
        <Services sanityData={servicesData} sectionData={sections.services} />
        <Contact sanityData={siteSettings} sectionData={sections.contact} />
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
