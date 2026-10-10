import { GradeRule } from "./types";

export type { GradeRule } from "./types";

export const standardEthiopianGradingScale: GradeRule[] = [
  { letter: "A+", points: 4.00, minimumMark: 90, maximumMark: 100 },
  { letter: "A", points: 4.00, minimumMark: 85, maximumMark: 89 },
  { letter: "A-", points: 3.75, minimumMark: 80, maximumMark: 84 },
  { letter: "B+", points: 3.50, minimumMark: 75, maximumMark: 79 },
  { letter: "B", points: 3.00, minimumMark: 70, maximumMark: 74 },
  { letter: "C+", points: 2.50, minimumMark: 65, maximumMark: 69 },
  { letter: "C", points: 2.00, minimumMark: 60, maximumMark: 64 },
  { letter: "D", points: 1.00, minimumMark: 50, maximumMark: 59 },
  { letter: "F", points: 0.00, minimumMark: 0, maximumMark: 49 },
];

export function getGradePointFromStandardScale(letterGrade: string): number | null {
  const rule = standardEthiopianGradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}

export function getGradeFromScore(score: number): string | null {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    return null;
  }
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "A-";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  if (score >= 65) return "C+";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

export function getGradePointFromScore(score: number): number | null {
  const letterGrade = getGradeFromScore(score);
  if (!letterGrade) return null;
  return getGradePointFromStandardScale(letterGrade);
}