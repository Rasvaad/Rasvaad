"use client";

import Image from "next/image";
import { useState } from "react";

type BlogCoverProps = {
  src?: string | null;
  alt: string;
  title: string;
};

export function BlogCover({ src, alt, title }: BlogCoverProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return (
      <div className="flex aspect-16/10 w-full items-end overflow-hidden rounded-[28px] bg-linear-to-br from-primary/15 via-white to-secondary/15 p-5 shadow-2xl shadow-black/5 sm:rounded-4xl sm:p-8">
        <div className="max-w-md rounded-3xl bg-white/70 p-4 backdrop-blur-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">
            Rasvaad Blog
          </p>
          <h2 className="mt-2 font-serif text-2xl font-black leading-tight text-charcoal sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Fresh catering ideas, planning guidance, and event inspiration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-16/10 w-full overflow-hidden rounded-[28px] bg-primary/5 shadow-2xl shadow-black/5 sm:rounded-4xl">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 100vw, 960px"
        className="object-cover"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}
