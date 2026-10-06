import { PlannerCalculatorClient } from "./PlannerCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";

const siteUrl = "https://studentos.pages.dev";

export const metadata: Metadata = {
  title: "GPA Target Planner",
  description: "Find out what GPA you need to reach your target CGPA with StudentOS. Plan your academic performance using supported Ethiopian university grading configurations.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/planner",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/planner`,
    siteName: "StudentOS",
    title: "GPA Target Planner — StudentOS",
    description: "Find out what GPA you need to reach your target CGPA with StudentOS.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "StudentOS GPA Target Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Target Planner — StudentOS",
    description: "Find out what GPA you need to reach your target CGPA with StudentOS.",
    images: ["/og-image.svg"],
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