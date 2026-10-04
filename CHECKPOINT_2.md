# CHECKPOINT 2 — Deterministic GPA Calculation Engine

## Objective

Build the core GPA calculation engine for StudentOS.

At the end of this checkpoint, StudentOS must have a deterministic, independently testable calculation layer capable of calculating semester GPA from course credits and grade points.

The calculation engine must be independent from the UI, Next.js, React, browser APIs, network requests, databases, AI, and university-specific UI.

The engine should be designed so that CGPA and GPA planning can be built on top of it in later checkpoints.

---

## Before Starting

Read these files completely:

* `AGENTS.md`
* `PRODUCT_SPEC.md`
* `ARCHITECTURE.md`
* `CHECKPOINT_1.md`
* `CHECKPOINT_2.md`

Before changing anything:

```bash
git status
```

The working tree must be clean before beginning.

Inspect the existing project structure and existing TypeScript configuration before creating files.

Do not unnecessarily modify existing UI code.

---

# Scope

Implement ONLY:

1. GPA calculation domain types
2. Semester GPA calculation
3. Input validation
4. Automated tests for the calculation engine
5. Minimal supporting documentation if necessary
6. Git commit after verification

Do NOT implement:

* CGPA calculation
* GPA target planner
* What-if planner UI
* University-specific grading rules
* University selection
* GPA calculator page UI
* Authentication
* Database
* API
* AI
* Analytics
* Payments
* Accounts
* Backend
* OCR
* Transcript upload
* Authentication
* Any future checkpoint functionality

---

# Mathematical Definition

Semester GPA is:

GPA = Σ(credit × grade point) / Σ(credits)

Example:

Course 1:

* Credits: 3
* Grade point: 4.0

Course 2:

* Credits: 3
* Grade point: 3.0

Course 3:

* Credits: 2
* Grade point: 3.5

Total quality points:

(3 × 4.0) + (3 × 3.0) + (2 × 3.5)
= 12 + 9 + 7
= 28

Total credits:

3 + 3 + 2 = 8

GPA:

28 / 8 = 3.5

The implementation must calculate this deterministically.

---

# Domain Model

Create appropriate TypeScript types.

A course input should conceptually contain:

```ts
{
  credits: number;
  gradePoint: number;
}
```

Use a clear domain type such as:

```ts
export interface CourseGrade {
  credits: number;
  gradePoint: number;
}
```

You may improve naming or structure if there is a strong reason, but keep the model simple.

Do not introduce classes, state-management libraries, or unnecessary abstractions.

---

# Calculation API

Create a calculation function conceptually equivalent to:

```ts
calculateSemesterGPA(courses: CourseGrade[]): number
```

Requirements:

* Accept an array of courses.
* Calculate weighted grade points.
* Divide total quality points by total credits.
* Return a numeric GPA.
* Do not mutate the input array.
* Do not depend on React.
* Do not depend on browser APIs.
* Do not make network requests.
* Do not use AI.
* Do not contain university-specific rules.

---

# Validation

Invalid input must not silently produce misleading results.

At minimum validate:

### Course list

* Empty course list must be rejected.
* Course list containing invalid courses must be rejected.

### Credits

Credits must:

* be finite
* be greater than zero

Reject:

* `0`
* negative values
* `NaN`
* `Infinity`
* `-Infinity`

### Grade points

Grade points must:

* be finite
* be non-negative

Do not silently accept invalid numerical values.

Do NOT hard-code a universal maximum grade point such as 4.0 in the generic calculation engine.

The calculation engine should work with valid numeric grade points regardless of the university scale.

University-specific limits belong to the future university-rules layer.

---

# Error Handling

Use a clear and predictable error strategy.

For example, invalid inputs may throw a standard `Error` with a useful message.

Errors should help developers understand what went wrong.

Avoid vague errors such as:

```text
Invalid input
```

Prefer useful messages such as:

```text
Course credits must be greater than zero.
```

or equivalent.

Do not introduce a custom error framework for this checkpoint.

---

# Numerical Precision

Do not over-engineer numerical precision.

JavaScript/TypeScript floating-point arithmetic is acceptable for this checkpoint.

However:

* avoid unnecessary rounding during intermediate calculations
* calculate using full precision
* if the returned value needs rounding for display, that belongs to the UI layer

