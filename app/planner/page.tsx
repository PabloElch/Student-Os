import { PlannerCalculatorClient } from "./PlannerCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "GPA Target Planner",
  description: "Find out what GPA you need to reach your target CGPA with Wutete. Plan your academic performance using the standard Ethiopian university grading scale.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/planner",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/planner`,
    siteName: siteConfig.name,
    title: "GPA Target Planner — Wutete",
    description: "Find out what GPA you need to reach your target CGPA with Wutete.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Wutete GPA Target Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Target Planner — Wutete",
    description: "Find out what GPA you need to reach your target CGPA with Wutete.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PlannerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <PlannerCalculatorClient />
      </main>
      <Footer />
    </div>
  );
}