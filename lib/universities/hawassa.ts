import { UniversityRules, GradeRule } from "./types";
import { standardEthiopianGradingScale } from "./standard-scale";

export const hawassaUniversity: UniversityRules = {
  id: "hawassa",
  name: "Hawassa University",
  gradingScale: standardEthiopianGradingScale,
  creditSystem: {
    unit: "credit point",
    ectsConversion: undefined,
  },
  calculationPolicy: {
    repeatCoursePolicy:
      "Fx grade -> supplementary exam (constitutes 50% of total assessment; other 50% from continuous assessment). F grade -> must repeat the course. Fx due to disciplinary/cheating -> no supplementary exam; F maintained. Graduate: courses with grades < B may be repeated when CGPA < 3.00.",
    passFailPolicy:
      "Non-credit work recorded as P (Pass) and F (Failure). Neither included in SGPA/SANG computation.",
    withdrawalPolicy:
      "W (Withdrawal) and DO (Drop Out) excluded from SGPA/SANG computation. DO requires justification to SC/DC within 6 weeks of subsequent semester; failure results in automatic F.",
    incompletePolicy:
      "NG (No Grade) recorded when no full examination records; must be changed to letter grade.",
    transferPolicy: "Transfer course policy needs verification from official Hawassa University source.",
  },
  source: {
    title: "Hawassa University Registrar Grading System",
    url: "https://www.hu.edu.et/registrar-grading-system",
    documentType: "registrar-document",
    dateAccessed: "2026-10-04",
    datePublished: undefined,
    version: undefined,
  },
  status: "verified",
  notes:
    "Grading scale uses the standard Ethiopian university grading scale as the default mapping. Original Hawassa scale had 12 grades with different boundaries (B- at 65-69, C+ at 60-64, C at 50-59, C- at 45-49, D at 40-44, FX at 30-39, F at 0-29); Wutete uses the standard 9-grade scale. GPA/SGPA and CGPA formulas, repeat course policy (Fx/F distinction), pass/fail, withdrawal, and incomplete policies all verified from official registrar page. Assessment structure: continuous assessment 50%, final exam 50%. Medical/Health Sciences may set own guidelines. Medical school uses fixed scale: A(85-100)=4.0, B+(80-84.9)=3.5, B(70-79.9)=3.0, C+(65-69.9)=2.5, C(60-64.9)=2.0, D+(55-59.9)=1.5?, D(50-54.9)=1.0, F(<50)=0. Transfer policy needs verification.",
};

export const hawassaNonGpaGrades = ["W", "DO", "NG", "P"] as const;

export function isNonGpaGradeHawassa(grade: string): boolean {
  return hawassaNonGpaGrades.includes(grade as (typeof hawassaNonGpaGrades)[number]);
}

export function getGradePointHawassa(letterGrade: string): number | null {
  const rule = hawassaUniversity.gradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}

export const hawassaMedicalScale: GradeRule[] = [
  { letter: "A", points: 4.0, minimumMark: 85, maximumMark: 100 },
  { letter: "B+", points: 3.5, minimumMark: 80, maximumMark: 84 },
  { letter: "B", points: 3.0, minimumMark: 70, maximumMark: 79 },
  { letter: "C+", points: 2.5, minimumMark: 65, maximumMark: 69 },
  { letter: "C", points: 2.0, minimumMark: 60, maximumMark: 64 },
  { letter: "D+", points: 1.5, minimumMark: 55, maximumMark: 59 },
  { letter: "D", points: 1.0, minimumMark: 50, maximumMark: 54 },
  { letter: "F", points: 0.0, minimumMark: 0, maximumMark: 49 },
];