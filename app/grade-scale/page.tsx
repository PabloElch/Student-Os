import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import { standardEthiopianGradingScale } from "@/lib/universities/standard-scale";

export const metadata: Metadata = {
  title: "Ethiopian Grade Scale Reference",
  description: "Complete reference for the standard Ethiopian university grading scale. Percentage ranges, letter grades, and grade points for GPA/CGPA calculation.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/grade-scale",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url + "/grade-scale",
    siteName: siteConfig.name,
    title: "Ethiopian Grade Scale Reference - Wutete",
    description: "Complete reference for the standard Ethiopian university grading scale with percentage ranges, letter grades, and grade points.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Wutete - Ethiopian Grade Scale Reference",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethiopian Grade Scale Reference - Wutete",
    description: "Complete reference for the standard Ethiopian university grading scale with percentage ranges, letter grades, and grade points.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function formatRange(grade: typeof standardEthiopianGradingScale[0]): string {
  if (grade.minimumMark === 0 && grade.maximumMark === 49) {
    return "0-49";
  }
  if (grade.maximumMark === 100) {
    return grade.minimumMark + "-100";
  }
  return grade.minimumMark + "-" + grade.maximumMark;
}

const boundaryExamples = [
  { score: 95, label: "95 -> A+ (4.00)" },
  { score: 87, label: "87 -> A (4.00)" },
  { score: 82, label: "82 -> A- (3.75)" },
  { score: 77, label: "77 -> B+ (3.50)" },
  { score: 72, label: "72 -> B (3.00)" },
  { score: 67, label: "67 -> C+ (2.50)" },
  { score: 62, label: "62 -> C (2.00)" },
  { score: 55, label: "55 -> D (1.00)" },
  { score: 40, label: "40 -> F (0.00)" },
];

const faqs = [
  {
    q: 'What does the "-" in A- mean?',
    a: "The minus indicates a slightly lower grade within the A band. A- covers 80-84 and carries 3.75 grade points, while A covers 85-89 and carries 4.00.",
  },
  {
    q: "Why do both A+ and A give 4.00 points?",
    a: "In the standard Ethiopian scale, both A+ (90-100) and A (85-89) map to the maximum 4.00 grade point. This matches the official convention used by most Ethiopian universities.",
  },
  {
    q: "What happens at the exact boundary, like 85?",
    a: "Boundaries are inclusive at the lower end. A score of 85 falls in the A band (85-89), not A-. The convention is: score >= 85 -> A; score >= 80 -> A-; score >= 90 -> A+.",
  },
  {
    q: "Do all Ethiopian universities use this exact scale?",
    a: "This is the standard scale implemented in Wutete as the default mapping. Some universities may have variations. Always confirm with your university's official regulations for high-stakes decisions.",
  },
];

export default function GradeScalePage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
        <article className="space-y-12">
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Ethiopian Grade Scale Reference</h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              The standard grading scale used for GPA/CGPA calculations in Wutete. Based on the standard Ethiopian university grading convention.
            </p>
          </header>

          <section className="card p-6 md:p-8" aria-labelledby="boundary-heading">
            <h2 id="boundary-heading" className="text-xl font-semibold text-zinc-900 mb-2">Boundary Convention</h2>
            <p className="text-zinc-600 text-sm mb-4">
              All ranges are inclusive at the lower boundary and exclusive at the upper boundary,
              except the top (A+) and bottom (F) ranges which are fully inclusive.
            </p>
            <ul className="space-y-2 text-zinc-600 text-sm">
              <li>Score &ge; 90 &rarr; A+</li>
              <li>Score &ge; 85 &rarr; A</li>
              <li>Score &ge; 80 &rarr; A-</li>
              <li>Score &ge; 75 &rarr; B+</li>
              <li>Score &ge; 70 &rarr; B</li>
              <li>Score &ge; 65 &rarr; C+</li>
              <li>Score &ge; 60 &rarr; C</li>
              <li>Score &ge; 50 &rarr; D</li>
              <li>Score {'<'} 50 &rarr; F</li>
            </ul>
          </section>

          <section className="card p-6 md:p-8 overflow-x-auto" aria-labelledby="scale-table-heading">
            <h2 id="scale-table-heading" className="text-xl font-semibold text-zinc-900 mb-4">Grade Scale Table</h2>
            <table className="w-full text-sm text-left" role="table">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-4 py-3 font-medium text-zinc-900">Letter Grade</th>
                  <th className="px-4 py-3 font-medium text-zinc-900">Percentage Range</th>
                  <th className="px-4 py-3 font-medium text-zinc-900">Grade Points</th>
                  <th className="px-4 py-3 font-medium text-zinc-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {standardEthiopianGradingScale.map((grade, index) => (
                  <tr key={grade.letter} className={index % 2 === 1 ? "bg-zinc-50" : ""}>
                    <td className="px-4 py-3 font-mono font-medium text-zinc-900">{grade.letter}</td>
                    <td className="px-4 py-3 text-zinc-600">{formatRange(grade)}</td>
                    <td className="px-4 py-3 font-mono text-zinc-900">{grade.points.toFixed(2)}</td>
                    <td className="px-4 py-3 text-zinc-600">
                      {grade.letter === "A+" && "Outstanding"}
                      {grade.letter === "A" && "Excellent"}
                      {grade.letter === "A-" && "Excellent"}
                      {grade.letter === "B+" && "Very Good"}
                      {grade.letter === "B" && "Good"}
                      {grade.letter === "C+" && "Satisfactory"}
                      {grade.letter === "C" && "Fair"}
                      {grade.letter === "D" && "Unsatisfactory"}
                      {grade.letter === "F" && "Fail"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card p-6 md:p-8" aria-labelledby="examples-heading">
            <h2 id="examples-heading" className="text-xl font-semibold text-zinc-900 mb-4">Practical Examples</h2>
            <p className="text-zinc-600 text-sm mb-4">
              How specific percentage scores map to letter grades and grade points:
            </p>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {boundaryExamples.map((ex) => (
                <li key={ex.score} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                  <code className="font-mono text-zinc-900 bg-white px-2 py-1 rounded border border-zinc-200">{ex.label}</code>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-6 md:p-8" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-semibold text-zinc-900 mb-4">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <dt className="font-medium text-zinc-900">{faq.q}</dt>
                  <dd className="text-zinc-600 text-sm">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="card p-6 md:p-8 bg-zinc-50 border border-zinc-200" aria-labelledby="disclaimer-heading">
            <h2 id="disclaimer-heading" className="text-xl font-semibold text-zinc-900 mb-2">Important Note</h2>
            <p className="text-zinc-600 text-sm">
              This is the standard grading scale implemented in Wutete as the default mapping.
              Some universities may have variations (e.g., different boundaries, additional grades like B- or C-).
              Always confirm with your university&rsquo;s official regulations for high-stakes academic decisions.
            </p>
          </section>

          <section className="card p-6 md:p-8 text-center" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-semibold text-zinc-900 mb-4">Related Tools</h2>
            <p className="text-zinc-600 mb-4">Use these calculators with the standard grade scale:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/grade-converter"
                className="btn-primary text-center"
              >
                Percentage &rarr; Grade Converter
              </Link>
              <Link
                href="/gpa"
                className="btn-secondary text-center"
              >
                GPA Calculator
              </Link>
              <Link
                href="/cgpa"
                className="btn-secondary text-center"
              >
                CGPA Calculator
              </Link>
              <Link
                href="/planner"
                className="btn-secondary text-center"
              >
                GPA Target Planner
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}