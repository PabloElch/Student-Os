CP9 — StudentOS Launch & Validation

Goal:
Deploy StudentOS publicly at $0 and validate the product with real
Ethiopian university students before adding significant new features.

Prerequisites:
- CP8 complete
- Working tree clean
- 120 tests passing
- Production build passing
- No known blocking bugs

Phase 1 — Pre-launch audit

Read:
- AGENTS.md
- PRODUCT_SPEC.md
- ARCHITECTURE.md
- CHECKPOINT_8.md
- CHECKPOINT_9.md

Inspect:
- complete repository
- package.json
- Next.js configuration
- all routes
- metadata
- navigation
- calculator functionality
- Git status

Verify:
- /
- /gpa
- /cgpa
- /planner

No calculator logic changes unless a genuine blocking bug is discovered.

Phase 2 — Production readiness

Verify:
- npm test
- npm run lint
- npm run build
- git diff --check

Check:
- broken internal links
- missing pages
- missing metadata
- obvious accessibility regressions
- mobile overflow
- console/build errors if available
- accidental development-only configuration
- exposed secrets

Do not introduce unnecessary dependencies.

Phase 3 — Free deployment

Deploy StudentOS using a $0 hosting solution.

Preferred:
- Cloudflare Pages

Requirements:
- $0 cost
- no paid API
- no paid hosting
- no paid domain
- production deployment must succeed
- application must be publicly accessible

Do not purchase anything.

If the selected deployment method is incompatible with the current
Next.js configuration, diagnose the incompatibility before modifying
the architecture.

Do not add backend infrastructure merely to satisfy deployment.

Phase 4 — SEO readiness

Implement only essential launch SEO.

Verify:
- homepage title
- homepage description
- calculator titles/descriptions
- canonical URLs where appropriate
- robots.txt
- sitemap where appropriate
- Open Graph metadata where practical

Important:
Do not make unsupported claims about StudentOS.
Do not claim:
- number of users
- popularity
- official university endorsement
- universal grading rules
- partnerships
- verified status beyond what the existing university research supports.

Phase 5 — Lightweight validation

The product must remain privacy-conscious and $0.

Determine whether a genuinely free, appropriate analytics mechanism
can be used without introducing unnecessary infrastructure.

If useful, track only high-level product events such as:
- page visit
- calculator opened
- calculation completed
- university selected
- planner used

Do not collect:
- student ID
- phone number
- email
- national ID
- transcript
- exact location
- personal academic records tied to identity.

If analytics would require paid services or excessive architecture,
do not add it.

Phase 6 — Feedback

Provide a simple way for users to report:
- incorrect calculation
- incorrect university rule
- missing university
- confusing interface
- feature request

Do not build:
- authentication
- database
- admin dashboard
- messaging system

A simple external/free feedback mechanism is acceptable only if it
does not compromise the $0 requirement.

Phase 7 — Launch readiness

Prepare StudentOS for real distribution.

Verify:
- homepage explains the product immediately
- all three tools are discoverable
- calculator pages work without account creation
- mobile experience is usable
- deployment URL works
- navigation works
- footer works
- no placeholder content
- no fake testimonials
- no fake statistics
- no fake endorsements

Phase 8 — Validation experiment

Define the first validation target:

Primary:
- first 10 real users

Next:
- first 100 real users

Evaluate:
- usage
- completed calculations
- university selection
- repeat usage
- direct feedback
- referrals/sharing
- technical problems

Do not interpret traffic alone as product validation.

A successful validation signal should include actual use of
the calculator/planner.

Phase 9 — Launch copy

Prepare concise launch copy suitable for:
- Telegram
- WhatsApp
- Facebook
- future YouTube description

Core message:

"StudentOS is an academic toolkit built for Ethiopian university
students. Calculate your GPA, calculate your CGPA, and find out
what GPA you need to reach your target."

Do not spam or fabricate claims.

Phase 10 — Testing

Run:

npm test
npm run lint
npm run build
git diff --check

If deployment tooling provides a production URL, verify it.

Where browser testing is unavailable, clearly report:
"Manual browser testing not performed because the environment is
headless."

Do not claim browser verification that did not occur.

Phase 11 — Git

Before changes:
git status

Only commit CP9-related changes.

Review:
git diff
git diff --check

Commit:

"feat: launch StudentOS for validation"

After commit:
git status
git log --oneline -3

Working tree must be clean.

Final report must contain:

1. Completed
2. Files Changed
3. Deployment
4. Public URL
5. SEO
6. Analytics/Validation
7. Feedback
8. Tests
9. Deployment verification
10. Git commit
11. Final status
12. Scope

STOP after CP9.

Do not begin CP10.
Do not add new product features outside this checkpoint.