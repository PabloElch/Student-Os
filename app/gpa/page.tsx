import { GPACalculatorClient } from "./GpaCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";

const siteUrl = "https://studentos.pages.dev";

export const metadata: Metadata = {
  title: "GPA Calculator",
  description: "Calculate your semester GPA for Ethiopian universities. Supports Jimma, Addis Ababa, Bahir Dar, Hawassa, and Haramaya Universities with verified grading scales.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/gpa",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/gpa`,
    siteName: "Wutete",
    title: "GPA Calculator — Wutete",
    description: "Calculate your semester GPA for Ethiopian universities with university-specific grading scales.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Wutete GPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator — Wutete",
    description: "Calculate your semester GPA for Ethiopian universities with university-specific grading scales.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GPACalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <GPACalculatorClient />
      </main>
      <Footer />
    </div>
  );
}