# StudentOS — Architecture

## 1. Architecture Goal

StudentOS V1 should be:

* simple
* fast
* mobile-first
* deterministic
* inexpensive
* easy to maintain
* easy to deploy
* easy to expand later

The initial architecture deliberately avoids a backend and database where they are unnecessary.

---

# 2. High-Level Architecture

```text
                    USER
                      │
                      ▼
                WEB BROWSER
                      │
                      ▼
                 NEXT.JS APP
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      UI LAYER              CALCULATION
          │                    ENGINE
          │                       │
          │                 TypeScript
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
              UNIVERSITY RULES
                      │
                      ▼
              VERIFIED DATA
```

For V1:

```text
Browser
  ↓
Next.js
  ↓
TypeScript
  ↓
Local calculation
```

No external API is required for the core calculator.

---

# 3. Technology Stack

## Framework

Next.js

## Language

TypeScript

## Styling

Tailwind CSS

## Runtime

Node.js for development/build tooling.

## Package manager

Use the package manager already selected during project initialization.

Do not switch package managers without a reason.

## Version control

Git

## Repository

GitHub

## Editor

VS Code

## Coding agent

OpenCode

---

# 4. Rendering Strategy

Prefer server/static rendering wherever practical.

Interactive calculator components will naturally require client-side JavaScript.

The application should minimize unnecessary client-side code.

Public informational/SEO pages should remain as indexable as practical.

---

# 5. Application Layers

## Layer 1 — Presentation

Responsible for:

* pages
* layouts
* forms
* inputs
* result cards
* navigation
* responsive design

Location:

```text
app/
components/
```

Presentation code must not contain duplicated GPA formulas.

---

## Layer 2 — Domain / Calculation

Responsible for:

* GPA calculation
* CGPA calculation
* projection
* required GPA
* target reachability
* validation

Location:

```text
lib/calculations/
```

This layer should contain pure functions wherever practical.

---

## Layer 3 — University Rules

Responsible for:

* grading scales
* grade-point mappings
* credit rules
* institution-specific calculation configuration

Location:

```text
lib/universities/
```

The university configuration should be data-driven rather than hard-coded throughout UI components.

---

## Layer 4 — Validation

Responsible for:

* input validation
* constraints
* user-friendly error states

Location:

```text
lib/validation/
```

---

# 6. Suggested Directory Structure

```text
studentos/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── gpa/
│   │   └── page.tsx
│   │
│   ├── cgpa/
│   │   └── page.tsx
│   │
│   ├── planner/
│   │   └── page.tsx
│   │
│   └── universities/
│       └── ...
│
├── components/
│   ├── ui/
│   ├── calculator/
│   ├── course-input/
│   ├── grade-selector/
│   ├── result-card/
│   └── navigation/
│
├── lib/
│   ├── calculations/
│   │   ├── gpa.ts
│   │   ├── cgpa.ts
│   │   ├── planner.ts
│   │   └── index.ts
│   │
│   ├── universities/
│   │   ├── types.ts
│   │   ├── jimma.ts
│   │   ├── addis-ababa.ts
│   │   └── index.ts
│   │
│   └── validation/
│       └── ...
│
├── tests/
│   ├── calculations/
│   └── universities/
│
├── public/
│
├── AGENTS.md
├── PRODUCT_SPEC.md
├── ARCHITECTURE.md
├── CALCULATION_RULES.md
├── ROADMAP.md
├── README.md
├── package.json
├── tsconfig.json
└── ...
```

The structure is a guide, not permission to create unnecessary files.

---

# 7. Calculation Engine

The calculation engine is the most important technical component.

Conceptual API:

```typescript
calculateSemesterGPA(input)
calculateCGPA(input)
calculateProjectedCGPA(input)
calculateRequiredGPA(input)
isTargetReachable(input)
```

The exact interfaces should be designed during the calculation-engine checkpoint.

---

# 8. Calculation Independence

The calculation engine must not depend on:

* React
* Next.js components
* browser APIs
* network requests
* external APIs
* AI models

This makes the engine easy to test.

Example conceptual flow:

```text
UI
 ↓
validated input
 ↓
calculation function
 ↓
result
 ↓
UI
```

---

# 9. University Rules Architecture

University rules should be represented as structured configuration.

