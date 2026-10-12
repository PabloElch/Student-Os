import { CgpaCalculatorClient } from "./CgpaCalculatorClient";
import { CgpaPageContent } from "./CgpaPageContent";
import { ImproveGpaGuide } from "@/components/calculator/ImproveGpaGuide";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "CGPA Calculator",
  description: "Calculate your cumulative GPA with Wutete. Enter your courses, credits, and grades using the standard Ethiopian university grading scale.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/cgpa",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/cgpa`,
    siteName: siteConfig.name,
    title: "CGPA Calculator — Wutete",
    description: "Calculate your cumulative GPA with Wutete using supported Ethiopian university grading configurations.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Wutete CGPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CGPA Calculator — Wutete",
    description: "Calculate your cumulative GPA with Wutete using supported Ethiopian university grading configurations.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGPACalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 container py-10 md:py-16">
        <div className="text-center mb-8">
          <h1 className="page-heading text-balance mb-4">CGPA Calculator</h1>
          <p className="page-subheading">
            Select your university, add all your courses, and calculate your cumulative GPA.
          </p>
        </div>

        <CgpaCalculatorClient />

        <CgpaPageContent />

        <ImproveGpaGuide calculatorType="cgpa" />
      </main>
      <Footer />
    </div>
  );
}