# CHECKPOINT 5 — GPA CALCULATOR UI

## Objective

Build the first real user-facing StudentOS feature:

> **A simple, polished, mobile-first GPA Calculator for Ethiopian university students.**

The deterministic GPA calculation engine already exists.

The university rules layer already exists.

This checkpoint connects those existing domain layers to a trustworthy user interface.

The user should be able to:

1. Select a supported university.
2. Add courses.
3. Enter/select course credits.
4. Select a grade.
5. See the calculated semester GPA.
6. Add/remove courses.
7. Reset the calculator.
8. Understand the result immediately.

The calculator must be usable without an account.

---

# 1. READ FIRST

Before making any changes, read:

* `AGENTS.md`
* `ARCHITECTURE.md`
* `PRODUCT_SPEC.md`
* `CHECKPOINT_1.md`
* `CHECKPOINT_2.md`
* `CHECKPOINT_3.md`
* `CHECKPOINT_4.md`
* `lib/calculations/gpa.ts`
* `lib/calculations/gpa.test.ts`
* `lib/calculations/cgpa.ts`
* `lib/universities/types.ts`
* `lib/universities/index.ts`
* all five university configuration files
* existing application routes/components

Then inspect Git:

```powershell
git status
git log --oneline -10
```

Do not create another Git repository.

---

# 2. CHECKPOINT BOUNDARY

This checkpoint is ONLY:

> GPA Calculator UI

Do not build the entire StudentOS product.

Do not implement:

* CGPA calculator UI
* CGPA planner
* target GPA planner
* what-if planner
* university information pages
* authentication
* database
* API
* AI
* analytics
* payments
* accounts
* transcript upload
* OCR
* notifications
* admin dashboard
* social features
* scholarship system
* jobs
* CV builder
* native mobile app

Stop after the GPA calculator is complete.

---

# 3. IMPORTANT ARCHITECTURE RULE

The UI must NOT contain GPA mathematics.

Do NOT write:

```ts
id="c9m0vj"
const gpa = totalQualityPoints / totalCredits;
```

inside React components.

The UI must call the existing deterministic calculation engine.

Use:

```text
UI
 ↓
validated course input
 ↓
calculateSemesterGPA()
 ↓
result
```

The calculation engine remains the single source of truth.

---

# 4. UNIVERSITY SELECTION

The GPA calculator should allow the user to select a supported university.

Use the existing university registry:

```text
lib/universities/index.ts
```

Do not create a second list of universities inside the UI.

The UI should obtain supported universities from the existing domain layer.

Initially support:

* Jimma University
* Addis Ababa University
* Bahir Dar University
* Hawassa University
* Haramaya University

---

# 5. UNIVERSITY VERIFICATION UX

Some university configurations are partially verified or require further verification.

Do NOT falsely communicate that every university rule is fully verified.

If a university is not fully verified, the UI should communicate this appropriately without making the interface frightening or cluttered.

Example:

```text
Bahir Dar University
Some academic rules are still being verified.
```

or an unobtrusive information note.

Do not display unsupported rules as authoritative.

The user should still be able to use the calculator where the grading scale is sufficiently available.

If a university does not have a sufficiently verified grading scale, handle that state safely.

Never silently invent grade points.

---

# 6. GPA CALCULATOR PAGE

Create the GPA calculator route:

```text
/gpa
```

If an existing placeholder route already exists, replace it rather than creating a duplicate route.

The page should be mobile-first.

---

# 7. PAGE STRUCTURE

Recommended structure:

```text
------------------------------------------------
GPA Calculator
Calculate your semester GPA.

University
[ Jimma University ▼ ]

Courses

Course 1
[Course name] [Credits ▼] [Grade ▼] [Remove]

Course 2
[Course name] [Credits ▼] [Grade ▼] [Remove]

[ + Add course ]

--------------------------------
Semester GPA

3.67

[ Reset ]
--------------------------------
```

The exact visual implementation is up to the agent, but the experience should remain simple.

Do not turn it into a dashboard.

---

# 8. COURSE INPUT

Each course should support:

### Course name

Optional.

The calculator does not need the course name mathematically.

It is useful for the user's own organization.

Do not require it.

Example:

```text
Calculus I
```

or:

```text
```

Both should be valid.

---

# 9. CREDIT INPUT

Credits must be positive.

Use a clear numeric input.

Allow reasonable decimal values where appropriate.

Examples:

```text
3
4
1.5
2.5
```

Do not arbitrarily restrict the system to only integer credits unless the existing university configuration explicitly requires it.

Invalid values must be rejected.

Examples:

```text
0
-3
abc
NaN
Infinity
```

The UI should display a useful validation message.

---

