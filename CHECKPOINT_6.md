# CHECKPOINT 6 — CGPA Calculator UI

## 1. Objective

Implement the first user-facing CGPA calculator for StudentOS.

The goal is to let Ethiopian university students calculate their cumulative GPA using their course history and the existing university-specific grading configurations.

The completed feature must be accurate, responsive, accessible, and integrated with the existing application.

**This checkpoint is exclusively for the CGPA calculator. Do not start Checkpoint 7.**

## 2. Read Before Starting

Before modifying anything, read:

* `AGENTS.md`
* `PRODUCT_SPEC.md`
* `ARCHITECTURE.md`
* `CHECKPOINT_5.md`
* `CHECKPOINT_6.md`
* Existing GPA calculator implementation
* Existing CGPA calculation engine and tests
* Existing university types and configurations
* Current application routes and shared components

Inspect the current Git status and recent history before making changes.

Do not assume that file structures or function signatures match this specification exactly. Inspect the actual repository and reuse the existing implementation.

## 3. Required Existing Architecture

Reuse the existing:

* Next.js application
* TypeScript configuration
* Tailwind CSS setup
* University configuration layer
* Deterministic CGPA calculation engine
* University selector and other reusable components where appropriate
* Existing validation conventions
* Existing test framework
* Existing responsive design conventions

Relevant existing files may include:

```text
lib/calculations/cgpa.ts
lib/calculations/gpa.ts
lib/universities/types.ts
lib/universities/index.ts
components/calculator/UniversitySelector.tsx
components/calculator/CourseRow.tsx
components/calculator/GpaResult.tsx
app/gpa/
```

Verify actual file names and exported interfaces before using them.

**Do not rewrite working infrastructure.**

## 4. Route

Implement the CGPA calculator at:

```text
/cgpa
```

Replace the existing placeholder page if necessary.

Keep `/gpa` working exactly as it currently does.

## 5. User Experience

The calculator must help students answer:

> What is my cumulative GPA based on my completed courses?

The page should clearly communicate that CGPA is calculated from the credit-weighted results of the included courses.

Provide a clean, minimal, mobile-first interface consistent with the existing GPA calculator.

### Page structure

1. Page heading and short description
2. University selector
3. Course-entry section
4. Add-course action
5. CGPA result
6. Reset action
7. Appropriate empty state and validation feedback

Use existing design conventions rather than creating an entirely new design system.

## 6. University Selection

Use the existing university configuration system.

Initially support the same five universities already present in the project:

* Jimma University
* Addis Ababa University
* Bahir Dar University
* Hawassa University
* Haramaya University

Use the existing verification statuses and grading configurations.

Do not hardcode university grading scales in the CGPA UI.

Do not invent or infer grading rules.

If a university's grading scale is genuinely unavailable, communicate that clearly and disable grade entry that depends on unavailable data. Do not display a false claim that a university's rules are verified.

Preserve the existing university-specific handling of non-GPA grades.

## 7. Course Entry

Allow students to enter the courses contributing to their cumulative GPA.

Each course row must support:

* Optional course name
* Credit value
* Grade selection
* Remove-course action, where applicable

Example:

| Course      | Credits | Grade |
| ----------- | ------: | ----- |
| Mathematics |       3 | A     |
| Physics     |       4 | B+    |
| Programming |       3 | A-    |

This is an illustrative example, not a universal grading scale.

### Row behavior

* Use stable, unique course IDs.
* Never use array indexes as React keys.
* Typing into a course name must not lose focus.
* Updating one field must not reset other fields.
* Adding a course must append one new row.
* Removing a course must preserve the other rows.
* Reset must restore the initial calculator state.

Reuse the working course-row design from `/gpa` where practical.

The course list must remain one unified section, not a collection of unrelated cards.

Maintain sufficient horizontal spacing between columns on desktop and comfortable spacing between fields on mobile.

## 8. CGPA Calculation

Use the existing calculation engine in:

```text
lib/calculations/cgpa.ts
```

Inspect its exported functions and input types.

Use the appropriate existing function, such as:

```ts
calculateCGPA()
```

or another already-implemented CGPA API that correctly matches the selected university's rules and the entered data.

Do not create a second CGPA formula inside React components.

Do not modify the calculation engine unless testing identifies a genuine defect that prevents correct integration. If a defect exists, document it and make the smallest justified change.

The underlying credit-weighted calculation follows:

$$
CGPA = \frac{\sum_i (credits_i \times gradePoints_i)}{\sum_i credits_i}
$$

However, university-specific rules determine which courses and grades may contribute. Do not treat the formula alone as a complete representation of every institution's policy.

### Calculation behavior

* Update the displayed CGPA when relevant inputs change.
* Calculate using valid, GPA-counting courses only.
* Exclude grades according to the existing university-rule implementation.
* Do not silently count non-GPA grades as zero.
* Do not include invalid or incomplete rows in the calculation.
* Do not display a misleading numerical result when there are no valid courses.
* Display the result to two decimal places, following existing GPA result conventions.

If the existing engine and university rules cannot reliably determine whether a course should count, do not invent the policy. Preserve the established limitations and communicate them appropriately.

## 9. Validation

Validate user inputs consistently with the existing application.

At minimum:

* Credits must be finite and greater than zero.
* Reject zero or negative credits.
* Reject `NaN` and infinite values.
* Do not silently convert invalid inputs into valid-looking results.
* Handle blank course names without requiring users to invent names.
* Handle missing grade selections.
* Handle an empty course list.
* Avoid `NaN` or `Infinity` appearing in the UI.

