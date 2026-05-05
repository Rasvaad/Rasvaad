import type { Metadata } from "next";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import {
  getSiteSettings,
  getHero,
  getAbout,
  getServices,
  getProcessSteps,
  getGalleryItems,
  getTestimonials,
  getFaqs,
  getBlogPosts,
  getSectionMap,
  getSiteImages,
} from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, heroData] = await Promise.all([
    getSiteSettings(),
    getHero(),
  ]);

  return {
    title:
      heroData?.seoTitle ??
      siteSettings?.seoTitle ??
      "Best Catering Services in Surat & Navsari | Wedding Caterers",
    description:
      heroData?.seoDescription ??
      siteSettings?.seoDescription ??
      "Looking for catering services in Surat & Navsari? We provide premium wedding, corporate & event catering with customized menus and professional service.",
    keywords: heroData?.keywords?.length
      ? heroData.keywords
      : (siteSettings?.keywords ?? undefined),
    alternates: { canonical: "/" },
  };
}

export default async function Home() {
  // All fetches run in parallel — zero waterfall
  const [
    siteSettings,
    heroData,
    aboutData,
    servicesData,
    processData,
    galleryData,
    testimonialData,
    faqData,
    blogData,
    sections,
    siteImages,
  ] = await Promise.all([
    getSiteSettings(),
    getHero(),
    getAbout(),
    getServices(),
    getProcessSteps(),
    getGalleryItems(),
    getTestimonials(),
    getFaqs(),
    getBlogPosts(),
    getSectionMap(),
    getSiteImages(),
  ]);

  return (
    <>
      <Header sanityData={siteSettings} />
      <main>
        <Hero sanityData={heroData} images={siteImages} />
        <About sanityData={aboutData} images={siteImages} />
        <Services sanityData={servicesData} sectionData={sections.services} />
        <Process
          sanityData={processData}
          sectionData={sections.process}
          images={siteImages}
        />
        <Gallery
          sanityData={galleryData}
          sectionData={sections.gallery}
          images={siteImages}
        />
        <Testimonials
          sanityData={testimonialData}
          sectionData={sections.testimonials}
        />
        <FAQ
          sanityData={faqData}
          sectionData={sections.faq}
          images={siteImages}
        />
        <Blog sanityData={blogData} limit={3} sectionData={sections.blog} />
        <Contact sanityData={siteSettings} sectionData={sections.contact} />
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
