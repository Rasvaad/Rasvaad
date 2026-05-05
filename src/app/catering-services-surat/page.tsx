import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";
import { getSectionMap, getServices, getSiteSettings } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const servicesData = await getServices();
  const suratSeo = servicesData?.find(
    (service) => service.location?.toLowerCase().includes("surat") && (service.seoTitle || service.seoDescription),
  );

  return {
    title: suratSeo?.seoTitle ?? "Best Catering Services in Surat | Wedding & Event Caterers",
    description:
      suratSeo?.seoDescription ??
      "Top catering services in Surat for weddings, corporate events & private parties. Premium food, live counters & professional service.",
    keywords: suratSeo?.keywords ?? undefined,
    alternates: { canonical: "/catering-services-surat" },
  };
}

export default async function SuratPage() {
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
