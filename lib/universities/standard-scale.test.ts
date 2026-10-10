import { describe, it, expect } from "vitest";
import {
  standardEthiopianGradingScale,
  getGradePointFromStandardScale,
  getGradeFromScore,
  getGradePointFromScore,
} from "./standard-scale";

describe("Standard Ethiopian Grading Scale", () => {
  describe("Grading scale structure", () => {
    it("has exactly 9 grade entries", () => {
      expect(standardEthiopianGradingScale).toHaveLength(9);
    });

    it("has correct letter grades in order", () => {
      const letters = standardEthiopianGradingScale.map((g) => g.letter);
      expect(letters).toEqual(["A+", "A", "A-", "B+", "B", "C+", "C", "D", "F"]);
    });

    it("has correct grade points", () => {
      const points = standardEthiopianGradingScale.map((g) => g.points);
      expect(points).toEqual([4.00, 4.00, 3.75, 3.50, 3.00, 2.50, 2.00, 1.00, 0.00]);
    });

    it("has correct minimum marks", () => {
      const mins = standardEthiopianGradingScale.map((g) => g.minimumMark);
      expect(mins).toEqual([90, 85, 80, 75, 70, 65, 60, 50, 0]);
    });

    it("has correct maximum marks", () => {
      const maxs = standardEthiopianGradingScale.map((g) => g.maximumMark);
      expect(maxs).toEqual([100, 89, 84, 79, 74, 69, 64, 59, 49]);
    });

    it("has no duplicate letter grades", () => {
      const letters = standardEthiopianGradingScale.map((g) => g.letter);
      expect(new Set(letters).size).toBe(letters.length);
    });

    it("all grade points are finite numbers", () => {
      for (const grade of standardEthiopianGradingScale) {
        expect(Number.isFinite(grade.points)).toBe(true);
        expect(grade.points).toBeGreaterThanOrEqual(0);
      }
    });

    it("all ranges are contiguous and non-overlapping", () => {
      for (let i = 0; i < standardEthiopianGradingScale.length - 1; i++) {
        const current = standardEthiopianGradingScale[i];
        const next = standardEthiopianGradingScale[i + 1];
        expect(current.minimumMark).toBe((next.maximumMark ?? 0) + 1);
      }
    });
  });

  describe("getGradePointFromStandardScale", () => {
    it("returns correct points for each letter grade", () => {
      expect(getGradePointFromStandardScale("A+")).toBe(4.00);
      expect(getGradePointFromStandardScale("A")).toBe(4.00);
      expect(getGradePointFromStandardScale("A-")).toBe(3.75);
      expect(getGradePointFromStandardScale("B+")).toBe(3.50);
      expect(getGradePointFromStandardScale("B")).toBe(3.00);
      expect(getGradePointFromStandardScale("C+")).toBe(2.50);
      expect(getGradePointFromStandardScale("C")).toBe(2.00);
      expect(getGradePointFromStandardScale("D")).toBe(1.00);
      expect(getGradePointFromStandardScale("F")).toBe(0.00);
    });

    it("returns null for unknown grades", () => {
      expect(getGradePointFromStandardScale("X")).toBeNull();
      expect(getGradePointFromStandardScale("")).toBeNull();
      expect(getGradePointFromStandardScale("B-")).toBeNull();
      expect(getGradePointFromStandardScale("C-")).toBeNull();
      expect(getGradePointFromStandardScale("D+")).toBeNull();
      expect(getGradePointFromStandardScale("D-")).toBeNull();
      expect(getGradePointFromStandardScale("FX")).toBeNull();
    });

    it("returns null for case-sensitive mismatches", () => {
      expect(getGradePointFromStandardScale("a+")).toBeNull();
      expect(getGradePointFromStandardScale("A+ ")).toBeNull();
    });
  });

  describe("getGradeFromScore - exact boundary tests", () => {
    it("maps exact boundary values correctly", () => {
      expect(getGradeFromScore(0)).toBe("F");
      expect(getGradeFromScore(49)).toBe("F");
      expect(getGradeFromScore(49.99)).toBe("F");
      expect(getGradeFromScore(50)).toBe("D");
      expect(getGradeFromScore(59)).toBe("D");
      expect(getGradeFromScore(59.99)).toBe("D");
      expect(getGradeFromScore(60)).toBe("C");
      expect(getGradeFromScore(64)).toBe("C");
      expect(getGradeFromScore(64.99)).toBe("C");
      expect(getGradeFromScore(65)).toBe("C+");
      expect(getGradeFromScore(69)).toBe("C+");
      expect(getGradeFromScore(69.99)).toBe("C+");
      expect(getGradeFromScore(70)).toBe("B");
      expect(getGradeFromScore(74)).toBe("B");
      expect(getGradeFromScore(74.99)).toBe("B");
      expect(getGradeFromScore(75)).toBe("B+");
      expect(getGradeFromScore(79)).toBe("B+");
      expect(getGradeFromScore(79.99)).toBe("B+");
      expect(getGradeFromScore(80)).toBe("A-");
      expect(getGradeFromScore(84)).toBe("A-");
      expect(getGradeFromScore(84.99)).toBe("A-");
      expect(getGradeFromScore(85)).toBe("A");
      expect(getGradeFromScore(89)).toBe("A");
      expect(getGradeFromScore(89.99)).toBe("A");
      expect(getGradeFromScore(90)).toBe("A+");
      expect(getGradeFromScore(100)).toBe("A+");
    });

    it("returns null for invalid scores", () => {
      expect(getGradeFromScore(-1)).toBeNull();
      expect(getGradeFromScore(-0.01)).toBeNull();
      expect(getGradeFromScore(100.01)).toBeNull();
      expect(getGradeFromScore(101)).toBeNull();
      expect(getGradeFromScore(NaN)).toBeNull();
      expect(getGradeFromScore(Infinity)).toBeNull();
      expect(getGradeFromScore(-Infinity)).toBeNull();
    });
  });

  describe("getGradePointFromScore", () => {
    it("returns correct grade points for boundary scores", () => {
      expect(getGradePointFromScore(0)).toBe(0.00);
      expect(getGradePointFromScore(49)).toBe(0.00);
      expect(getGradePointFromScore(49.99)).toBe(0.00);
      expect(getGradePointFromScore(50)).toBe(1.00);
      expect(getGradePointFromScore(59)).toBe(1.00);
      expect(getGradePointFromScore(59.99)).toBe(1.00);
      expect(getGradePointFromScore(60)).toBe(2.00);
      expect(getGradePointFromScore(64)).toBe(2.00);
      expect(getGradePointFromScore(64.99)).toBe(2.00);
      expect(getGradePointFromScore(65)).toBe(2.50);
      expect(getGradePointFromScore(69)).toBe(2.50);
      expect(getGradePointFromScore(69.99)).toBe(2.50);
      expect(getGradePointFromScore(70)).toBe(3.00);
      expect(getGradePointFromScore(74)).toBe(3.00);
      expect(getGradePointFromScore(74.99)).toBe(3.00);
      expect(getGradePointFromScore(75)).toBe(3.50);
      expect(getGradePointFromScore(79)).toBe(3.50);
      expect(getGradePointFromScore(79.99)).toBe(3.50);
      expect(getGradePointFromScore(80)).toBe(3.75);
      expect(getGradePointFromScore(84)).toBe(3.75);
      expect(getGradePointFromScore(84.99)).toBe(3.75);
      expect(getGradePointFromScore(85)).toBe(4.00);
      expect(getGradePointFromScore(89)).toBe(4.00);
      expect(getGradePointFromScore(89.99)).toBe(4.00);
      expect(getGradePointFromScore(90)).toBe(4.00);
      expect(getGradePointFromScore(100)).toBe(4.00);
    });

    it("returns null for invalid scores", () => {
      expect(getGradePointFromScore(-1)).toBeNull();
      expect(getGradePointFromScore(-0.01)).toBeNull();
      expect(getGradePointFromScore(100.01)).toBeNull();
      expect(getGradePointFromScore(101)).toBeNull();
      expect(getGradePointFromScore(NaN)).toBeNull();
      expect(getGradePointFromScore(Infinity)).toBeNull();
      expect(getGradePointFromScore(-Infinity)).toBeNull();
    });
  });
});

