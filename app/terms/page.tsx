import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Wutete's terms of use. Understand the limitations and disclaimers for the GPA, CGPA, and academic planning calculators.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
    title: "Terms of Use — Wutete",
    description: "Wutete's terms of use. Informational calculation tools only.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Wutete - Academic Toolkit for Ethiopian University Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use — Wutete",
    description: "Wutete's terms of use. Informational calculation tools only.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20">
        <article className="space-y-10">
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Terms of Use</h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Last updated: October 10, 2026
            </p>
          </header>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Acceptance of Terms</h2>
            <p className="text-zinc-600 leading-relaxed">
              By accessing and using Wutete (the &ldquo;Service&rdquo;), you agree to these Terms of Use.
              If you do not agree, do not use the Service.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Nature of the Service</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete provides informational calculation tools for Ethiopian university students:
            </p>
            <ul className="space-y-3 text-zinc-600 leading-relaxed list-disc list-inside">
              <li><strong>GPA Calculator:</strong> Computes semester GPA from courses, credits, and grades.</li>
              <li><strong>CGPA Calculator:</strong> Computes cumulative GPA across all completed courses.</li>
              <li><strong>GPA Target Planner:</strong> Calculates the future GPA needed to reach a target CGPA.</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed">
              These tools perform deterministic mathematical calculations based on the grading scale and
              credit values you provide. They are not academic advisory services.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6 border-l-4 border-amber-500 bg-amber-50">
            <h2 className="text-xl font-semibold text-zinc-900">Important Disclaimers</h2>
            <ul className="space-y-4 text-zinc-700 leading-relaxed">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span><strong>Not official university tools:</strong> Wutete is an independent project. It is not affiliated with, endorsed by, or officially connected to any Ethiopian university, the Ministry of Education, or any government body.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span><strong>No guaranteed outcomes:</strong> Wutete does not guarantee admission, graduation classification, degree award, scholarship eligibility, or any other academic outcome. Results are mathematical computations based on your inputs.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span><strong>Verify with your university:</strong> University academic rules (grading scales, credit systems, repeat policies, CGPA formulas) can differ and change. Always confirm official rules with your university registrar or academic office before making important decisions.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span><strong>Standard grading scale:</strong> Wutete implements the standard Ethiopian university grading scale as supplied by the product owner. This is the product&rsquo;s default mapping. It does not constitute an official or government-endorsed standard.</span>
              </li>
            </ul>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Accuracy</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete strives for calculation correctness. The core GPA/CGPA formulas follow the standard
              weighted average: Σ(credits × grade points) / Σ(credits). The standard grading scale
              boundaries are implemented as specified.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              However, university-specific rules may include nuances not captured here (e.g., pass/fail
              handling, repeat course policies, minimum grade requirements for specific programs).
              Wutete&rsquo;s university configurations document their verification status.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">No Warranty</h2>
            <p className="text-zinc-600 leading-relaxed">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
              either express or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, accuracy, or non-infringement.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              Wutete does not warrant that the Service will be uninterrupted, error-free, or that
              results will match your university&rsquo;s official calculations.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Limitation of Liability</h2>
            <p className="text-zinc-600 leading-relaxed">
              To the maximum extent permitted by law, Wutete and its contributors shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages, including
              but not limited to loss of academic opportunity, incorrect academic decisions based on
              calculator results, or any other damages arising from use of the Service.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">User Responsibilities</h2>
            <ul className="space-y-3 text-zinc-600 leading-relaxed list-disc list-inside">
              <li>Provide accurate inputs (correct credits, grades, and current CGPA).</li>
              <li>Verify results against your university&rsquo;s official academic regulations.</li>
              <li>Do not use the Service for any unlawful or unauthorized purpose.</li>
            </ul>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Intellectual Property</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete&rsquo;s code and design are open source and available on GitHub. The &ldquo;Wutete&rdquo; name
              and logo are trademarks of the project owner. You may not use the Wutete brand to
              imply endorsement of other products or services.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Changes to Terms</h2>
            <p className="text-zinc-600 leading-relaxed">
              These Terms may be updated. The &ldquo;Last updated&rdquo; date will change. Continued use after
              changes constitutes acceptance. Material changes will be noted in the project&rsquo;s
              changelog or release notes.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Governing Law</h2>
            <p className="text-zinc-600 leading-relaxed">
              These Terms are governed by the laws of Ethiopia, without regard to conflict of law
              principles. Any disputes shall be resolved in the courts of Addis Ababa, Ethiopia.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Contact</h2>
            <p className="text-zinc-600 leading-relaxed">
              For questions about these Terms, use the <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-zinc-900 underline hover:text-zinc-700">GitHub issue template</a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}