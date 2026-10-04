# CHECKPOINT 4 — VERIFIED UNIVERSITY RULES IMPLEMENTATION

## Objective

Implement the first verified university-specific academic calculation rules for StudentOS.

StudentOS must NOT assume that one GPA/CGPA policy applies to every Ethiopian university.

The architecture must remain:

University Rules → Calculation Policy → Generic Calculation Engine

The goal of this checkpoint is to turn the research foundation from Checkpoint 3 into structured, testable university-rule configurations.

This checkpoint is about the DOMAIN/RULES layer.

DO NOT build the user-facing calculator UI yet.

---

# 1. READ FIRST

Before changing anything, read:

* `AGENTS.md`
* `ARCHITECTURE.md`
* `PRODUCT_SPEC.md`
* `CHECKPOINT_1.md`
* `CHECKPOINT_2.md`
* `CHECKPOINT_3.md`
* `lib/universities/RESEARCH.md`
* `lib/universities/types.ts`
* `lib/calculations/gpa.ts`
* `lib/calculations/cgpa.ts`
* all existing GPA/CGPA tests

Inspect the existing Git state before doing any work.

Run:

```powershell
git status
git log --oneline -10
```

Do not create another Git repository.

---

# 2. CRITICAL RULE — NEVER GUESS UNIVERSITY POLICIES

University-specific rules affect students' academic calculations.

Therefore:

NEVER infer a university rule from:

* another Ethiopian university
* a random GPA calculator
* a student forum
* Reddit
* social media
* an unsourced website
* memory
* assumptions about the Ethiopian higher-education system

Primary/official sources are strongly preferred:

1. Official university senate legislation
2. Official academic regulations
3. Official registrar documentation
4. Official student handbook/catalog
5. Official university website
6. Official university PDF/document

Secondary sources may be used only to locate or cross-check information.

If a rule cannot be sufficiently verified, DO NOT encode it as verified.

Mark it:

`needsVerification`

rather than guessing.

---

# 3. UNIVERSITIES FOR THIS CHECKPOINT

Research and implement the rules foundation for these five universities:

1. Jimma University
2. Addis Ababa University
3. Bahir Dar University
4. Hawassa University
5. Haramaya University

These are the initial supported universities.

Do NOT expand beyond these five during this checkpoint.

---

# 4. VERIFY THE SOURCES AGAIN

Do not blindly trust the research summary from Checkpoint 3.

Re-open the original sources and verify the actual rules before encoding them.

For every university, determine the strongest available official source.

Record:

* university
* document title
* source URL/path
* publication/version/date if available
* relevant article/section/page if available
* what rule it supports
* verification status

Verification statuses:

```ts
"verified"
"partiallyVerified"
"needsVerification"
```

A rule is `verified` only when the source clearly supports it.

---

# 5. RULES TO INVESTIGATE

For each university, investigate the following.

## A. Undergraduate grading scale

Determine:

* letter grades
* grade points
* numerical mark ranges if officially defined
* whether A+ exists
* whether A and A+ have the same grade point
* whether the university uses 4.0 maximum
* whether any unusual grade points exist

Do not assume the scale is universal.

---

## B. GPA / SGPA calculation

Verify:

* formula
* credit weighting
* whether only credit-bearing courses are included
* whether non-credit courses are excluded
* whether Pass/Fail courses are excluded
* treatment of other special grades

The generic mathematical calculation engine already exists.

Do not duplicate the mathematical formula unnecessarily.

The university configuration should describe the POLICY, while the generic engine performs the mathematics.

---

## C. CGPA calculation

Verify:

* whether cumulative calculation is credit weighted
* what courses/contributions are included
* whether previous semester results are carried forward
* special cases affecting cumulative calculation

Do not implement assumptions merely because the generic formula works.

---

## D. Repeat courses

Verify:

* whether the original attempt remains in the transcript
* whether the original attempt contributes to SGPA
* whether the original attempt contributes to CGPA
* whether the latest grade replaces the previous grade
* whether the better grade is used
* whether both attempts are counted
* whether the policy differs by circumstance

