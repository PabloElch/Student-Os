import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-zinc-900">StudentOS</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">StudentOS</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Your academic toolkit for Ethiopian university students.
          </p>
        </section>

        <nav className="space-y-4" aria-label="Calculator navigation">
          <Link
            href="/gpa"
            className="block group bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-800">GPA Calculator</h3>
                <p className="text-zinc-500 text-sm mt-1">Calculate your semester GPA from courses and grades</p>
              </div>
              <span className="text-zinc-400 group-hover:text-zinc-600">→</span>
            </div>
          </Link>

          <Link
            href="/cgpa"
            className="block group bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-800">CGPA Calculator</h3>
                <p className="text-zinc-500 text-sm mt-1">Calculate your cumulative GPA across semesters</p>
              </div>
              <span className="text-zinc-400 group-hover:text-zinc-600">→</span>
            </div>
          </Link>

          <Link
            href="/planner"
            className="block group bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-800">GPA Planner</h3>
                <p className="text-zinc-500 text-sm mt-1">Plan what you need to reach your target CGPA</p>
              </div>
              <span className="text-zinc-400 group-hover:text-zinc-600">→</span>
            </div>
          </Link>
        </nav>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-zinc-500">
          <p>No account required · Anonymous calculation · Built for Ethiopian students</p>
        </div>
      </footer>
    </div>
  );
}