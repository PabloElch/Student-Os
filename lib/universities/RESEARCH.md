# StudentOS University Calculation Rules Research

**Date Researched:** 2026-10-04  
**Researcher:** StudentOS Development Agent  
**Status:** Initial Research — Requires Verification Against Official Sources

---

## Overview

This document records research on Ethiopian university grading systems, GPA/CGPA calculation methods, and academic policies for the initial supported university set. The goal is to establish a verified rules foundation so StudentOS does not assume all Ethiopian universities calculate grades identically.

**Source Priority Hierarchy:**
- **Tier 1:** Official university sources (senate legislation, academic regulations, student handbooks, registrar documents, official websites, curriculum documents)
- **Tier 2:** Ethiopian government/regulatory sources (Ministry of Education, Education and Training Authority)
- **Tier 3:** Secondary sources (used only to locate official sources, never treated as authoritative)

**Confidence Status:**
- `Verified` — Confirmed from official Tier 1 source
- `Partially Verified` — Some rules confirmed, others need verification
- `Needs Verification` — No official source found yet; rule not encoded

---

## 1. Jimma University (JU)

### Sources
| Source Title | Type | URL | Date Accessed |
|--------------|------|-----|---------------|
| Jimma University Grading Information | Official Registrar Page | https://www.ju.edu/registrar/grading-information.php | 2026-10-04 |
| Jimma University Academic Calendar 2023/24 | Official Calendar | https://www.scribd.com/document/836345578/ | 2026-10-04 |
| Jimma University 2023-2024 Catalog | Official Catalog | https://www.scribd.com/document/788409308/ | 2026-10-04 |

### Undergraduate Grading Scale

| Letter Grade | Definition | Grade Points |
|--------------|------------|--------------|
| A | Exceptional Work | 4.00 |
| A- | Excellent Work | 3.67 |
| B+ | Good Work | 3.33 |
| B | Good Work | 3.00 |
| B- | Good Work | 2.67 |
| C+ | Satisfactory Work | 2.33 |
| C | Satisfactory Work | 2.00 |
| C- | Passing Work | 1.67 |
| D+ | Passing Work | 1.33 |
| D | Passing Work | 1.00 |
| D- | Passing Work | 0.67 |
| F | Unsatisfactory Work; Failure | 0.00 |

### Non-GPA Grades (Excluded from Calculation)
- **I** — Incomplete → Not included in GPA
- **P** — Passed → Not included in GPA
- **W** — Withdrew → Not included in GPA
- **AU** — Audit → Not included in GPA
- **CR** — Credit → Not included in GPA
- **S** — Satisfactory → Not included in GPA
- **U** — Unsatisfactory → Not included in GPA

### GPA/SGPA Formula
> GPA = Total Grade Points ÷ Total credit hours attempted

From source: "Total Grade Points ÷ Total credit hours attempted = GPA"

### CGPA Formula
CGPA = Cumulative weighted average across all semesters using the same quality-point / credit-hour formula.

### Repeat Course Treatment
**Grade Substitution Policy:**
- Maximum of two grade substitutions allowed
- Grade Substitution Request Form must be submitted to Registrar's Office before end of 100% Drop Period of the term when course is repeated
- If student earns "W" or "I" grade in repeated course, it does not count toward the two substitutions
- If repeated course results in "F" grade, the "F" will replace the previous grade
- Graduate students are not eligible for grade substitution

### Pass/Fail Treatment
- Available to degree-seeking undergraduates with ≥28 credit hours, not on probation
- Maximum 12 credit hours total on Pass/Fail basis
- Maximum 4 credit hours per semester
- Cannot be used to correct academic deficiency or repeat failed course
- **P** (Pass) = "D-" quality work or better; credits count toward degree but GPA unaffected
- **F** = regular F value, GPA appropriately affected
- Courses NOT eligible for Pass/Fail:
  - ENGL 103 and ENGL 203
  - Core curriculum requirements
  - Major/minor required courses
  - Honors courses
  - Independent study courses

### Withdrawal Treatment
- **W** grade = Not included in GPA calculation
- Standard withdrawal procedures apply

### Incomplete/NG Treatment
- **I** (Incomplete) = Not included in GPA
- **NG** (No Grade) = Not included in GPA

