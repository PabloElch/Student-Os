import { CgpaCalculatorClient } from "./CgpaCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";

const siteUrl = "https://studentos.pages.dev";

export const metadata: Metadata = {
  title: "CGPA Calculator",
  description: "Calculate your cumulative GPA with Wutete. Enter your courses, credits, and grades using supported Ethiopian university grading configurations.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/cgpa",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/cgpa`,
    siteName: "Wutete",
    title: "CGPA Calculator — Wutete",
    description: "Calculate your cumulative GPA with Wutete using supported Ethiopian university grading configurations.",
    images: [
      {
        url: "/og-image.svg",
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
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGPACalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <CgpaCalculatorClient />
      </main>
      <Footer />
    </div>
  );
}