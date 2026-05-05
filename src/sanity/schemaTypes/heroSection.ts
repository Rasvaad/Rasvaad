import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

/**
 * Singleton — controls the homepage hero section.
 */
export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({ name: "hinglish", title: "Hinglish Line", type: "string" }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string" }),
    defineField({ name: "decorativeText", title: "Decorative Side Text", type: "string" }),

    defineField({
      name: "slides",
      title: "Background Carousel Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
          preview: { select: { title: "alt", media: "image" } },
        },
      ],
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value (e.g. 500+)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    ...seoFields,
  ],
  preview: { prepare: () => ({ title: "Hero Section" }) },
});