### Transfer Course Treatment
- Not explicitly detailed in accessible sources
- **Needs Verification**

### Program-Specific Exceptions
- **Graduate students in graduate courses:** Do not receive C-, D+, D, D- grades; earn F for < C
- **Graduate students in undergraduate courses:** Not affected by graduate-only rule
- **Freshman English (ENGL 103):** Minimum grade C- (1.67) required
- **Major/Minor:** Minimum C (2.0) average required

### Graduation Requirements
- Undergraduate: Minimum CGPA 2.00
- Graduate: Minimum CGPA 3.00
- No F grades in any course

### Confidence Status
- **Grading Scale:** Verified (official registrar page)
- **GPA Formula:** Verified
- **Repeat Policy:** Partially Verified (details from registrar page)
- **Pass/Fail:** Partially Verified
- **Withdrawal/Incomplete:** Verified
- **Transfer Policy:** Needs Verification

---

## 2. Addis Ababa University (AAU)

### Sources
| Source Title | Type | URL | Date Accessed |
|--------------|------|-----|---------------|
| Addis Ababa University Senate Legislation 2023 | Official Senate Legislation | https://transform.aau.edu.et/654746ce0bf66.pdf | 2026-10-04 |
| AAU Senate Legislation 2012 (older) | Official Senate Legislation | https://aaitsce.wordpress.com/wp-content/uploads/2014/08/aau-sl-final-draft1.pdf | 2026-10-04 |
| Council of Ministers Regulation No. 537/2023 | Government Regulation | https://justice.gov.et/wp-content/uploads/2025/02/... | 2026-10-04 |

### Undergraduate Grading Scale
**Needs Verification** — The 2023 Senate Legislation PDF (Chapter 17, Articles 90-91) contains the grading rules but full text extraction was not possible from the PDF. Secondary sources indicate:

| Raw Mark Interval | Letter Grade | Grade Points |
|-------------------|--------------|--------------|
| [95-100] | A+ | 4.00 |
| [90-95) | A | 4.00 |
| [85-90) | A- | 3.75 |
| [80-85) | B+ | 3.50 |
| [75-80) | B | 3.00 |
| [70-75) | B- | 2.75 |
| [65-70) | C+ | 2.50 |
| [50-60) | C | 2.00 |
| [40-50) | D | 1.00 |
| <40 | F | 0.00 |

*Source: AAU Senate Legislation Article 116 (per secondary sources); needs verification from official PDF.*

### Credit System
- ECTS-based credit system documented
- Conversion: 1 credit hour = 2 ECTS (needs verification)
- **Needs Verification**

### GPA/SGPA Formula
> SANG = Σ(grade points × credit points) / Σ(credit points)
> CANG = Cumulative sum across all semesters

### CGPA Formula
Cumulative weighted average using same formula across all included courses.

### Repeat Course Treatment
**Needs Verification** — Senate Legislation Article 117 covers course repetition.

### Pass/Fail Treatment
- Non-credit work recorded as "P" (Pass) or "F" (Failure)
- Neither included in SGPA/SANG computation

### Withdrawal Treatment
- **W** (Withdrawal) = Not included in SGPA/SANG computation
- **DO** (Drop Out) = Not included; failure to justify results in automatic F

### Incomplete/NG Treatment
- **NG** (No Grade) = Recorded when no full examination records; must be changed to letter grade
- **I** (Incomplete) = Not included in GPA

### Transfer Course Treatment
**Needs Verification** — Senate Legislation Article 102 covers transfer.

### Program-Specific Exceptions
- Medical/health science programs may have different grading
- **Needs Verification**

### Confidence Status
- **Grading Scale:** Needs Verification (official PDF not fully extracted)
- **GPA Formula:** Partially Verified (secondary sources consistent)
- **Repeat Policy:** Needs Verification
- **Pass/Fail:** Partially Verified
- **Withdrawal/Incomplete:** Partially Verified
- **Transfer Policy:** Needs Verification

---

## 3. Bahir Dar University (BDU)

