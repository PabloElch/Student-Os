# StudentOS — Checkpoint 1

## Name

**Project Initialization & Foundation**

## Status

Not started.

## Objective

Create the initial StudentOS codebase and development foundation.

At the end of this checkpoint:

> StudentOS must be a clean, working Next.js + TypeScript + Tailwind project that runs locally, builds successfully, follows the project rules, and is ready for the calculation-engine checkpoint.

---

# 1. READ THESE FILES FIRST

Before modifying anything, read:

```text
AGENTS.md
PRODUCT_SPEC.md
ARCHITECTURE.md
CHECKPOINT_1.md
```

If any of these files do not exist yet, create them from the approved project specification before continuing.

---

# 2. CHECK EXISTING ENVIRONMENT

Inspect:

```bash
node --version
npm --version
git --version
```

Do not install another Node.js version unless the current environment is genuinely incompatible.

Do not install another coding agent.

Do not install Docker.

Do not install Python dependencies.

StudentOS V1 does not require them.

---

# 3. INITIALIZE PROJECT

Create the StudentOS application using:

* Next.js
* TypeScript
* Tailwind CSS
* ESLint

Use the current stable versions available in the existing Node/npm environment unless there is a specific compatibility issue.

The project should be suitable for static/free deployment.

---

# 4. PROJECT NAME

The project directory should be:

```text
studentos
```

The application name should be:

```text
StudentOS
```

---

# 5. INITIAL FILES

Create or maintain:

```text
AGENTS.md
PRODUCT_SPEC.md
ARCHITECTURE.md
CHECKPOINT_1.md
README.md
```

Do not create future feature files unnecessarily.

---

# 6. INITIAL APPLICATION

Create a minimal homepage.

It should communicate:

## StudentOS

> Your academic toolkit for Ethiopian university students.

Provide placeholder navigation/actions for:

* GPA Calculator
* CGPA Calculator
* GPA Planner

These actions do not need to contain the actual calculators yet.

The purpose is only to establish the application shell.

---

# 7. DESIGN FOUNDATION

Establish a minimal design foundation:

* mobile-first
* responsive
* clean typography
* warm/light neutral visual direction
* accessible contrast
* subtle borders
* rounded components
* restrained shadows
* no excessive animation

Do not spend the checkpoint building polished calculator interfaces.

---

# 8. NO BACKEND

Do NOT add:

* database
* authentication
* API routes
* server actions for product functionality
* external API integrations

The current checkpoint requires none of these.

---

# 9. NO AI

Do NOT add:

* OpenAI
* Anthropic
* Gemini
* Ollama
* local LLM integration
* AI SDK
* chatbot

StudentOS V1 does not need AI.

---

# 10. NO PAYMENT

Do NOT add:

* Stripe
* Chapa
* Telebirr
* payment SDKs
* subscription infrastructure

Monetization comes later.

---

# 11. NO ANALYTICS YET

Do not install analytics during this checkpoint unless explicitly requested.

Analytics will be introduced after the core product works.

---

# 12. INITIAL FOLDER STRUCTURE

Establish only the directories needed for the foundation.

The project should be ready to evolve toward:

```text
app/
components/
lib/
tests/
public/
```

Do not create dozens of empty directories.

---

# 13. CODE QUALITY

Use:

* strict TypeScript
* clear component names
* clean imports
* no unnecessary abstractions
* no `any` unless genuinely unavoidable
* no hard-coded GPA calculations

There should be no calculation logic in this checkpoint.

---

# 14. BASIC QUALITY CHECKS

Run:

```bash
npm run lint
npm run build
```

If a test script already exists, run:

```bash
npm test
```

Do not create a complex testing framework merely for this checkpoint.

---

# 15. LOCAL VERIFICATION

Run the development server.

Verify:

1. Homepage loads.
2. StudentOS branding appears.
3. Layout works on mobile-sized viewport.
4. No obvious console errors.
5. Navigation/placeholder actions do not produce broken pages.

---

# 16. GIT

Initialize Git if necessary.

Create a first commit:

```text
chore: initialize StudentOS
```

Do not commit secrets or local environment files.

---

# 17. STOP CONDITION

Once the following are true:

* project initializes
* homepage works
* TypeScript works
* Tailwind works
* lint passes
* build passes
* local application runs
* Git repository is initialized
* project documentation exists

**STOP.**

Do NOT proceed to:

* GPA calculations
* CGPA calculations
* university rules
* GPA planner
* authentication
* database
* SEO implementation
* analytics
* monetization

Those belong to later checkpoints.

---

# 18. FINAL REPORT

When finished, report:

## Completed

What was implemented.

## Files Created/Modified

List them.

## Commands Run

List:

```text
npm run lint
npm run build
npm test
```

where applicable.

## Results

Clearly state PASS/FAIL.

## Git

Report the commit hash if a commit was created.

## Issues

List any unresolved issue.

## Scope

Confirm:

> No functionality outside Checkpoint 1 was implemented.

---

# 19. SUCCESS CONDITION

Checkpoint 1 succeeds when StudentOS has a clean, reproducible development foundation.

The next checkpoint will be:

> **Checkpoint 2 — Deterministic GPA Calculation Engine**

Do not begin Checkpoint 2 automatically.
