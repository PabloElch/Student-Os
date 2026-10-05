import { GPACalculatorClient } from "./GpaCalculatorClient";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "GPA Calculator — StudentOS",
  description: "Calculate your semester GPA for Ethiopian universities. Supports Jimma, Addis Ababa, Bahir Dar, Hawassa, and Haramaya Universities with verified grading scales.",
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