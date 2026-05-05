"use client";

import Image from "next/image";
import { heroStats, imageSet, whatsappHref } from "@/lib/content";
import { motion, AnimatePresence } from "framer-motion";
import { Counter } from "@/components/Counter";
import { useState, useEffect } from "react";
import type { SanityHero } from "@/lib/sanity";

const staticSlides = [
  { url: imageSet.hero, alt: "Rasvaad Catering" },
  { url: imageSet.workA, alt: "Rasvaad Catering" },
  { url: imageSet.workB, alt: "Rasvaad Catering" },
];

interface Props {
  sanityData?: SanityHero | null;
}

export function Hero({ sanityData }: Props) {
  const slides = sanityData?.slides?.length ? sanityData.slides : staticSlides;
  const stats = sanityData?.stats?.length ? sanityData.stats : heroStats;
  const headline =
    sanityData?.headline ?? "Best Catering Services in Surat & Navsari";
  const subheading =
    sanityData?.subheading ??
    "Premium Wedding, Corporate & Event Catering Services in Surat & Navsari";
  const hinglish =
    sanityData?.hinglish ??
    "Shaadi ho, corporate event ho ya private party – hum aapke event ko bana dete hain stress-free aur truly memorable.";
  const ctaLabel = sanityData?.ctaLabel ?? "Get Quote";
  const eyebrow = sanityData?.eyebrow ?? "Premium Catering";
  const decorativeText = sanityData?.decorativeText ?? "RASVAAD CATERING";
  const slideCount = slides.length;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 7000);
    return () => clearInterval(timer);
  }, [slideCount]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#1a0505] text-white"
    >
      {/* Immersive Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].url}
            alt={slides[current].alt ?? "Rasvaad Catering"}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
          {/* Refined Maroon Tint Layer */}
          <div className="absolute inset-0 bg-[#7A1E1E]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-[#1a0505]/30 to-[#1a0505]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0505]/95 via-[#1a0505]/35 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="section-shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-4 pt-24 sm:justify-center sm:py-32">
        <div className="max-w-5xl rounded-[1.35rem] border border-white/10 bg-[#210909]/55 p-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-[3px] sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-3 flex items-center gap-3 sm:hidden">
              <span className="h-px w-7 bg-secondary" />
              <span className="text-[8px] font-black uppercase tracking-[0.32em] text-secondary">
                {eyebrow}
              </span>
            </div>
            <h1 className="font-serif text-[1.85rem] font-black leading-[1] tracking-normal sm:mt-8 sm:text-[clamp(2rem,4vw,4rem)] sm:leading-[1.1]">
              {headline.includes("Surat") ? (
                <>
                  Best Catering Services in{" "}
                  <span className="text-secondary">Surat & Navsari</span>
                </>
              ) : (
                headline
              )}
            </h1>
            <div className="mt-4 space-y-2.5 sm:mt-8 sm:space-y-4">
              <p className="max-w-2xl text-[0.86rem] font-medium leading-relaxed text-white/90 sm:text-lg md:text-xl">
                {subheading}
              </p>
              <p className="max-w-2xl text-[0.76rem] italic leading-relaxed text-secondary/90 sm:text-base md:text-lg font-light">
                {hinglish}
              </p>
            </div>
          </motion.div>

          <div className="mt-4 flex flex-wrap sm:mt-10 sm:pl-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[1rem] bg-accent px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_0_30px_rgba(230,126,34,0.3)] transition-all hover:scale-105 active:scale-95 sm:w-auto sm:rounded-full sm:py-4 sm:text-base sm:normal-case sm:tracking-normal"
            >
              <span className="relative z-10 flex items-center gap-2 p-">
                {ctaLabel}
              </span>
              <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </div>
        </div>

        {/* Integrated Stats Bar */}
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 rounded-[1.2rem] border border-white/10 bg-white/[0.07] p-1.5 backdrop-blur-md sm:mt-16 sm:grid-cols-2 sm:gap-8 sm:border-t sm:border-x-0 sm:border-b-0 sm:bg-transparent sm:p-0 sm:pt-6 sm:backdrop-blur-none md:grid-cols-3 lg:max-w-4xl">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`${i === 2 ? "col-span-2 md:col-span-1" : ""} group rounded-[0.9rem] bg-black/18 p-2.5 sm:rounded-none sm:bg-transparent sm:p-0`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className={`${stat.value.length > 8 ? "sm:text-2xl" : "sm:text-3xl"} text-[1.42rem] font-black leading-none text-white transition-colors duration-500 group-hover:text-secondary whitespace-nowrap`}>
                  {typeof stat.value === "string" &&
                  stat.value.includes("+") ? (
                    <Counter value={stat.value} />
                  ) : (
                    stat.value
                  )}
                </span>
                <span className="hidden h-6 w-px flex-shrink-0 bg-white/10 sm:block" />
                <span className="flex-shrink-0 text-[7px] font-black uppercase leading-tight tracking-[0.14em] text-white/45 sm:text-[9px] sm:tracking-[0.2em]">
                  {stat.label.split(" ").map((word, j) => (
                    <span key={j} className="block sm:block">
                      {word}
                    </span>
                  ))}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                current === i ? "w-8 bg-secondary" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-16 right-16 hidden flex-col gap-6 sm:flex">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative h-12 w-1"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`absolute inset-0 bg-white/20 transition-all duration-500 ${current === i ? "bg-secondary scale-y-125" : "group-hover:bg-white/40"}`}
            />
            <span
              className={`absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-black transition-opacity ${current === i ? "opacity-100" : "opacity-0"}`}
            >
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-16 left-16 hidden flex-col items-center gap-10 xl:flex">
        <div className="h-32 w-px bg-gradient-to-t from-secondary to-transparent" />
        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-secondary/40 [writing-mode:vertical-lr] rotate-180">
          {decorativeText}
        </span>
      </div>
    </section>
  );
}
