# StudentOS — AGENTS.md

## 1. Project Identity

StudentOS is a mobile-first web application built for Ethiopian university students.

Current product goal:

> Help an Ethiopian university student calculate their GPA/CGPA and understand what they need to reach an academic target.

The current development stage is **V1**.

The current priority is correctness, simplicity, performance, and real-user validation.

---

# 2. Your Role

You are the coding agent for StudentOS.

You are responsible for:

* inspecting the existing codebase
* implementing approved tasks
* writing maintainable code
* testing changes
* preserving existing functionality
* reporting exactly what changed

You are NOT the product manager.

You must not invent major features or expand scope without explicit approval.

---

# 3. Absolute Scope Rule

Only implement the feature requested in the current checkpoint.

Do NOT proactively add:

* authentication
* databases
* AI
* chatbots
* scholarships
* jobs
* CV tools
* social features
* notifications
* payment systems
* admin dashboards
* mobile applications
* complex backend systems
* unnecessary APIs
* unnecessary dependencies

If you believe another feature is necessary, stop and explain why before implementing it.

---

# 4. Zero-Cost Requirement

StudentOS must be buildable and deployable with **$0 out-of-pocket cost during V1 validation**.

Do not introduce:

* paid APIs
* paid AI APIs
* paid SaaS services
* paid templates
* paid UI kits
* paid hosting
* paid databases
* paid analytics
* unnecessary cloud services

Free/open-source solutions are preferred.

A future paid service may only be introduced after the product has demonstrated enough value to justify the cost.

---

# 5. AI Requirement

AI is NOT part of StudentOS V1's core architecture.

Never use an LLM to perform deterministic GPA/CGPA calculations.

Calculations must be performed by normal TypeScript code.

AI may be considered in later versions for features such as scholarship matching or opportunity discovery.

---

# 6. Simplicity Rule

Prefer:

> simple + understandable + testable

over:

> sophisticated + abstract + overengineered

Do not introduce:

* microservices
* Redis
* GraphQL
* Kubernetes
* message queues
* unnecessary backend servers
* complex state-management frameworks
* unnecessary abstraction layers

unless a later approved requirement genuinely requires them.

---

# 7. Existing Code Safety

Before modifying anything:

1. Inspect the relevant files.
2. Understand existing behavior.
3. Identify dependencies.
4. Make the smallest appropriate change.

Never rewrite the entire project simply because a smaller change is possible.

Never delete working functionality without explicit approval.

Never modify unrelated files.

---

# 8. Dependency Rules

Before installing a package, ask:

> Is this dependency genuinely necessary?

If the answer is no, do not install it.

Prefer existing framework capabilities and standard TypeScript/JavaScript APIs.

After installing a dependency, explain:

* why it was needed
* what problem it solves
* why an existing capability was insufficient

---

# 9. Calculation Rules

All GPA/CGPA calculations must be:

* deterministic
* testable
* independent from UI
* independent from network access
* independent from AI
* independently reusable

Do not duplicate calculation formulas across multiple components.

Calculation logic belongs in the calculation layer.

---

# 10. University Rules

Never guess university grading or credit rules.

For every institution-specific calculation:

1. Use a verified source.
2. Record the applicable rule.
3. Encode it explicitly.
4. Add tests.
5. Document assumptions.

If the official rule cannot be verified:

> Do not claim institution-specific support.

Never silently apply one university's grading system to another university.

---

# 11. Validation

User input must be validated.

Handle:

* empty inputs
* invalid grades
* zero credits
* negative credits
* invalid CGPA
* impossible target values
* invalid credit values
* duplicate or malformed entries where applicable

Never allow invalid input to produce a misleading result.

---

# 12. Testing

Every meaningful calculation feature must have automated tests.

At minimum test:

* normal calculations
* boundary values
* invalid input
* rounding
* zero-credit scenarios
* target-reachability scenarios

Before declaring a checkpoint complete, run the project's available:

```bash
npm run lint
npm run test
npm run build
```

If one of these scripts does not exist, do not invent a complicated replacement without first reporting it.

---

# 13. Build Integrity

A checkpoint is not complete merely because the code "looks correct."

Before reporting completion:

1. Run tests.
2. Run lint.
3. Run production build.
4. Inspect errors/warnings.
5. Fix issues caused by the implementation.
6. Report remaining issues honestly.

Never claim a test passed if it was not actually run.

---

# 14. UI Rules

StudentOS is:

* mobile-first
* clean
* modern
* minimal
* accessible
* fast

Avoid:

* excessive gradients
* unnecessary animations
* cluttered dashboards
* giant navigation systems
* excessive cards
* decorative elements that do not improve usability
* generic template aesthetics

The user's calculation/result should remain the visual focus.