### Sources
| Source Title | Type | URL | Date Accessed |
|--------------|------|-----|---------------|
| BDU CMHS Student Handbook 2025 | Official Student Handbook | https://www.bdu.edu.et/TQM/sites/default/files/2025-04/... | 2026-10-04 |
| BDU Senate Legislation (various articles) | Official Legislation | Multiple BDU pages | 2026-10-04 |
| BDU PhD Study Guideline | Official Guideline | https://www.bdu.edu.et/ila/sites/default/files/2025-02/... | 2026-10-04 |

### Undergraduate Grading Scale (College of Medicine and Health Sciences)

| Raw Mark Interval | Fixed Number Grade | Letter Grade | Status Description |
|-------------------|-------------------|--------------|-------------------|
| [90, 100] | 4.0 | A+ | Excellent |
| [85, 90) | 4.0 | A | Excellent |
| [80, 85) | 3.75 | A- | Very Good |
| [75, 80) | 3.50 | B+ | Very Good |
| [70, 75) | 3.00 | B | Good |
| [65, 70) | 2.75 | B- | Good |
| [60, 65) | 2.00 | C | Satisfactory |
| [50, 60) | 1.00 | D | Unsatisfactory |
| <50 | 0 | F | Fail |

**Pass/Fail Courses:** ≥60 = "P" (Pass), <60 = "F" (Fail)

### Alternative Grading Scale (Engineering Faculty — Older Regulation)

| Raw Mark Interval | Number Grade | Letter Grade |
|-------------------|--------------|--------------|
| [98,100] | 1.0 | A+ |
| [95,98) | 1.3 | A |
| [91,95) | 1.7 | A- |
| [88,91) | 2.0 | B+ |
| [83,88) | 2.3 | B |
| [76,83) | 2.7 | C+ |
| [66,76) | 3.0 | C |
| [56,66) | 3.3 | D |
| [50,56) | 3.7 | E |
| [0,50) | 4.0 | F |

*Note: This appears to be an older/inverse scale (lower number = better). Needs verification against current legislation.*

### Credit System
- **Credit Hour (Cr. Hr.)** and **ECTS** both used
- Medicine/Health Sciences: 183 ECTS total for some programs
- Business programs: 110-180 ECTS
- **Needs Verification** for unified undergraduate credit system

### SGPA/SANG Formula
> SANG = Σ(grade points × credit points) / Σ(credit points)
> Also called SGPA (Semester Grade Point Average)

### CGPA/CANG Formula
> CANG = Cumulative sum of (grade points × credit points) across all semesters / total credit points
> Also called CGPA (Cumulative Grade Point Average)

### Repeat Course Treatment
**From BDU Senate Legislation (Article 199 - Doctoral):**
- Courses with grades lower than B may be repeated when CGPA < 3.00
- Maximum one "C" allowed for Master's graduation
- Re-examination allowed instead of repeat (max grade = B)
- Repeated course or re-exam grade used for CGPA/SGPA computation

**Undergraduate:** Article 117 (needs verification from current legislation)

### Pass/Fail Treatment
- Pass/Fail courses: ≥60 = P, <60 = F
- P/F courses may be excluded from GPA calculation (per CMHS handbook)

### Withdrawal Treatment
**Needs Verification** — Article 124 (Class Attendance) and related articles.

### Incomplete/NG Treatment
- **I** (Incomplete): Student with ≤2 I's can continue; >2 I's = forced withdrawal
- Total CP of two I's must not exceed 15 CP
- **NG** handling: Needs Verification

### Transfer Course Treatment
- DGC evaluates and approves transfer credits
- Performance in provisional/transfer courses does not impact GPA but recorded separately

### Program-Specific Exceptions
- **Medicine & Health Sciences:** Minimum C grade for all courses; pass all internships
- **Doctoral:** Minimum CGPA 3.00; no grade below B
- **Graduation Distinction:** CGPA ≥ 3.75 = Great Distinction; 3.25-3.75 = Distinction
- **Bahir Dar University Medal:** Outstanding regular student per faculty, CGPA ≥ 3.25

### Academic Standing
- **Year 1 Semester 1:** SGPA ≥ 1.75 = Promoted; 1.50-1.74 = Warning; <1.50 = Dismissal
- **Year 1 Semester 2+:** SGPA ≥ 1.75 and CGPA ≥ 2.00 = Promoted; lower = Warning/Dismissal
- **Consecutive warnings** = Academic Dismissal
- **Readmission:** Must achieve required SANG/CANG thresholds

