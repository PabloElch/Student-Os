import Link from "next/link";

const footerLinks = [
  { href: "/gpa", label: "GPA Calculator" },
  { href: "/cgpa", label: "CGPA Calculator" },
  { href: "/planner", label: "GPA Planner" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xl font-semibold text-zinc-900 hover:text-zinc-700"
          >
            StudentOS
          </Link>
          <p className="mt-2 text-sm text-zinc-600 max-w-md">
            Your academic toolkit for Ethiopian university students. Calculate GPA, CGPA, and plan your academic targets.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-600 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-zinc-200">
          <p className="text-sm text-zinc-500 text-center">
            No account required · Anonymous calculation · Built for Ethiopian students
          </p>
        </div>
      </div>
    </footer>
  );
}