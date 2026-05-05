import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const aboutSectionType = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "body1", title: "Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "body2", title: "Paragraph 2", type: "text", rows: 3 }),
    defineField({ name: "quote", title: "Hinglish Quote", type: "text", rows: 2 }),
    defineField({ name: "badgeText", title: "Floating Badge Text (e.g. 10+)", type: "string" }),
    defineField({ name: "badgeLabel", title: "Floating Badge Label", type: "string" }),
    defineField({
      name: "highlights",
      title: "Highlight Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "About Image",
      type: "image",
      options: { hotspot: true },
    }),
    ...seoFields,
  ],
  preview: { prepare: () => ({ title: "About Section" }) },
});
