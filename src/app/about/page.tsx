import type { Metadata } from "next";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Process } from "@/components/Process";
import {
  getAbout,
  getProcessSteps,
  getSectionMap,
  getSiteImages,
  getSiteSettings,
} from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getAbout();

  return {
    title: aboutData?.seoTitle ?? "About Rasvaad Catering",
    description:
      aboutData?.seoDescription ??
      "Learn about Rasvaad Catering, a premium catering company serving Surat and Navsari weddings, corporate events and private celebrations.",
    keywords: aboutData?.keywords ?? undefined,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const [siteSettings, aboutData, processData, sections, siteImages] =
    await Promise.all([
      getSiteSettings(),
      getAbout(),
      getProcessSteps(),
      getSectionMap(),
      getSiteImages(),
    ]);

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="pt-20">
        <About sanityData={aboutData} images={siteImages} />
        <Process
          sanityData={processData}
          sectionData={sections.process}
          images={siteImages}
        />
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
