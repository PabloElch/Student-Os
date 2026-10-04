import { UniversityRules } from "./types";

export const addisAbabaUniversity: UniversityRules = {
  id: "addis-ababa",
  name: "Addis Ababa University",
  gradingScale: [
    { letter: "A+", points: 4.00, minimumMark: 95, maximumMark: 100 },
    { letter: "A", points: 4.00, minimumMark: 90, maximumMark: 94 },
    { letter: "A-", points: 3.75, minimumMark: 85, maximumMark: 89 },
    { letter: "B+", points: 3.50, minimumMark: 80, maximumMark: 84 },
    { letter: "B", points: 3.00, minimumMark: 75, maximumMark: 79 },
    { letter: "B-", points: 2.75, minimumMark: 70, maximumMark: 74 },
    { letter: "C+", points: 2.50, minimumMark: 65, maximumMark: 69 },
    { letter: "C", points: 2.00, minimumMark: 50, maximumMark: 64 },
    { letter: "D", points: 1.00, minimumMark: 40, maximumMark: 49 },
    { letter: "F", points: 0.00, minimumMark: 0, maximumMark: 39 },
  ],
  creditSystem: {
    unit: "ECTS",
    ectsConversion: 2,
  },
  calculationPolicy: {
    repeatCoursePolicy: "Repeat course policy needs verification from official AAU Senate Legislation Article 117.",
    passFailPolicy:
      "Non-credit work recorded as P (Pass) or F (Failure). Neither included in SGPA/SANG computation per Senate Legislation.",
    withdrawalPolicy:
      "W (Withdrawal) and DO (Drop Out) excluded from SGPA/SANG computation. DO without justification within specified period results in automatic F.",
    incompletePolicy:
      "NG (No Grade) recorded when no full examination records; must be changed to letter grade. I (Incomplete) excluded from GPA.",
    transferPolicy: "Transfer course policy needs verification from official AAU Senate Legislation Article 102.",
  },
  source: {
    title: "Addis Ababa University Senate Legislation 2023",
    url: "https://transform.aau.edu.et/654746ce0bf66.pdf",
    documentType: "senate-legislation",
    dateAccessed: "2026-10-04",
    datePublished: "2023",
    version: "2023",
  },
  status: "needs-verification",
  notes:
    "Grading scale extracted from secondary sources referencing Senate Legislation Articles 90-91; needs direct verification from official PDF. Credit system ECTS-based per documentation but conversion needs verification. GPA/SGPA and CGPA formulas partially verified from secondary sources. Repeat, withdrawal/incomplete, and transfer policies need verification from official legislation.",
};

export const addisAbabaNonGpaGrades = ["W", "DO", "NG", "I", "P"] as const;

export function isNonGpaGradeAddisAbaba(grade: string): boolean {
  return addisAbabaNonGpaGrades.includes(grade as (typeof addisAbabaNonGpaGrades)[number]);
}

export function getGradePointAddisAbaba(letterGrade: string): number | null {
  const rule = addisAbabaUniversity.gradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}