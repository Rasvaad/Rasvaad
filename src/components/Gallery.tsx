import Image from "next/image";
import Link from "next/link";
import { imageSet } from "@/lib/content";
import { MotionBlock } from "@/components/Motion";
import type { SanityGalleryItem, SanitySection } from "@/lib/sanity";

interface Props {
  sanityData?: SanityGalleryItem[] | null;
  sectionData?: SanitySection | null;
}

export function Gallery({ sanityData, sectionData }: Props) {
  // Use Sanity images if available, otherwise fall back to static imageSet
  const imgA = sanityData?.[0]?.imageUrl ?? imageSet.workA;
  const imgB = sanityData?.[1]?.imageUrl ?? imageSet.workB;
  const altA =
    sanityData?.[0]?.title ?? "Decorated dining setup for event catering";
  const altB =
    sanityData?.[1]?.title ?? "Catered event table with fresh food and guests";
  const eyebrow = sectionData?.eyebrow ?? "Our Projects";
  const title = sectionData?.title ?? "Creating Memorable";
  const highlight = sectionData?.highlight ?? "Catering Experiences";
  const description =
    sectionData?.description ??
    "From intimate gatherings to large-scale weddings, we have successfully delivered catering services across Surat and Navsari. Our attention to detail, food quality, and service excellence make us a trusted catering partner.";
  const topCallout = sectionData?.secondaryText ?? "Attention to every detail.";
  const bottomCallout = sectionData?.trustLine ?? "Premium Taste & Presentation.";
  const bullets = sectionData?.bullets?.length
    ? sectionData.bullets
    : [
        "Customized menus for every event",
        "Premium food presentation",
        "Fresh, hygienic ingredients",
      ];
  const quote =
    sectionData?.quote ??
    "Har event ko hum ek premium experience bana dete hain.";
  const ctaLabel = sectionData?.ctaLabel ?? "Discover Our Work";
  const ctaHref = sectionData?.ctaHref ?? "/work";

  return (
    <section id="work" className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <MotionBlock className="grid grid-cols-2 gap-3 md:gap-8">
            <div className="space-y-3 md:space-y-8">
              <div className="relative overflow-hidden rounded-[24px] shadow-xl sm:rounded-4xl">
                <Image
                  src={imgA}
                  alt={altA}
                  width={600}
                  height={800}
                  unoptimized
                  className="h-56 w-full object-cover transition-transform duration-700 hover:scale-110 sm:h-100"
                />
              </div>
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-[24px] bg-secondary/10 p-4 text-center shadow-xl sm:h-62.5 sm:rounded-4xl sm:p-8">
                <p className="font-serif text-lg font-bold italic text-primary sm:text-2xl">
                  {topCallout}
                </p>
              </div>
            </div>
            <div className="space-y-3 pt-8 md:space-y-8 md:pt-12">
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-[24px] bg-primary/5 p-4 text-center shadow-xl sm:h-62.5 sm:rounded-4xl sm:p-8">
                <p className="font-serif text-lg font-bold italic text-secondary sm:text-2xl">
                  {bottomCallout}
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[24px] shadow-xl sm:rounded-4xl">
                <Image
                  src={imgB}
                  alt={altB}
                  width={600}
                  height={800}
                  unoptimized
                  className="h-40 w-full object-cover transition-transform duration-700 hover:scale-110 sm:h-62.5"
                />
              </div>
            </div>
          </MotionBlock>

          <MotionBlock>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-secondary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
                {eyebrow}
              </p>
            </div>
            <h2 className="mt-5 font-serif text-[2rem] font-black leading-tight text-charcoal sm:mt-6 sm:text-4xl md:text-5xl">
              {title}{" "}
              <span className="text-primary italic">{highlight}</span>
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed text-muted sm:mt-8 sm:text-lg">
              {description}
            </p>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {bullets.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <p className="text-sm font-bold text-charcoal sm:text-base">{point}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-base font-medium italic text-primary sm:mt-8 sm:text-lg">
              &quot;{quote}&quot;
            </p>

            <Link
              href={ctaHref}
              className="group relative mt-8 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-accent px-7 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(230,126,34,0.3)] transition-all hover:scale-105 active:scale-95 sm:mt-12 sm:w-auto sm:rounded-full sm:px-8 sm:text-base"
              style={{ color: "#FFFFFF" }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white">
                {ctaLabel}
                <span className="text-xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
              <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0" />
            </Link>
          </MotionBlock>
        </div>
      </div>
    </section>
  );
}
