import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

const tools = [
  {
    href: "/gpa",
    title: "GPA Calculator",
    description: "Calculate your semester GPA using your courses, credits, and grades.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/cgpa",
    title: "CGPA Calculator",
    description: "Calculate your cumulative GPA across all your completed courses.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/planner",
    title: "GPA Target Planner",
    description: "Find out what GPA you need in your upcoming credits to reach your target CGPA.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/gpa-simulator",
    title: "GPA What-If Simulator",
    description: "Compare baseline vs. hypothetical grades to see the impact on your semester GPA and projected CGPA.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    ),
  },
  {
    href: "/grade-converter",
    title: "Grade Converter",
    description: "Convert a percentage mark into a letter grade and grade points.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/grade-scale",
    title: "Grade Scale",
    description: "Reference for the standard Ethiopian university grading scale with percentage ranges and grade points.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 container py-10 md:py-16 lg:py-20">
        {/* Hero Section */}
        <section className="mb-14 md:mb-20 lg:mb-24" aria-labelledby="hero-heading">
          <div className="text-center max-w-3xl mx-auto">
            <h1 id="hero-heading" className="page-heading text-balance mb-6">
              Calculate your GPA. Plan your path.
            </h1>
            <p className="page-subheading mb-8">
              Wutete helps Ethiopian university students calculate GPA and CGPA, and plan what grades they need to reach their academic targets.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/gpa"
                className="btn-primary w-full sm:w-auto text-center py-3"
              >
                Calculate your GPA
              </Link>
              <Link
                href="/cgpa"
                className="btn-secondary w-full sm:w-auto text-center py-3"
              >
                Calculate CGPA
              </Link>
              <Link
                href="/planner"
                className="btn-secondary w-full sm:w-auto text-center py-3"
              >
                Plan your target
              </Link>
            </div>
            <p className="mt-6 text-sm text-neutral">
              No account required · Anonymous calculation · All processing in your browser
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="mb-14 md:mb-20 lg:mb-24" aria-labelledby="tools-heading">
          <div className="text-center mb-10 md:mb-12">
            <h2 id="tools-heading" className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
              Academic Tools
            </h2>
            <p className="text-neutral max-w-xl mx-auto">
              Each tool uses the standard Ethiopian university grading scale. Select your university for verified configurations where available.
            </p>
          </div>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <article key={tool.href} className="card-hover p-6 flex flex-col">
                <Link href={tool.href} className="flex flex-col h-full group">
                  <div className="w-11 h-11 rounded-lg bg-sage text-forest flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-white transition-colors">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2 group-hover:text-forest transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-neutral flex-1 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-forest group-hover:gap-2 transition-all self-start">
                    Open tool
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Trust Statement */}
        <section className="mb-14 md:mb-20" aria-labelledby="trust-heading">
          <h2 id="trust-heading" className="sr-only">Why trust Wutete</h2>
          <div className="card p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-sage text-forest flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Privacy-first design</h3>
                <p className="text-sm text-neutral mt-0.5">
                  No account, no login, no data collection. All calculations happen in your browser. Your academic data never leaves your device.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-sage text-forest flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Transparent grading</h3>
                <p className="text-sm text-neutral mt-0.5">
                  Uses the standard Ethiopian university grading scale. University-specific configurations show verification status. Always confirm with your university for high-stakes decisions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-sage text-forest flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Open source</h3>
                <p className="text-sm text-neutral mt-0.5">
                  Code is available on GitHub. No hidden algorithms or proprietary calculations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Preview */}
        <section className="mb-14 md:mb-20" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="sr-only">Calculator preview</h2>
          <div className="card p-6 md:p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-charcoal mb-2">Quick GPA Preview</h3>
              <p className="text-sm text-neutral">Try adding a course to see how it works</p>
            </div>
            <div className="bg-ivory rounded-lg p-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-4 items-center">
                <div className="sm:col-span-2">
                  <label htmlFor="preview-course" className="sr-only">Course name</label>
                  <input
                    type="text"
                    id="preview-course"
                    placeholder="e.g., Calculus I"
                    className="input-base"
                    defaultValue="Calculus I"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="preview-credits" className="sr-only">Credits</label>
                  <input
                    type="number"
                    id="preview-credits"
                    placeholder="Credits"
                    className="input-base text-right"
                    defaultValue="3"
                    readOnly
                    step="0.5"
                    min="0.5"
                  />
                </div>
                <div>
                  <label htmlFor="preview-grade" className="sr-only">Grade</label>
                  <select id="preview-grade" className="select-base" defaultValue="A" disabled>
                    <option value="">Select grade</option>
                    <option value="A+">A+ (4.00)</option>
                    <option value="A">A (4.00)</option>
                    <option value="A-">A− (3.75)</option>
                    <option value="B+">B+ (3.50)</option>
                    <option value="B">B (3.00)</option>
                    <option value="C+">C+ (2.50)</option>
                    <option value="C">C (2.00)</option>
                    <option value="D">D (1.00)</option>
                    <option value="F">F (0.00)</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-sm text-neutral">Semester GPA</span>
                <div className="text-2xl font-bold text-charcoal font-mono">4.00</div>
              </div>
              <Link
                href="/gpa"
                className="btn-primary w-full text-center"
              >
                Open full calculator
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}