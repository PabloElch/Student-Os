import Link from "next/link";
import { footerLinks, feedbackUrl } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container py-10 md:py-14">
        <div className="mb-8">
          <Link
            href="/"
            className="text-xl font-semibold text-charcoal hover:text-forest transition-colors"
          >
            Wutete
          </Link>
          <p className="mt-2 text-sm text-neutral max-w-md leading-relaxed">
            Your academic toolkit for Ethiopian university students. Calculate GPA, CGPA, and plan your academic targets.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-3 md:gap-5 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral hover:text-charcoal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={feedbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral hover:text-charcoal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
          >
            Feedback
          </a>
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-neutral-light text-center">
            No account required · Anonymous calculation · Built for Ethiopian students
          </p>
        </div>
      </div>
    </footer>
  );
}