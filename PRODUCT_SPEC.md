# StudentOS V1

## Master Product Specification

### Version 1.0 — October 2026

---

# 1. PRODUCT DEFINITION

## Product name

**StudentOS**

## Positioning

> **The academic toolkit built for Ethiopian university students.**

StudentOS V1 is a mobile-first web application that helps Ethiopian university students calculate, understand, and plan their academic performance.

The first version is intentionally narrow.

StudentOS V1 is **not** an education social network, LMS, scholarship platform, AI tutor, CV builder, or general student portal.

Its first job is:

> **Help an Ethiopian university student answer: "What is my GPA/CGPA, and what do I need to reach my target?"**

---

# 2. BUSINESS OBJECTIVE

StudentOS is the first product in a larger product-building strategy.

The immediate business objectives are:

1. Launch a real product.
2. Get the first 100 real users.
3. Learn whether Ethiopian university students repeatedly use it.
4. Establish an initial organic acquisition channel.
5. Test whether students will eventually pay for additional value.
6. Determine whether StudentOS deserves continued investment.

StudentOS is **not automatically a three-year project**.

The product earns continued development based on:

* users
* retention
* search traffic
* engagement
* feedback
* revenue
* growth potential

If it becomes a strong business, continue scaling it.

If it reaches a plateau, maintain it cheaply while experimenting with Product #2.

If the market shows little interest, stop investing heavily and move to the next product.

---

# 3. V1 SUCCESS CRITERIA

## Primary milestone

### First 100 real users.

A user counts only when they actually interact with the product.

Traffic alone does not equal success.

## Secondary milestones

* First returning users
* First organic search visitor
* First student referral
* First 1,000 total users
* First $1 of revenue

The first $1 is a major validation milestone.

It proves someone was willing to exchange money for the product.

---

# 4. TARGET USER

## Primary audience

Ethiopian university students.

Initial target:

* undergraduate students
* Android/mobile users
* students who care about GPA/CGPA
* students planning future academic performance
* students considering university placement, scholarships, internships, or further study

## Initial geographic strategy

Start in Ethiopia.

Do not restrict the architecture so tightly that expansion becomes impossible.

Potential future audiences:

* Ethiopian diaspora students
* African university students
* international students

But V1 should remain **Ethiopia-first**.

---

# 5. CORE USER PROBLEM

Students frequently need answers to questions such as:

> "What is my semester GPA?"

> "What is my current CGPA?"

> "What will my CGPA become if I get these grades?"

> "What GPA do I need next semester to reach 3.8?"

> "Can I realistically reach my target?"

Existing generic GPA calculators often treat the problem as a simple mathematical calculation.

StudentOS should turn it into a **planning tool**.

---

# 6. THE CORE V1 EXPERIENCE

A student opens StudentOS.

They should understand the product immediately.

### Homepage

**StudentOS**

> Your academic toolkit for Ethiopian university students.

Primary actions:

* Calculate GPA
* Calculate CGPA
* Plan my GPA

No account required.

No registration wall.

No forced onboarding.

No AI chatbot.

No advertisements blocking the calculator.

---

# 7. V1 FEATURE SET

## Feature 1 — GPA Calculator

User enters courses.

Each course contains:

* course name/code — optional
* credit value
* letter grade

Example:

| Course      | Credit | Grade |
| ----------- | -----: | ----- |
| Mathematics |      3 | A     |
| Programming |      4 | B+    |
| English     |      2 | A-    |

StudentOS calculates:

* total credits
* total grade points
* semester GPA

### Formula

For a credit-weighted GPA:

**GPA = Σ(grade point × credit) / Σ(credit)**

The calculation engine must be deterministic TypeScript code.

AI must never perform the underlying calculation.

---

# 8. FEATURE 2 — CGPA CALCULATOR

The student can enter previous semesters.

Example:

Semester 1:

* GPA: 3.46
* credits: 18

Semester 2:

* GPA: 3.84
* credits: 18

StudentOS calculates the cumulative result using the applicable institution's rules.

The interface should clearly distinguish:

**Semester GPA**

from

**Cumulative GPA**

---

# 9. FEATURE 3 — GPA TARGET PLANNER