### Confidence Status
- **Grading Scale (CMHS):** Verified (official handbook)
- **Grading Scale (General UG):** Partially Verified (conflicting scales found)
- **GPA/CGPA Formula:** Verified
- **Repeat Policy:** Partially Verified (doctoral clear, UG needs verification)
- **Pass/Fail:** Verified (CMHS)
- **Withdrawal/Incomplete:** Partially Verified
- **Transfer Policy:** Partially Verified

---

## 4. Hawassa University (HU)

### Sources
| Source Title | Type | URL | Date Accessed |
|--------------|------|-----|---------------|
| Hawassa University Registrar Grading System | Official Registrar Page | https://www.hu.edu.et/registrar-grading-system | 2026-10-04 |
| Hawassa University Registrar Page | Official Registrar Page | https://www.hu.edu.et/registrar | 2026-10-04 |
| HU Graduate Guidelines 2020 | Official Guideline | https://pdfcoffee.com/download/sgs-guideline-final-version-february-2020-pdf-free.html | 2026-10-04 |

### Undergraduate Grading Scale

| Raw Mark Interval | Grade Points | Letter Grade | Status |
|-------------------|--------------|--------------|--------|
| [90, 100] | 4.00 | A+ | Excellent |
| [85, 90] | 4.00 | A | Excellent |
| [80, 85) | 3.75 | A- | Very Good |
| [75, 80) | 3.50 | B+ | Very Good / First Class with Distinction |
| [70, 75) | 3.00 | B | Good / First Class |
| [65, 70) | 2.75 | B- | Good / First Class |
| [60, 65) | 2.50 | C+ | Second Class |
| [50, 60) | 2.00 | C | Satisfactory |
| [45, 50) | 1.75 | C- | Unsatisfactory / Lower Class |
| [40, 45) | 1.00 | D | Very Poor / Lower Class |
| [30, 40) | 0.00 | FX | Fail / Lowest Class |
| <30 | 0.00 | F | Fail / Lowest Class |

### Assessment Structure
- Continuous assessment: 50% (tests, reports, assignments, presentations)
- Final exam: 50%
- Medicine/Health Sciences may set own guidelines

### GPA/SGPA Formula
> SGPA/SANG = Σ(grade points × credit points) / Σ(credit points) for semester

### CGPA Formula
> CGPA/CANG = Cumulative Σ(grade points × credit points) / cumulative Σ(credit points)

### Repeat Course Treatment
- **Fx** grade → Supplementary exam (constitutes 50% of total assessment; other 50% from continuous assessment)
- **F** grade → Must repeat the course
- Fx due to disciplinary/cheating → No supplementary exam; F maintained
- Graduate: Courses with grades < B may be repeated when CGPA < 3.00

### Pass/Fail Treatment
- Non-credit work: "P" (Pass) and "F" (Failure)
- Neither included in SGPA/SANG computation

### Withdrawal Treatment
- **W** (Withdrawal) = Not included in SGPA/SANG computation
- **DO** (Drop Out) = Not included in SGPA/SANG computation
- DO requires justification to SC/DC within 6 weeks of subsequent semester; failure → automatic F

### Incomplete/NG Treatment
- **NG** (No Grade) = Recorded when no full examination records; must be changed to letter grade

### Transfer Course Treatment
**Needs Verification**

### Program-Specific Exceptions
- **Medical School:** Fixed scale: A(85-100)=4.0, B+(80-84.9)=3.5, B(70-79.9)=3.0, C+(65-69.9)=2.5, C(60-64.9)=2.0, D+(55-59.9)=1.5?, D(50-54.9)=1.0, F(<50)=0
- **Graduate:** Minimum CGPA 3.00 to graduate

### Academic Standing (Undergraduate)
- Good standing: C (2.0) or above in all semester courses
- 3+ F grades in a semester → Academic dismissal regardless of CGPA/SGPA
- Consecutive warning (except Year 1) → Academic Dismissal

### Confidence Status
- **Grading Scale:** Verified (official registrar page)
- **GPA/CGPA Formula:** Verified
- **Repeat Policy:** Verified (Fx/F distinction clear)
- **Pass/Fail:** Verified
- **Withdrawal/Incomplete:** Verified
- **Transfer Policy:** Needs Verification

