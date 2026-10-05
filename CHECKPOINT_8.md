# CHECKPOINT 8 — StudentOS Product Shell & Homepage

## Goal

Turn the existing StudentOS calculators into a coherent, polished product.

StudentOS currently has:

* GPA Calculator
* CGPA Calculator
* GPA Target Planner

Checkpoint 8 builds the **product shell around those tools**:

* Homepage
* Global navigation
* Footer
* Consistent product identity
* Trust/transparency messaging
* Homepage SEO
* Responsive layout

The goal is to make StudentOS feel like **one real product**, not three separate calculator pages.

---

# 1. Required Reading

Before changing anything, read:

* `AGENTS.md`
* `PRODUCT_SPEC.md`
* `ARCHITECTURE.md`
* `CHECKPOINT_5.md`
* `CHECKPOINT_6.md`
* `CHECKPOINT_7.md`
* `CHECKPOINT_8.md`

Inspect the existing:

* `app/page.tsx`
* `app/layout.tsx`
* `app/gpa/`
* `app/cgpa/`
* `app/planner/`
* `components/`
* existing styling conventions
* existing tests
* current Git state

Do not assume the current implementation matches previous reports. Inspect the actual repository.

---

# 2. Product Objective

The homepage should immediately communicate:

> **StudentOS is an academic toolkit built for Ethiopian university students.**

A first-time visitor should understand within seconds:

1. What StudentOS is
2. Who it is for
3. What they can do
4. Where to start

The primary actions should be:

* Calculate GPA
* Calculate CGPA
* Plan My GPA

---

# 3. Homepage

Update:

`app/page.tsx`

Replace the placeholder homepage with a polished StudentOS landing page.

## Hero

Primary headline:

> **Your academic toolkit for Ethiopian university students.**

Supporting copy should clearly explain that StudentOS helps students:

* calculate GPA
* calculate CGPA
* plan toward a target CGPA

Primary actions:

* **Calculate GPA**
* **Calculate CGPA**
* **Plan My GPA**

The homepage should not require an account.

---

# 4. Product Tools Section

Add a clear section introducing the three existing tools.

## GPA Calculator

Explain:

> Calculate your semester GPA using your courses, credits, and grades.

Link to:

`/gpa`

## CGPA Calculator

Explain:

> Calculate your cumulative GPA across your completed courses.

Link to:

`/cgpa`

## GPA Target Planner

Explain:

> Find out what GPA you need in your upcoming credits to reach your target CGPA.

Link to:

`/planner`

Each tool should have a clear CTA.

Do not create duplicate calculator logic.

---

# 5. Navigation

Create/reuse a consistent navigation component.

Navigation should work across:

* `/`
* `/gpa`
* `/cgpa`
* `/planner`

Recommended navigation:

* StudentOS logo/name
* GPA Calculator
* CGPA Calculator
* GPA Planner

The navigation should clearly indicate the current page where practical.

Do not add unnecessary navigation items.

---

# 6. Mobile Navigation

The navigation must work on small screens.

At minimum:

* no horizontal overflow
* links remain usable
* touch targets are sufficiently large
* navigation does not consume excessive vertical space

A simple responsive navigation is preferred.

Do not introduce a complicated mega-menu.

If a mobile menu is required, implement the smallest accessible solution.

---

# 7. Footer

Create a consistent footer.

Include:

* StudentOS
* short product description
* links to:

  * GPA Calculator
  * CGPA Calculator
  * GPA Planner

Only include links to routes that actually exist.

Do not create placeholder pages simply to populate the footer.

---

# 8. Trust & Transparency

StudentOS handles academic calculations, so the homepage should communicate appropriate transparency.

Include a concise section such as:

> **Built for Ethiopian university students**

Explain that:

* StudentOS uses university-specific grading configurations where available.
* University academic rules can differ.
* Students should confirm important academic decisions against official university regulations.

Do not claim that every university rule is fully verified.

Do not make unsupported claims about accuracy.

---

# 9. Supported Universities

Add a simple homepage section introducing the currently supported university configurations:

* Jimma University
* Addis Ababa University
* Bahir Dar University
* Hawassa University
* Haramaya University

This is informational only.

Do not create detailed university pages in this checkpoint unless an existing implementation already requires them.

Do not invent:

* university partnerships
* official endorsements
* student counts
* accuracy statistics
* testimonials
* rankings
* institutional relationships

---

# 10. Visual Design

StudentOS should feel like a modern consumer web product.

Design principles:

* mobile-first
* minimal
* polished
* spacious
* strong typography hierarchy
* clear CTAs
* subtle borders
* restrained shadows
* consistent rounded corners
* warm/neutral or existing StudentOS visual foundation
* consistent with `/gpa`, `/cgpa`, and `/planner`

The homepage should feel like the same product as the calculators.

Avoid:

* excessive gradients
* giant decorative blobs
* excessive animations
* fake SaaS dashboards
* excessive cards
* visual clutter
* unnecessary charts
* fake statistics
* fake testimonials
* fake logos
* generic startup filler

Do not redesign the existing calculator interfaces unnecessarily.

---

# 11. Responsive Requirements

The homepage and navigation must work at:

* 320px
* 375px
* 390px
* 430px
* 768px
* 1024px
* 1440px

