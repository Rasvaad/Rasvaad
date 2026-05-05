"use client";

/**
 * next-sanity wraps the Sanity Studio in a Next.js-compatible component.
 * Install: npm install next-sanity sanity
 */
import dynamic from "next/dynamic";
import config from "../../sanity.config";

// Lazy-load the studio so it doesn't bloat the main bundle
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false },
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
