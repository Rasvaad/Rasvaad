import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

/**
 * Singleton document — one per project.
 * Stores: contact info, social links, nav, footer text, SEO defaults, hero images.
 */
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // ── Brand ────────────────────────────────────────────────────────────────
    defineField({ name: "brandName", title: "Brand Name", type: "string" }),
    defineField({ name: "brandTagline", title: "Brand Tagline", type: "string" }),
    defineField({ name: "logoAlt", title: "Logo Alt Text", type: "string" }),

    // ── Contact ──────────────────────────────────────────────────────────────
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "email", title: "Email Address", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({ name: "googleMap", title: "Google Map URL", type: "url" }),
    defineField({ name: "whatsappMessage", title: "WhatsApp Pre-filled Message", type: "text", rows: 2 }),

    // ── Social links ─────────────────────────────────────────────────────────
    defineField({
      name: "socials",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
      ],
    }),

    // ── Navigation ───────────────────────────────────────────────────────────
    defineField({
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),

    // ── Footer ───────────────────────────────────────────────────────────────
    defineField({ name: "footerTagline", title: "Footer Tagline", type: "text", rows: 2 }),
    defineField({ name: "quickLinksTitle", title: "Quick Links Title", type: "string" }),
    defineField({ name: "servicesTitle", title: "Services Title", type: "string" }),
    defineField({ name: "contactTitle", title: "Contact Title", type: "string" }),
    defineField({ name: "whatsappLabel", title: "WhatsApp Button Label", type: "string" }),
    defineField({ name: "copyrightText", title: "Copyright Text", type: "string" }),
    defineField({
      name: "legalLinks",
      title: "Legal Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),

    // ── Global SEO ───────────────────────────────────────────────────────────
    ...seoFields,
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