The calculation engine should return the mathematical result rather than a formatted string.

For example:

```text
3.6666666666666665
```

may be returned internally.

Do NOT convert the result to:

```text
"3.67"
```

inside the calculation engine.

---

# Tests

Create automated tests for the calculation engine.

Use the project's existing test setup if one exists.

If no test framework exists, introduce a minimal, lightweight TypeScript-compatible testing setup only if necessary.

Do NOT introduce a large testing framework or unnecessary dependencies.

Tests must cover at least:

### Test 1 — Basic weighted GPA

Example:

* 3 credits @ 4.0
* 3 credits @ 3.0
* 2 credits @ 3.5

Expected:

3.5

### Test 2 — Single course

Example:

* 3 credits @ 4.0

Expected:

4.0

### Test 3 — Different credit weights

Verify that a higher-credit course has proportionally greater influence.

### Test 4 — Fractional result

Use inputs that produce a non-integer GPA.

### Test 5 — Empty course list

Must fail.

### Test 6 — Zero credits

Must fail.

### Test 7 — Negative credits

Must fail.

### Test 8 — Negative grade point

Must fail.

### Test 9 — NaN

Must fail.

### Test 10 — Infinity

Must fail.

### Test 11 — Input immutability

Verify that calling the calculation function does not mutate the original course array or course objects.

Tests should verify behavior, not implementation details.

---

# File Structure

Use a simple structure similar to:

```text
lib/
└── calculations/
    ├── gpa.ts
    └── gpa.test.ts
```

You may create a small supporting type file if genuinely useful.

Do not create empty architectural layers just for appearance.

---

# Code Quality

Requirements:

* Strict TypeScript.
* No unnecessary `any`.
* No `@ts-ignore` unless absolutely unavoidable and explicitly documented.
* Pure calculation logic where practical.
* Clear function names.
* Clear variable names.
* No duplicated calculation formulas.
* No UI code inside the calculation engine.
* No React imports inside calculation files.
* No browser APIs inside calculation files.

The engine should be easy to reuse from future:

* GPA calculator UI
* CGPA calculator
* GPA planner
* What-if planner

---

# UI

Do NOT build the GPA calculator interface during this checkpoint.

The existing `/gpa` page should remain a placeholder.

Do not add forms, grade selectors, buttons, cards, animations, or interactive calculator UI.

The next checkpoint will connect the calculation engine to the interface.

---

# University Rules

Do NOT implement university-specific grading scales in this checkpoint.

Do not assume:

* every Ethiopian university uses the same grading scale
* every university uses the same credit system
* every university uses the same grade symbols

The generic calculation engine works with numeric `gradePoint` values.

University rules will be introduced separately using verified sources.

---

# Verification

Before declaring the checkpoint complete, run:

```bash
npm run lint
npm run build
```

Also run the complete automated test suite.

If a test script exists:

```bash
npm test
```

If the project uses another test command, use the project's configured command.

Do not claim tests pass without actually running them.

---

# Git Policy

Follow the Git rules in `AGENTS.md`.

Before starting:

```bash
git status
```

During development, keep changes limited to this checkpoint.

After implementation:

```bash
git status
git diff
git diff --check
```

Run lint, tests, and build.

Only after all required verification passes:

```bash
git add <relevant files>
git commit -m "feat: add deterministic GPA calculation engine"
```

Do not commit broken code.

Do not use:

```bash
git reset --hard
git clean -fd
git push --force
```

Do not rewrite existing history.

---

# Final Report

When finished, report:

## Completed

List exactly what was implemented.

## Files Changed

List every created or modified file.

## Tests

Report:

* test command
* number of tests
* pass/fail result

## Lint

Report exact result.

## Build

Report exact result.

## Git

Report:

* `git status`
* commit hash
* commit message

## Issues

List any unresolved issues.

## Scope

Explicitly confirm that:

* CGPA was not implemented.
* GPA planner was not implemented.
* University-specific rules were not implemented.
* GPA UI was not implemented.
* No AI/API/database/auth/payment/analytics functionality was added.

---

# STOP CONDITION

After completing this checkpoint and committing the verified changes:

STOP.

Do not begin Checkpoint 3.

Do not implement CGPA.

Do not implement planner functionality.

Do not redesign the UI.

Do not add university rules.

Wait for further instructions.