This is the key V1 differentiator.

User enters:

* current CGPA
* completed credits
* target CGPA
* upcoming credits

StudentOS calculates the required future GPA.

Example:

Current CGPA: 3.67

Completed credits: 36

Target CGPA: 3.80

Next credits: 18

StudentOS determines whether the target is mathematically achievable.

Possible result:

> **Required next-semester GPA: 4.06**

> A 4.06 GPA is above the maximum 4.00 scale, so a 3.80 CGPA is not reachable in one semester under this grading model.

The product should not simply output a number.

It should **explain the implication**.

---

# 10. FEATURE 4 — WHAT-IF PLANNER

Students can experiment with hypothetical grades.

Example:

> What happens if I get:

A → 4 credits

A → 3 credits

B+ → 3 credits

A- → 2 credits

StudentOS displays:

* projected semester GPA
* projected CGPA
* difference from current CGPA
* progress toward target

The user can modify grades instantly.

This should feel interactive rather than like filling out a form.

---

# 11. UNIVERSITY RULES SYSTEM

This is extremely important.

StudentOS must NOT assume that every Ethiopian university has exactly the same grading implementation.

Official sources show differences in grading tables and academic policies across Ethiopian institutions. For example, Hawassa University publishes a 4-point undergraduate grading system with A+/A/A-/B+/B/B-/C+/C/C-/D/Fx/F, while other institutions publish different details.

Jimma University's current catalog also documents an ECTS-based credit system, including conversion information to semester credit hours.

Therefore StudentOS must use:

## Institution profiles

Conceptually:

```text
University
    ↓
Academic system
    ↓
Grading rules
    ↓
Credit rules
    ↓
Calculation engine
```

Each supported institution gets a verified rules profile.

---

# 12. DATA VERIFICATION STANDARD

StudentOS must not invent university rules.

For every supported institution:

1. Find an official university source.
2. Identify the current grading/credit rules.
3. Record the source.
4. Verify the rules.
5. Encode them.
6. Add automated tests.
7. Display the relevant source/date where appropriate.

If current official information cannot be verified:

> **Do not claim official support.**

The product may provide a generic calculator with a clear disclaimer instead.

---

# 13. INITIAL UNIVERSITY SUPPORT

Do not attempt to support every Ethiopian university in V1.

Start with a small verified set.

Priority:

1. Jimma University
2. Addis Ababa University
3. Bahir Dar University
4. Hawassa University
5. Haramaya University

Additional universities are added only after their rules have been verified.

This list is a development priority, not a claim that these institutions all use identical rules.

---

# 14. ACCOUNT SYSTEM

## V1: NO ACCOUNT REQUIRED

This is deliberate.

A student should be able to:

1. Open StudentOS.
2. Calculate GPA.
3. Get a result.
4. Leave.

No:

* email
* password
* Google login
* phone number
* account verification

The first version should minimize friction.

---

# 15. DATA STORAGE

V1 should preferably work without a backend database.

Calculations can happen entirely in the browser.

Temporary state may use browser storage if useful.

No personal academic data needs to be uploaded to a server merely to calculate GPA.

This gives us:

* lower infrastructure complexity
* better privacy
* lower cost
* faster performance
* $0 initial backend requirement

---

# 16. PRIVACY PRINCIPLE

StudentOS should collect the minimum information necessary.

V1 should not request:

* student ID
* transcript upload
* phone number
* national ID
* exact address
* password
* sensitive personal information

The product should be usable anonymously.

---

# 17. DESIGN DIRECTION

StudentOS should feel like a **premium modern consumer utility**, not a government portal or university administration dashboard.

## Design characteristics

* mobile-first
* clean
* minimal
* spacious
* fast
* confident typography
* clear hierarchy
* subtle borders
* restrained shadows
* rounded cards
* accessible controls
* strong numeric presentation

## Avoid

* cluttered dashboards
* excessive gradients
* unnecessary animations
* giant navigation systems
* 20-card homepages
* Bootstrap-looking interfaces
* unnecessary illustrations
* excessive icons
* dark "AI startup" aesthetics

The calculator result should be the visual focus.

---

# 18. MOBILE-FIRST REQUIREMENT

