import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Academic Dashboard",
  description: "Track your academic progress, manage semesters and courses, and monitor your CGPA target.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        <DashboardClient />
      </main>
      <Footer />
    </div>
  );
}