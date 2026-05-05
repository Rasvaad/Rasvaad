import { defineField } from "sanity";

export const seoFields = [
  defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
  defineField({
    name: "seoDescription",
    title: "SEO Description",
    type: "text",
    rows: 2,
  }),
  defineField({
    name: "keywords",
    title: "SEO Keywords",
    description: "Add keywords clients want this page/content to target.",
    type: "array",
    of: [{ type: "string" }],
    options: { layout: "tags" },
  }),
];
