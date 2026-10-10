import { SimulatorCalculatorClient } from "./SimulatorCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "GPA What-If Simulator",
  description: "Simulate hypothetical grade scenarios and compare baseline vs. hypothetical GPA for Ethiopian universities. See how grade changes impact your semester GPA and projected CGPA.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/gpa-simulator",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/gpa-simulator`,
    siteName: siteConfig.name,
    title: "GPA What-If Simulator — Wutete",
    description: "Simulate hypothetical grade scenarios and compare baseline vs. hypothetical GPA for Ethiopian universities.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Wutete GPA What-If Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA What-If Simulator — Wutete",
    description: "Simulate hypothetical grade scenarios and compare baseline vs. hypothetical GPA for Ethiopian universities.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SimulatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <SimulatorCalculatorClient />
      </main>
      <Footer />
    </div>
  );
}