Conceptual model:

```typescript
interface UniversityRules {
  id: string;
  name: string;
  gradingScale: GradeRule[];
  creditSystem: CreditSystem;
  source: SourceReference;
}
```

Conceptual grade rule:

```typescript
interface GradeRule {
  letter: string;
  points: number;
}
```

The actual model may be refined after examining verified institutional data.

---

# 10. No Universal Ethiopian Assumption

Do not create:

```text
ETHIOPIA_GRADING_SCALE
```

and assume it applies to every institution.

Instead:

```text
University
    ↓
Rules profile
    ↓
Calculation
```

This allows StudentOS to support institution-specific systems.

---

# 11. Data Source Principle

University rules should come from reliable institutional sources.

Priority:

1. Official university documents
2. Official university academic regulations
3. Official university catalogs
4. Official university websites

Third-party sources should not be treated as authoritative when official information is available.

Each institution profile should retain a source reference.

---

# 12. Client-Side V1

The initial calculator should work entirely in the browser.

Example:

```text
User enters grades
       ↓
React state
       ↓
Validation
       ↓
TypeScript calculation
       ↓
Result
```

No server request is required for the basic calculation.

---

# 13. Persistence

V1 does not require user accounts.

If temporary persistence is useful, browser-local storage may be considered.

Do not introduce a database solely to save a user's GPA calculations.

A database becomes appropriate later if StudentOS adds features such as:

* accounts
* saved academic history across devices
* scholarship profiles
* application tracking
* premium subscriptions

---

# 14. Authentication

Not part of V1.

Do not install authentication libraries.

---

# 15. Database

Not part of V1.

Do not install PostgreSQL, MySQL, MongoDB, Redis, or another database for the initial calculator.

---

# 16. API Layer

Not required for the core V1 calculator.

Avoid creating API routes until a real product requirement requires server-side functionality.

---

# 17. AI Layer

There is no AI layer in V1.

Future architecture may include AI for:

* scholarship matching
* opportunity research
* personalized explanations

These should be separate from deterministic academic calculations.

---

# 18. SEO Architecture

Each major user intent should have a meaningful route.

Examples:

```text
/gpa-calculator
/cgpa-calculator
/gpa-planner
/universities/jimma-university
```

University-specific calculator routes should only be generated for verified institutions.

---

# 19. Performance Architecture

Prefer:

* static content
* server rendering where appropriate
* small client components
* minimal JavaScript
* optimized assets

Avoid:

* unnecessary global state
* huge client-side bundles
* unnecessary third-party scripts
* large media assets

---

# 20. Error Boundaries

The UI should gracefully handle unexpected errors.

Calculation errors should result in understandable messages rather than blank screens.

Invalid user input should be handled before calculation.

---

# 21. Security

V1 has a small attack surface because it has:

* no authentication
* no database
* no user-uploaded files
* no payment processing
* no external AI API
* no sensitive user data

Nevertheless:

* validate all inputs
* avoid unsafe HTML injection
* keep dependencies updated
* never commit secrets
* avoid unnecessary third-party scripts

---

# 22. Deployment Architecture

Initial deployment target:

```text
GitHub
   │
   ▼
Cloudflare Pages
   │
   ▼
StudentOS
```

The first deployment should use a free platform-provided domain.

A custom domain can be added later after the product earns revenue or demonstrates strong traction.

---

# 23. Analytics Architecture

Analytics should be lightweight.

Potential events:

```text
calculator_view
gpa_calculation_completed
cgpa_calculation_completed
planner_completed
university_selected
```

Do not collect unnecessary personal information.

---

# 24. Future Architecture

If StudentOS proves demand, architecture can evolve:

```text
                         STUDENTOS
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
        Academic        Opportunities        Career
           │                 │                 │
       GPA/CGPA          Scholarships          CV
       Planner           Internships           Jobs
       Courses           Competitions          Portfolio
           │                 │                 │
           └─────────────────┼─────────────────┘
                             │
                         User Account
                             │
                         Database
                             │
                    AI / Recommendation
```

None of this should be built until justified by actual product requirements.

---

# 25. Architecture Principle

> **Start static. Add complexity only when users force us to.**

The architecture should grow because the business requires it, not because the developer wants a sophisticated stack.