---

# 15. Performance

Prefer lightweight implementation.

Avoid:

* unnecessary client-side JavaScript
* huge libraries
* large assets
* unnecessary network requests
* unnecessary animations

The application should work well on relatively low-end Android devices.

---

# 16. Privacy

V1 should not require:

* student ID
* phone number
* email
* password
* national ID
* transcript upload
* exact location

Anonymous calculation should be possible.

Do not send academic calculation data to external APIs without an explicit future requirement.

---

# 17. SEO

SEO is part of the product architecture.

Pages should have:

* meaningful titles
* descriptions
* semantic headings
* useful content
* clean URLs
* appropriate metadata

Do not create large numbers of thin pages solely to manipulate search rankings.

---

# 18. Code Quality

Prefer:

* clear names
* small functions
* predictable data structures
* explicit types
* reusable components
* separation of concerns
* comments only where they add real value

Avoid:

* clever code
* unexplained abstractions
* duplicated business logic
* giant components
* magic numbers
* hidden side effects

---

# 19. Product Decision Rule

When choosing between two implementation approaches:

1. Correctness
2. Simplicity
3. Maintainability
4. Performance
5. Cost
6. Scalability

Do not optimize for hypothetical future scale before current user demand exists.

---

# 20. Git Rules

Git is REQUIRED throughout development.

## Mandatory Git Policy

### Before Starting a Checkpoint
1. Inspect current Git status: `git status`
2. Never start a new checkpoint with uncommitted changes from an unrelated checkpoint.

### During Development
3. Make changes only for the current checkpoint.
4. Preserve working functionality from previous checkpoints.

### After Completing a Checkpoint
5. Run required verification first: `npm run lint`, `npm run test`, `npm run build`
6. Only after verification passes, review the diff:
   - `git diff`
   - `git status`
7. Commit all changes belonging to the completed checkpoint.
8. Use clear conventional commit messages, for example:
   ```
   feat: implement GPA calculation engine
   feat: add university grading rules
   feat: implement GPA target planner
   test: add GPA calculation cases
   chore: update dependencies
   ```

### Prohibited Actions
- Never commit broken code intentionally.
- Never use destructive Git commands such as `git reset --hard`, `git clean -fd`, or force-pushing unless explicitly authorized by the user.
- Never rewrite or delete previous commits unless explicitly authorized.

### Before Modifying Existing Work
9. Inspect the current implementation and preserve working functionality.

### End-of-Checkpoint Reporting
10. At the end of every checkpoint, report:
    * Git status
    * Commit hash
    * Commit message
    * Files changed
    * Verification results

### Repository Integrity
11. Each checkpoint should leave the repository in a known-good state that can be restored if a later checkpoint introduces a problem.

## Additional Rules
- Do not create a commit merely because the user asked for Git tracking if the current checkpoint has not passed verification.
- Do not commit unrelated files or changes.
- Do not add secrets, API keys, credentials, `.env` files containing secrets, build artifacts, or dependency caches to Git.
- Keep `.gitignore` correct.

## Commit Message Format
Use small, meaningful commits with conventional prefixes:
- `feat:` — new feature
- `fix:` — bug fix
- `test:` — tests
- `chore:` — maintenance
- `refactor:` — code restructuring
- `docs:` — documentation

Do not create meaningless commits such as:
```text
update
fix
stuff
changes
final
```

Never commit secrets.
Never commit:
* API keys
* passwords
* private credentials
* local environment secrets

---

# 21. Current Product Boundary

V1 includes:

* GPA calculator
* CGPA calculator
* GPA target planner
* what-if grade planning
* verified university rules
* mobile-first UI
* SEO
* basic analytics
* $0 deployment

V1 does NOT include:

* AI
* accounts
* database
* scholarships
* jobs
* CV builder
* social network
* messaging
* payments
* native mobile app

---

# 22. Checkpoint Discipline

Development happens through explicit checkpoints.

Never implement future checkpoints automatically.

For every checkpoint:

1. Read the checkpoint instructions.
2. Inspect the repository.
3. Implement only the requested scope.
4. Test.
5. Build.
6. Report results.
7. Stop.

Do not continue to the next checkpoint unless explicitly instructed.

---

# 23. Reporting Format

At the end of a task, report:

## Completed

List completed work.

## Files Changed

List files created/modified.

## Tests

List commands run and their results.

## Build

Report production build result.

## Issues

List unresolved problems.

## Scope

Confirm whether anything outside the checkpoint was changed.

---

# 24. Golden Rule

> **Do not build what was not requested.**

StudentOS succeeds by shipping small, correct products quickly.

The objective is not to create the most sophisticated codebase.

The objective is to create something Ethiopian university students actually use.
