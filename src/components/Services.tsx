"use client";

import Link from "next/link";
import { useRef } from "react";
import { services as staticServices } from "@/lib/content";
import { motion, useScroll, useTransform } from "framer-motion";
import type { SanitySection, SanityService } from "@/lib/sanity";

const icons: Record<string, React.ReactNode> = {
  WD: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-7 w-7"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
  CO: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-7 w-7"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  PP: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-7 w-7"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  BL: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-7 w-7"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
      <circle cx="19" cy="6" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  JV: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-7 w-7"
    >
      <path d="M12 2a10 10 0 0 1 0 20A10 10 0 0 1 12 2z" />
      <path d="M8 12s1-3 4-3 4 3 4 3-1 3-4 3-4-3-4-3z" />
    </svg>
  ),
  LX: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-7 w-7"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

// Triplicate so there's always content on both sides during scroll
type ServiceItem = (typeof staticServices)[number] | SanityService;

interface Props {
  sanityData?: SanityService[] | null;
  sectionData?: SanitySection | null;
}

export function Services({ sanityData, sectionData }: Props) {
  const services: ServiceItem[] = sanityData?.length
    ? sanityData
    : staticServices;
  const eyebrow = sectionData?.eyebrow ?? "Our Expertise";
  const title = sectionData?.title ?? "Our Catering Services in";
  const highlight = sectionData?.highlight ?? "Surat & Navsari";
  const description =
    sectionData?.description ??
    "From traditional flavors to modern luxury, we deliver excellence at every event.";
  const cardCtaLabel = sectionData?.ctaLabel ?? "Explore Service";
  const cardCtaHref = sectionData?.ctaHref ?? "/contact";
  const looped = [...services, ...services, ...services];
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });

  // Card width ~340px + 24px gap = ~364px per card, 6 cards = ~2184px total for one set
  // We shift by one full set width so the loop is seamless
  const SHIFT = 2184;

  // Top row: scroll right → left (negative direction), starts centered on middle set
  // Range: from -SHIFT/2 (half set to the right = last cards visible) → -SHIFT (shifted left by full set)
  const topX = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-SHIFT / 2}px`, `${-SHIFT}px`],
  );

  // Bottom row: scroll left → right (positive direction), mirror of top
  const bottomX = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-SHIFT / 2}px`, `0px`],
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-12 sm:py-24 md:py-40"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10" />

      <div className="section-shell">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:gap-5 sm:pb-7 md:flex-row md:items-end md:gap-8 md:pb-12">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
              <span className="h-px w-8 bg-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                {eyebrow}
              </p>
            </div>
            <h2 className="font-serif text-[1.75rem] font-black leading-[1.08] text-charcoal sm:text-4xl md:text-5xl">
              {title} <br />
              <span className="italic text-primary">{highlight}</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* Full-width overflow container — outside section-shell so cards bleed edge to edge */}
      <div className="mt-6 overflow-hidden sm:mt-8 md:mt-16">
        <div className="flex gap-3 overflow-x-auto px-3 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
          {services.map((service, i) => (
            <ServiceCard
              key={`mobile-${service.title}-${i}`}
              service={service}
              index={i}
              ctaLabel={cardCtaLabel}
              ctaHref={cardCtaHref}
            />
          ))}
        </div>

        {/* Top row — moves LEFT on scroll down */}
        <motion.div style={{ x: topX }} className="hidden gap-4 pb-3 sm:flex sm:gap-6">
          {looped.map((service, i) => (
            <ServiceCard
              key={`top-${i}`}
              service={service}
              index={i % services.length}
              ctaLabel={cardCtaLabel}
              ctaHref={cardCtaHref}
            />
          ))}
        </motion.div>

        {/* Bottom row — moves RIGHT on scroll down */}
        <motion.div style={{ x: bottomX }} className="hidden gap-4 pt-3 sm:flex sm:gap-6">
          {looped.map((service, i) => (
            <ServiceCard
              key={`bot-${i}`}
              service={service}
              index={(i + 1) % services.length}
              ctaLabel={cardCtaLabel}
              ctaHref={cardCtaHref}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  ctaLabel,
  ctaHref,
}: {
  service: ServiceItem;
  index: number;
  ctaLabel: string;
  ctaHref: string;
}) {
  const isDark = index % 3 === 1;

  return (
    <div
      className={`group relative flex w-[214px] shrink-0 flex-col overflow-hidden rounded-[20px] p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:w-[320px] sm:rounded-[32px] sm:p-9 md:w-[360px] ${
        isDark
          ? "bg-primary text-white shadow-[0_20px_40px_-10px_rgba(122,30,30,0.25)]"
          : "bg-[#f9f6f1] text-charcoal shadow-[0_8px_30px_-8px_rgba(0,0,0,0.07)] border border-gray-100"
      }`}
    >
      {/* Hover image overlay */}
      {"imageUrl" in service && service.imageUrl ? (
        <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.imageUrl}
            alt={service.title}
            className="h-full w-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-20 group-hover:scale-100"
          />
        </div>
      ) : "image" in service && service.image ? (
        <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image as string}
            alt={service.title}
            className="h-full w-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-20 group-hover:scale-100"
          />
        </div>
      ) : null}

      {/* Icon */}
      <div
        className={`relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 sm:mb-7 sm:h-14 sm:w-14 sm:rounded-2xl ${
          isDark
            ? "bg-white/10 text-secondary border border-white/15"
            : "bg-white text-primary shadow-sm border border-gray-100"
        }`}
      >
        {icons[service.badge] ?? (
          <span className="text-lg font-black">{service.badge}</span>
        )}
      </div>

      <h3 className="relative text-base font-black leading-snug tracking-tight sm:text-xl">
        {service.title}
      </h3>

      <p
        className={`relative mt-2 line-clamp-4 text-xs leading-relaxed font-light sm:mt-3 sm:text-sm ${
          isDark ? "text-white/70" : "text-muted"
        }`}
      >
        {service.text}
      </p>

      {service.hinglish && (
        <p
          className={`relative mt-2 line-clamp-3 text-xs italic font-medium sm:mt-3 sm:text-sm ${
            isDark ? "text-secondary/80" : "text-primary/80"
          }`}
        >
          {service.hinglish}
        </p>
      )}

      <Link
        href={ctaHref}
        className={`relative mt-auto flex items-center gap-2 pt-5 text-[7px] font-black uppercase tracking-[0.18em] transition-all duration-300 group-hover:gap-4 sm:pt-8 sm:text-[9px] sm:tracking-[0.22em] ${
          isDark ? "text-secondary" : "text-primary"
        }`}
      >
        {ctaLabel}
        <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
