import { UniversityRules } from "./types";

export const haramayaUniversity: UniversityRules = {
  id: "haramaya",
  name: "Haramaya University",
  gradingScale: [],
  creditSystem: {
    unit: "ECTS",
    ectsConversion: undefined,
  },
  calculationPolicy: {
    repeatCoursePolicy:
      "Article 117 (Undergraduate) and Article 123 (Graduate) cover course repetition. Full text not accessible from Senate Legislation PDF - needs verification.",
    passFailPolicy:
      "Article 119 covers earning credits on basis of examination. Full text not accessible - needs verification.",
    withdrawalPolicy: "Withdrawal policy needs verification from official Haramaya University Senate Legislation.",
    incompletePolicy: "Incomplete/NG policy needs verification from official Haramaya University Senate Legislation.",
    transferPolicy:
      "Article 110 covers Credit Transfer, Exemption and Waiver. Graduate page confirms grades for transferred courses used in calculating CGPA/CANG. Partially verified.",
  },
  source: {
    title: "Haramaya University Senate Legislation (July 2013)",
    url: "https://www.haramaya.edu.et/wp-content/uploads/2023/01/senate-legislation-to-be-printed.pdf",
    documentType: "senate-legislation",
    dateAccessed: "2026-10-04",
    datePublished: "2013",
    version: "July 2013",
  },
  status: "needs-verification",
  notes:
    "Grading scale (Article 116) not accessible from PDF - needs verification. ECTS-based credit system verified from multiple sources. Module-based curriculum per Article 107.1. GPA/CGPA formulas use CANG/SANG terminology. Transfer policy partially verified (grades for transferred courses included in CGPA). Repeat, pass/fail, withdrawal, incomplete, and academic standing policies all need verification from official legislation. Program-specific: BEd IT (242 ECTS, CGPA >= 2.00, major CGPA >= 2.00, at least C in Industrial Project, no F grades); BA History (142 credit hours, CGPA >= 2.00, no F grades); Graduate remedial courses not counted in SGPA/CGPA but appear on transcript; minimum CGPA 2.00 UG / 3.00 graduate.",
};

export const haramayaNonGpaGrades: readonly string[] = [];

export function isNonGpaGradeHaramaya(_grade: string): boolean {
  return false;
}

export function getGradePointHaramaya(_letterGrade: string): number | null {
  return null;
}

export const haramayaProgramRequirements = {
  bedIT: {
    totalECTS: 242,
    minimumCGPA: 2.00,
    minimumMajorCGPA: 2.00,
    industrialProjectMinimumGrade: "C",
    noFGradesAllowed: true,
  },
  baHistory: {
    totalCreditHours: 142,
    minimumCGPA: 2.00,
    noFGradesAllowed: true,
  },
  graduate: {
    remedialCoursesExcludedFromGPA: true,
    minimumCGPA: 3.00,
    undergraduateMinimumCGPA: 2.00,
  },
};