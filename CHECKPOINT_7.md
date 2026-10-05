# CHECKPOINT 7 — GPA Target Planner

## Goal

Build the first version of the **GPA Target Planner** at:

`/planner`

The planner helps Ethiopian university students answer:

> **“What GPA do I need in my upcoming credits to reach my target CGPA?”**

This is a planning/calculation feature only.

Do not build the What-If Grade Planner in this checkpoint.

---

# 1. Required Reading

Before changing code, read:

* `AGENTS.md`
* `PRODUCT_SPEC.md`
* `ARCHITECTURE.md`
* `CHECKPOINT_1.md`
* `CHECKPOINT_2.md`
* `CHECKPOINT_3.md`
* `CHECKPOINT_4.md`
* `CHECKPOINT_5.md`
* `CHECKPOINT_6.md`

Inspect the existing:

* `lib/calculations/gpa.ts`
* `lib/calculations/cgpa.ts`
* `lib/universities/`
* `/gpa`
* `/cgpa`
* existing UI components
* existing tests
* current Git status

Do not assume files or APIs exist. Inspect them first.

---

# 2. Product Definition

The GPA Target Planner should answer:

> “Given my current CGPA, completed credits, target CGPA, and upcoming credits, what GPA do I need?”

Example:

Current CGPA: `3.67`

Completed credits: `36`

Target CGPA: `3.80`

Upcoming credits: `18`

Required future GPA:

`(3.80 × (36 + 18) - 3.67 × 36) / 18`

≈ `4.06`

If the selected university's maximum GPA is `4.00`, the planner should clearly state:

> **Your target is not reachable in the upcoming credits.**

This must be calculated deterministically.

---

# 3. Scope

## Implement

* `/planner`
* University selector
* Current CGPA input
* Completed credits input
* Target CGPA input
* Upcoming credits input
* Required GPA calculation
* Reachability calculation
* Clear result states
* Input validation
* Reset
* Responsive UI
* Accessibility
* SEO metadata
* Automated tests

## Do NOT implement

* What-if grade planner
* Individual course grade simulation
* Authentication
* Accounts
* Database
* Backend
* API
* AI
* Chatbot
* Payments
* Analytics
* Notifications
* Transcript upload
* OCR
* University login
* Course database
* Scholarship features
* Social features
* GPA history
* Student profiles
* Any Checkpoint 8+ functionality

Stay strictly inside this checkpoint.

---

# 4. Calculation Engine

Inspect the existing deterministic calculation engine first.

If the existing calculation engine already provides the required target-planning calculation, reuse it.

If it does NOT provide the required calculation, add the smallest appropriate deterministic calculation function to:

`lib/calculations/`

Prefer a dedicated function such as:

`calculateRequiredGPA()`

The calculation must be:

* deterministic
* pure where practical
* independently testable
* independent from React
* independent from Next.js
* independent from network/API calls
* independent from AI

Do NOT put the formula directly inside the React component.

---

# 5. Required Formula

Given:

* current CGPA = `C`
* completed credits = `K`
* target CGPA = `T`
* upcoming credits = `N`

Required future GPA:

`R = (T × (K + N) - C × K) / N`

The implementation must correctly handle:

### Reachable

If:

`R <= maximum grade point`

and the inputs are valid.

Example:

Current CGPA = 3.50
Completed credits = 30
Target = 3.60
Upcoming credits = 30

Show the required GPA.

---

### Exactly At Maximum

If:

`R === maximum grade point`

Show a clear message that the target is technically reachable but requires the maximum possible GPA.

---

### Impossible

If:

`R > maximum grade point`

Show:

> **Target not reachable with the credits entered.**

Also show the required GPA numerically where useful.

Do not incorrectly tell the user they can reach an impossible target.

---

### Already Achieved

If:

`current CGPA >= target CGPA`

Show:

> **You've already reached your target CGPA.**

Do not calculate a misleading future GPA requirement.

---

# 6. University Maximum GPA

Do not hard-code one universal maximum GPA if the university configuration already contains the relevant grading scale.

Use the existing university configuration.

Determine the maximum grade point from the selected university's grading configuration.

The UI must not invent grading scales.

For universities whose grading scale is unavailable or insufficiently verified, follow the existing project conventions.

Do not fabricate a maximum grade point.

---

# 7. Input Validation

All numeric inputs must be validated.

## Current CGPA

Must be:

* numeric
* finite
* non-negative
* compatible with the selected university's grading scale

Reject:

* empty values
* NaN
* Infinity
* negative values
* obviously invalid CGPA values

---

## Completed Credits

Must be:

* numeric
* finite
* greater than zero

Reject:

* zero
* negative values
* NaN
* Infinity

---

## Target CGPA

Must be:

* numeric
* finite
* non-negative
* compatible with the selected university's grading scale

Reject:

* empty values
* NaN
* Infinity
* negative values
* values above the known maximum

---

## Upcoming Credits

Must be:

* numeric
* finite
* greater than zero

Reject:

* zero
* negative values
* NaN
* Infinity

---

# 8. Result States

The planner should have clear visual states.

## Empty State

Before valid inputs are entered:

> Enter your current CGPA, completed credits, target CGPA, and upcoming credits to see what GPA you need.

---

## Required GPA State

Example:

**Required GPA**

`3.82`

Supporting text:

