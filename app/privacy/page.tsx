import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Wutete's privacy policy. Learn how your data is handled when using the GPA, CGPA, and academic planning calculators.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
    title: "Privacy Policy — Wutete",
    description: "Wutete's privacy policy. All calculations happen in your browser.",
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
    title: "Privacy Policy — Wutete",
    description: "Wutete's privacy policy. All calculations happen in your browser.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20">
        <article className="space-y-10">
          <header className="text-center">
            <h1 className="page-heading mb-4">Privacy Policy</h1>
            <p className="text-lg text-neutral max-w-2xl mx-auto">
              Last updated: October 10, 2026
            </p>
          </header>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="section-heading">Summary</h2>
            <p className="text-neutral leading-relaxed">
              Wutete does not collect, store, or transmit any personal data or academic information.
              All calculator inputs (courses, credits, grades) are processed entirely in your browser.
              Your academic data never leaves your device.
            </p>
            <p className="text-neutral leading-relaxed">
              Wutete uses Google Analytics 4 to measure website usage and page views. This analytics
              data does not include your calculator inputs, grades, or any academic information.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="section-heading">Data Processing</h2>
            <ul className="space-y-4 text-neutral leading-relaxed">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-forest mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Calculator inputs:</strong> Course names, credits, and grades you enter are used only to compute results in your browser. They are never sent to any server.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-forest mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>No persistence:</strong> Your inputs are not saved in localStorage, cookies, or any database. Refreshing the page clears all entries.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-forest mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Analytics:</strong> Wutete uses Google Analytics 4 to measure website usage and page views. This data does not include your calculator inputs, grades, or any academic information. No opt-out mechanism is currently provided.</span>
              </li>
            </ul>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="section-heading">External Links</h2>
            <p className="text-neutral leading-relaxed">
              The only external link in Wutete is the <strong>Feedback</strong> link in the footer, which opens
              a GitHub issue template in a new tab. When you click this link, you leave Wutete and
              interact with GitHub, which has its own privacy policy.
            </p>
            <p className="text-neutral leading-relaxed">
              Wutete does not pass any of your calculator data to GitHub or any other third party.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="section-heading">Hosting</h2>
            <p className="text-neutral leading-relaxed">
              Wutete is deployed as a static site on Vercel. Vercel may collect standard web server logs
              (IP address, user agent, requested path, timestamp) for operational purposes. Wutete does
              not control or access these logs.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="section-heading">Children&rsquo;s Privacy</h2>
            <p className="text-neutral leading-relaxed">
              Wutete is intended for university students. We do not knowingly collect personal
              information from children under 13. Since we collect no personal information at all,
              this is inherent to the design.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="section-heading">Changes to This Policy</h2>
            <p className="text-neutral leading-relaxed">
              If Wutete ever introduces data collection (e.g., optional analytics with consent),
              this policy will be updated and the &ldquo;Last updated&rdquo; date will change. Continued use
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="card p-6 md:p-8 space-y-6">
            <h2 className="section-heading">Contact</h2>
            <p className="text-neutral leading-relaxed">
              For questions about this privacy policy, use the <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-forest underline hover:text-forest-light">GitHub issue template</a>
              (select &ldquo;Feedback&rdquo; or create a new issue).
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}