import type { Metadata } from "next";
import { getBlogPost, getBlogPosts, getSiteSettings } from "@/lib/sanity";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCover } from "@/components/BlogCover";

// Pre-generate known slugs at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return (posts ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return {
    title: post?.seoTitle ?? post?.title ?? "Blog Post",
    description: post?.seoDescription ?? post?.excerpt ?? undefined,
    keywords: post?.keywords ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: post?.coverImageUrl
      ? {
          images: [{ url: post.coverImageUrl }],
        }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [siteSettings, post] = await Promise.all([
    getSiteSettings(),
    getBlogPost(slug),
  ]);
  if (!post) notFound();

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="min-h-screen bg-cream">
        <article className="section-shell mx-auto max-w-4xl overflow-hidden py-24 sm:py-28 lg:py-32">
          {/* Back */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-primary sm:mb-10"
          >
            ← Back to Blog
          </Link>

          {/* Cover */}
          <div className="mb-10">
            <BlogCover
              src={post.coverImageUrl}
              alt={post.title}
              title={post.title}
            />
          </div>

          {/* Meta */}
          {post.publishedAt && (
            <p className="mb-4 text-[9px] font-black uppercase tracking-[0.35em] text-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <h1 className="break-words font-serif text-3xl font-black leading-tight text-charcoal [overflow-wrap:anywhere] sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {post.hinglish && (
            <p className="mt-4 break-words text-base italic font-medium text-primary [overflow-wrap:anywhere] sm:text-lg">
              {post.hinglish}
            </p>
          )}

          {/* Body — rendered as plain portable text blocks */}
          {Array.isArray(post.body) && (
            <div className="mt-10 min-w-0 space-y-6 break-words text-base leading-8 text-charcoal/90 [overflow-wrap:anywhere] sm:text-lg sm:leading-9">
              {(
                post.body as Array<{
                  _type: string;
                  _key: string;
                  children?: Array<{ text: string }>;
                }>
              ).map((block) => {
                if (block._type === "block") {
                  const text =
                    block.children?.map((c) => c.text).join("") ?? "";
                  return (
                    <p
                      key={block._key}
                      className="max-w-full break-words [overflow-wrap:anywhere]"
                    >
                      {text}
                    </p>
                  );
                }
                if (block._type === "image") {
                  const b = block as unknown as {
                    _key: string;
                    asset?: { url?: string };
                    alt?: string;
                    caption?: string;
                  };
                  return b.asset?.url ? (
                    <figure key={b._key} className="my-8">
                      <BlogCover
                        src={b.asset.url}
                        alt={b.alt ?? post.title}
                        title={post.title}
                      />
                      {b.caption && (
                        <figcaption className="mt-2 break-words text-center text-sm italic text-muted [overflow-wrap:anywhere]">
                          {b.caption}
                        </figcaption>
                      )}
                    </figure>
                  ) : null;
                }
                return null;
              })}
            </div>
          )}
        </article>
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
