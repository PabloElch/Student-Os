import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "About Wutete",
  description: "Learn about Wutete, an independent academic toolkit for Ethiopian university students to calculate GPA, CGPA, and plan academic targets.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    title: "About Wutete",
    description: "Learn about Wutete, an independent academic toolkit for Ethiopian university students.",
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
    title: "About Wutete",
    description: "Learn about Wutete, an independent academic toolkit for Ethiopian university students.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20">
        <article className="space-y-10">
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">About Wutete</h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              An independent academic toolkit for Ethiopian university students.
            </p>
          </header>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Purpose</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete (ውጤቴ) helps Ethiopian university students calculate their GPA and CGPA
              accurately, and plan what grades they need to reach their academic targets.
              The name means &ldquo;my result&rdquo; in Amharic.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              The toolkit is built to be simple, fast, and privacy-respecting. No account is required,
              and all calculations happen in your browser. Your academic data never leaves your device.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">How It Works</h2>
            <ul className="space-y-4 text-zinc-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-zinc-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>GPA Calculator:</strong> Calculate your semester GPA using your courses, credits, and grades.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-zinc-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>CGPA Calculator:</strong> Calculate your cumulative GPA across all completed courses.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-zinc-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>GPA Target Planner:</strong> Find out what GPA you need in upcoming credits to reach your target CGPA.</span>
              </li>
            </ul>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Grading Scale</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete uses the standard Ethiopian university grading scale as its default mapping:
            </p>
            <table className="w-full text-sm text-zinc-600 border border-zinc-200 rounded-lg overflow-hidden">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-zinc-900">Letter Grade</th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-900">Score Range</th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-900">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr><td className="px-4 py-3 font-mono">A+</td><td className="px-4 py-3">90–100</td><td className="px-4 py-3">4.00</td></tr>
                <tr className="bg-zinc-50"><td className="px-4 py-3 font-mono">A</td><td className="px-4 py-3">85–89</td><td className="px-4 py-3">4.00</td></tr>
                <tr><td className="px-4 py-3 font-mono">A−</td><td className="px-4 py-3">80–84</td><td className="px-4 py-3">3.75</td></tr>
                <tr className="bg-zinc-50"><td className="px-4 py-3 font-mono">B+</td><td className="px-4 py-3">75–79</td><td className="px-4 py-3">3.50</td></tr>
                <tr><td className="px-4 py-3 font-mono">B</td><td className="px-4 py-3">70–74</td><td className="px-4 py-3">3.00</td></tr>
                <tr className="bg-zinc-50"><td className="px-4 py-3 font-mono">C+</td><td className="px-4 py-3">65–69</td><td className="px-4 py-3">2.50</td></tr>
                <tr><td className="px-4 py-3 font-mono">C</td><td className="px-4 py-3">60–64</td><td className="px-4 py-3">2.00</td></tr>
                <tr className="bg-zinc-50"><td className="px-4 py-3 font-mono">D</td><td className="px-4 py-3">50–59</td><td className="px-4 py-3">1.00</td></tr>
                <tr><td className="px-4 py-3 font-mono">F</td><td className="px-4 py-3">0–49</td><td className="px-4 py-3">0.00</td></tr>
              </tbody>
            </table>
            <p className="text-sm text-zinc-500">
              Individual universities may have variations. Always confirm official academic rules with your university.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Independence & Verification</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete is an independent project and is not affiliated with, endorsed by, or officially
              connected to any Ethiopian university or government body.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              University configurations are documented with their verification status. Some scales are
              fully verified from official sources, while others are based on secondary sources and
              marked as needing verification. The standard Ethiopian grading scale is implemented as
              the product owner&rsquo;s supplied default mapping.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              Users should confirm institution-specific academic rules directly with their university
              before making important academic decisions.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Privacy & Data</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete does not collect, store, or transmit any personal or academic data. All calculator
              inputs are processed entirely in your browser. There are no accounts, no analytics, and
              no third-party tracking.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              The only external connection is the optional Feedback link in the footer, which opens
              a GitHub issue template in a new tab.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-zinc-900">Open Source</h2>
            <p className="text-zinc-600 leading-relaxed">
              Wutete is open source. The code is available on GitHub:
            </p>
            <p className="text-center">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}