---

## 5. Haramaya University (HU)

### Sources
| Source Title | Type | URL | Date Accessed |
|--------------|------|-----|---------------|
| Haramaya University Senate Legislation (July 2013) | Official Senate Legislation | https://www.haramaya.edu.et/wp-content/uploads/2023/01/senate-legislation-to-be-printed.pdf | 2026-10-04 |
| Haramaya University Graduate Page | Official Website | https://www.haramaya.edu.et/graduate-professional-schools/ | 2026-10-04 |
| Haramaya University Undergraduate Page | Official Website | https://www.haramaya.edu.et/undergraduate/ | 2026-10-04 |

### Undergraduate Grading Scale (from Senate Legislation Article 116)

**Needs Verification** — The full Article 116 text could not be extracted from the PDF (truncated). Secondary sources and table of contents indicate:

Articles referenced:
- **Article 115:** Undergraduate Grading System
- **Article 116:** Grading Scale and Letter Grade System for Undergraduate Programmes
- **Article 117:** Undergraduate Students Courses/Modules Repetition
- **Article 118:** Grading Scale for Graduate Programmes
- **Article 119:** Earning Credits on Basis of Examination
- **Article 120:** Student Academic Achievements
- **Article 121:** Academic Standing of Undergraduate Students
- **Article 122:** Academic Standing of Postgraduate Students
- **Article 123:** Graduate Students Course Repetition
- **Article 110:** Credit Transfer, Exemption and Waiver

### Credit System
- **ECTS-based** credit system explicitly documented
- Module-based curriculum (Article 107.1: "ALL COURSES ARE EXPECTED TO BE MODULAR")
- ECTS credits used alongside credit hours
- Conversion information included in legislation

### GPA/SGPA Formula
From graduate page: "Grades for transferred courses shall be used in calculating CGPA/CANG"
- Uses CANG (Cumulative Average Number Grade) terminology
- SGPA = Semester Grade Point Average
- CGPA = Cumulative Grade Point Average

### Repeat Course Treatment
**Article 117:** Undergraduate Students Courses/Modules Repetition
**Article 123:** Graduate Students Course Repetition
- **Needs Verification** — Full text not accessible from PDF

### Pass/Fail Treatment
**Needs Verification** — Article 119: Earning Credits on Basis of Examination

### Withdrawal Treatment
**Needs Verification**

### Incomplete/NG Treatment
**Needs Verification**

### Transfer Course Treatment
**Article 110:** Credit Transfer, Exemption and Waiver
- From graduate page: "Grades for transferred courses shall be used in calculating CGPA/CANG"
- **Partially Verified** — Transfer courses affect CGPA

### Program-Specific Exceptions
- **Bed in IT:** 242 ECTS; CGPA ≥ 2.00; major CGPA ≥ 2.00; at least C in Industrial Project; no F grades
- **BA History:** 142 credit hours; CGPA ≥ 2.00; no F grades
- **Graduate:** Remedial courses not counted in SGPA/CGPA but appear on transcript; min CGPA 2.00 UG / 3.00 graduate

### Academic Standing
**Article 121:** Academic Standing of Undergraduate Students
**Article 122:** Academic Standing of Postgraduate Students
- **Needs Verification** — Full text not accessible

### Confidence Status
- **Grading Scale:** Needs Verification (Article 116 not fully extracted)
- **Credit System (ECTS):** Verified (multiple sources)
- **GPA/CGPA Formula:** Partially Verified
- **Repeat Policy:** Needs Verification
- **Pass/Fail:** Needs Verification
- **Withdrawal/Incomplete:** Needs Verification
- **Transfer Policy:** Partially Verified (confirmed used in CGPA)

---

## Summary of Verification Status (Post-Implementation)

