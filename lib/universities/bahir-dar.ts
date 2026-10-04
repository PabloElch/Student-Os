import { UniversityRules, GradeRule } from "./types";

export const bahirDarUniversity: UniversityRules = {
  id: "bahir-dar",
  name: "Bahir Dar University",
  gradingScale: [
    { letter: "A+", points: 4.00, minimumMark: 90, maximumMark: 100 },
    { letter: "A", points: 4.00, minimumMark: 85, maximumMark: 89 },
    { letter: "A-", points: 3.75, minimumMark: 80, maximumMark: 84 },
    { letter: "B+", points: 3.50, minimumMark: 75, maximumMark: 79 },
    { letter: "B", points: 3.00, minimumMark: 70, maximumMark: 74 },
    { letter: "B-", points: 2.75, minimumMark: 65, maximumMark: 69 },
    { letter: "C", points: 2.00, minimumMark: 60, maximumMark: 64 },
    { letter: "D", points: 1.00, minimumMark: 50, maximumMark: 59 },
    { letter: "F", points: 0.00, minimumMark: 0, maximumMark: 49 },
  ],
  creditSystem: {
    unit: "credit hour / ECTS",
    ectsConversion: undefined,
  },
  calculationPolicy: {
    repeatCoursePolicy:
      "Doctoral: courses with grades lower than B may be repeated when CGPA < 3.00. Maximum one C allowed for Master's graduation. Re-examination allowed instead of repeat (max grade = B). Repeated course or re-exam grade used for CGPA/SGPA computation. Undergraduate repeat policy needs verification from current Senate Legislation Article 117.",
    passFailPolicy:
      "Pass/Fail courses: >=60 = P (Pass), <60 = F (Fail). P/F courses may be excluded from GPA calculation per CMHS handbook.",
    withdrawalPolicy: "Withdrawal policy needs verification from Senate Legislation Article 124 and related articles.",
    incompletePolicy:
      "I (Incomplete): student with <=2 I's can continue; >2 I's = forced withdrawal. Total CP of two I's must not exceed 15 CP. NG handling needs verification.",
    transferPolicy:
      "DGC evaluates and approves transfer credits. Performance in provisional/transfer courses does not impact GPA but recorded separately.",
  },
  source: {
    title: "BDU CMHS Student Handbook 2025",
    url: "https://www.bdu.edu.et/TQM/sites/default/files/2025-04/",
    documentType: "student-handbook",
    dateAccessed: "2026-10-04",
    datePublished: "2025",
    version: "2025",
  },
  status: "partially-verified",
  notes:
    "CMHS (College of Medicine and Health Sciences) grading scale verified from official 2025 student handbook. GPA/CGPA formulas verified. Pass/Fail policy verified for CMHS. Conflicting older Engineering faculty regulation uses inverse scale (1.0 = best) - likely outdated. Undergraduate repeat, withdrawal, incomplete, and transfer policies need verification from current Senate Legislation. Program-specific exceptions: Medicine/Health Sciences require minimum C grade for all courses; Doctoral requires CGPA >= 3.00 and no grade below B.",
};

export const bahirDarNonGpaGrades = ["P", "F", "I", "W", "NG"] as const;

export function isNonGpaGradeBahirDar(grade: string): boolean {
  return bahirDarNonGpaGrades.includes(grade as (typeof bahirDarNonGpaGrades)[number]);
}

export function getGradePointBahirDar(letterGrade: string): number | null {
  const rule = bahirDarUniversity.gradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}

export const bahirDarEngineeringScaleLegacy: GradeRule[] = [
  { letter: "A+", points: 1.0, minimumMark: 98, maximumMark: 100 },
  { letter: "A", points: 1.3, minimumMark: 95, maximumMark: 97 },
  { letter: "A-", points: 1.7, minimumMark: 91, maximumMark: 94 },
  { letter: "B+", points: 2.0, minimumMark: 88, maximumMark: 90 },
  { letter: "B", points: 2.3, minimumMark: 83, maximumMark: 87 },
  { letter: "C+", points: 2.7, minimumMark: 76, maximumMark: 82 },
  { letter: "C", points: 3.0, minimumMark: 66, maximumMark: 75 },
  { letter: "D", points: 3.3, minimumMark: 56, maximumMark: 65 },
  { letter: "E", points: 3.7, minimumMark: 50, maximumMark: 55 },
  { letter: "F", points: 4.0, minimumMark: 0, maximumMark: 49 },
];