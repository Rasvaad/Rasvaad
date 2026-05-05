"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { imageSet, processSteps as staticSteps } from "@/lib/content";
import { ProcessCard } from "./ProcessCard";
import type { SanityProcessStep, SanitySection } from "@/lib/sanity";

interface Props {
  sanityData?: SanityProcessStep[] | null;
  sectionData?: SanitySection | null;
}

const IMAGES = [imageSet.process, imageSet.feature, imageSet.workA];

export function Process({ sanityData, sectionData }: Props) {
  const steps = sanityData?.length ? sanityData : staticSteps;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <section className="relative overflow-hidden bg-[#F8F5F0] py-16 lg:hidden">
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-white/50 to-transparent" />
        <div className="section-shell relative z-10">
          <ProcessHeading align="left" sectionData={sectionData} />

          <div className="relative mt-9 grid gap-5">
            <div className="absolute bottom-8 left-5 top-8 w-px bg-linear-to-b from-primary/0 via-primary/25 to-primary/0" />
            {steps.map((step, index) => (
              <MobileProcessCard
                key={`${step.title}-${index}`}
                step={step}
                index={index}
                total={steps.length}
                fallbackImage={IMAGES[index % IMAGES.length]}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={containerRef}
        style={{ height: `${Math.max(steps.length, 1) * 115 + 90}vh` }}
        className="relative hidden overflow-clip bg-[#F8F5F0] lg:block"
      >
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
          <div className="relative z-50 shrink-0 bg-[#F8F5F0]/95 px-4 pb-5 pt-12 text-center backdrop-blur-sm xl:pt-14">
            <ProcessHeading align="center" sectionData={sectionData} />
          </div>
          <div className="section-shell relative flex-1">
            <div className="absolute left-1/2 top-2 h-12 w-px -translate-x-1/2 bg-linear-to-b from-primary/30 to-transparent" />
            {steps.map((step, index) => (
              <ProcessCard
                key={`${step.title}-${index}`}
                step={step}
                index={index}
                total={steps.length}
                scrollYProgress={scrollYProgress}
                fallbackImage={IMAGES[index % IMAGES.length]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProcessHeading({
  align,
  sectionData,
}: {
  align: "left" | "center";
  sectionData?: SanitySection | null;
}) {
  const centered = align === "center";
  const eyebrow = sectionData?.eyebrow ?? "How we work";
  const title = sectionData?.title ?? "Our Crafting";
  const highlight = sectionData?.highlight ?? "Process";
  const description =
    sectionData?.description ??
    "A focused flow from event brief to final service, designed to keep food, timing, and presentation aligned.";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <div
        className={`mb-4 flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-9 bg-secondary" />
        <p className="text-[10px] font-black uppercase tracking-[0.32em] text-secondary">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-serif text-[2.1rem] font-black leading-[1.02] text-charcoal sm:text-4xl lg:text-6xl">
        {title} <span className="script-word">{highlight}</span>
      </h2>
      <p
        className={`mt-4 text-sm leading-relaxed text-muted sm:text-base ${
          centered ? "mx-auto max-w-2xl" : "max-w-md"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function MobileProcessCard({
  step,
  index,
  total,
  fallbackImage,
}: {
  step: { title: string; text: string; imageUrl?: string | null; imageAlt?: string | null };
  index: number;
  total: number;
  fallbackImage: string;
}) {
  const imageUrl = step.imageUrl ?? fallbackImage;
  const imageAlt = step.imageAlt ?? step.title;

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative ml-4 overflow-hidden rounded-[26px] border border-black/5 bg-white p-4 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute left-0 top-8 h-3 w-3 -translate-x-[1.35rem] rounded-full border-2 border-[#F8F5F0] bg-primary shadow-[0_0_0_5px_rgba(122,30,30,0.12)]" />
      <div className="grid gap-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-primary/5">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="100vw"
            unoptimized={imageUrl.startsWith("http")}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-secondary">
            Step {index + 1}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-black leading-tight text-charcoal">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {step.text}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
