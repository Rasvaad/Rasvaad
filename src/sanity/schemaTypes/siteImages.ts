import { defineField, defineType } from "sanity";

export const siteImagesType = defineType({
  name: "siteImages",
  title: "Site Images",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutImageAlt",
      title: "About Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "workAImage",
      title: "Work Image A",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "workAImageAlt",
      title: "Work Image A Alt Text",
      type: "string",
    }),
    defineField({
      name: "workBImage",
      title: "Work Image B",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "workBImageAlt",
      title: "Work Image B Alt Text",
      type: "string",
    }),
    defineField({
      name: "processImage",
      title: "Process Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "processImageAlt",
      title: "Process Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "featureImage",
      title: "Feature Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featureImageAlt",
      title: "Feature Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "ctaImage",
      title: "CTA Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaImageAlt",
      title: "CTA Image Alt Text",
      type: "string",
    }),
  ],
});
