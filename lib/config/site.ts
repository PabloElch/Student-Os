export const siteConfig = {
  name: "Wutete",
  description: "Calculate your GPA and CGPA and find out what GPA you need to reach your target. Wutete is an academic toolkit built for Ethiopian university students.",
  url: "https://wutete.vercel.app",
  ogImage: "/og-image.svg",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com/PabloElch/Student-Os",
  },
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/gpa", label: "GPA Calculator" },
  { href: "/cgpa", label: "CGPA Calculator" },
  { href: "/planner", label: "GPA Planner" },
  { href: "/grade-scale", label: "Grade Scale" },
] as const;

export const footerLinks = [
  { href: "/gpa", label: "GPA Calculator" },
  { href: "/cgpa", label: "CGPA Calculator" },
  { href: "/planner", label: "GPA Planner" },
  { href: "/grade-scale", label: "Grade Scale" },
  { href: "/grade-converter", label: "Grade Converter" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const feedbackUrl = "https://github.com/PabloElch/Student-Os/issues/new?template=feedback.md";