This is particularly important.

Do NOT encode a generic "repeat course = replace old grade" rule.

---

## E. Pass/Fail courses

Verify:

* whether P/F courses appear on transcripts
* whether P/F courses carry credits
* whether they contribute to GPA
* whether they contribute to CGPA
* whether there are exceptions

---

## F. Withdrawal

Investigate:

* W
* withdrawal deadlines where relevant
* whether W affects SGPA
* whether W affects CGPA
* whether W carries credit

Do not implement deadline logic unless it is necessary and sufficiently verified.

---

## G. Incomplete / NG / DO / equivalent grades

Investigate whichever special grades the university officially uses.

Examples may include:

* I
* NG
* DO
* W

For each, determine whether it participates in GPA/CGPA calculations.

If the university has special conversion rules, document them.

---

## H. Transfer courses

Investigate:

* whether transferred courses can contribute to CGPA
* whether transferred credits count
* whether transferred grade points count
* whether only credit is transferred
* whether institutional approval is required

Do not invent transfer behavior.

---

# 6. DO NOT MIX DIFFERENT RULE TYPES

The following are NOT necessarily the same thing:

* grading scale
* GPA calculation
* CGPA calculation
* academic standing
* graduation requirements
* course repetition
* transfer credit

Only implement rules needed for calculation behavior in this checkpoint.

Do NOT implement academic-standing algorithms.

Do NOT implement graduation eligibility.

Do NOT implement dismissal/probation logic.

Those may be future checkpoints.

---

# 7. UPDATE THE UNIVERSITY TYPES IF NECESSARY

Inspect:

`lib/universities/types.ts`

Improve the types only if necessary to represent the verified rules cleanly.

The model should remain simple.

A possible conceptual structure is:

```ts
UniversityRules
  ├── id
  ├── name
  ├── gradingScale
  ├── creditSystem
  ├── calculationPolicy
  └── source
```

The exact implementation should follow the existing architecture.

Do not over-engineer.

Do not create a giant framework.

---

# 8. CALCULATION POLICY

The policy layer should be capable of expressing things such as:

* included course types
* excluded course types
* repeat handling
* P/F handling
* special grade handling
* transfer handling where verified

The policy must remain separate from the mathematical engine.

The generic calculation engine should NOT contain code such as:

```ts
if (university === "jimma") ...
```

Do not hard-code university IDs throughout calculation functions.

University-specific behavior belongs in university configuration/policy data.

---

# 9. IMPLEMENT UNIVERSITY CONFIGURATIONS

Create one configuration file per university.

Suggested structure:

```text
lib/
└── universities/
    ├── types.ts
    ├── index.ts
    ├── jimma.ts
    ├── addis-ababa.ts
    ├── bahir-dar.ts
    ├── hawassa.ts
    ├── haramaya.ts
    └── RESEARCH.md
```

Use the existing project structure where appropriate.

Do not create unnecessary files.

Each configuration must contain only rules that are actually supported by the research.

---

# 10. SOURCE TRACEABILITY

Every university configuration must be traceable to its source.

A future developer should be able to answer:

"Why does StudentOS calculate this university this way?"

Therefore each configured rule should have a source reference or the configuration should clearly point to the relevant source documentation.

Do not leave unexplained magic numbers.

For example, avoid unexplained code like:

```ts
A_PLUS: 4
```

without a source-backed grading rule.

---

# 11. RESEARCH DOCUMENT

Update:

`lib/universities/RESEARCH.md`

For each university provide:

### University

**Source**

**Version/date**

**Official URL/document**

**Grading scale**

**GPA calculation**

**CGPA calculation**

**Repeat policy**

**P/F policy**

**Withdrawal policy**

**Incomplete/NG/DO policy**

**Transfer policy**

**Verification status**

**Notes / unresolved questions**

Use this structure:

```text
Verified
Partially Verified
Needs Verification
```

Be explicit about uncertainty.

Do not hide uncertainty.

---

# 12. TESTS

Add tests for the university-rule layer.

Tests must verify that:

