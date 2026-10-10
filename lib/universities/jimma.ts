import { UniversityRules } from "./types";
import { standardEthiopianGradingScale, getGradePointFromStandardScale } from "./standard-scale";

export const jimmaUniversity: UniversityRules = {
  id: "jimma",
  name: "Jimma University",
  gradingScale: standardEthiopianGradingScale,
  creditSystem: {
    unit: "credit hour",
    ectsConversion: undefined,
  },
  calculationPolicy: {
    repeatCoursePolicy:
      "Grade substitution allowed (maximum 2 substitutions). Form must be submitted before end of 100% drop period. W/I in repeated course does not count toward limit. F in repeated course replaces previous grade. Graduate students not eligible.",
    passFailPolicy:
      "Available to undergraduates with >=28 credit hours, not on probation. Maximum 12 total credits, 4 per semester. P = D- or better; credits count toward degree but not GPA. F affects GPA normally. Not eligible: ENGL 103/203, core curriculum, major/minor required, honors, independent study.",
    withdrawalPolicy: "W grade excluded from GPA calculation. Standard withdrawal procedures apply.",
    incompletePolicy: "I (Incomplete) and NG (No Grade) excluded from GPA calculation.",
    transferPolicy: "Transfer course policy needs verification from official Jimma University source.",
  },
  source: {
    title: "Jimma University Grading Information",
    url: "https://www.ju.edu/registrar/grading-information.php",
    documentType: "registrar-document",
    dateAccessed: "2026-10-04",
    datePublished: undefined,
    version: undefined,
  },
  status: "partially-verified",
  notes:
    "Grading scale uses the standard Ethiopian university grading scale as the default mapping. Original Jimma scale had 12 grades with different points; Wutete uses the standard 9-grade scale. GPA/CGPA formula, withdrawal, and incomplete policies verified from official registrar page. Repeat course and pass/fail policies partially verified. Transfer policy needs verification.",
};

export const jimmaNonGpaGrades = ["I", "P", "W", "AU", "CR", "S", "U"] as const;

export function isNonGpaGradeJimma(grade: string): boolean {
  return jimmaNonGpaGrades.includes(grade as (typeof jimmaNonGpaGrades)[number]);
}

export function getGradePointJimma(letterGrade: string): number | null {
  return getGradePointFromStandardScale(letterGrade);
}