describe("Haramaya University uses standard scale", () => {
  it("imports and uses standardEthiopianGradingScale", async () => {
    const { haramayaUniversity } = await import("./haramaya");
    expect(haramayaUniversity.gradingScale).toEqual(standardEthiopianGradingScale);
    expect(haramayaUniversity.gradingScale.length).toBe(9);
  });

  it("getGradePointHaramaya returns correct points", async () => {
    const { getGradePointHaramaya } = await import("./haramaya");
    expect(getGradePointHaramaya("A+")).toBe(4.00);
    expect(getGradePointHaramaya("A")).toBe(4.00);
    expect(getGradePointHaramaya("B+")).toBe(3.50);
    expect(getGradePointHaramaya("B")).toBe(3.00);
    expect(getGradePointHaramaya("C+")).toBe(2.50);
    expect(getGradePointHaramaya("C")).toBe(2.00);
    expect(getGradePointHaramaya("D")).toBe(1.00);
    expect(getGradePointHaramaya("F")).toBe(0.00);
    expect(getGradePointHaramaya("X")).toBeNull();
  });
});

describe("University config integration with standard scale", () => {
  it("getGradePointForUniversity works for Haramaya", async () => {
    const { getGradePointForUniversity } = await import("./index");
    expect(getGradePointForUniversity("haramaya", "A+")).toBe(4.00);
    expect(getGradePointForUniversity("haramaya", "A")).toBe(4.00);
    expect(getGradePointForUniversity("haramaya", "B")).toBe(3.00);
    expect(getGradePointForUniversity("haramaya", "C")).toBe(2.00);
    expect(getGradePointForUniversity("haramaya", "D")).toBe(1.00);
    expect(getGradePointForUniversity("haramaya", "F")).toBe(0.00);
    expect(getGradePointForUniversity("haramaya", "X")).toBeNull();
  });

  it("Haramaya has grading scale available (not empty)", async () => {
    const { getUniversityConfig } = await import("./index");
    const config = getUniversityConfig("haramaya");
    expect(config.gradingScale.length).toBeGreaterThan(0);
    expect(config.gradingScale.length).toBe(9);
  });

  it("planner getMaxGradePointFromConfig works with Haramaya", async () => {
    const { getUniversityConfig } = await import("./index");
    const { getMaxGradePointFromConfig } = await import("../calculations/planner");
    const config = getUniversityConfig("haramaya");
    const maxPoint = getMaxGradePointFromConfig(config);
    expect(maxPoint).toBe(4.00);
  });
});