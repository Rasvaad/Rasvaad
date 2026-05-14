import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/sanity";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rasvaad.in";

const normalizeSiteUrl = (url: string) =>
  url.endsWith("/") ? url.slice(0, -1) : url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/work",
    "/faq",
    "/blog",
    "/contact",
    "/catering-services-navsari",
    "/catering-services-surat",
  ];

  const posts = (await getBlogPosts()) ?? [];
  const now = new Date();

  const staticEntries = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...blogEntries];
}
