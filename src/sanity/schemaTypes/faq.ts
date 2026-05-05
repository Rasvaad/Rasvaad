import { defineField, defineType } from "sanity";
import { seoFields } from "./seoFields";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
    defineField({ name: "hinglishAnswer", title: "Hinglish Answer", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
    ...seoFields,
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});