The majority of initial users are expected to access StudentOS from phones.

Therefore:

### Primary design target

Mobile width.

Then:

Tablet.

Then:

Desktop.

The interface must remain fully functional on small Android devices.

---

# 19. PERFORMANCE REQUIREMENT

StudentOS V1 should be extremely lightweight.

Target:

* fast initial load
* minimal JavaScript
* no unnecessary libraries
* no large images
* no video backgrounds
* no heavy animation
* calculations should feel instantaneous

The calculator itself should work even on relatively weak Android phones.

---

# 20. TECHNOLOGY STACK

## Frontend

**Next.js**

## Language

**TypeScript**

## Styling

**Tailwind CSS**

## Version control

**Git**

## Repository

**GitHub**

## Development environment

**VS Code**

## Coding agent

**OpenCode**

## Testing

Use the project's standard JavaScript/TypeScript testing tools.

Exact testing framework should be chosen only when required.

Do not add unnecessary dependencies.

---

# 21. AI POLICY

AI is NOT required for V1.

StudentOS V1 must function completely without an external AI API.

Do not introduce:

* OpenAI API
* Anthropic API
* Gemini API
* paid inference
* external AI services

The calculation engine is normal deterministic software.

AI may be introduced in later versions for features such as:

* scholarship matching
* personalized academic explanations
* opportunity discovery
* application assistance

But AI must not be added merely because it sounds impressive.

---

# 22. $0 INFRASTRUCTURE STRATEGY

The initial product must be buildable and launchable at **$0 out-of-pocket cost**.

Use free/open-source technologies.

Initial architecture should support static deployment.

Potential deployment:

```text
GitHub
   ↓
Cloudflare Pages
   ↓
StudentOS
```

A custom domain is NOT required for V1.

A free deployment URL is acceptable for validation.

Do not purchase:

* domain
* VPS
* database
* API credits
* paid analytics
* paid templates
* paid UI kits
* paid hosting

unless the product has already generated sufficient revenue to justify the expense.

---

# 23. REPOSITORY PRINCIPLES

The project must remain simple.

Do not introduce:

* microservices
* Docker
* Kubernetes
* Redis
* GraphQL
* message queues
* complicated authentication
* unnecessary backend frameworks

unless a later requirement genuinely demands them.

---

# 24. SUGGESTED PROJECT STRUCTURE

```text
studentos/
│
├── app/
│   ├── page.tsx
│   ├── gpa/
│   │   └── page.tsx
│   ├── cgpa/
│   │   └── page.tsx
│   ├── planner/
│   │   └── page.tsx
│   └── universities/
│
├── components/
│   ├── ui/
│   ├── calculator/
│   ├── course-input/
│   └── result-card/
│
├── lib/
│   ├── calculations/
│   ├── universities/
│   └── validation/
│
├── tests/
│
├── public/
│
├── PRODUCT_SPEC.md
├── ARCHITECTURE.md
├── CALCULATION_RULES.md
├── ROADMAP.md
├── AGENTS.md
└── README.md
```

The exact structure may change during implementation if there is a strong technical reason.

---

# 25. CALCULATION ENGINE REQUIREMENTS

The calculation engine must be:

* deterministic
* pure where practical
* independently testable
* independent of UI
* independent of AI
* independent of network access

Example conceptual functions:

```text
calculateSemesterGPA()
calculateCGPA()
calculateProjectedCGPA()
calculateRequiredGPA()
isTargetReachable()
```

Input validation must handle:

* missing courses
* zero credits
* invalid grades
* negative credits
* impossible target values
* empty input
* excessively large input
* rounding

---

# 26. ROUNDING

The product must define a consistent display precision.

Recommended:

**2 decimal places for primary displayed GPA/CGPA.**

Internal calculations should retain sufficient precision and should not repeatedly round intermediate values.

Example:

Internally:

3.666666...

Display:

**3.67**

The exact rounding behavior must be tested.

---

# 27. ERROR HANDLING

Never silently produce nonsense.

Examples:

If credits = 0:

> Please enter at least one valid credit value.

If target CGPA is impossible:

> This target cannot be reached within the selected number of credits.

