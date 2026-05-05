import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

const singletonTypes = new Set([
  "siteSettings",
  "siteImages",
  "heroSection",
  "aboutSection",
]);

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Hero Section")
        .id("heroSection")
        .child(
          S.document().schemaType("heroSection").documentId("heroSection"),
        ),
      S.listItem()
        .title("About Section")
        .id("aboutSection")
        .child(
          S.document().schemaType("aboutSection").documentId("aboutSection"),
        ),
      S.listItem()
        .title("Site Images")
        .id("siteImages")
        .child(S.document().schemaType("siteImages").documentId("siteImages")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id ? !singletonTypes.has(id) : true;
      }),
    ]);

export default defineConfig({
  name: "rasvaad",
  title: "Rasvaad Catering",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  basePath: "/studio",
});