# 10. GRADE INPUT

Grade choices must come from the selected university's configured grading scale.

Do NOT hard-code:

```text
A
A-
B+
B
...
```

inside the GPA page.

Instead use the university configuration.

The UI should map:

```text
grade → gradePoint
```

using the existing university rule layer.

The GPA calculation engine should receive the resulting numeric grade points.

---

# 11. NON-GPA GRADES

Some university configurations contain grades that should not contribute to GPA.

Examples may include:

* P
* F
* W
* I
* NG
* DO
* AU
* CR
* S
* U

Do not assume that all universities treat these identically.

Use the selected university's rules.

If a selected grade does not contribute to GPA, the UI should clearly communicate this.

Example:

```text
P — Pass
Not included in GPA
```

Do not silently treat a non-GPA grade as a normal numeric grade.

---

# 12. COURSE VALIDATION

The UI must validate before calling the calculation engine.

At minimum:

### Credits

Must be:

```text
finite
positive
numeric
```

### Grade

Must be:

```text
a valid grade for the selected university
```

### Course list

Must contain at least one valid GPA-contributing course before displaying a calculated GPA.

Do not call the calculator with invalid values.

---

# 13. CALCULATION BEHAVIOR

When valid course data changes, calculate the GPA.

Use:

```text
calculateSemesterGPA()
```

Do not duplicate the formula.

Example:

```text
Course             Credits     Grade

Mathematics          3          A
Physics              4          B+
Programming          3          A-
```

The result should update predictably.

Use the existing deterministic engine.

---

# 14. RESULT DISPLAY

The GPA result should be visually prominent.

Example:

```text
Your Semester GPA

3.67
```

Use appropriate decimal precision.

Do not display excessive precision such as:

```text
3.6666666666666665
```

Use a sensible presentation format such as two decimal places.

Important:

The displayed value is formatting only.

Do not alter the underlying calculation precision.

---

# 15. EMPTY STATE

When no courses have been entered:

Show a useful empty state.

Example:

```text
Add your courses to calculate your GPA.
```

Do not display:

```text
NaN
Infinity
0/0
```

---

# 16. ADD / REMOVE COURSES

The user must be able to:

* add a course
* remove a course
* edit a course
* change grade
* change credits

There should be a clear:

```text
+ Add course
```

action.

Removing a course should immediately update the GPA.

Prevent accidental confusing behavior.

---

# 17. DEFAULT COURSE

Start with a small number of course rows.

Recommended:

```text
1 course
```

rather than generating a large form.

The user can add additional courses.

Do not create 10–20 empty rows by default.

---

# 18. RESET

Provide a clear reset action.

Reset should return the calculator to its initial state.

It should:

* remove added courses
* clear inputs
* restore sensible defaults
* remove validation errors
* clear the displayed result

Do not reload the entire page just to reset the form.

---

# 19. MOBILE-FIRST DESIGN

StudentOS is primarily for university students using phones.

The GPA calculator must work well on:

* mobile
* tablet
* desktop

Prioritize mobile first.

Avoid:

* horizontal scrolling
* tiny controls
* dense tables
* tiny text
* excessive decorative elements

Course inputs should remain comfortable to use on a phone.

---

# 20. VISUAL DIRECTION

StudentOS should feel like a modern consumer product.

Aim for:

* clean
* minimal
* trustworthy
* spacious
* modern typography
* clear hierarchy
* subtle borders
* restrained shadows
* rounded components
* strong primary action
* excellent spacing

Avoid:

* generic university portal appearance
* old Bootstrap dashboard aesthetic
* excessive gradients
* excessive glassmorphism
* huge decorative illustrations
* unnecessary animations
* clutter
* medical/enterprise-dashboard styling

The product should feel polished without being visually complicated.

---

# 21. ACCESSIBILITY

Use:

* semantic labels
* accessible buttons
* keyboard navigation
* visible focus states
* sufficient text contrast
* meaningful error messages

Inputs must have labels.

Do not rely solely on placeholder text.

Buttons should have understandable accessible names.

---

# 22. RESPONSIVE BEHAVIOR

Test at approximately:

```text
320px
375px
390px
430px
768px
1024px
1440px
```

The calculator must remain usable.

At small widths, course fields may stack vertically.

Do not force a desktop table layout onto mobile.

---

# 23. COMPONENTIZATION

Create reusable components where they genuinely improve maintainability.

Potential components:

```text
components/
├── calculator/
│   ├── GpaCalculator.tsx
│   ├── CourseRow.tsx
│   ├── UniversitySelector.tsx
│   └── GpaResult.tsx
```

These names are suggestions, not requirements.

Do not create dozens of tiny components.

Use the existing project conventions if they are better.

