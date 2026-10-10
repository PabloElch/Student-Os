import { describe, it, expect } from "vitest";
import {
  supportedUniversities,
  getUniversityConfig,
  getAllUniversityConfigs,
  isUniversitySupported,
  getGradePointForUniversity,
  isNonGpaGradeForUniversity,
  jimmaUniversity,
  addisAbabaUniversity,
  bahirDarUniversity,
  hawassaUniversity,
  haramayaUniversity,
  bahirDarEngineeringScaleLegacy,
  hawassaMedicalScale,
  haramayaProgramRequirements,
} from "../lib/universities";

describe("University Rules Layer", () => {
  describe("Supported universities list", () => {
    it("contains exactly five universities", () => {
      expect(supportedUniversities).toHaveLength(5);
    });

    it("includes all required universities", () => {
      expect(supportedUniversities).toContain("jimma");
      expect(supportedUniversities).toContain("addis-ababa");
      expect(supportedUniversities).toContain("bahir-dar");
      expect(supportedUniversities).toContain("hawassa");
      expect(supportedUniversities).toContain("haramaya");
    });

    it("has unique IDs", () => {
      const uniqueIds = new Set(supportedUniversities);
      expect(uniqueIds.size).toBe(supportedUniversities.length);
    });
  });

  describe("getUniversityConfig", () => {
    it("returns configuration for each supported university", () => {
      for (const id of supportedUniversities) {
        const config = getUniversityConfig(id);
        expect(config).toBeDefined();
        expect(config.id).toBe(id);
        expect(config.name).toBeTruthy();
      }
    });

    it("returns undefined for unsupported university", () => {
      expect(getUniversityConfig("unknown" as unknown as import("../lib/universities").SupportedUniversityId)).toBeUndefined();
    });
  });

  describe("getAllUniversityConfigs", () => {
    it("returns all five configurations", () => {
      const configs = getAllUniversityConfigs();
      expect(configs).toHaveLength(5);
    });

    it("each config has required properties", () => {
      const configs = getAllUniversityConfigs();
      for (const config of configs) {
        expect(config.id).toBeTruthy();
        expect(config.name).toBeTruthy();
        expect(Array.isArray(config.gradingScale)).toBe(true);
        expect(config.creditSystem).toBeDefined();
        expect(config.creditSystem.unit).toBeTruthy();
        expect(config.calculationPolicy).toBeDefined();
        expect(config.source).toBeDefined();
        expect(config.source.title).toBeTruthy();
        expect(config.source.url).toBeTruthy();
        expect(config.source.documentType).toBeTruthy();
        expect(config.source.dateAccessed).toBeTruthy();
        expect(["verified", "partially-verified", "needs-verification"]).toContain(config.status);
      }
    });
  });

  describe("isUniversitySupported", () => {
    it("returns true for supported universities", () => {
      for (const id of supportedUniversities) {
        expect(isUniversitySupported(id)).toBe(true);
      }
    });

    it("returns false for unsupported universities", () => {
      expect(isUniversitySupported("unknown")).toBe(false);
      expect(isUniversitySupported("")).toBe(false);
      expect(isUniversitySupported("aa")).toBe(false);
    });
  });

  describe("Jimma University (partially-verified)", () => {
    it("uses standard Ethiopian grading scale", () => {
      expect(jimmaUniversity.gradingScale).toHaveLength(9);
      expect(jimmaUniversity.status).toBe("partially-verified");
    });

    it("has correct grade points from standard scale", () => {
      const a = jimmaUniversity.gradingScale.find((g) => g.letter === "A");
      expect(a?.points).toBe(4.00);
      const bPlus = jimmaUniversity.gradingScale.find((g) => g.letter === "B+");
      expect(bPlus?.points).toBe(3.50);
      const f = jimmaUniversity.gradingScale.find((g) => g.letter === "F");
      expect(f?.points).toBe(0.00);
    });

    it("non-GPA grades are correctly identified", () => {
      expect(isNonGpaGradeForUniversity("jimma", "W")).toBe(true);
      expect(isNonGpaGradeForUniversity("jimma", "I")).toBe(true);
      expect(isNonGpaGradeForUniversity("jimma", "P")).toBe(true);
      expect(isNonGpaGradeForUniversity("jimma", "A")).toBe(false);
      expect(isNonGpaGradeForUniversity("jimma", "B+")).toBe(false);
    });

    it("getGradePointForUniversity returns correct points from standard scale", () => {
      expect(getGradePointForUniversity("jimma", "A")).toBe(4.00);
      expect(getGradePointForUniversity("jimma", "A+")).toBe(4.00);
      expect(getGradePointForUniversity("jimma", "B+")).toBe(3.50);
      expect(getGradePointForUniversity("jimma", "B")).toBe(3.00);
      expect(getGradePointForUniversity("jimma", "F")).toBe(0.00);
      expect(getGradePointForUniversity("jimma", "X")).toBeNull();
      expect(getGradePointForUniversity("jimma", "B-")).toBeNull();
      expect(getGradePointForUniversity("jimma", "C-")).toBeNull();
    });

    it("source is traceable", () => {
      expect(jimmaUniversity.source.title).toContain("Jimma University Grading Information");
      expect(jimmaUniversity.source.url).toContain("ju.edu");
      expect(jimmaUniversity.source.documentType).toBe("registrar-document");
    });

    it("notes mention standard grading scale as default", () => {
      expect(jimmaUniversity.notes?.toLowerCase()).toContain("standard ethiopian");
    });
  });

  describe("Addis Ababa University (needs-verification)", () => {
    it("uses standard Ethiopian grading scale", () => {
      expect(addisAbabaUniversity.status).toBe("needs-verification");
      expect(addisAbabaUniversity.gradingScale).toHaveLength(9);
    });

    it("has correct grade points from standard scale", () => {
      const aPlus = addisAbabaUniversity.gradingScale.find((g) => g.letter === "A+");
      expect(aPlus?.points).toBe(4.00);
      const aMinus = addisAbabaUniversity.gradingScale.find((g) => g.letter === "A-");
      expect(aMinus?.points).toBe(3.75);
    });

    it("non-GPA grades include W, DO, NG, I, P", () => {
      expect(isNonGpaGradeForUniversity("addis-ababa", "W")).toBe(true);
      expect(isNonGpaGradeForUniversity("addis-ababa", "DO")).toBe(true);
      expect(isNonGpaGradeForUniversity("addis-ababa", "NG")).toBe(true);
      expect(isNonGpaGradeForUniversity("addis-ababa", "I")).toBe(true);
      expect(isNonGpaGradeForUniversity("addis-ababa", "P")).toBe(true);
      expect(isNonGpaGradeForUniversity("addis-ababa", "A")).toBe(false);
    });

    it("policies explicitly note verification gaps", () => {
      expect(addisAbabaUniversity.calculationPolicy.repeatCoursePolicy).toContain("needs verification");
      expect(addisAbabaUniversity.calculationPolicy.transferPolicy).toContain("needs verification");
    });

    it("credit system uses ECTS", () => {
      expect(addisAbabaUniversity.creditSystem.unit).toBe("ECTS");
    });

    it("notes mention standard grading scale as default", () => {
      expect(addisAbabaUniversity.notes?.toLowerCase()).toContain("standard ethiopian");
    });
  });

  describe("Bahir Dar University (partially-verified)", () => {
    it("uses standard Ethiopian grading scale", () => {
      expect(bahirDarUniversity.status).toBe("partially-verified");
      expect(bahirDarUniversity.gradingScale).toHaveLength(9);
    });

    it("has correct grade points from standard scale", () => {
      const aPlus = bahirDarUniversity.gradingScale.find((g) => g.letter === "A+");
      expect(aPlus?.points).toBe(4.00);
      const a = bahirDarUniversity.gradingScale.find((g) => g.letter === "A");
      expect(a?.points).toBe(4.00);
      const bPlus = bahirDarUniversity.gradingScale.find((g) => g.letter === "B+");
      expect(bPlus?.points).toBe(3.50);
    });

    it("legacy Engineering scale is documented separately", () => {
      expect(Array.isArray(bahirDarEngineeringScaleLegacy)).toBe(true);
      expect(bahirDarEngineeringScaleLegacy.length).toBeGreaterThan(0);
      // Legacy scale uses inverse (lower = better)
      const aPlusLegacy = bahirDarEngineeringScaleLegacy.find((g) => g.letter === "A+");
      expect(aPlusLegacy?.points).toBe(1.0);
    });

    it("non-GPA grades include P, F, I, W, NG", () => {
      expect(isNonGpaGradeForUniversity("bahir-dar", "P")).toBe(true);
      expect(isNonGpaGradeForUniversity("bahir-dar", "F")).toBe(true);
      expect(isNonGpaGradeForUniversity("bahir-dar", "I")).toBe(true);
      expect(isNonGpaGradeForUniversity("bahir-dar", "W")).toBe(true);
    });

    it("notes mention standard grading scale as default", () => {
      expect(bahirDarUniversity.notes?.toLowerCase()).toContain("standard ethiopian");
    });
  });

  describe("Hawassa University (verified)", () => {
    it("has fully verified status", () => {
      expect(hawassaUniversity.status).toBe("verified");
    });

    it("uses standard Ethiopian grading scale", () => {
      expect(hawassaUniversity.gradingScale).toHaveLength(9);
    });

    it("A+ and A both have 4.00 points", () => {
      const aPlus = hawassaUniversity.gradingScale.find((g) => g.letter === "A+");
      const a = hawassaUniversity.gradingScale.find((g) => g.letter === "A");
      expect(aPlus?.points).toBe(4.00);
      expect(a?.points).toBe(4.00);
    });

    it("non-GPA grades correctly identified", () => {
      expect(isNonGpaGradeForUniversity("hawassa", "W")).toBe(true);
      expect(isNonGpaGradeForUniversity("hawassa", "DO")).toBe(true);
      expect(isNonGpaGradeForUniversity("hawassa", "NG")).toBe(true);
      expect(isNonGpaGradeForUniversity("hawassa", "P")).toBe(true);
      expect(isNonGpaGradeForUniversity("hawassa", "A+")).toBe(false);
    });

    it("medical scale documented separately", () => {
      expect(Array.isArray(hawassaMedicalScale)).toBe(true);
      expect(hawassaMedicalScale.length).toBeGreaterThan(0);
    });

    it("source is official registrar page", () => {
      expect(hawassaUniversity.source.url).toContain("hu.edu.et");
      expect(hawassaUniversity.source.documentType).toBe("registrar-document");
    });
  });

  describe("Haramaya University (needs-verification)", () => {
    it("has needs-verification status", () => {
      expect(haramayaUniversity.status).toBe("needs-verification");
    });

    it("uses standard Ethiopian grading scale", () => {
      expect(haramayaUniversity.gradingScale.length).toBe(9);
      const aPlus = haramayaUniversity.gradingScale.find((g) => g.letter === "A+");
      expect(aPlus?.points).toBe(4.00);
      expect(aPlus?.minimumMark).toBe(90);
      expect(aPlus?.maximumMark).toBe(100);
      const d = haramayaUniversity.gradingScale.find((g) => g.letter === "D");
      expect(d?.points).toBe(1.00);
      expect(d?.minimumMark).toBe(50);
      expect(d?.maximumMark).toBe(59);
      const f = haramayaUniversity.gradingScale.find((g) => g.letter === "F");
      expect(f?.points).toBe(0.00);
      expect(f?.minimumMark).toBe(0);
      expect(f?.maximumMark).toBe(49);
    });

    it("getGradePointForUniversity returns correct points from standard scale", () => {
      expect(getGradePointForUniversity("haramaya", "A+")).toBe(4.00);
      expect(getGradePointForUniversity("haramaya", "A")).toBe(4.00);
      expect(getGradePointForUniversity("haramaya", "A-")).toBe(3.75);
      expect(getGradePointForUniversity("haramaya", "B+")).toBe(3.50);
      expect(getGradePointForUniversity("haramaya", "B")).toBe(3.00);
      expect(getGradePointForUniversity("haramaya", "C+")).toBe(2.50);
      expect(getGradePointForUniversity("haramaya", "C")).toBe(2.00);
      expect(getGradePointForUniversity("haramaya", "D")).toBe(1.00);
      expect(getGradePointForUniversity("haramaya", "F")).toBe(0.00);
    });

    it("getGradePointForUniversity returns null for unknown grades", () => {
      expect(getGradePointForUniversity("haramaya", "X")).toBeNull();
      expect(getGradePointForUniversity("haramaya", "B-")).toBeNull();
      expect(getGradePointForUniversity("haramaya", "C-")).toBeNull();
    });

    it("isNonGpaGradeForUniversity returns false for all grades", () => {
      expect(isNonGpaGradeForUniversity("haramaya", "W")).toBe(false);
      expect(isNonGpaGradeForUniversity("haramaya", "I")).toBe(false);
      expect(isNonGpaGradeForUniversity("haramaya", "A")).toBe(false);
    });

    it("credit system is ECTS-based and verified", () => {
      expect(haramayaUniversity.creditSystem.unit).toBe("ECTS");
    });

    it("transfer policy partially verified (grades used in CGPA)", () => {
      expect(haramayaUniversity.calculationPolicy.transferPolicy).toContain("Partially verified");
    });

    it("program requirements documented", () => {
      expect(haramayaProgramRequirements.bedIT).toBeDefined();
      expect(haramayaProgramRequirements.bedIT.totalECTS).toBe(242);
      expect(haramayaProgramRequirements.baHistory.totalCreditHours).toBe(142);
    });

    it("notes mention standard grading scale as default", () => {
      expect(haramayaUniversity.notes?.toLowerCase()).toContain("standard ethiopian");
    });
  });

  describe("Generic calculation engine independence", () => {
    it("university configurations do not import calculation engine", async () => {
      // The university configs should be pure data/policy
      // They should not import from ../calculations
      const fs = await import("fs");
      const path = await import("path");
      const jimmaCode = fs.readFileSync(
        path.join(__dirname, "../lib/universities/jimma.ts"),
        "utf-8"
      );
      expect(jimmaCode).not.toContain("../calculations");
      expect(jimmaCode).not.toContain("calculateSemesterGPA");
      expect(jimmaCode).not.toContain("calculateCGPA");
    });

    it("grade point lookup functions work independently", () => {
      // These functions should work without the calculation engine
      const jimmaA = getGradePointForUniversity("jimma", "A");
      const hawassaA = getGradePointForUniversity("hawassa", "A");
      // Different universities can have different points for same letter
      expect(typeof jimmaA).toBe("number");
      expect(typeof hawassaA).toBe("number");
    });
  });

  describe("Verification status integrity", () => {
    it("no university claims verified status without verified grading scale", () => {
      for (const id of supportedUniversities) {
        const config = getUniversityConfig(id);
        if (config.status === "verified") {
          expect(config.gradingScale.length).toBeGreaterThan(0);
        }
      }
    });

    it("needs-verification universities use standard scale as default", () => {
      const haramaya = getUniversityConfig("haramaya");
      expect(haramaya.status).toBe("needs-verification");
      expect(haramaya.gradingScale.length).toBeGreaterThan(0);
    });

    it("partially-verified universities have some verified rules documented", () => {
      const jimma = getUniversityConfig("jimma");
      expect(jimma.status).toBe("partially-verified");
      expect(jimma.gradingScale.length).toBeGreaterThan(0);
      expect(jimma.notes?.toLowerCase()).toContain("verified");
    });

    it("all configurations have source references", () => {
      for (const id of supportedUniversities) {
        const config = getUniversityConfig(id);
        expect(config.source.title).toBeTruthy();
        expect(config.source.url).toBeTruthy();
        expect(config.source.documentType).toBeTruthy();
        expect(config.source.dateAccessed).toBeTruthy();
      }
    });
  });

  describe("Grade point validity", () => {
    it("all grade points are finite numbers", () => {
      for (const id of supportedUniversities) {
        const config = getUniversityConfig(id);
        for (const grade of config.gradingScale) {
          expect(Number.isFinite(grade.points)).toBe(true);
          expect(grade.points).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it("no duplicate letter grades in any university scale", () => {
      for (const id of supportedUniversities) {
        const config = getUniversityConfig(id);
        const letters = config.gradingScale.map((g) => g.letter);
        const uniqueLetters = new Set(letters);
        expect(uniqueLetters.size).toBe(letters.length);
      }
    });
  });
});