import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Testimonials } from "@/components/Testimonials";
import { getGalleryItems, getSectionMap, getSiteSettings, getTestimonials } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, sections] = await Promise.all([getSiteSettings(), getSectionMap()]);
  const sectionSeo = sections.gallery;

  return {
    title: sectionSeo?.seoTitle ?? settings?.seoTitle ?? "Rasvaad Catering Work",
    description:
      sectionSeo?.seoDescription ??
      settings?.seoDescription ??
      "See Rasvaad catering experiences for weddings, private parties, corporate events and premium dining setups in Surat and Navsari.",
    keywords: sectionSeo?.keywords?.length ? sectionSeo.keywords : settings?.keywords ?? undefined,
    alternates: { canonical: "/work" },
  };
}

export default async function WorkPage() {
  const [siteSettings, galleryData, testimonialData, sections] = await Promise.all([
    getSiteSettings(),
    getGalleryItems(),
    getTestimonials(),
    getSectionMap(),
  ]);

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="pt-20">
        <Gallery sanityData={galleryData} sectionData={sections.gallery} />
        <Testimonials sanityData={testimonialData} sectionData={sections.testimonials} />
        <Contact sanityData={siteSettings} sectionData={sections.contact} />
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
