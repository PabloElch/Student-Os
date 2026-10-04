# CHECKPOINT 3 — CGPA ENGINE & UNIVERSITY CALCULATION RULES FOUNDATION

## Objective

Build the deterministic CGPA calculation engine on top of the verified GPA engine from Checkpoint 2.

This checkpoint has two goals:

1. Implement a mathematically correct, deterministic CGPA engine.
2. Establish a verified university-rules architecture so StudentOS does NOT assume that every Ethiopian university handles grades, repeats, withdrawals, Pass/Fail courses, credits, or grading scales identically.

Accuracy is more important than speed.

Do not guess institutional rules.

---

# CRITICAL PRODUCT PRINCIPLE

StudentOS must never claim:

> "All Ethiopian universities calculate GPA/CGPA exactly the same way."

Research indicates that the core weighted-average calculation is broadly consistent, but institutional regulations can differ in:

* grading scales
* grade thresholds
* credit/ECTS terminology
* repeated-course treatment
* Pass/Fail treatment
* withdrawal treatment
* incomplete/no-grade treatment
* transferred-course treatment
* program-specific grading exceptions
* academic-status rules
* medical/health-science exceptions
* curriculum/module calculation rules

Therefore:

## Separate the calculation engine from university rules.

The mathematical engine must remain generic.

University-specific behavior belongs in a future rules/configuration layer.

---

# BEFORE STARTING

Read completely:

* `AGENTS.md`
* `PRODUCT_SPEC.md`
* `ARCHITECTURE.md`
* `CHECKPOINT_1.md`
* `CHECKPOINT_2.md`
* `CHECKPOINT_3.md`

Before making changes:

```bash
git status
```

The working tree must be clean.

Inspect the existing GPA engine before writing new code.

Do not rewrite the existing GPA engine unless a real defect is discovered.

The existing Checkpoint 2 tests must continue to pass.

---

# RESEARCH REQUIREMENT

Before implementing university-specific calculation behavior, perform and document research.

The initial StudentOS university research set is:

1. Jimma University
2. Addis Ababa University
3. Bahir Dar University
4. Hawassa University
5. Haramaya University

Do not claim that these five represent every Ethiopian university.

They are the initial supported research set.

---

# SOURCE PRIORITY

Use this source hierarchy:

## Tier 1 — Official university sources

Prefer:

* current senate legislation
* official academic regulations
* official student handbooks
* official registrar documents
* official university websites
* official curriculum documents

## Tier 2 — Ethiopian government / regulatory sources

Use relevant:

* Ministry of Education
* Education and Training Authority
* official Ethiopian legal/regulatory publications

## Tier 3 — Secondary sources

Secondary websites may help locate information but must NOT be treated as authoritative when an official source is available.

Never use a third-party GPA calculator as proof of a university's rules.

---

# RESEARCH OUTPUT

Create:

```text
lib/universities/
```

and establish a research/configuration foundation.

At minimum, create a research document:

```text
lib/universities/RESEARCH.md
```

The document must record, for each initial university:

* University name
* Source title
* Source URL or official source reference
* Source date/version if available
* Date researched
* Undergraduate grading scale
* Grade-point mapping
* Credit terminology
* GPA/SGPA formula
* CGPA formula
* Repeat-course treatment
* Pass/Fail treatment
* Withdrawal treatment
* Incomplete/NG treatment
* Transfer-course treatment
* Known program-specific exceptions
* Confidence/status:

  * Verified
  * Partially verified
  * Needs verification

Do NOT fill missing information by guessing.

If an item cannot be verified, explicitly mark it:

```text
Needs verification
```

rather than inventing a rule.

---

# IMPORTANT RESEARCH FINDING

The generic formula should be represented conceptually as:

```text
CGPA =
total included quality points
/
total included credits
```

where:

```text
quality points = grade point × course credit
```

However, "included" must be determined by the applicable university/program rules.

For example:

* A Pass/Fail course may be excluded.
* A withdrawn course may be excluded.
* A repeated course may replace or supersede an earlier attempt depending on the institution.
* A transferred course may or may not affect the cumulative calculation depending on the applicable rules.
* Some programs may have special grading systems.

Do not hard-code these behaviors into the generic CGPA function.

---

# CGPA ENGINE

Implement a generic deterministic function such as:

```ts
calculateCGPA(courses)
```