1. All five university configurations load successfully.
2. University IDs are unique.
3. University names are present.
4. Grading scales are non-empty where verified.
5. Grade points are valid finite numbers.
6. Source references exist.
7. Verification status is valid.
8. The generic calculation engine remains independent from university-specific configuration.
9. Verified exclusions behave correctly where the architecture supports them.
10. Repeat-course behavior is tested where sufficiently verified.
11. P/F behavior is tested where sufficiently verified.
12. Special-grade behavior is tested where sufficiently verified.

Do NOT write tests asserting an unverified policy.

If a rule is `needsVerification`, test that it remains explicitly marked as such rather than pretending it is verified.

---

# 13. DO NOT CHANGE THE GENERIC CALCULATION ENGINE UNLESS REQUIRED

The following already exists:

* `calculateSemesterGPA()`
* `calculateCGPA()`
* `calculateCGPAFromSummary()`

Do not rewrite these simply to accommodate university configuration.

Only modify them if the current architecture genuinely prevents the verified rules from being represented correctly.

If modification is necessary:

* preserve existing behavior
* preserve existing tests
* explain why the change is necessary

---

# 14. BACKWARD COMPATIBILITY

All existing tests must continue passing.

Minimum expected:

```text
GPA tests: PASS
CGPA tests: PASS
University rules tests: PASS
```

Do not break the deterministic calculation engine.

---

# 15. NO USER INTERFACE

DO NOT build:

* GPA calculator UI
* CGPA calculator UI
* university selector
* planner UI
* dashboard
* navigation redesign
* forms
* result cards

Checkpoint 4 is DOMAIN/RULES ONLY.

The UI comes later.

---

# 16. NO NEW PRODUCT FEATURES

DO NOT add:

* authentication
* database
* API
* AI
* chatbot
* analytics
* payments
* accounts
* OCR
* transcript upload
* notifications
* admin dashboard
* social features
* scholarship system
* jobs
* CV builder

Remember:

StudentOS V1 is intentionally simple.

---

# 17. $0 REQUIREMENT

Everything must remain free.

Do not add:

* paid APIs
* paid AI APIs
* paid databases
* paid SaaS dependencies
* paid packages
* unnecessary infrastructure

Use the existing project dependencies whenever possible.

---

# 18. QUALITY REQUIREMENTS

Before finishing:

```powershell
npm run test
npm run lint
npm run build
git diff
git status
```

Fix all failures.

Check for:

* TypeScript errors
* unused imports
* accidental dependencies
* duplicated logic
* hard-coded university rules in generic calculation functions
* undocumented magic numbers
* incorrect source references
* unsupported assumptions

---

# 19. GIT REQUIREMENTS

Before implementation:

```powershell
git status
```

Do not overwrite unrelated changes.

Only modify files relevant to Checkpoint 4.

After implementation:

```powershell
git diff
git status
```

Review the complete diff.

Create a focused commit:

```text
feat: implement verified university calculation rules
```

Do NOT:

* reset unrelated work
* use `git clean`
* force push
* rewrite history
* delete previous commits
* create another repository

After committing, run:

```powershell
git status
git log --oneline -5
git show --stat --oneline HEAD
```

The working tree should be clean.

---

# 20. FINAL REPORT

When finished, report exactly:

## Completed

List what was implemented.

## Universities

For each:

* university
* rules implemented
* verification status
* source status

## Files Changed

List every changed/created file.

## Tests

Report:

* GPA tests
* CGPA tests
* university-rule tests
* total tests

## Lint

PASS/FAIL

## Build

PASS/FAIL

## Git

Report:

* commit hash
* commit message
* working tree status

## Unverified / Remaining Rules

Explicitly list anything that could not be verified.

## Scope Check

Confirm:

* no UI added
* no backend added
* no database added
* no AI added
* no authentication added
* no payments added
* no unrelated features added

Then STOP.

Do not proceed to Checkpoint 5.

---

# GOLDEN RULE

StudentOS must be trustworthy before it is beautiful.

A calculator that looks premium but uses the wrong university rules is worse than a plain calculator that is correct.

**Verify first. Encode second. Test third. Stop.**
