import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "@/lib/sanity";

export default async function NotFound() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <Header sanityData={siteSettings} />
      <main className="min-h-screen bg-cream pt-28 text-charcoal sm:pt-32">
        <section className="section-shell flex min-h-[70svh] items-center justify-center py-16">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-2xl shadow-black/5 sm:rounded-[44px] sm:p-12 lg:p-16">
            <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-primary via-accent to-secondary" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
              Page not found
            </p>
            <h1 className="mt-5 font-serif text-[4.5rem] font-black leading-none text-primary sm:text-[7rem]">
              404
            </h1>
            <h2 className="mt-4 font-serif text-3xl font-black leading-tight sm:text-5xl">
              This page is not on the menu.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              The page may have moved, or the link may be incorrect. Return home
              or contact Rasvaad for catering details.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-accent/15 transition-transform hover:scale-105"
              >
                Go Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer sanityData={siteSettings} />
    </>
  );
}