The exact API may be improved if needed.

The engine should calculate:

```text
Σ(gradePoint × credits) / Σ(credits)
```

for the supplied INCLUDED course records.

The engine must NOT decide whether a course should be included.

That decision belongs to the rules layer.

---

# DOMAIN MODEL

Create an appropriate type representing a course contribution to cumulative GPA.

For example:

```ts
interface CGPACourse {
  credits: number;
  gradePoint: number;
}
```

You may reuse the existing `CourseGrade` type from the GPA engine if that is cleaner.

Avoid duplicate domain types when they represent the same mathematical concept.

---

# REQUIRED ENGINE BEHAVIOR

The CGPA function must:

* accept multiple courses
* weight grade points by credits
* calculate the correct cumulative weighted average
* reject an empty course list
* reject zero credits
* reject negative credits
* reject NaN credits
* reject Infinity credits
* reject negative grade points
* reject NaN grade points
* reject Infinity grade points
* avoid mutating inputs
* remain independent from React
* remain independent from Next.js
* remain independent from browser APIs
* remain independent from network APIs
* remain independent from university-specific rules
* remain deterministic

---

# IMPORTANT NUMERICAL RULE

Do NOT calculate CGPA by simply averaging semester GPAs.

Incorrect:

```text
(previous GPA + current GPA) / 2
```

unless the semesters have exactly equal included credits.

Correct:

```text
(previous quality points + current quality points)
/
(previous included credits + current included credits)
```

Example:

Semester 1:

```text
GPA = 4.00
Credits = 12
Quality points = 48
```

Semester 2:

```text
GPA = 3.00
Credits = 24
Quality points = 72
```

Correct CGPA:

```text
(48 + 72) / (12 + 24)
= 120 / 36
= 3.333333...
```

Not:

```text
(4.00 + 3.00) / 2
= 3.50
```

---

# SUMMARY INPUT MODEL

StudentOS may eventually allow a student to enter:

```text
Previous CGPA
Previous completed/included credits
Current semester GPA
Current semester included credits
```

The mathematical formula for combining a previous cumulative summary with a new semester is:

```text
new quality points
=
previous CGPA × previous included credits
+
current GPA × current included credits
```

then:

```text
new CGPA
=
new quality points
/
total included credits
```

However, this summary method is only valid when the previous CGPA and credit total accurately represent the institution's included coursework.

Do not pretend that a CGPA + credit count can reconstruct complex transcript history involving repeats, exclusions, transfers, or special rules.

For complex cases, course-level calculation is the authoritative model.

---

# REPEAT COURSE RULES

Do NOT implement one universal repeat-course behavior.

The calculation engine must be capable of receiving already-resolved course contributions.

Example:

```text
Course history
    ↓
University rules
    ↓
Determine which attempt contributes
    ↓
CGPA engine
```

NOT:

```text
Course history
    ↓
Generic CGPA engine guesses repeat policy
```

The generic engine must never guess.

---

# PASS / FAIL

Do not automatically treat P/F as zero or four points.

A Pass/Fail course may be excluded from GPA according to institutional rules.

The generic CGPA engine should only receive courses that are supposed to contribute.

---

# WITHDRAWALS / INCOMPLETE / NO-GRADE

Do not encode W, I, NG, DO or similar academic statuses as ordinary grade points.

These statuses belong to the university-rules/transcript interpretation layer.

If a course is excluded, it should not be passed to the generic CGPA calculation as an ordinary graded course.

---

# TRANSFERRED COURSES

Do not assume transferred courses affect CGPA identically at every university.

Research the institution's official rules.

The rules layer will eventually determine whether a transferred course contributes.

---

# GRADING SCALE

Do NOT create a universal Ethiopian grade mapping inside the CGPA engine.

The engine accepts numeric grade points.

University grading configuration will later convert:

```text
letter / mark
       ↓
university-specific grade point
       ↓
CGPA engine
```

This is essential because published institutional grading tables can differ.

---

# UNIVERSITY RULES ARCHITECTURE

Create a type foundation capable of eventually representing:

```ts
interface UniversityRules {
  id: string;
  name: string;

  gradingScale: GradeRule[];

  creditSystem: {
    unit: string;
  };

  calculationPolicy: {
    repeatCoursePolicy: string;
    passFailPolicy: string;
    withdrawalPolicy: string;
    incompletePolicy: string;
    transferPolicy: string;
  };

  source: SourceReference;
}
```

