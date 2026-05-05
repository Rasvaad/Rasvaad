import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const siteSectionType = defineType({
  name: "siteSection",
  title: "Site Section",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Section Key",
      type: "string",
      description: "Stable key used by the website, such as services, process, gallery, testimonials, faq, blog, contact, pageHero.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "highlight", title: "Highlighted Text", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "secondaryText", title: "Secondary Text", type: "text", rows: 3 }),
    defineField({ name: "quote", title: "Quote / Hinglish Line", type: "text", rows: 2 }),
    defineField({ name: "ctaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "Primary CTA URL", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary CTA URL", type: "string" }),
    defineField({ name: "trustLine", title: "Trust Line", type: "string" }),
    defineField({
      name: "image",
      title: "Section Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
    defineField({
      name: "bullets",
      title: "Bullet Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "formLabels",
      title: "Contact Form Labels",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name Label", type: "string" }),
        defineField({ name: "phone", title: "Phone Label", type: "string" }),
        defineField({ name: "email", title: "Email Label", type: "string" }),
        defineField({ name: "location", title: "Location Label", type: "string" }),
        defineField({ name: "message", title: "Message Label", type: "string" }),
        defineField({ name: "submit", title: "Submit Label", type: "string" }),
        defineField({ name: "sending", title: "Sending Label", type: "string" }),
        defineField({ name: "success", title: "Success Message", type: "string" }),
        defineField({ name: "locationRequired", title: "Location Required Error", type: "string" }),
        defineField({ name: "namePlaceholder", title: "Name Placeholder", type: "string" }),
        defineField({ name: "phonePlaceholder", title: "Phone Placeholder", type: "string" }),
        defineField({ name: "emailPlaceholder", title: "Email Placeholder", type: "string" }),
        defineField({ name: "locationPlaceholder", title: "Location Placeholder", type: "string" }),
        defineField({ name: "messagePlaceholder", title: "Message Placeholder", type: "string" }),
        defineField({ name: "phoneHeading", title: "Phone Detail Heading", type: "string" }),
        defineField({ name: "emailHeading", title: "Email Detail Heading", type: "string" }),
        defineField({ name: "addressHeading", title: "Address Detail Heading", type: "string" }),
      ],
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
    ...seoFields,
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "key", media: "image" } },
});
