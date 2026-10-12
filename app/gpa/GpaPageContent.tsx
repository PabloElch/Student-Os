import Link from "next/link";

export function GpaPageContent() {
  return (
    <div className="space-y-8 mt-8">
      <section className="card p-6 space-y-4" aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading" className="section-heading">How it works</h2>
        <ul className="space-y-2 text-sm text-neutral">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Select your university to load the correct grading scale</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Add courses with credits and grades</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Grades marked &ldquo;Not included in GPA&rdquo; don&apos;t affect the calculation</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>GPA is calculated using the official formula: Σ(credits × grade points) / Σ(credits)</span>
          </li>
        </ul>
      </section>

      <section className="card p-6 space-y-4" aria-labelledby="worked-example-heading">
        <h2 id="worked-example-heading" className="section-heading">Worked example</h2>
        <div className="p-4 bg-ivory rounded border border-border">
          <h3 className="font-medium text-charcoal mb-3">Example: Semester GPA calculation</h3>
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
      </section>

      <section className="card p-6 space-y-4" aria-labelledby="related-tools-heading">
        <h2 id="related-tools-heading" className="section-heading">Related tools</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/cgpa" className="btn-secondary flex-1 text-center">
            CGPA Calculator
          </Link>
          <Link href="/planner" className="btn-secondary flex-1 text-center">
            GPA Target Planner
          </Link>
          <Link href="/gpa-simulator" className="btn-secondary flex-1 text-center">
            GPA What-If Simulator
          </Link>
        </div>
        <p className="text-sm text-neutral">
          Use the <Link href="/grade-scale" className="text-forest underline hover:text-forest-light">Grade Scale Reference</Link> to see the full grading scale with percentage ranges.
        </p>
      </section>
    </div>
  );
}