"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { testimonials as staticTestimonials } from "@/lib/content";
import type { SanitySection, SanityTestimonial } from "@/lib/sanity";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string | null;
  rating?: number;
};

const BRAND_GRADIENTS = [
  "from-[#7A1E1E] to-[#a52828]",
  "from-[#B8960C] to-[#D4AF37]",
  "from-[#1A3A5C] to-[#2C5282]",
  "from-[#7A4F1E] to-[#A0672A]",
];

function Avatar({ src, name }: { src?: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  const idx = name.charCodeAt(0) % BRAND_GRADIENTS.length;

  if (!src || failed) {
    return (
      <div
        className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${BRAND_GRADIENTS[idx]} flex items-center justify-center shadow-lg`}
      >
        <span className="text-2xl font-black text-white">{name[0]}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className="h-14 w-14 rounded-2xl object-cover shadow-lg"
      onError={() => setFailed(true)}
    />
  );
}

interface Props {
  sanityData?: SanityTestimonial[] | null;
  sectionData?: SanitySection | null;
}

export function Testimonials({ sanityData, sectionData }: Props) {
  const items: Testimonial[] = sanityData?.length
    ? sanityData
    : staticTestimonials.map((t) => ({ ...t, avatarUrl: null }));

  const eyebrow = sectionData?.eyebrow ?? "Kind Words From Clients";
  const title = sectionData?.title ?? "What They Say About";
  const highlight = sectionData?.highlight ?? "Our Service";

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [items.length, paused]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const t = items[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 24 : -24, scale: 0.97 }),
    center: { opacity: 1, y: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -24 : 24, scale: 0.97 }),
  };

  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-24 lg:py-32">
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]" />
      <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-black/30 blur-[120px]" />

      <div className="section-shell relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-xl text-center sm:mb-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[1.75rem] font-black leading-tight text-white sm:text-3xl md:text-5xl">
            {title} <br />
            <span className="italic text-secondary">{highlight}</span>
          </h2>
        </motion.div>

        {/* Testimonial stage */}
        <div
          className="mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-white/8 bg-white/5 p-8 shadow-2xl backdrop-blur-sm sm:p-12"
            >
              {/* Opening quote mark — top-left */}
              <span
                className="pointer-events-none absolute -top-4 left-6 select-none font-serif text-[9rem] leading-none text-secondary/15 sm:text-[12rem] hidden"
                aria-hidden
              >
                &ldquo;
              </span>

              {/* Closing quote mark — bottom-right */}
              <span
                className="pointer-events-none absolute -bottom-10 right-6 select-none font-serif text-[9rem] leading-none text-secondary/15 sm:text-[12rem] hidden"
                aria-hidden
              >
                &rdquo;
              </span>

              {/* Star rating */}
              <div className="mb-6 flex gap-1">
                {[...Array(t.rating ?? 5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="relative z-10 font-serif text-xl font-medium italic leading-relaxed text-white/90 sm:text-2xl">
                {t.quote}
              </blockquote>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className="ring-2 ring-secondary/30 ring-offset-2 ring-offset-transparent rounded-2xl">
                  <Avatar src={t.avatarUrl} name={t.name} />
                </div>
                <div>
                  <p className="text-base font-black text-white">{t.name}</p>
                  <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.25em] text-secondary">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Prev button */}
            <button
              type="button"
              onClick={goPrev}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition-all hover:border-secondary hover:bg-secondary hover:text-primary"
              aria-label="Previous testimonial"
            >
              <svg className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-500 ${
                    current === i
                      ? "h-2.5 w-10 bg-secondary"
                      : "h-2.5 w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={goNext}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition-all hover:border-secondary hover:bg-secondary hover:text-primary"
              aria-label="Next testimonial"
            >
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
