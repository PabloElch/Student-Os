import { UniversityRules } from "./types";

import { jimmaUniversity, jimmaNonGpaGrades, isNonGpaGradeJimma, getGradePointJimma } from "./jimma";
import { addisAbabaUniversity, addisAbabaNonGpaGrades, isNonGpaGradeAddisAbaba, getGradePointAddisAbaba } from "./addis-ababa";
import { bahirDarUniversity, bahirDarNonGpaGrades, isNonGpaGradeBahirDar, getGradePointBahirDar, bahirDarEngineeringScaleLegacy } from "./bahir-dar";
import { hawassaUniversity, hawassaNonGpaGrades, isNonGpaGradeHawassa, getGradePointHawassa, hawassaMedicalScale } from "./hawassa";
import { haramayaUniversity, haramayaNonGpaGrades, isNonGpaGradeHaramaya, getGradePointHaramaya, haramayaProgramRequirements } from "./haramaya";

import { ethiopianUniversities, getUniversityById } from "./directory";
import { standardEthiopianGradingScale } from "./standard-scale";

export * from "./types";
export * from "./standard-scale";
export * from "./directory";
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

export const configuredUniversityIds = [
  "jimma",
  "addis-ababa",
  "bahir-dar",
  "hawassa",
  "haramaya",
] as const;

export type ConfiguredUniversityId = (typeof configuredUniversityIds)[number];

export const supportedUniversities = [
  "adama-st",
  "addis-ababa",
  "addis-ababa-st",
  "adigrat",
  "ambo",
  "arbaminch",
  "arsi",
  "assosa",
  "axum",
  "bahir-dar",
  "bonga",
  "bule-hora",
  "civil-service",
  "debark",
  "debre-berhan",
  "debre-markos",
  "debre-tabor",
  "dilla",
  "dire-dawa",
  "gambella",
  "gondar",
  "haramaya",
  "hawassa",
  "injibara",
  "jigjiga",
  "jimma",
  "jinka",
  "kebri-dehar",
  "kotebe",
  "madda-walabu",
  "megdela-amba",
  "mekelle",
  "metu",
  "mizan-tepi",
  "oda-bultum",
  "oromia-state",
  "raya",
  "samara",
  "selale",
  "semera",
  "wachemo",
  "werabe",
  "wolaita-sodo",
  "woldiya",
  "wolkite",
  "wollega",
  "wollo",
] as const;

export type SupportedUniversityId = (typeof supportedUniversities)[number];

export function isConfiguredUniversity(id: string): id is ConfiguredUniversityId {
  return configuredUniversityIds.includes(id as ConfiguredUniversityId);
}

export function getUniversityConfig(id: SupportedUniversityId): UniversityRules {
  if (!isConfiguredUniversity(id)) {
    // Return a fallback config using the standard Ethiopian grading scale
    return {
      id,
      name: getUniversityById(id)?.name ?? id,
      gradingScale: standardEthiopianGradingScale,
      creditSystem: { unit: "credit hour" },
      calculationPolicy: {
        repeatCoursePolicy: "Uses standard Ethiopian university policies. Individual university policies need verification.",
        passFailPolicy: "Uses standard Ethiopian university policies. Individual university policies need verification.",
        withdrawalPolicy: "Uses standard Ethiopian university policies. Individual university policies need verification.",
        incompletePolicy: "Uses standard Ethiopian university policies. Individual university policies need verification.",
        transferPolicy: "Uses standard Ethiopian university policies. Individual university policies need verification.",
      },
      source: {
        title: "Standard Ethiopian University Grading Scale",
        url: "",
        documentType: "other",
        dateAccessed: new Date().toISOString().split("T")[0],
      },
      status: "needs-verification",
      notes: "Uses the standard Ethiopian university grading scale as the default mapping. Individual university grading policy needs verification.",
    };
  }
  switch (id) {
    case "jimma":
      return jimmaUniversity;
    case "addis-ababa":
      return addisAbabaUniversity;
    case "bahir-dar":
      return bahirDarUniversity;
    case "hawassa":
      return hawassaUniversity;
    case "haramaya":
      return haramayaUniversity;
    default:
      // This should not happen if isConfiguredUniversity check passes
      return {
        id,
        name: getUniversityById(id)?.name ?? id,
        gradingScale: standardEthiopianGradingScale,
        creditSystem: { unit: "credit hour" },
        calculationPolicy: {
          repeatCoursePolicy: "Uses standard Ethiopian university policies.",
          passFailPolicy: "Uses standard Ethiopian university policies.",
          withdrawalPolicy: "Uses standard Ethiopian university policies.",
          incompletePolicy: "Uses standard Ethiopian university policies.",
          transferPolicy: "Uses standard Ethiopian university policies.",
        },
        source: {
          title: "Standard Ethiopian University Grading Scale",
          url: "",
          documentType: "other",
          dateAccessed: new Date().toISOString().split("T")[0],
        },
        status: "needs-verification",
      };
  }
}

export const universityConfigMap: Record<ConfiguredUniversityId, UniversityRules> = {
  jimma: jimmaUniversity,
  "addis-ababa": addisAbabaUniversity,
  "bahir-dar": bahirDarUniversity,
  hawassa: hawassaUniversity,
  haramaya: haramayaUniversity,
};

export function getAllUniversityConfigs() {
  return ethiopianUniversities.map((u) => ({
    id: u.id,
    name: u.name,
    hasIndividualConfig: isConfiguredUniversity(u.id),
  }));
}

export function isUniversitySupported(id: string): id is SupportedUniversityId {
  return supportedUniversities.includes(id as SupportedUniversityId);
}

export function getGradePointForUniversity(universityId: SupportedUniversityId, letterGrade: string): number | null {
  const config = getUniversityConfig(universityId);
  const rule = config.gradingScale.find((g) => g.letter === letterGrade);
  return rule ? rule.points : null;
}

export function isNonGpaGradeForUniversity(universityId: SupportedUniversityId, grade: string): boolean {
  if (!isConfiguredUniversity(universityId)) {
    return false;
  }
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