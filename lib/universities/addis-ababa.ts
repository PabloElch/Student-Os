import { UniversityRules } from "./types";
import { standardEthiopianGradingScale } from "./standard-scale";

export const addisAbabaUniversity: UniversityRules = {
  id: "addis-ababa",
  name: "Addis Ababa University",
  gradingScale: standardEthiopianGradingScale,
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
    "Grading scale uses the standard Ethiopian university grading scale as the default mapping. Original AAU scale had different boundaries (A+ at 95, C at 50-64, D at 40-49, F at 0-39) and included B-; Wutete uses the standard 9-grade scale. Credit system ECTS-based per documentation but conversion needs verification. GPA/SGPA and CGPA formulas partially verified from secondary sources. Repeat, withdrawal/incomplete, and transfer policies need verification from official legislation.",
};

export const addisAbabaNonGpaGrades = ["W", "DO", "NG", "I", "P"] as const;

export function isNonGpaGradeAddisAbaba(grade: string): boolean {
  return addisAbabaNonGpaGrades.includes(grade as (typeof addisAbabaNonGpaGrades)[number]);
}

export function getGradePointAddisAbaba(letterGrade: string): number | null {
  const rule = addisAbabaUniversity.gradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}