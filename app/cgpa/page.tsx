import { CgpaCalculatorClient } from "./CgpaCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "CGPA Calculator for Ethiopian University Students | StudentOS",
  description: "Calculate your cumulative GPA with StudentOS. Enter your courses, credits, and grades using supported Ethiopian university grading configurations.",
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