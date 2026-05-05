import Image from "next/image";
import Link from "next/link";
import {
  emailAddress,
  navItems,
  phoneNumber,
  services as staticServices,
  whatsappHref,
} from "@/lib/content";
import { getServices, type SanitySiteSettings } from "@/lib/sanity";

interface Props {
  sanityData?: SanitySiteSettings | null;
}

export async function Footer({ sanityData }: Props) {
  const servicesData = await getServices();
  const nav = sanityData?.navItems?.length ? sanityData.navItems : navItems;
  const brandName = sanityData?.brandName ?? "Rasvaad Catering";
  const logoAlt = sanityData?.logoAlt ?? brandName;
  const phone = sanityData?.phone ?? phoneNumber;
  const email = sanityData?.email ?? emailAddress;
  const tagline =
    sanityData?.footerTagline ??
    "Elevating events with premium flavors and exquisite presentation. Your trusted catering partner in Surat & Navsari.";
  const quickLinksTitle = sanityData?.quickLinksTitle ?? "Quick Links";
  const servicesTitle = sanityData?.servicesTitle ?? "Our Services";
  const contactTitle = sanityData?.contactTitle ?? "Get in Touch";
  const whatsappLabel = sanityData?.whatsappLabel ?? "Contact Us";
  const copyrightText =
    sanityData?.copyrightText ??
    `© ${new Date().getFullYear()} Rasvaad Catering Services. All rights reserved.`;
  const legalLinks = sanityData?.legalLinks?.length
    ? sanityData.legalLinks
    : [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ];
  const waHref = sanityData?.whatsappMessage
    ? `https://wa.me/91${sanityData.phone}?text=${encodeURIComponent(sanityData.whatsappMessage)}`
    : whatsappHref;
  const socials = sanityData?.socials ?? {};
  const socialLinks = [
    { label: "Facebook", short: "FB", href: socials.facebook },
    { label: "Instagram", short: "IG", href: socials.instagram },
    { label: "Twitter", short: "TW", href: socials.twitter },
    { label: "LinkedIn", short: "LI", href: socials.linkedin },
  ];
  const serviceLinks = servicesData?.length ? servicesData : staticServices;

  return (
    <footer className="relative overflow-hidden bg-primary pt-16 pb-8 text-white sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

      <div className="section-shell relative z-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2 space-y-5 sm:space-y-8 lg:col-span-1">
            <Link
              href="/"
              className="inline-block overflow-hidden rounded-full bg-white p-3 shadow-xl"
            >
              <Image
                src="/rasvaad.svg"
                alt={logoAlt}
                width={80}
                height={80}
                className="h-14 w-14 scale-125 object-contain"
              />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-lg">
              {tagline}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map(({ label, short, href }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold hover:bg-white hover:text-primary transition-colors"
                  >
                    <SocialIcon label={short} />
                  </a>
                ) : (
                  <div
                    key={label}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold hover:bg-white hover:text-primary transition-colors cursor-pointer"
                  >
                    <SocialIcon label={short} />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-1 sm:rounded-3xl sm:p-5 lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="font-serif text-xl font-bold text-secondary sm:text-2xl">
              {quickLinksTitle}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:mt-8 sm:block sm:space-y-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    className="group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-secondary sm:text-lg"
                    href={item.href}
                  >
                    <span className="h-px w-0 bg-secondary transition-all group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:block sm:rounded-3xl sm:p-5 lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="font-serif text-xl font-bold text-secondary sm:text-2xl">
              {servicesTitle}
            </h3>
            <ul className="mt-4 space-y-3 sm:mt-8 sm:space-y-4">
              {serviceLinks.slice(0, 5).map((service) => (
                <li key={service.title} className="text-sm leading-snug text-white/65 sm:text-lg">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-5 lg:col-span-1 lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="font-serif text-xl font-bold text-secondary sm:text-2xl">
              {contactTitle}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-8 lg:block lg:space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 sm:text-sm">
                  Phone
                </p>
                <p className="break-words text-sm font-bold sm:text-xl">+91 {phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 sm:text-sm">
                  Email
                </p>
                <p className="break-words text-sm font-bold sm:text-xl">{email}</p>
              </div>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative col-span-2 inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-accent px-5 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(230,126,34,0.3)] transition-all hover:scale-105 active:scale-95 sm:px-8 sm:text-base lg:rounded-full"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xl">💬</span> {whatsappLabel}
                </span>
                <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:mt-20 sm:pt-10 md:flex-row md:items-center md:gap-6 lg:mt-24 lg:pt-12">
          <p className="text-white/40 text-sm">{copyrightText}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/40 sm:gap-8">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "FB") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M14 8.5V6.9c0-.7.5-.9.9-.9H17V2.3L14.1 2C11 2 9.4 3.8 9.4 6.5v2H7v3.8h2.4V22H14v-9.7h2.9l.5-3.8H14z" />
      </svg>
    );
  }

  if (label === "IG") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M16.8 7.2h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (label === "TW") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.3L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.7L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M5.2 8.8h4V22h-4V8.8zM7.2 2C8.5 2 9.4 2.9 9.4 4.1S8.5 6.2 7.2 6.2 5 5.3 5 4.1 5.9 2 7.2 2zM11.6 8.8h3.8v1.8h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6V22h-4v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22h-4V8.8z" />
    </svg>
  );
}
