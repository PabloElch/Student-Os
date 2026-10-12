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
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 container py-10 md:py-16">
        <div className="text-center mb-8">
          <h1 className="page-heading text-balance mb-4">GPA Target Planner</h1>
          <p className="page-subheading">
            Find out what GPA you need to reach your target CGPA with Wutete.
          </p>
        </div>

        <PlannerCalculatorClient />
      </main>
      <Footer />
    </div>
  );
}