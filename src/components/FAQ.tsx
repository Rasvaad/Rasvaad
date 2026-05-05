"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, imageSet } from "@/lib/content";
import { MotionBlock } from "@/components/Motion";
import type { SanityFaq, SanitySection, SanitySiteImages } from "@/lib/sanity";

interface Props {
  sanityData?: SanityFaq[] | null;
  sectionData?: SanitySection | null;
  images?: SanitySiteImages | null;
}

export function FAQ({ sanityData, sectionData, images }: Props) {
  const items = sanityData?.length ? sanityData : faqs;
  const eyebrow = sectionData?.eyebrow ?? "Common Queries";
  const title = sectionData?.title ?? "Frequently";
  const highlight = sectionData?.highlight ?? "Asked";
  const suffix = sectionData?.secondaryText ?? "Questions";
  const imageUrl =
    sectionData?.imageUrl ?? images?.feature?.url ?? imageSet.feature;
  const imageAlt =
    sectionData?.imageAlt ??
    images?.feature?.alt ??
    "Catering food presentation with colorful appetizers";
  const calloutTitle = sectionData?.trustLine ?? "Need more info?";
  const calloutText =
    sectionData?.description ??
    "We're here to help you plan the perfect event.";
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white py-12 sm:py-24 lg:py-32"
    >
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div>
            <MotionBlock>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-secondary" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
                  {eyebrow}
                </p>
              </div>
              <h2 className="mt-5 font-serif text-[2rem] font-black leading-tight text-charcoal sm:mt-6 sm:text-4xl md:text-5xl">
                {title} <span className="text-primary italic">{highlight}</span>{" "}
                {suffix}
              </h2>
            </MotionBlock>

            <div className="mt-6 space-y-2.5 sm:mt-12 sm:space-y-3">
              {items.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-3xl transition-all duration-500 ${
                    open === index
                      ? "bg-primary text-white shadow-xl shadow-primary/10"
                      : "bg-cream text-charcoal hover:bg-gray-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(open === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-black sm:px-6 sm:py-5 sm:text-lg"
                  >
                    {faq.question}
                    <span
                      className={`text-xl transition-transform duration-500 ${open === index ? "rotate-180" : ""}`}
                    >
                      ↓
                    </span>
                  </button>
                  <AnimatePresence>
                    {open === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                          <p className="text-xs leading-relaxed opacity-90 sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <MotionBlock className="relative hidden sm:block lg:sticky lg:top-32">
            <div className="relative overflow-hidden rounded-[28px] shadow-2xl sm:rounded-[48px]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={900}
                height={1120}
                sizes="(min-width: 1024px) 38vw, 100vw"
                unoptimized={imageUrl.startsWith("http")}
                className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-162.5"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="glass-morphism absolute bottom-5 left-5 right-5 rounded-2xl p-4 text-charcoal sm:bottom-10 sm:left-10 sm:right-10 sm:rounded-3xl sm:p-6">
                <p className="font-serif text-xl font-bold italic text-primary">
                  {calloutTitle}
                </p>
                <p className="mt-1 text-sm text-muted">{calloutText}</p>
              </div>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -z-10 -right-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
          </MotionBlock>
        </div>
      </div>
    </section>
  );
}