---

# 24. CLIENT-SIDE STATE

This calculator does not need a backend.

Use local React state or an appropriately simple client-side state approach.

Do not install a state-management library for this feature.

No database is required.

No user account is required.

No information needs to be sent to a server.

---

# 25. PRIVACY

Do not collect:

* student ID
* phone number
* email
* password
* national ID
* transcript
* exact location

The GPA calculator should work entirely locally in the browser.

---

# 26. ERROR HANDLING

Errors should be understandable to students.

Bad:

```text
Invalid input
```

Better:

```text
Enter a credit value greater than 0.
```

Better:

```text
Select a valid grade for your university.
```

Do not expose raw JavaScript errors.

---

# 27. TESTING

Add tests for the UI/domain integration where appropriate.

At minimum verify:

1. GPA page renders.
2. University selector renders supported universities.
3. Selecting a university changes available grades.
4. User can add a course.
5. User can remove a course.
6. User can enter credits.
7. User can select a grade.
8. Valid courses produce the correct GPA.
9. Invalid credits are rejected.
10. Empty course list does not produce NaN/Infinity.
11. Reset works.
12. Non-GPA grades are handled according to university configuration.
13. Changing a course updates the result.
14. Existing GPA tests still pass.
15. Existing CGPA tests still pass.
16. Existing university-rule tests still pass.

Do not remove or weaken existing tests.

---

# 28. TEST THE ACTUAL CALCULATION

Include at least one integration-level example such as:

```text
Course 1:
3 credits
A = 4.0

Course 2:
4 credits
B+ = university-configured value

Course 3:
3 credits
A- = university-configured value
```

The UI result must equal the result produced by:

```text
calculateSemesterGPA()
```

Do not duplicate the expected mathematical implementation inside the test.

---

# 29. NO BACKEND

Do NOT add:

* API routes
* server actions
* database
* authentication
* external API calls

The calculator should work offline after the page is loaded.

---

# 30. NO AI

Do NOT use an LLM or AI model for:

* grade calculation
* validation
* university selection
* grade mapping
* GPA explanation

These are deterministic operations.

---

# 31. PERFORMANCE

Keep the GPA calculator lightweight.

Do not install large UI frameworks.

Do not add unnecessary dependencies.

Avoid unnecessary re-renders where practical.

Do not prematurely optimize.

---

# 32. SEO FOUNDATION

Set a useful page title and description for `/gpa`.

Example concept:

```text
GPA Calculator — StudentOS
```

Description should clearly explain that StudentOS provides a GPA calculator for Ethiopian university students.

Do not implement a complete SEO system yet.

---

# 33. NO MONETIZATION

Do not add:

* ads
* payment buttons
* subscriptions
* premium gates

The first objective is to make the calculator genuinely useful.

---

# 34. GIT DISCIPLINE

Before starting:

```powershell
git status
```

Only work on Checkpoint 5.

After implementation:

```powershell
git diff
git status
```

Review all changes.

Do not:

* reset unrelated work
* git clean
* force push
* rewrite history
* delete commits
* create another repository

Commit only after verification.

Commit message:

```text
feat: build GPA calculator UI
```

Then verify:

```powershell
git status
git log --oneline -5
git show --stat --oneline HEAD
```

Working tree must be clean.

---

# 35. VERIFICATION COMMANDS

Before committing, run:

```powershell
npm run test
npm run lint
npm run build
```

If the project has a development server, manually inspect `/gpa`.

Test:

* mobile width
* desktop width
* adding courses
* removing courses
* editing courses
* invalid credits
* grade selection
* university switching
* reset
* GPA calculation

Fix all errors.

---

# 36. FINAL REPORT

Report:

## Completed

What was implemented.

## UI

Describe the GPA calculator experience.

## University Support

Confirm how the five universities are connected to the existing rule layer.

## Files Changed

List all files.

## Tests

Report:

* GPA tests
* CGPA tests
* university tests
* UI/integration tests
* total tests

## Lint

PASS/FAIL

## Build

PASS/FAIL

## Manual Verification

Report the tested viewport sizes and major interactions.

## Git

Report:

* commit hash
* commit message
* working tree status

## Scope Check

Confirm:

* no CGPA UI
* no planner
* no backend
* no database
* no authentication
* no AI
* no payments
* no analytics
* no unrelated features

Then STOP.

Do not start Checkpoint 6.

---

# GOLDEN RULE

Build the smallest GPA calculator that feels **trustworthy, polished, and genuinely useful**.

The calculation engine is already the source of truth.

The university rules are already the source of truth.

The UI's job is to make those systems easy for a real Ethiopian university student to use.

**Do not rebuild the logic. Connect it.**