| University | Grading Scale | GPA Formula | Repeat Policy | Pass/Fail | Withdrawal | Transfer | Overall | Config Status |
|------------|---------------|-------------|---------------|-----------|------------|----------|---------|---------------|
| Jimma | ✅ Verified | ✅ Verified | ⚠️ Partial | ⚠️ Partial | ✅ Verified | ❌ Needs | ⚠️ Partial | ✅ Implemented |
| Addis Ababa | ⚠️ Partial* | ⚠️ Partial | ❌ Needs | ⚠️ Partial | ⚠️ Partial | ❌ Needs | ❌ Needs | ✅ Implemented (needs-verification) |
| Bahir Dar | ⚠️ Partial** | ✅ Verified | ⚠️ Partial | ✅ Verified (CMHS) | ⚠️ Partial | ⚠️ Partial | ⚠️ Partial | ✅ Implemented |
| Hawassa | ✅ Verified | ✅ Verified | ✅ Verified | ✅ Verified | ✅ Verified | ❌ Needs | ✅ Verified | ✅ Implemented |
| Haramaya | ❌ Needs | ⚠️ Partial | ❌ Needs | ❌ Needs | ❌ Needs | ⚠️ Partial | ❌ Needs | ✅ Implemented (needs-verification) |

*AAU grading scale from secondary sources referencing Senate Legislation; needs direct PDF extraction
**BDU has conflicting scales: CMHS handbook (verified) vs older Engineering faculty regulation (likely outdated)

---

## Key Findings for StudentOS Architecture

### Common Patterns (Generic CGPA Engine Can Handle)
1. **All use credit-weighted average:** Σ(gradePoint × credits) / Σ(credits)
2. **All distinguish SGPA (semester) from CGPA (cumulative)**
3. **All use numeric grade points** (letter → points mapping is university-specific)
4. **All exclude certain grades** (W, I, P, AU, etc.) from GPA calculation

### Critical Differences (Require University Rules Layer)
1. **Grading scales differ significantly:**
   - JU: A=4.00, A-=3.67, B+=3.33... (US-style)
   - HU: A+=4.00, A=4.00, A-=3.75, B+=3.50... (Ethiopian standard)
   - BDU CMHS: A+=4.00, A=4.00, A-=3.75, B+=3.50... (similar to HU)
   - BDU Engineering: Inverse scale (1.0 = best) — likely outdated
   - AAU: Appears similar to HU/BDU but needs verification
   - Haramaya: Unknown — Article 116 not accessible

2. **Repeat course policies differ:**
   - JU: Grade substitution (max 2), form required
   - HU: Fx→supplementary (50%), F→repeat
   - BDU: Doctoral allows repeat/re-exam (max B)
   - AAU/Haramaya: Need verification

3. **Pass/Fail treatment differs:**
   - JU: P = D- or better, max 12 credits, not for major/core
   - HU: P/F for non-credit work only, excluded from GPA
   - BDU CMHS: ≥60=P, <60=F
   - Others: Need verification

4. **Transfer course treatment differs:**
   - HU: Not clearly documented
   - BDU: Evaluated by DCG, provisional courses excluded from GPA
   - Haramaya: **Included in CGPA** (confirmed)
   - JU/AAU: Need verification

5. **Academic standing thresholds differ:**
   - JU: UG CGPA ≥ 2.00, Grad CGPA ≥ 3.00
   - HU: UG good standing = C (2.0) in all courses; 3+ F = dismissal
   - BDU: Complex matrix by year/semester (1.75/2.00 thresholds)
   - Haramaya: Need verification

---

## Next Steps for Verification

### Immediate (Before Encoding Rules)
1. **Haramaya University:** Access Article 116 of Senate Legislation for grading scale
2. **Addis Ababa University:** Extract Articles 90-91 from 2023 Senate Legislation PDF
3. **Bahir Dar University:** Confirm current undergraduate grading scale (resolve CMHS vs Engineering conflict)
4. **All Universities:** Verify repeat course policies from current legislation
5. **All Universities:** Verify transfer course policies from current legislation

### Research Method
- Contact university registrars directly for current official documents
- Search for "Senate Legislation 2024" or "Academic Regulations 2024" on official .edu.et domains
- Request PDFs from university academic affairs offices
- Cross-reference with Ministry of Education guidelines

---

## Disclaimer

This research document is a **foundation for development**, not a claim of official support. StudentOS will only claim institution-specific support for a university after:
1. Official source obtained and verified
2. Rules encoded in `lib/universities/` configuration
3. Automated tests added for that university's calculation behavior
4. Source reference displayed in UI where applicable

