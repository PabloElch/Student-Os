import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://studentos.pages.dev";

export const metadata: Metadata = {
  title: {
    default: "StudentOS — GPA & CGPA Calculator for Ethiopian University Students",
    template: "%s | StudentOS",
  },
  description: "Calculate your GPA and CGPA and find out what GPA you need to reach your target. StudentOS is an academic toolkit built for Ethiopian university students.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "StudentOS",
    title: "StudentOS — GPA & CGPA Calculator for Ethiopian University Students",
    description: "Calculate your GPA and CGPA and find out what GPA you need to reach your target. StudentOS is an academic toolkit built for Ethiopian university students.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "StudentOS - Academic Toolkit for Ethiopian University Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StudentOS — GPA & CGPA Calculator for Ethiopian University Students",
    description: "Calculate your GPA and CGPA and find out what GPA you need to reach your target. StudentOS is an academic toolkit built for Ethiopian university students.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">{children}</body>
    </html>
  );
}