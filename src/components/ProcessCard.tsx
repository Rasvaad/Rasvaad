"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import type { SanityProcessStep } from "@/lib/sanity";

type Props = {
  step: Pick<SanityProcessStep, "title" | "text" | "imageUrl" | "imageAlt" | "caption" | "badgeLabel">;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  fallbackImage: string;
};

export function ProcessCard({ step, index, total, scrollYProgress, fallbackImage }: Props) {
  const segSize = 1 / total;
  const segStart = index * segSize;
  const segEnd = segStart + segSize;

  const p = useTransform(scrollYProgress, [segStart, segEnd], [0, 1], {
    clamp: false,
  });

  const y = useTransform(
    p,
    [-0.12, 0.02, 0.18, 0.78, 1],
    ["48%", "18%", "0%", "0%", "-5%"],
  );
  const scale = useTransform(p, [-0.05, 0.18, 0.78, 1], [0.94, 1, 1, 0.96]);
  const opacity = useTransform(p, [-0.08, 0.08, 0.86, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(p, [0.1, 0.9], [1.08, 1]);
  const progressLine = useTransform(p, [0.08, 0.86], [0, 1], {
    clamp: true,
  });
  const zIndex = useTransform(p, (v) => {
    if (v >= -0.08 && v <= 1) return total * 10 + index;
    return 0;
  });
  const imageUrl = step.imageUrl ?? fallbackImage;
  const imageAlt = step.imageAlt ?? step.title;
  const caption =
    step.caption ??
    "Taste, presentation, and service timing stay coordinated at every stage.";
  const badgeLabel = step.badgeLabel ?? "Process";

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex, willChange: "transform, opacity" }}
      className="absolute inset-x-0 bottom-8 top-5 flex items-end"
    >
      <motion.div
        className="relative grid h-full w-full grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] items-center gap-12 overflow-hidden rounded-[34px] border border-black/5 bg-white p-10 shadow-[0_36px_110px_-48px_rgba(0,0,0,0.55)] xl:gap-16 xl:p-12"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 overflow-hidden bg-primary/[0.08]">
          <motion.div
            style={{ scaleY: progressLine }}
            className="absolute inset-0 origin-top bg-primary"
          />
        </div>

        <div className="absolute right-9 top-7 select-none font-serif text-[8rem] font-black leading-none text-primary/[0.035] pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-black text-white shadow-lg shadow-primary/20">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-secondary">
                Step {index + 1}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Rasvaad workflow
              </p>
            </div>
          </div>

          <h3 className="max-w-lg font-serif text-5xl font-black leading-[1.02] text-charcoal xl:text-6xl">
            {step.title}
          </h3>
          <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-muted">
            {step.text}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-16 bg-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-primary/70">
              {String(index + 1).padStart(2, "0")} of{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative h-full min-h-0 overflow-hidden rounded-[28px] bg-primary/5 shadow-2xl">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="50vw"
              unoptimized={imageUrl.startsWith("http")}
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white">
            <p className="max-w-xs text-sm font-semibold leading-relaxed text-white/85">
              {caption}
            </p>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur-md">
              {badgeLabel}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