Do not over-engineer this.

If some properties are not ready to be represented reliably, document them rather than inventing behavior.

The rules architecture should support future university-specific configuration.

---

# INITIAL UNIVERSITY STATUS

Research and document the following:

## Jimma University

Must be treated as a first-class supported institution.

Use current official Jimma University academic documentation where available.

Do not assume Jimma's current rules are identical to AAU or the generic Ethiopian scale.

---

## Addis Ababa University

Research the current undergraduate grading and GPA/CGPA rules.

AAU documentation indicates GPA is credit/ECTS weighted and includes explicit rules for W, DO, I, P/F and academic status.

Verify the current source before encoding rules.

---

## Bahir Dar University

Research current undergraduate rules.

Pay particular attention to:

* SGPA calculation
* CGPA calculation
* repeat-course handling
* P/F exclusion
* grading scale
* module grading

---

## Hawassa University

Research current undergraduate rules.

Pay particular attention to:

* grading scale
* SGPA
* CGPA
* repeat-course handling
* P/F treatment
* withdrawal treatment

---

## Haramaya University

Research current undergraduate rules.

Pay particular attention to:

* SGPA/CGPA
* ECTS/credit system
* repeat-course treatment
* transfer-course treatment
* graduation requirements

---

# TESTS

Create comprehensive automated tests for the CGPA engine.

Minimum required tests:

### Test 1 — Equal-credit semesters

Verify normal weighted calculation.

### Test 2 — Unequal-credit semesters

Verify that the larger-credit semester has greater influence.

### Test 3 — Course-level calculation

Verify several courses with different credits and grade points.

### Test 4 — Single course

Expected CGPA equals its grade point.

### Test 5 — Fractional CGPA

Verify non-integer result.

### Test 6 — Empty input

Must fail.

### Test 7 — Zero credits

Must fail.

### Test 8 — Negative credits

Must fail.

### Test 9 — Negative grade point

Must fail.

### Test 10 — NaN

Must fail.

### Test 11 — Infinity

Must fail.

### Test 12 — Input immutability

Verify inputs are not mutated.

### Test 13 — GPA-vs-CGPA weighting

Explicitly verify that averaging semester GPAs produces a different result when credit loads differ and that the engine returns the correct weighted result.

---

# INTEGRATION REQUIREMENT

The existing GPA engine tests from Checkpoint 2 must continue passing.

Do not break:

```text
calculateSemesterGPA()
```

The CGPA engine should reuse appropriate types or logic where sensible.

Do not duplicate formulas unnecessarily.

---

# UI

Do NOT build the CGPA calculator UI.

Do not modify `/cgpa` beyond what is absolutely necessary for compilation.

The `/cgpa` page remains a placeholder.

---

# NO UNIVERSITY UI YET

Do not create:

* university dropdowns
* grading-scale selectors
* university-specific calculator forms
* transcript upload
* course-history UI

Research and domain foundations only.

These belong to later checkpoints after the rules have been independently verified.

---

# VERIFICATION

Run:

```bash
npm test
npm run lint
npm run build
```

All must pass.

Also run:

```bash
git diff --check
git status
```

Review:

```bash
git diff
```

before committing.

---

# GIT

Follow all Git rules in `AGENTS.md`.

The checkpoint specification itself should be committed before implementation.

After successful implementation and verification:

```bash
git add <relevant files>
git commit -m "feat: add deterministic CGPA calculation engine"
```

The working tree must be clean after the checkpoint.

Report:

* status
* commit hash
* commit message
* files changed
* tests
* lint
* build
* research status
* unresolved research questions

---

# SCOPE PROHIBITIONS

Do NOT implement:

* GPA target planner
* What-if planner
* calculator UI
* university dropdown UI
* authentication
* database
* backend
* API
* AI
* analytics
* payments
* accounts
* notifications
* transcript OCR
* PDF upload
* scholarships
* social features

---

# STOP CONDITION

After:

1. CGPA engine is implemented
2. Tests pass
3. Existing GPA tests still pass
4. Lint passes
5. Build passes
6. University research is documented
7. Git diff is reviewed
8. Changes are committed
9. Working tree is clean

STOP.

Do not begin Checkpoint 4.

Do not implement the CGPA UI.

Do not implement the GPA planner.

Wait for further instructions.
