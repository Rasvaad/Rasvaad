import { defineField, defineType } from "sanity";

export const processStepType = defineType({
  name: "processStep",
  title: "Process Step",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Step Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "hinglish", title: "Hinglish Line", type: "string" }),
    defineField({
      name: "image",
      title: "Step Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
    defineField({ name: "caption", title: "Image Caption", type: "text", rows: 2 }),
    defineField({ name: "badgeLabel", title: "Badge Label", type: "string" }),
    defineField({ name: "order", title: "Step Number", type: "number", initialValue: 1 }),
  ],
  orderings: [{ title: "Step Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "order" } },
});