Requirements:

* no horizontal scrolling
* readable typography
* accessible buttons
* usable navigation
* appropriate spacing
* responsive tool cards/sections
* good desktop proportions

Do not simply scale the desktop design down to mobile.

---

# 12. Accessibility

Ensure:

* semantic HTML
* proper heading hierarchy
* accessible navigation
* visible focus states
* accessible links/buttons
* sufficient contrast
* meaningful link text
* keyboard navigation
* mobile touch targets

Do not rely on color alone to communicate meaning.

---

# 13. SEO

Add/update homepage metadata.

Recommended title:

`StudentOS — GPA & CGPA Calculator for Ethiopian University Students`

Recommended description:

`Calculate your GPA and CGPA and find out what GPA you need to reach your target. StudentOS is an academic toolkit built for Ethiopian university students.`

Metadata must accurately describe the actual product.

Do not use keyword stuffing.

---

# 14. Existing Routes

The following routes must remain functional:

* `/`
* `/gpa`
* `/cgpa`
* `/planner`

Do not rewrite or duplicate their calculation logic.

Do not modify calculator behavior unless a change is strictly necessary for shared navigation/layout integration.

If shared layout changes affect calculator pages, verify those pages after the change.

---

# 15. Shared Components

Prefer reusable components where appropriate.

Potential components:

```text
components/
├── navigation/
│   └── Navbar.tsx
├── footer/
│   └── Footer.tsx
└── home/
    ├── Hero.tsx
    ├── ToolCard.tsx
    ├── ToolsSection.tsx
    ├── UniversitiesSection.tsx
    └── TrustSection.tsx
```

Do not create components simply to split tiny pieces of markup.

Follow the existing project architecture.

Inspect existing components before creating duplicates.

---

# 16. Performance

Keep the homepage lightweight.

Do not add:

* large image libraries
* unnecessary dependencies
* external UI frameworks
* animation libraries
* analytics
* third-party tracking
* paid services

Prefer existing Next.js/React/Tailwind capabilities.

---

# 17. No New Product Features

Checkpoint 8 is NOT a feature expansion checkpoint.

Do NOT implement:

* What-if grade planner
* student accounts
* authentication
* database
* backend
* API
* AI
* chatbot
* transcript upload
* OCR
* scholarships
* jobs
* social features
* messaging
* payments
* advertisements
* notifications
* GPA history
* student profiles
* university login
* mobile native app

Do not create functionality that belongs to future checkpoints.

---

# 18. Testing

Update/add tests where appropriate.

At minimum verify:

### Homepage

* homepage renders
* hero text renders
* GPA CTA links to `/gpa`
* CGPA CTA links to `/cgpa`
* planner CTA links to `/planner`
* tool descriptions render
* supported universities render
* trust/transparency section renders

### Navigation

* navigation renders
* links point to correct routes
* mobile navigation works if interactive
* keyboard accessibility where applicable

### Regression

Confirm:

* `/gpa` remains functional
* `/cgpa` remains functional
* `/planner` remains functional

Do not remove or weaken existing tests.

---

# 19. Verification

Run:

```powershell
npm test
npm run lint
npm run build
git diff --check
```

If a browser is available, manually inspect:

### Mobile

* 320px
* 375px
* 390px
* 430px

### Desktop

* 1024px
* 1440px

Verify:

* homepage layout
* navigation
* CTA links
* footer
* typography
* spacing
* responsive behavior
* no horizontal scrolling
* `/gpa`
* `/cgpa`
* `/planner`

If browser testing is unavailable, explicitly state that manual browser testing was not performed.

Do not claim browser verification that did not happen.

---

# 20. Dependencies

Maintain the StudentOS $0 requirement.

Do not add dependencies unless genuinely necessary.

No:

* paid API
* paid AI
* paid hosting
* database
* authentication provider
* analytics platform
* tracking service

---

# 21. Git

Before implementation:

```powershell
git status
```

The working tree must be clean.

After implementation:

```powershell
git diff
git diff --check
```

Review all changes.

Only Checkpoint 8 changes should be present.

Commit exactly:

```text
feat: build StudentOS product shell
```

After committing:

```powershell
git status
git log --oneline -3
```

Working tree must be clean.

Do not:

* reset unrelated changes
* git clean
* force push
* rewrite history
* amend previous checkpoint commits
* commit secrets
* commit build artifacts

---

# 22. Final Report

When finished, report:

## Completed

What was implemented.

## Files Changed

Every file created/modified and why.

## Homepage

Describe the implemented sections and user flow.

## Navigation

Describe the navigation and responsive behavior.

## SEO

Report homepage metadata.

## Tests

Test count and result.

## Lint

Result.

## Build

Result.

## Manual Verification

List exactly what was actually verified.

If browser testing was unavailable, say so.

## Git

* commit hash
* commit message
* working tree status

## Scope

Confirm:

* only Checkpoint 8 was implemented
* `/gpa` remains functional
* `/cgpa` remains functional
* `/planner` remains functional
* no Checkpoint 9+ work started
* no backend/database/auth/API/AI/payments/analytics added
* zero-cost requirement maintained

Then STOP.

Do not begin Checkpoint 9.