> You need an average GPA of 3.82 across your next 18 credits to reach a 3.80 CGPA.

---

## Maximum GPA State

Example:

**Required GPA: 4.00**

> Your target is reachable, but you'll need the maximum possible GPA across your upcoming credits.

---

## Impossible State

Example:

**Required GPA: 4.06**

> This target isn't reachable within the next 18 credits because the maximum GPA is 4.00.

Keep the language clear and non-judgmental.

---

## Already Achieved State

Example:

**Target already reached**

> Your current CGPA of 3.82 is already above your target of 3.80.

---

# 9. University Selector

Reuse the existing:

`UniversitySelector`

Do not create a duplicate university-selection implementation.

Support the same five university configurations:

* Jimma University
* Addis Ababa University
* Bahir Dar University
* Hawassa University
* Haramaya University

The selected university should determine:

* grading scale
* maximum grade point when available
* verification status
* source information where applicable

---

# 10. UI Requirements

Follow the visual conventions established by `/gpa` and `/cgpa`.

Do not redesign the entire application.

The planner should feel like the same StudentOS product.

Requirements:

* mobile-first
* clean
* minimal
* spacious
* polished
* clear typography hierarchy
* consistent cards
* consistent inputs
* consistent buttons
* subtle borders
* accessible controls

Avoid:

* dashboards
* excessive decoration
* gradients everywhere
* unnecessary animation
* complicated charts
* clinical-looking interfaces

---

# 11. Responsive Requirements

Test/inspect at:

* 320px
* 375px
* 390px
* 430px
* 768px
* 1024px
* 1440px

Mobile must not require horizontal scrolling.

Desktop should use available space without becoming excessively wide.

---

# 12. Accessibility

Ensure:

* every input has a visible/accessible label
* keyboard navigation works
* buttons have clear labels
* validation messages are understandable
* result states are readable
* sufficient contrast
* focus states remain visible
* no information is conveyed by color alone

---

# 13. Interaction Requirements

The planner should update results when valid inputs change.

Do not require a page reload.

A Calculate button may be used if consistent with the existing UI, but real-time calculation is preferred if it does not make the interface noisy.

Reset must:

* clear all inputs
* clear validation errors
* clear result state
* restore initial university selection/state

Do not lose input focus while typing.

Use stable React keys if any dynamic list/state is introduced.

Do not use array indexes as keys for mutable user-entered data.

---

# 14. Precision

Display required GPA to a sensible precision, preferably:

`2 decimal places`

Avoid floating-point artifacts such as:

`3.819999999`

Use appropriate rounding for presentation only.

Do not destroy calculation precision internally.

---

# 15. SEO

Add appropriate metadata to `/planner`.

Suggested title:

`GPA Target Planner for Ethiopian University Students | StudentOS`

Suggested description:

`Find out what GPA you need to reach your target CGPA with StudentOS. Plan your academic performance using supported Ethiopian university grading configurations.`

Keep metadata accurate.

---

# 16. Testing

Add or update automated tests.

At minimum test:

### Calculation Engine

* normal reachable target
* target requiring maximum GPA
* impossible target
* already-achieved target
* zero upcoming credits
* invalid current CGPA
* invalid target CGPA
* invalid completed credits
* invalid upcoming credits
* decimal values
* floating-point rounding/presentation
* university maximum GPA handling

### UI

Test:

* planner renders
* university selector renders
* inputs accept typing
* no focus loss while typing
* valid values produce result
* invalid values show validation
* reachable target displays required GPA
* impossible target displays correct message
* already-achieved target displays correct message
* reset clears state
* university change updates applicable constraints

Do not remove or weaken existing tests.

---

# 17. Regression Protection

Run the full existing test suite.

At minimum:

`npm test`

`npm run lint`

`npm run build`

`git diff --check`

The existing `/gpa` and `/cgpa` functionality must remain intact.

---

# 18. Dependencies

Do not add dependencies unless absolutely necessary.

StudentOS remains:

* $0
* no paid APIs
* no paid AI
* no database
* no backend
* no authentication
* no analytics
* no payment provider

---

# 19. Git Requirements

Before implementation:

```powershell
git status
```

Working tree should be clean.

Only modify files necessary for Checkpoint 7.

After implementation:

```powershell
git diff
git diff --check
```

Review changes.

Run:

```powershell
npm test
npm run lint
npm run build
```

Then commit:

```text
feat: build GPA target planner
```

Do not:

* reset unrelated work
* clean unrelated files
* force push
* rewrite history
* modify previous commits
* commit secrets
* commit build artifacts

After committing:

```powershell
git status
git log --oneline -3
```

Working tree must be clean.

---

# 20. Final Report

When finished, report exactly:

## Completed

What was implemented.

## Files Changed

Every file changed/created and why.

## Calculation Integration

Which calculation engine/functions were used or added.

## Tests

Test count and result.

## Lint

Result.

## Build

Result.

## Manual Verification

What was verified.

If browser testing was unavailable, explicitly say so.

## Git

* commit hash
* commit message
* working tree status

## Scope

Confirm:

* only Checkpoint 7 was implemented
* `/gpa` remains functional
* `/cgpa` remains functional
* no Checkpoint 8 work started
* no backend/database/auth/API/AI/payments/analytics added

Then STOP.

Do not continue to another checkpoint.
