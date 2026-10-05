import Link from "next/link";
import { CgpaCalculatorClient } from "./CgpaCalculatorClient";

export const metadata = {
  title: "CGPA Calculator for Ethiopian University Students | StudentOS",
  description: "Calculate your cumulative GPA with StudentOS. Enter your courses, credits, and grades using supported Ethiopian university grading configurations.",
};

export default function CGPACalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-zinc-900 hover:text-zinc-700">
            <span className="text-xl font-semibold">StudentOS</span>
            <span className="text-zinc-400">/</span>
            <span className="font-medium">CGPA Calculator</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <CgpaCalculatorClient />
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-zinc-500">
          <p>No account required · Anonymous calculation · Built for Ethiopian students</p>
        </div>
      </footer>
    </div>
  );
}