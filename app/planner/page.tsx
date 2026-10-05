import { PlannerCalculatorClient } from "./PlannerCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "GPA Target Planner for Ethiopian University Students | StudentOS",
  description: "Find out what GPA you need to reach your target CGPA with StudentOS. Plan your academic performance using supported Ethiopian university grading configurations.",
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