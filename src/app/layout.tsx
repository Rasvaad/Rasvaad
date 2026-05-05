import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { getSiteSettings } from "@/lib/sanity";
import { baseViewport, buildBaseMetadata, localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildBaseMetadata(settings);
}

export const viewport: Viewport = baseViewport;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <ViewTransitions>
      <html lang="en" data-scroll-behavior="smooth">
        <head>
          <link rel="icon" href="/rasvaad.svg" type="image/svg+xml" />
        </head>
        <body>
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(localBusinessJsonLd(settings)),
            }}
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
