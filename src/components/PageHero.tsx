"use client";

import Image from "next/image";
import Link from "next/link";
import { imageSet, phoneNumber, whatsappHref } from "@/lib/content";
import { MotionItem, RevealText } from "@/components/Motion";
import { Counter } from "@/components/Counter";
import type { SanitySiteImages } from "@/lib/sanity";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  text: string;
  trustLine?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  images?: SanitySiteImages | null;
};

function HeroLink({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const isWhatsApp = href.includes("wa.me");

  const className =
    variant === "primary"
      ? "bg-secondary relative overflow-hidden rounded-2xl px-7 py-4 text-sm font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95 group sm:rounded-full sm:px-12 sm:py-5 sm:text-lg"
      : "rounded-2xl border-2 border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition-all hover:bg-white hover:text-primary sm:rounded-full sm:px-12 sm:py-5 sm:text-lg";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {variant === "primary" && (
          <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
        )}
        <span className="relative z-10 flex items-center">
          {label}
          <span className="ml-3 transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {variant === "primary" && (
        <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
      )}
      <span className="relative z-10 flex items-center gap-3">
        {isWhatsApp && <span className="text-2xl">💬</span>}
        {label}
        <span className="ml-3 transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  text,
  trustLine,
  primaryCta,
  secondaryCta,
  images,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[78svh] overflow-hidden bg-charcoal text-white sm:min-h-[88svh]">
      <div className="absolute inset-0">
        <Image
          src={images?.hero?.url ?? imageSet.hero}
          alt={images?.hero?.alt ?? "Premium catering background"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="section-shell relative z-10 grid min-h-[78svh] items-center gap-8 pb-10 pt-28 sm:min-h-[88svh] sm:gap-10 sm:pb-14 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_400px] lg:pt-40">
        <RevealText className="max-w-4xl" initialVisible>
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-secondary" />
            <p className="text-sm font-black uppercase tracking-[0.4em] text-secondary">
              {eyebrow}
            </p>
          </div>

          <h1 className="mt-6 font-serif text-[clamp(2.35rem,13vw,4rem)] font-black leading-[0.92] tracking-normal sm:mt-8 sm:text-[clamp(3rem,8vw,7rem)] sm:leading-[0.88]">
            {title}
            {highlight ? (
              <>
                <br />
                <span className="script-word italic text-secondary">
                  {highlight}
                </span>
              </>
            ) : null}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/90 sm:mt-8 sm:text-xl md:text-2xl">
            {text}
          </p>

          {trustLine ? (
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-8 bg-white/20" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                {trustLine}
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-6">
            {primaryCta ? (
              <HeroLink
                href={primaryCta.href}
                label={primaryCta.label}
                variant="primary"
              />
            ) : (
              <HeroLink
                href={whatsappHref}
                label="Contact Us"
                variant="primary"
              />
            )}
            {secondaryCta ? (
              <HeroLink
                href={secondaryCta.href}
                label={secondaryCta.label}
                variant="secondary"
              />
            ) : (
              <HeroLink
                href={`tel:+91${phoneNumber}`}
                label="Call Now"
                variant="secondary"
              />
            )}
          </div>
        </RevealText>

        <MotionItem
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="glass-morphism-dark relative overflow-hidden rounded-[50px] p-10 shadow-2xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

            <p className="font-serif text-3xl font-bold italic text-secondary border-b border-white/10 pb-6">
              Our Legacy
            </p>

            <div className="mt-10 space-y-10">
              {[
                { label: "Events Managed", value: "2500+" },
                { label: "Years Experience", value: "10+" },
                { label: "Menu Options", value: "50+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group flex items-center justify-between border-b border-white/10 pb-8 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col">
                    <span className="text-5xl font-black text-white group-hover:text-secondary transition-colors duration-500">
                      <Counter value={stat.value} />
                    </span>
                    <span className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionItem>
      </div>
    </section>
  );
}
