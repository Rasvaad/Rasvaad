import { siteSettingsType } from "./siteSettings";
import { siteImagesType } from "./siteImages";
import { heroSectionType } from "./heroSection";
import { aboutSectionType } from "./aboutSection";
import { serviceType } from "./service";
import { processStepType } from "./processStep";
import { siteSectionType } from "./siteSection";
import { galleryItemType } from "./galleryItem";
import { testimonialType } from "./testimonial";
import { faqType } from "./faq";
import { blogPostType } from "./blogPost";

export const schemaTypes = [
  // Singletons (one document each)
  siteSettingsType,
  siteImagesType,
  heroSectionType,
  aboutSectionType,
  siteSectionType,
  // Collections (many documents)
  serviceType,
  processStepType,
  galleryItemType,
  testimonialType,
  faqType,
  blogPostType,
];
