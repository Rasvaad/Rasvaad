"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { navItems, phoneNumber, whatsappHref } from "@/lib/content";
import { EasterEggAnimation } from "./EasterEggAnimation";
import type { SanitySiteSettings } from "@/lib/sanity";

interface Props {
  sanityData?: SanitySiteSettings | null;
}

export function Header({ sanityData }: Props) {
  const nav = sanityData?.navItems?.length ? sanityData.navItems : navItems;
  const brandName = sanityData?.brandName ?? "RASVAAD";
  const brandTagline = sanityData?.brandTagline ?? "Catering";
  const logoAlt = sanityData?.logoAlt ?? brandName;
  const phone = sanityData?.phone ?? phoneNumber;
  const waHref = sanityData?.whatsappMessage
    ? `https://wa.me/91${sanityData.phone}?text=${encodeURIComponent(sanityData.whatsappMessage)}`
    : whatsappHref;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isEasterEggTriggered, setIsEasterEggTriggered] = useState(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const newCount = logoClickCount + 1;
      setLogoClickCount(newCount);

      // Clear existing timer
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }

      // Trigger animation at exactly 5 clicks
      if (newCount === 5) {
        setIsEasterEggTriggered(true);
        setLogoClickCount(0); // Reset counter
        return;
      }

      // Reset counter after 3 seconds of no clicks
      clickTimerRef.current = setTimeout(() => {
        setLogoClickCount(0);
      }, 3000);
    },
    [logoClickCount],
  );

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <EasterEggAnimation
        isTriggered={isEasterEggTriggered}
        onComplete={() => setIsEasterEggTriggered(false)}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-700 ${scrolled ? "py-2" : "py-3 sm:py-4"}`}
      >
        <div className="section-shell">
          <div
            className={`relative flex items-center justify-between rounded-3xl px-4 py-2.5 transition-all duration-500 sm:rounded-full sm:px-6 ${
              scrolled || !isHome
                ? "bg-primary shadow-[0_15px_30px_rgba(0,0,0,0.15)] border border-white/10 scale-95"
                : "bg-transparent scale-100"
            }`}
          >
            {/* Logo Section - Refined Size */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="group flex items-center gap-3 rounded-full outline-none sm:gap-4"
              aria-label={`${brandName} home`}
            >
              <div
                className={`relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-700 ${scrolled ? "h-12 w-12 sm:h-14 sm:w-14" : "h-12 w-12 sm:h-16 sm:w-16"} bg-white shadow-xl ring-2 ring-secondary/20 group-hover:rotate-360 group-hover:ring-secondary/50`}
              >
                <Image
                  src="/rasvaad.svg"
                  alt={logoAlt}
                  width={50}
                  height={50}
                  priority
                  className="h-[85%] w-[85%] object-contain"
                />
              </div>
              <div className="hidden leading-none sm:block">
                <span className="block text-lg font-black tracking-tighter text-white transition-colors duration-700 sm:text-xl">
                  {brandName}
                </span>
                <span className="mt-0.5 block text-[7px] font-black uppercase tracking-[0.3em] text-secondary transition-colors duration-700">
                  {brandTagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-4 xl:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ color: "#FFFFFF" }}
                  className="relative px-2 py-1 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-500 hover:opacity-70 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-full bg-secondary transition-transform duration-300 group-hover:scale-100" />
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href={`tel:+91${phone}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_20px_rgba(230,126,34,0.3)] transition-all hover:scale-105 active:scale-95 sm:hidden"
                aria-label={`Call ${brandName}`}
              >
                <span className="text-base">📞</span>
              </a>

              <a
                href={`tel:+91${phone}`}
                className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(230,126,34,0.3)] transition-all hover:scale-105 active:scale-95 sm:inline-flex"
                style={{ color: "#FFFFFF" }}
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <span className="text-base">📞</span>
                  <span>Call Now</span>
                </span>
                <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className={`relative z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full transition-all duration-700 lg:hidden ${
                  scrolled || !isHome
                    ? "bg-accent text-white shadow-lg"
                    : "bg-white text-primary shadow-xl"
                }`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <div className="relative h-3 w-5">
                  <span
                    className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-500 ${isOpen ? "top-1.5 rotate-45" : "top-0"}`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
                  />
                  <span
                    className={`absolute left-0 h-0.5 w-full bg-current transition-all duration-500 ${isOpen ? "top-1.5 -rotate-45" : "top-3"}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-[1001] overflow-hidden rounded-[24px] bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:inset-x-4 sm:rounded-[40px] sm:p-8 lg:hidden"
          >
            <div className="flex max-h-[calc(100svh-7rem)] flex-col gap-3 overflow-y-auto sm:gap-5">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {nav.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex min-h-16 items-center justify-between rounded-2xl border border-gray-100 bg-cream px-4 py-3 text-sm font-black text-charcoal shadow-sm active:border-secondary active:text-secondary sm:min-h-20 sm:rounded-3xl sm:px-5 sm:text-xl"
                    >
                      {item.label}
                      <span className="text-secondary opacity-60 transition-transform group-active:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
                <a
                  href={`tel:+91${phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-3 py-4 text-sm font-black shadow-xl shadow-primary/20 sm:rounded-3xl sm:py-6 sm:text-xl"
                  style={{ color: "#FFFFFF" }}
                >
                  <span className="text-xl sm:text-2xl">📞</span> Call
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex min-h-14 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-accent px-3 py-4 text-sm font-black shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] sm:rounded-3xl sm:py-6 sm:text-xl"
                  style={{ color: "#FFFFFF" }}
                >
                  <span
                    className="relative z-10 flex items-center gap-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    <span>💬</span> WhatsApp
                  </span>
                  <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
