import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "Location (optional)", type: "string" }),
    defineField({ name: "text", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "fullDescription", title: "Full Description", type: "text", rows: 5 }),
    defineField({ name: "hinglish", title: "Hinglish Line", type: "string" }),
    defineField({ name: "badge", title: "Badge Code (e.g. WD)", type: "string" }),
    defineField({
      name: "image",
      title: "Hover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
    ...seoFields,
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "badge", media: "image" } },
});
