import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
        <section className="text-center mb-16 md:mb-20" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 leading-tight">
            Your academic toolkit for Ethiopian university students.
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Wutete helps you calculate your GPA and CGPA using university-specific grading scales,
            and plan what you need to reach your target CGPA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gpa"
              className="btn-primary text-center"
            >
              Calculate GPA
            </Link>
            <Link
              href="/cgpa"
              className="btn-secondary text-center"
            >
              Calculate CGPA
            </Link>
            <Link
              href="/planner"
              className="btn-secondary text-center"
            >
              Plan My GPA
            </Link>
            <Link
              href="/grade-converter"
              className="btn-secondary text-center"
            >
              Grade Converter
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-500">No account required · Anonymous calculation</p>
        </section>

        <section className="mb-16 md:mb-20" aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-2xl font-bold text-zinc-900 text-center mb-10">Available Tools</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <article className="card p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">GPA Calculator</h3>
              <p className="text-zinc-600 text-sm mb-4">
                Calculate your semester GPA using your courses, credits, and grades.
              </p>
              <Link
                href="/gpa"
                className="inline-flex items-center text-sm font-medium text-zinc-900 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 rounded"
              >
                Open Calculator
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>

            <article className="card p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">CGPA Calculator</h3>
              <p className="text-zinc-600 text-sm mb-4">
                Calculate your cumulative GPA across all your completed courses.
              </p>
              <Link
                href="/cgpa"
                className="inline-flex items-center text-sm font-medium text-zinc-900 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 rounded"
              >
                Open Calculator
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>

            <article className="card p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">GPA Target Planner</h3>
              <p className="text-zinc-600 text-sm mb-4">
                Find out what GPA you need in your upcoming credits to reach your target CGPA.
              </p>
              <Link
                href="/planner"
                className="inline-flex items-center text-sm font-medium text-zinc-900 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 rounded"
              >
                Open Planner
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>

            <article className="card p-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">Grade Converter</h3>
              <p className="text-zinc-600 text-sm mb-4">
                Convert a percentage mark into a letter grade and grade points.
              </p>
              <Link
                href="/grade-converter"
                className="inline-flex items-center text-sm font-medium text-zinc-900 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 rounded"
              >
                Open Converter
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          </div>
        </section>

        <section className="mb-16" aria-labelledby="trust-heading">
          <h2 id="trust-heading" className="text-2xl font-bold text-zinc-900 text-center mb-6">Built for Ethiopian University Students</h2>
          <div className="card p-6 md:p-8 max-w-3xl mx-auto">
            <ul className="space-y-3 text-zinc-600 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-zinc-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Wutete uses university-specific grading configurations where available.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-zinc-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>University academic rules can differ. Not all rules are fully verified.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-zinc-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Confirm important academic decisions against official university regulations.</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}