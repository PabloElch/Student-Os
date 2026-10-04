import Link from "next/link";

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
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-3">CGPA Calculator</h1>
          <p className="text-zinc-600 mb-6 max-w-md mx-auto">
            Enter your previous semester GPAs and credits to calculate your cumulative GPA.
          </p>
          <Link href="/" className="btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-zinc-500">
          <p>No account required · Anonymous calculation · Built for Ethiopian students</p>
        </div>
      </footer>
    </div>
  );
}