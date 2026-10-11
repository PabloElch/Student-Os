import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { HomepageCalculator } from "@/components/calculator/HomepageCalculator";

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

        <HomepageCalculator />

        {/* How GPA is calculated */}
        <section className="mb-14 md:mb-20" aria-labelledby="how-to-heading">
          <h2 id="how-to-heading" className="text-2xl font-bold text-charcoal mb-4">
            How GPA is calculated
          </h2>
          <div className="text-neutral leading-relaxed">
            <p className="mb-3">
              Wutete uses the standard Ethiopian university grading scale to calculate your semester GPA. Each course&apos;s grade points are weighted by credit hours, then divided by the total credits.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Select your university (or use the standard Ethiopian scale)</li>
              <li>Add courses with course name, credit hours, and grade</li>
              <li>The calculator automatically looks up each grade&apos;s grade points</li>
              <li>Grades not recognized by your university&apos;s scale are excluded from GPA</li>
              <li>GPA = Σ(credits × grade points) ÷ Σ(credits)</li>
            </ul>
          </div>
        </section>

        {/* Worked example */}
        <section className="mb-14 md:mb-20" aria-labelledby="worked-example-heading">
          <h2 id="worked-example-heading" className="text-2xl font-bold text-charcoal mb-4">
            Worked example
          </h2>
          <div className="space-y-6 text-neutral">
            <div className="p-4 bg-ivory rounded border border-border">
              <h3 className="font-medium text-charcoal mb-3">Example 1: Semester GPA calculation</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left" role="table">
                  <thead>
                    <tr className="border-b border-border text-xs font-medium text-neutral uppercase tracking-wider">
                      <th className="pb-2 pr-4">Course</th>
                      <th className="pb-2 pr-4 text-right">Credits</th>
                      <th className="pb-2 pr-4 text-center">Grade</th>
                      <th className="pb-2 text-right">Grade points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2 pr-4">Calculus I</td>
                      <td className="py-2 pr-4 text-right">3</td>
                      <td className="py-2 pr-4 text-center">A</td>
                      <td className="py-2 text-right font-mono">4.00</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Physics</td>
                      <td className="py-2 pr-4 text-right">4</td>
                      <td className="py-2 pr-4 text-center">B</td>
                      <td className="py-2 text-right font-mono">3.00</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">English</td>
                      <td className="py-2 pr-4 text-right">3</td>
                      <td className="py-2 pr-4 text-center">A−</td>
                      <td className="py-2 text-right font-mono">3.75</td>
                    </tr>
                    <tr className="bg-ivory font-medium">
                      <td className="py-2 pr-4">Total</td>
                      <td className="py-2 pr-4 text-right">10</td>
                      <td className="py-2 pr-4 text-center">—</td>
                      <td className="py-2 text-right">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm font-medium">
                GPA = (3 × 4.00 + 4 × 3.00 + 3 × 3.75) ÷ (3 + 4 + 3)
              </p>
              <p className="mt-2 text-lg font-bold text-forest font-mono">Semester GPA: 3.53</p>
            </div>
            <div className="p-4 bg-ivory rounded border border-border">
              <h3 className="font-medium text-charcoal mb-3">Example 2: Another example with different credits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left" role="table">
                  <thead>
                    <tr className="border-b border-border text-xs font-medium text-neutral uppercase tracking-wider">
                      <th className="pb-2 pr-4">Course</th>
                      <th className="pb-2 pr-4 text-right">Credits</th>
                      <th className="pb-2 pr-4 text-center">Grade</th>
                      <th className="pb-2 text-right">Grade points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2 pr-4">Chemistry</td>
                      <td className="py-2 pr-4 text-right">3</td>
                      <td className="py-2 pr-4 text-center">B+</td>
                      <td className="py-2 text-right font-mono">3.50</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Calculus II</td>
                      <td className="py-2 pr-4 text-right">4</td>
                      <td className="py-2 pr-4 text-center">A</td>
                      <td className="py-2 text-right font-mono">4.00</td>
                    </tr>
                    <tr className="bg-ivory font-medium">
                      <td className="py-2 pr-4">Total</td>
                      <td className="py-2 pr-4 text-right">7</td>
                      <td className="py-2 pr-4 text-center">—</td>
                      <td className="py-2 text-right">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm font-medium">
                GPA = (3 × 3.50 + 4 × 4.00) ÷ (3 + 4)
              </p>
              <p className="mt-2 text-lg font-bold text-forest font-mono">Semester GPA: 3.79</p>
            </div>
          </div>
        </section>

        {/* Semester GPA vs. CGPA */}
        <section className="mb-14 md:mb-20" aria-labelledby="semester-vs-cgpa-heading">
          <h2 id="semester-vs-cgpa-heading" className="text-2xl font-bold text-charcoal mb-4">
            Semester GPA vs. CGPA
          </h2>
          <div className="text-neutral">
            <p className="mb-3">
              Your <strong>semester GPA</strong> measures your performance in a single semester, while your <strong>CGPA</strong> (Cumulative Grade Point Average) tracks your overall performance across all completed courses. Use the dedicated CGPA calculator to compute your cumulative average.
            </p>
            <div className="flex gap-3">
              <Link
                href="/gpa"
                className="btn-primary flex-1"
              >
                Semester GPA Calculator
              </Link>
              <Link
                href="/cgpa"
                className="btn-secondary flex-1"
              >
                CGPA Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Target GPA planning */}
        <section className="mb-14 md:mb-20" aria-labelledby="target-planning-heading">
          <h2 id="target-planning-heading" className="text-2xl font-bold text-charcoal mb-4">
            Target GPA planning
          </h2>
          <div className="text-neutral">
            <p className="mb-3">
              The GPA target planner helps you find out what GPA you need in your upcoming credits to reach your desired CGPA. Plan ahead and set realistic academic goals.
            </p>
            <Link
              href="/planner"
              className="btn-primary"
            >
              Open GPA Target Planner
            </Link>
          </div>
        </section>

        {/* Ethiopian grading scale */}
        <section className="mb-14 md:mb-20" aria-labelledby="grading-scale-heading">
          <h2 id="grading-scale-heading" className="text-2xl font-bold text-charcoal mb-4">
            Ethiopian grading scale
          </h2>
          <div className="space-y-4 text-neutral">
            <p className="mb-3">
              Wutete uses the standard Ethiopian university grading scale to convert letter grades to grade points:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>A+: 90–100 = 4.00</li>
              <li>A: 85–less than 90 = 4.00</li>
              <li>A−: 80–less than 85 = 3.75</li>
              <li>B+: 75–less than 80 = 3.50</li>
              <li>B: 70–less than 75 = 3.00</li>
              <li>C+: 65–less than 65 = 2.50</li>
              <li>C: 60–less than 65 = 2.00</li>
              <li>D: 50–less than 60 = 1.00</li>
              <li>F: 0–less than 50 = 0.00</li>
            </ul>
            <p className="text-sm">
              <Link
                href="/grade-scale"
                className="text-forest underline hover:text-forest-light"
              >
                View the grade scale reference
              </Link>
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14 md:mb-20" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="text-2xl font-bold text-charcoal mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4 text-neutral">
            <div className="border-b border-border pb-4">
              <h3 className="font-medium text-charcoal mb-2">Do I need an account to use the calculator?</h3>
              <p className="text-sm">No account required. All calculations happen entirely in your browser. Your academic data never leaves your device.</p>
            </div>
            <div className="border-b border-bottom pb-4">
              <h3 className="font-medium text-charcoal mb-2">Which universities are supported?</h3>
              <p className="text-sm">
                Jimma, Addis Ababa, Bahir Dar, Hawassa, and Haramaya universities have verified grading configurations. The standard Ethiopian grading scale is also available for all students.
              </p>
            </div>
            <div className="border-b border-bottom pb-4">
              <h3 className="font-medium text-charcoal mb-2">Are the GPA calculations official?</h3>
              <p className="text-sm">
                The calculations follow standard university GPA formulas. Always confirm with your university registrar for official academic decisions.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-charcoal mb-2">Can I calculate CGPA?</h3>
              <p className="text-sm">
                Yes. Use the dedicated CGPA calculator to compute your cumulative GPA across all completed courses.
              </p>
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section className="mb-14 md:mb-20" aria-labelledby="related-tools-heading">
          <h2 id="related-tools-heading" className="text-2xl font-bold text-charcoal mb-4">
            Related tools
          </h2>
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

      </main>

      <Footer />
    </div>
  );
}