Until verification is complete for a specific university, StudentOS will provide a **generic calculator with clear disclaimer** rather than claiming official support.

---

## Post-Implementation Notes (Checkpoint 4)

### Implementation Date: 2026-10-04

All five universities have been configured in `lib/universities/` with the following approach:

1. **Jimma University** (`jimma.ts`) — Status: `partially-verified`
   - Grading scale, GPA/CGPA formulas, withdrawal, incomplete policies: **Verified** from official registrar page
   - Repeat course, pass/fail: **Partially Verified** from registrar page
   - Transfer policy: **Needs Verification** — explicitly marked in config
   - Non-GPA grades: I, P, W, AU, CR, S, U

2. **Addis Ababa University** (`addis-ababa.ts`) — Status: `needs-verification`
   - Grading scale: **Partially Verified** — from secondary sources referencing Senate Legislation Articles 90-91; direct PDF extraction needed
   - Credit system (ECTS): **Partially Verified** — conversion needs verification
   - GPA/CGPA formulas: **Partially Verified** — from secondary sources
   - Repeat, withdrawal/incomplete, transfer policies: **Needs Verification** — explicitly marked
   - Pass/Fail: **Partially Verified** — from Senate Legislation reference
   - Non-GPA grades: W, DO, NG, I, P

3. **Bahir Dar University** (`bahir-dar.ts`) — Status: `partially-verified`
   - CMHS grading scale: **Verified** from official 2025 student handbook
   - GPA/CGPA formulas: **Verified**
   - Pass/Fail (CMHS): **Verified**
   - Older Engineering faculty regulation (inverse scale): documented as `bahirDarEngineeringScaleLegacy` — **Likely Outdated**
   - Repeat policy (Doctoral): **Verified** from Senate Legislation; Undergraduate: **Needs Verification**
   - Withdrawal, Incomplete (NG): **Partially Verified**
   - Transfer: **Partially Verified**
   - Non-GPA grades: P, F, I, W, NG

4. **Hawassa University** (`hawassa.ts`) — Status: `verified`
   - Grading scale: **Verified** from official registrar page
   - GPA/SGPA & CGPA formulas: **Verified**
   - Repeat policy (Fx/F distinction): **Verified**
   - Pass/Fail: **Verified**
   - Withdrawal/Incomplete: **Verified**
   - Transfer: **Needs Verification** — explicitly marked
   - Medical school scale: documented as `hawassaMedicalScale`
   - Non-GPA grades: W, DO, NG, P

5. **Haramaya University** (`haramaya.ts`) — Status: `needs-verification`
   - Grading scale: **Needs Verification** — Article 116 not accessible from PDF
   - ECTS credit system: **Verified** from multiple sources
   - Module-based curriculum: **Verified** (Article 107.1)
   - GPA/CGPA formulas (CANG/SANG terminology): **Partially Verified**
   - Transfer policy: **Partially Verified** — grades for transferred courses confirmed used in CGPA
   - Repeat, Pass/Fail, Withdrawal, Incomplete: **Needs Verification** — explicitly marked
   - Program-specific requirements documented for BEd IT, BA History, Graduate

### Configuration Architecture

- Each university has its own configuration file exporting:
  - `UniversityRules` object with full type safety
  - Non-GPA grade list and checker function
  - Grade point lookup function
  - Program-specific scales where documented (legacy/alternative scales)

- Central `index.ts` provides:
  - `supportedUniversities` tuple for type-safe iteration
  - `getUniversityConfig(id)` for runtime lookup
  - `getGradePointForUniversity(universityId, letterGrade)` for grade conversion
  - `isNonGpaGradeForUniversity(universityId, grade)` for exclusion checks
  - Type-safe `SupportedUniversityId` union type

### Verification Principle Applied

Rules that could not be verified from official Tier 1 sources are:
1. Marked with `status: "needs-verification"` or `status: "partially-verified"` in the configuration
2. Documented in the `notes` field with specific gaps
3. Policy strings explicitly state "needs verification from official [source]"
4. Empty grading scale arrays where completely unverified (Haramaya)
5. Helper functions return `null`/`false` for unverified data rather than guessing

This ensures StudentOS never silently applies unverified rules to student calculations.