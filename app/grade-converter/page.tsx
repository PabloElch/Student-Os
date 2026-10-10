import { GradeConverterClient } from "./GradeConverterClient";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Percentage to Grade Converter",
  description: "Convert your percentage score to the Ethiopian university letter grade and grade points. Instant conversion using the standard grading scale.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/grade-converter",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/grade-converter`,
    siteName: siteConfig.name,
    title: "Percentage to Grade Converter — Wutete",
    description: "Convert percentage scores to Ethiopian university letter grades and grade points instantly.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Wutete - Percentage to Grade Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage to Grade Converter — Wutete",
    description: "Convert percentage scores to Ethiopian university letter grades and grade points instantly.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GradeConverterPage() {
  return <GradeConverterClient />;
}