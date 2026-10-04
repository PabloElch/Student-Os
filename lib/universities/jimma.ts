import { UniversityRules } from "./types";

export const jimmaUniversity: UniversityRules = {
  id: "jimma",
  name: "Jimma University",
  gradingScale: [
    { letter: "A", points: 4.00, minimumMark: 90, maximumMark: 100 },
    { letter: "A-", points: 3.67, minimumMark: 85, maximumMark: 89 },
    { letter: "B+", points: 3.33, minimumMark: 80, maximumMark: 84 },
    { letter: "B", points: 3.00, minimumMark: 75, maximumMark: 79 },
    { letter: "B-", points: 2.67, minimumMark: 70, maximumMark: 74 },
    { letter: "C+", points: 2.33, minimumMark: 65, maximumMark: 69 },
    { letter: "C", points: 2.00, minimumMark: 60, maximumMark: 64 },
    { letter: "C-", points: 1.67, minimumMark: 55, maximumMark: 59 },
    { letter: "D+", points: 1.33, minimumMark: 50, maximumMark: 54 },
    { letter: "D", points: 1.00, minimumMark: 45, maximumMark: 49 },
    { letter: "D-", points: 0.67, minimumMark: 40, maximumMark: 44 },
    { letter: "F", points: 0.00, minimumMark: 0, maximumMark: 39 },
  ],
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
    "Grading scale, GPA/CGPA formula, withdrawal, and incomplete policies verified from official registrar page. Repeat course and pass/fail policies partially verified. Transfer policy needs verification.",
};

export const jimmaNonGpaGrades = ["I", "P", "W", "AU", "CR", "S", "U"] as const;

export function isNonGpaGradeJimma(grade: string): boolean {
  return jimmaNonGpaGrades.includes(grade as (typeof jimmaNonGpaGrades)[number]);
}

export function getGradePointJimma(letterGrade: string): number | null {
  const rule = jimmaUniversity.gradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}