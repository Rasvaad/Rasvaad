import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getBlogPosts, getSectionMap, getSiteSettings } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, sections] = await Promise.all([getSiteSettings(), getSectionMap()]);
  const sectionSeo = sections.blog;

  return {
    title:
      sectionSeo?.seoTitle ??
      settings?.seoTitle ??
      "Catering Tips & Trends in Surat | Wedding Catering Guide",
    description:
      sectionSeo?.seoDescription ??
      settings?.seoDescription ??
      "Explore catering tips, wedding food ideas and catering trends in Surat & Navsari. Learn how to choose the best caterer.",
    keywords: sectionSeo?.keywords?.length ? sectionSeo.keywords : settings?.keywords ?? undefined,
    alternates: { canonical: "/blog" },
  };
}

export default async function BlogPage() {
  const [siteSettings, blogData, sections] = await Promise.all([
    getSiteSettings(),
    getBlogPosts(),
    getSectionMap(),
  ]);

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="pt-24 sm:pt-28">
        <Blog sanityData={blogData} sectionData={sections.blog} />
        <Contact sanityData={siteSettings} sectionData={sections.contact} />
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
