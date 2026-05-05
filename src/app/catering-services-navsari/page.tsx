import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";
import { getSectionMap, getServices, getSiteSettings } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const servicesData = await getServices();
  const navsariSeo = servicesData?.find(
    (service) => service.location?.toLowerCase().includes("navsari") && (service.seoTitle || service.seoDescription),
  );

  return {
    title: navsariSeo?.seoTitle ?? "Best Catering Services in Navsari | Wedding & Event Caterers",
    description:
      navsariSeo?.seoDescription ??
      "Looking for catering services in Navsari? We offer wedding catering, party catering and corporate catering with customized menus.",
    keywords: navsariSeo?.keywords ?? undefined,
    alternates: { canonical: "/catering-services-navsari" },
  };
}

export default async function NavsariPage() {
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