Follow the existing calculation engine's validation rules.

Do not duplicate business logic unnecessarily between components.

## 10. Result Display

Show a clear result section, for example:

```text
Your CGPA

3.67 / 4.00

Based on your valid, included courses.
```

The denominator must reflect the selected university's actual supported grading scale where it can be established reliably.

Do not universally assume that every university uses the same maximum grade point.

If the maximum supported value is unavailable or the configuration is incomplete, do not invent it.

The result must update immediately after valid changes to credits, grades, or the selected university.

Include a clear empty state before sufficient valid data has been entered.

## 11. Reset

Provide a reset action.

Reset must:

* Restore the initial course list.
* Clear course names and entered values according to the established default behavior.
* Reset the result and validation state.
* Preserve a consistent initial university-selection behavior.
* Leave no stale values in the interface.

Use a confirmation dialog only if an existing project convention requires one. Do not introduce unnecessary friction.

## 12. Responsive Design

The calculator must work at these viewport widths:

```text
320px
375px
390px
430px
768px
1024px
1440px
```

### Desktop

Use a unified course table/list with clearly separated columns.

### Mobile

Adapt the course rows to a stacked layout where needed.

Avoid:

* Horizontal overflow
* Overlapping labels
* Inputs that become too narrow
* Grade selectors that are difficult to use
* Unnecessarily tall nested cards
* Excessive shadows or decorative elements

Keep the existing StudentOS visual direction.

## 13. Accessibility

Ensure:

* Every input has an accessible label.
* Grade selectors have clear labels.
* Buttons have meaningful names.
* Validation messages are understandable.
* Focus indicators remain visible.
* Controls are usable with a keyboard.
* Text and controls have adequate contrast.
* The interface remains usable at narrow viewport widths.

Do not sacrifice accessibility for visual polish.

## 14. SEO

Update the `/cgpa` page metadata with an accurate title and description.

Suggested title:

```text
CGPA Calculator for Ethiopian University Students | StudentOS
```

Suggested description:

```text
Calculate your cumulative GPA with StudentOS. Enter your courses, credits, and grades using supported Ethiopian university grading configurations.
```

Keep the metadata truthful. Do not claim that every Ethiopian university is supported.

Do not add analytics, tracking scripts, or external API dependencies.

## 15. Testing

Add appropriate tests for the CGPA calculator UI integration without weakening or deleting existing tests.

At minimum, verify:

1. The page renders.
2. The university selector works.
3. Grade options come from the selected university configuration.
4. Missing grading scales are handled honestly.
5. Course names accept continuous typing without losing focus.
6. Credits can be entered and validated.
7. Grades can be selected.
8. Adding a course appends a new row.
9. Removing a course preserves the other rows.
10. Editing one row does not reset another.
11. CGPA updates when inputs change.
12. Non-GPA grades follow existing rules.
13. Empty and invalid states are handled correctly.
14. Reset works.
15. The existing GPA calculator remains functional.

Use the project's current test framework and conventions.

Do not add a new testing framework.

## 16. Commands and Verification

Run:

```powershell
npm test
npm run lint
npm run build
git diff --check
```

Resolve regressions introduced by this checkpoint.

Do not delete tests, suppress legitimate errors, or weaken TypeScript settings to make verification pass.

Start the development server and manually inspect:

```text
http://localhost:3000/cgpa
```

Also revisit:

```text
http://localhost:3000/gpa
```

Manually verify continuous typing, grade selection, course addition/removal, calculation updates, reset behavior, and responsive layout.

Do not claim to have performed manual browser testing unless it actually occurred.

If browser interaction is unavailable to you, explicitly report that limitation and provide the exact manual checks still needed.

## 17. Git Discipline

Before modifying files:

```powershell
git status
git log --oneline -5
```

Ensure the repository is in a known state.

Do not discard unrelated user work.

Keep the change scoped to `/cgpa` and directly related shared components or tests.

After implementation:

```powershell
git diff --check
git diff
git status
```

Review the diff for accidental changes.

Do not use destructive Git commands such as:

```text
git reset --hard
git clean -fd
git push --force
```

If all required verification passes and the implementation is complete, create the commit:

```text
feat: build CGPA calculator UI
```

Then verify:

```powershell
git status
git log --oneline -3
git show --stat --oneline HEAD
```

The working tree must be clean.

## 18. Scope Restrictions

This checkpoint includes only the CGPA calculator and necessary integration.

Do not implement:

* GPA target planner
* What-if planner
* Student accounts
* Authentication
* Database
* Backend
* API
* AI or chatbot
* Transcript uploads or OCR
* Payments
* Analytics
* Advertising
* Notifications
* Scholarship database
* Jobs
* Social features
* Native mobile app
* Admin dashboard
* New university configurations without a separate, justified requirement

Maintain the $0 requirement.

Do not introduce paid services, paid APIs, new hosting costs, or dependencies that require payment.

## 19. Completion Report

When finished, report:

### Completed

What was implemented.

### Files Changed

List all modified and added files.

### Calculation Integration

Identify the existing CGPA engine functions used and explain how university rules are applied.

### Tests

Report the actual outcomes of:

* `npm test`
* `npm run lint`
* `npm run build`
* `git diff --check`

### Manual Verification

List what was actually tested and what remains unverified.

### Git

Report:

* Commit hash
* Commit message
* Final working-tree status

### Scope

Confirm that `/gpa` remains functional and Checkpoint 7 has not started.

Stop after Checkpoint 6. Do not continue to the next checkpoint.
