import { UniversityRules } from "./types";

import { jimmaUniversity, jimmaNonGpaGrades, isNonGpaGradeJimma, getGradePointJimma } from "./jimma";
import { addisAbabaUniversity, addisAbabaNonGpaGrades, isNonGpaGradeAddisAbaba, getGradePointAddisAbaba } from "./addis-ababa";
import { bahirDarUniversity, bahirDarNonGpaGrades, isNonGpaGradeBahirDar, getGradePointBahirDar, bahirDarEngineeringScaleLegacy } from "./bahir-dar";
import { hawassaUniversity, hawassaNonGpaGrades, isNonGpaGradeHawassa, getGradePointHawassa, hawassaMedicalScale } from "./hawassa";
import { haramayaUniversity, haramayaNonGpaGrades, isNonGpaGradeHaramaya, getGradePointHaramaya, haramayaProgramRequirements } from "./haramaya";

export * from "./types";
export {
  jimmaUniversity,
  jimmaNonGpaGrades,
  isNonGpaGradeJimma,
  getGradePointJimma,
  addisAbabaUniversity,
  addisAbabaNonGpaGrades,
  isNonGpaGradeAddisAbaba,
  getGradePointAddisAbaba,
  bahirDarUniversity,
  bahirDarNonGpaGrades,
  isNonGpaGradeBahirDar,
  getGradePointBahirDar,
  bahirDarEngineeringScaleLegacy,
  hawassaUniversity,
  hawassaNonGpaGrades,
  isNonGpaGradeHawassa,
  getGradePointHawassa,
  hawassaMedicalScale,
  haramayaUniversity,
  haramayaNonGpaGrades,
  isNonGpaGradeHaramaya,
  getGradePointHaramaya,
  haramayaProgramRequirements,
};

export const supportedUniversities = [
  "jimma",
  "addis-ababa",
  "bahir-dar",
  "hawassa",
  "haramaya",
] as const;

export type SupportedUniversityId = (typeof supportedUniversities)[number];

export const universityConfigMap: Record<SupportedUniversityId, UniversityRules> = {
  jimma: jimmaUniversity,
  "addis-ababa": addisAbabaUniversity,
  "bahir-dar": bahirDarUniversity,
  hawassa: hawassaUniversity,
  haramaya: haramayaUniversity,
};

export function getUniversityConfig(id: SupportedUniversityId) {
  return universityConfigMap[id];
}

export function getAllUniversityConfigs() {
  return supportedUniversities.map((id) => universityConfigMap[id]);
}

export function isUniversitySupported(id: string): id is SupportedUniversityId {
  return supportedUniversities.includes(id as SupportedUniversityId);
}

export function getGradePointForUniversity(universityId: SupportedUniversityId, letterGrade: string): number | null {
  const config = getUniversityConfig(universityId);
  if (!config) return null;
  const rule = config.gradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}

export function isNonGpaGradeForUniversity(universityId: SupportedUniversityId, grade: string): boolean {
  switch (universityId) {
    case "jimma":
      return isNonGpaGradeJimma(grade);
    case "addis-ababa":
      return isNonGpaGradeAddisAbaba(grade);
    case "bahir-dar":
      return isNonGpaGradeBahirDar(grade);
    case "hawassa":
      return isNonGpaGradeHawassa(grade);
    case "haramaya":
      return isNonGpaGradeHaramaya(grade);
    default:
      return false;
  }
}