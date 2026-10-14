import Link from "next/link";
import { footerLinks, feedbackUrl } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container py-12 md:py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-xl font-semibold text-ink hover:text-bronze transition-colors"
          >
            Wutete
          </Link>
          <p className="mt-3 text-sm text-stone max-w-md leading-relaxed">
            Your academic toolkit for Ethiopian university students. Calculate GPA, CGPA, and plan your academic targets.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-3 md:gap-5 mb-10">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze rounded"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={feedbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze rounded"
          >
            Feedback
          </a>
        </nav>

        <div className="mt-10 pt-10 border-t border-line">
          <p className="text-sm text-stone-light text-center">
            No account required · Anonymous calculation · Built for Ethiopian students
          </p>
        </div>
      </div>
    </footer>
  );
}