If current CGPA is invalid:

> Enter a CGPA between the supported minimum and maximum.

Errors should be human-readable.

---

# 28. SEO STRATEGY

SEO is a core acquisition channel.

The initial website should have useful, indexable pages.

Potential pages:

```text
/gpa-calculator
/cgpa-calculator
/gpa-planner

/universities/jimma-university
/universities/addis-ababa-university
/universities/bahir-dar-university
...
```

Potential search-intent pages:

```text
/ethiopian-gpa-calculator
/jimma-university-gpa-calculator
/how-to-calculate-cgpa-in-ethiopia
```

Do not create thousands of thin pages.

Every indexed page must provide genuine useful information.

---

# 29. ANALYTICS

Analytics should answer:

* How many people visit?
* Which calculator do they use?
* Which university do they select?
* Do they complete a calculation?
* Do they return?
* Which pages bring users?
* Where do users leave?

Do not collect unnecessary personal data.

Analytics must remain compatible with the $0 infrastructure goal.

---

# 30. MONETIZATION

## V1 launch

Prioritize usage over monetization.

No aggressive ads.

No paywall.

No forced account.

## After meaningful traffic

Potential monetization:

### Advertising

Relevant, non-intrusive ads.

### Premium

Possible future features:

* saved academic history
* unlimited semester plans
* advanced projections
* progress tracking
* personalized academic planning

### Sponsorship

Potential future partners:

* education companies
* training centers
* universities
* student-focused businesses
* scholarship organizations

### Other

Potential future:

* affiliate partnerships
* B2B tools
* premium student services

Do not build these before there is evidence of demand.

---

# 31. THE FIRST REVENUE TEST

The initial monetization milestone is:

> **First $1 from a real customer/user.**

The exact monetization method can be chosen after observing user behavior.

We do not assume in advance that advertising, subscriptions, or another model will win.

---

# 32. PRODUCT ANALYTICS LOOP

Every development cycle should follow:

```text
Build
  ↓
Launch
  ↓
Measure
  ↓
Observe users
  ↓
Identify problem
  ↓
Improve
  ↓
Measure again
```

Not:

```text
Build
  ↓
Build
  ↓
Build
  ↓
Build
  ↓
Maybe launch someday
```

---

# 33. V1 OUT OF SCOPE

The following are explicitly excluded from V1:

❌ AI chatbot

❌ Scholarship database

❌ Job board

❌ CV builder

❌ Social network

❌ Messaging

❌ Community forum

❌ University login

❌ Student accounts

❌ Mobile app

❌ Push notifications

❌ Payment system

❌ Admin dashboard

❌ Complex backend

❌ Personalized AI agent

❌ Transcript OCR

❌ PDF upload

❌ Course marketplace

❌ Learning management system

❌ Chat with professors

These can be considered later.

---

# 34. DEFINITION OF DONE

StudentOS V1 is considered ready to launch when:

### Product

* GPA calculator works
* CGPA calculator works
* GPA planner works
* What-if planning works
* supported university rules are verified
* invalid inputs are handled
* mobile interface works

### Engineering

* TypeScript compiles
* lint passes
* automated tests pass
* production build passes
* no major console errors
* no known calculation bugs

### UX

* first-time user understands the product immediately
* no account required
* calculator can be completed quickly
* results are easy to understand
* mobile layout is polished

### Business

* analytics works
* SEO metadata exists
* deployment works
* public URL works
* product can be shared

### Cost

* $0 required to launch

---

# 35. DEVELOPMENT CHECKPOINTS

## Checkpoint 0

Master specification + architecture.

## Checkpoint 1

Project initialization.

## Checkpoint 2

Calculation engine.

## Checkpoint 3

Automated tests.

## Checkpoint 4

GPA calculator.

## Checkpoint 5

CGPA calculator.

## Checkpoint 6

GPA target planner.

## Checkpoint 7

University rules/data.

## Checkpoint 8

Premium UI polish.

## Checkpoint 9

SEO + analytics.

## Checkpoint 10

Production deployment.

## Checkpoint 11

First 10 users.

## Checkpoint 12

First 100 users.

No checkpoint should silently implement functionality belonging to a later checkpoint.

