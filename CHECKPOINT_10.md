# CHECKPOINT 10 — Wutete V2 Academic Profile & Dashboard

## Status

Planned

## Goal

Begin Wutete V2 by turning Wutete from a collection of calculators into a lightweight personal academic workspace.

V2.1 focuses on:

1. Personal academic dashboard
2. Semester history
3. Course history
4. Persistent local-only storage
5. Current academic summary
6. Target CGPA tracking

The goal is to increase repeat usage without introducing a backend, authentication, database, payments, AI, or other infrastructure.

---

## Product Principle

Wutete V1 answers:

> “What is my GPA/CGPA, and what GPA do I need?”

Wutete V2 begins answering:

> “Where am I academically, and how am I progressing toward my target?”

Do not turn Wutete into a general student portal.

---

## Scope

### 1. Academic Dashboard

Create:

`/dashboard`

The dashboard should show, when data exists:

* Current CGPA
* Target CGPA
* Completed credits
* Latest semester GPA
* Number of semesters recorded
* Progress toward target
* Basic academic history/trend
* Clear empty state for a new user

Do not use fake statistics, testimonials, or invented academic information.

---

### 2. Semester History

Allow users to create and store semester records.

Each semester should support:

* Academic year/label
* Semester label
* Courses
* Course name
* Credits
* Grade
* Calculated semester GPA
* Credits counted toward CGPA

Users should be able to:

* Add a semester
* Edit a semester
* Delete a semester
* View semester details
* Add/remove courses
* Recalculate results automatically

Reuse the existing deterministic calculation engine.

Do not duplicate calculation formulas inside UI components.

---

### 3. Persistent Local Storage

Use browser-local persistence only.

Preferred approach:

`localStorage`

Do NOT introduce:

* Database
* API
* Authentication
* Server-side persistence
* External storage
* Paid services

Clearly explain to users:

> Your academic data is saved locally on this device. Wutete does not require an account.

Handle:

* Missing storage
* Malformed stored data
* Storage versioning if appropriate
* Safe JSON parsing
* Reset/clear data

Malformed local data must never crash the application.

---

### 4. Academic Data Model

Create a small typed domain model for the persisted academic profile.

It should support at minimum:

* University
* Target CGPA
* Semesters
* Courses
* Credits
* Grades

Prefer calculating derived values from source academic data instead of storing redundant calculated values.

Keep the data model independent from React UI components.

---

### 5. Calculation Engine Reuse

Reuse the existing:

* GPA calculation engine
* CGPA calculation engine
* University rules

Do NOT rewrite the existing GPA/CGPA engine.

Do NOT introduce separate formulas inside dashboard components.

All academic calculations must remain deterministic and testable.

---

### 6. University Compatibility

Use the existing university configuration system.

Do not create a second grading-scale system.

Existing configurations:

* Jimma University
* Addis Ababa University
* Bahir Dar University
* Hawassa University
* Haramaya University

Preserve existing verification statuses.

Never invent missing university rules.

---

### 7. Navigation

Add the dashboard to the existing global navigation.

Keep the existing product shell and responsive navigation.

Existing routes must continue working:

* `/`
* `/gpa`
* `/cgpa`
* `/planner`

---

## UX Requirements

Wutete should remain:

* Mobile-first
* Warm neutral
* Minimal
* Spacious
* Polished
* Simple
* Trustworthy

Avoid dense enterprise/dashboard aesthetics.

Prioritize:

* Strong typography
* Clear hierarchy
* Generous whitespace
* Simple cards
* Readable academic numbers
* Obvious primary actions

---

## Data Privacy

No academic data should leave the browser.

Do not add analytics in this checkpoint.

Do not add third-party tracking.

No account is required.

Do not request personally identifiable information.

---

## Accessibility

Maintain:

* Semantic HTML
* Keyboard accessibility
* Visible focus states
* Proper input labels
* Accessible button names
* Accessible navigation
* Sufficient text contrast

---

## Testing Requirements

Add tests for:

* Academic profile serialization/deserialization
* Malformed local-storage data
* Empty profile
* Adding a semester
* Deleting a semester
* Course persistence
* GPA recalculation
* CGPA recalculation
* Target CGPA persistence
* Reset/clear behavior

Existing calculation tests must remain passing.

Run:

```bash
npm test
npm run lint
npm run build
```

All must pass.

---

## Build Requirements

Wutete must continue to build successfully as a static Next.js application.

Do not introduce server-only dependencies.

Do not introduce:

* Backend
* Database
* Authentication
* AI/API calls
* Paid services
* Environment secrets

---

## Git Requirements

Before committing:

```bash
git status
git diff --check
```

Verify only Checkpoint 10-related files changed.

Suggested commit:

```text
feat: add V2 academic dashboard and semester history
```

Do not push unless explicitly instructed.

---

## Definition of Done

Checkpoint 10 is complete only when:

* [ ] `/dashboard` exists
* [ ] New users see a useful empty state
* [ ] Users can create an academic profile
* [ ] Users can select their university
* [ ] Users can set a target CGPA
* [ ] Users can add semesters
* [ ] Users can add/edit/remove courses
* [ ] Semester GPA uses the existing calculation engine
* [ ] CGPA uses the existing calculation engine
* [ ] Academic data persists after refresh
* [ ] Data remains local to the browser
* [ ] Users can clear/reset saved academic data
* [ ] Malformed local storage cannot crash the app
* [ ] Existing V1 routes still work
* [ ] Responsive layout works
* [ ] Accessibility requirements are maintained
* [ ] Tests pass
* [ ] Lint passes
* [ ] Production build passes
* [ ] No paid services were introduced
* [ ] No backend/database/auth/AI was introduced
* [ ] No unrelated features were changed
* [ ] Git working tree is clean after commit

---

## Explicit Non-Goals

Do NOT implement in Checkpoint 10:

* AI assistant
* Chatbot
* Scholarships
* Jobs
* CV builder
* Social features
* Messaging
* LMS
* Professor portal
* University login
* Payments
* Subscriptions
* Ads
* Push notifications
* Native mobile app
* Cloud synchronization
* Account registration
* Transcript OCR
* PDF import
* Advanced what-if scenarios
* Shareable result cards
* Notifications
* Admin dashboard

These belong to later checkpoints.

---

## Checkpoint Boundary

Stop after the Definition of Done is satisfied.

Do not continue automatically into Checkpoint 11.

Do not redesign unrelated features.

The purpose of Checkpoint 10 is to establish a reliable V2 academic-data foundation.
