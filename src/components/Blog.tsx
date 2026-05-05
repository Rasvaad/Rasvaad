import { blogPosts as staticPosts } from "@/lib/content";
import { MotionBlock } from "@/components/Motion";
import Link from "next/link";
import Image from "next/image";
import type { SanityBlogPost, SanitySection } from "@/lib/sanity";

interface Props {
  sanityData?: SanityBlogPost[] | null;
  limit?: number;
  sectionData?: SanitySection | null;
}

export function Blog({ sanityData, limit, sectionData }: Props) {
  // Use Sanity posts if available, otherwise fall back to static content
  const posts = sanityData?.length
    ? sanityData
    : staticPosts.map((p, i) => ({
        _id: String(i),
        title: p.title,
        slug: null as string | null,
        hinglish: p.hinglish,
        excerpt: null as string | null,
        coverImageUrl: null as string | null,
        publishedAt: null as string | null,
      }));
  const visiblePosts = typeof limit === "number" ? posts.slice(0, limit) : posts;
  const eyebrow = sectionData?.eyebrow ?? "Insights & Guide";
  const title = sectionData?.title ?? "Catering Tips, Trends &";
  const highlight = sectionData?.highlight ?? "Insights in Surat & Navsari";
  const readMoreLabel = sectionData?.ctaLabel ?? "Read More";
  const placeholderLabel = sectionData?.secondaryText ?? "Article Preview";

  return (
    <section id="blog" className="overflow-hidden bg-cream py-12 sm:py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-6 max-w-2xl sm:mb-10 md:mb-14">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-8 bg-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              {eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-[1.75rem] font-black leading-[1.08] text-charcoal sm:text-4xl md:text-5xl">
            {title} <br className="hidden sm:block" />
            <span className="italic text-primary">
              {highlight}
            </span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {visiblePosts.map((post) => (
            <MotionBlock
              key={post._id}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-xl shadow-black/5 transition-all duration-500 hover:-translate-y-2 sm:rounded-4xl"
            >
              {/* Cover image */}
              {post.coverImageUrl ? (
                <div className="relative aspect-16/9 w-full overflow-hidden sm:aspect-16/11">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-16/9 w-full items-center justify-center bg-linear-to-br from-primary/10 via-white to-secondary/10 sm:aspect-16/11">
                  <div className="text-center">
                    <span className="text-4xl">📝</span>
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted">
                      {placeholderLabel}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-1 flex-col p-4 sm:p-7 md:p-8">
                {post.publishedAt && (
                  <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-muted">
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}

                <h3 className="text-base font-black leading-tight text-charcoal transition-colors group-hover:text-primary sm:text-xl">
                  {post.title}
                </h3>

                {post.excerpt ? (
                  <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-muted sm:mt-3 sm:text-sm">
                    {post.excerpt}
                  </p>
                ) : post.hinglish ? (
                  <p className="mt-2 line-clamp-2 text-xs italic font-medium text-muted sm:mt-3 sm:text-sm">
                    {post.hinglish}
                  </p>
                ) : null}

                <div className="mt-auto pt-4 sm:pt-6">
                  <Link
                    href={post.slug ? `/blog/${post.slug}` : "/blog"}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-secondary transition-all group-hover:gap-3"
                  >
                    {readMoreLabel} <span>→</span>
                  </Link>
                </div>
              </div>
            </MotionBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