---

# 36. AI CODING AGENT RULES

OpenCode must:

1. Read `PRODUCT_SPEC.md` before modifying the project.
2. Read `AGENTS.md`.
3. Never invent product requirements.
4. Never add features outside the current checkpoint without approval.
5. Never introduce paid services.
6. Never add unnecessary dependencies.
7. Never replace deterministic calculations with AI.
8. Run tests after meaningful changes.
9. Run production build before declaring completion.
10. Report files changed.
11. Report tests executed.
12. Report unresolved issues.
13. Avoid modifying unrelated files.
14. Prefer simple solutions.
15. Preserve working functionality when adding features.

---

# 37. DEVELOPMENT PHILOSOPHY

### Rule 1

**Ship before perfect.**

### Rule 2

**Correctness before aesthetics.**

### Rule 3

**Real users before feature count.**

### Rule 4

**Revenue before unnecessary complexity.**

### Rule 5

**Evidence before assumptions.**

### Rule 6

**Simple architecture before impressive architecture.**

### Rule 7

**The user decides what we build next.**

---

# 38. FIRST 100 USER STRATEGY

Initial acquisition channels:

### University network

* classmates
* Jimma students
* students at other universities

### Social channels

* Telegram
* Facebook
* WhatsApp

### Search

* Ethiopian GPA calculator
* Ethiopian CGPA calculator
* university-specific GPA searches

### YouTube

Educational videos can direct students to StudentOS.

Example:

> "How to Calculate Your CGPA in Ethiopian University"

→ StudentOS GPA planner.

The YouTube channel and StudentOS should eventually reinforce each other.

---

# 39. PRODUCT EXPANSION RULE

After the first 100 users, new features must be selected based on evidence.

Possible future directions:

### Academic

* academic planner
* course planner
* exam countdown
* grade tracker

### Opportunities

* scholarships
* internships
* competitions

### Career

* CV
* jobs
* application tracking

### Utilities

* Ethiopian date converter
* PDF tools
* student calculators

But none of these automatically belong in V1.

---

# 40. LONG-TERM PRODUCT VISION

If StudentOS demonstrates strong demand, it can evolve into:

> **The digital operating system for Ethiopian university students.**

Potential architecture:

```text
                    STUDENTOS
                        │
       ┌────────────────┼────────────────┐
       │                │                │
   ACADEMIC        OPPORTUNITIES       CAREER
       │                │                │
   GPA/CGPA         Scholarships       CV
   Planner          Internships        Jobs
   Courses          Competitions       Portfolio
       │                │                │
       └────────────────┼────────────────┘
                        │
                    UTILITIES
                        │
               Calculators / Tools
```

But this vision does **not** justify building all of it now.

The only thing that matters now is proving the first wedge.

---

# 41. BUSINESS DECISION FRAMEWORK

After meaningful usage, evaluate:

### If StudentOS is growing strongly:

**Double down.**

### If users exist but growth is weak:

Improve distribution/product positioning.

### If users use it but refuse monetization:

Investigate a stronger paid value proposition.

### If users barely use it:

Stop investing heavily.

Build Product #2.

### If StudentOS becomes profitable:

Scale it while using the profits and experience to develop the next opportunity.

---

# 42. THE CORE PRINCIPLE

StudentOS is not the destination.

It is the first serious attempt at building a real internet business.

The ultimate three-year objective is:

> **Build the ability to repeatedly identify problems, build software, acquire users, monetize products, and compound the results into financial independence.**

StudentOS earns the right to continue by producing evidence.

---

# 43. V1 NORTH STAR

Everything in V1 should serve one sentence:

> **"An Ethiopian university student can open StudentOS, calculate their academic position, understand what they need to reach their goal, and leave with a useful answer in under two minutes."**

If a feature does not help accomplish that:

### It waits.

---

# 44. CURRENT STATUS

**Product:** StudentOS

**Version:** V1

**Stage:** Specification

**Development:** Not started

**Target:** Mobile-first web

**AI dependency:** None

**Backend dependency:** None initially

**Initial infrastructure cost:** $0

**Primary milestone:** First 100 real users

**First monetization milestone:** First $1
