import Image from "next/image";
import { imageSet } from "@/lib/content";
import { MotionItem, RevealText } from "@/components/Motion";
import type { SanityAbout } from "@/lib/sanity";

interface Props {
  sanityData?: SanityAbout | null;
}

export function About({ sanityData }: Props) {
  const img = sanityData?.imageUrl ?? imageSet.about;
  const eyebrow = sanityData?.eyebrow ?? "Who We Are";
  const headline =
    sanityData?.headline ?? "Leading Catering Company in Surat & Navsari";
  const body1 =
    sanityData?.body1 ??
    "With over 10+ years of experience in catering services in Surat and Navsari, we specialize in delivering premium food experiences for weddings, corporate events, and private functions.";
  const body2 =
    sanityData?.body2 ??
    "Our focus is simple – exceptional taste, elegant presentation, and seamless service. As one of the best catering services in Surat & Navsari, we ensure every event reflects your style and creates a lasting impression.";
  const quote =
    sanityData?.quote ??
    "Hum sirf food serve nahi karte – hum experience create karte hain jo aapke guests hamesha yaad rakhen.";
  const badgeText = sanityData?.badgeText ?? "10+";
  const badgeLabel = sanityData?.badgeLabel ?? "Years of Excellence";
  const highlights = sanityData?.highlights?.length
    ? sanityData.highlights
    : [
        "Fresh & locally sourced ingredients",
        "Customized menus for every event",
        "Professional & trained service staff",
      ];
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-28 xl:py-32">
      {/* Subtle decorative elements */}
      <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="section-shell">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 xl:gap-20">
          {/* Image Side with Premium Frame */}
          <MotionItem
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] shadow-2xl sm:aspect-[4/5] sm:rounded-[44px] lg:max-h-[720px] lg:rounded-[42px] xl:max-h-[760px]">
              <Image
                src={img}
                alt="Rasvaad Catering Team"
                fill
                unoptimized
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-5 hidden rounded-[30px] p-6 shadow-2xl glass-morphism md:block xl:-bottom-8 xl:-right-8 xl:p-7">
              <p className="font-serif text-4xl font-black text-primary xl:text-5xl">
                {badgeText}
              </p>
              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.28em] text-charcoal/60 xl:text-[10px] xl:tracking-[0.3em]">
                {badgeLabel}
              </p>
            </div>
          </MotionItem>

          {/* Text Side */}
          <RevealText>
            <div className="mb-5 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <span className="h-px w-8 bg-secondary sm:w-10" />
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-secondary sm:text-xs sm:tracking-[0.4em]">
                {eyebrow}
              </p>
            </div>
            <h2 className="font-serif text-[2rem] font-black leading-[1.08] text-charcoal sm:text-5xl lg:text-[3.35rem] xl:text-[3.85rem]">
              {headline.includes("Surat") ? (
                <>
                  Leading Catering Company in{" "}
                  <span className="italic text-primary">Surat & Navsari</span>
                </>
              ) : (
                headline
              )}
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed text-muted sm:mt-8 lg:mt-6 lg:text-base xl:text-lg">
              {body1}
            </p>
            <p className="mt-3 text-base font-light leading-relaxed text-muted sm:mt-4 lg:text-base xl:text-lg">
              {body2}
            </p>
            <div className="mt-5 rounded-2xl border-l-4 border-secondary bg-white/70 p-5 text-sm font-medium italic text-primary shadow-sm sm:mt-6 sm:bg-secondary/5 sm:p-6 lg:p-5 sm:text-base">
              &ldquo;{quote}&rdquo;
            </div>
            <div className="mt-7 grid gap-3 sm:mt-12 sm:space-y-6 lg:mt-8 lg:space-y-4">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-2xl bg-white/55 p-3 sm:gap-4 sm:bg-transparent sm:p-0">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                  <p className="text-sm font-bold text-charcoal sm:text-lg">{h}</p>
                </div>
              ))}
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
