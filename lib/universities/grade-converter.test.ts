import { describe, it, expect } from "vitest";
import { standardEthiopianGradingScale, getGradeFromScore, getGradePointFromScore, getGradePointFromStandardScale, GradeRule } from "./standard-scale";

function formatRange(grade: GradeRule): string {
  if (grade.minimumMark === 0 && grade.maximumMark === 49) {
    return "0–49";
  }
  if (grade.maximumMark === 100) {
    return `${grade.minimumMark}–100`;
  }
  return `${grade.minimumMark}–${grade.maximumMark}`;
}

function getGradeDescription(letter: string): string {
  switch (letter) {
    case "A+": return "Outstanding";
    case "A": return "Excellent";
    case "A-": return "Excellent";
    case "B+": return "Very Good";
    case "B": return "Good";
    case "C+": return "Satisfactory";
    case "C": return "Fair";
    case "D": return "Unsatisfactory";
    case "F": return "Fail";
    default: return "";
  }
}

describe("Grade Converter Logic", () => {
  describe("formatRange utility", () => {
    it("formats A+ range correctly", () => {
      const aPlus = standardEthiopianGradingScale.find(g => g.letter === "A+");
      expect(formatRange(aPlus!)).toBe("90–100");
    });

    it("formats A range correctly", () => {
      const a = standardEthiopianGradingScale.find(g => g.letter === "A");
      expect(formatRange(a!)).toBe("85–89");
    });

    it("formats F range correctly", () => {
      const f = standardEthiopianGradingScale.find(g => g.letter === "F");
      expect(formatRange(f!)).toBe("0–49");
    });

    it("formats middle ranges correctly", () => {
      const b = standardEthiopianGradingScale.find(g => g.letter === "B");
      expect(formatRange(b!)).toBe("70–74");
    });
  });

  describe("getGradeDescription utility", () => {
    it("returns correct descriptions for all grades", () => {
      expect(getGradeDescription("A+")).toBe("Outstanding");
      expect(getGradeDescription("A")).toBe("Excellent");
      expect(getGradeDescription("A-")).toBe("Excellent");
      expect(getGradeDescription("B+")).toBe("Very Good");
      expect(getGradeDescription("B")).toBe("Good");
      expect(getGradeDescription("C+")).toBe("Satisfactory");
      expect(getGradeDescription("C")).toBe("Fair");
      expect(getGradeDescription("D")).toBe("Unsatisfactory");
      expect(getGradeDescription("F")).toBe("Fail");
      expect(getGradeDescription("X")).toBe("");
    });
  });

  describe("Standard grading scale integration", () => {
    it("getGradeFromScore matches grade-converter logic for all boundaries", () => {
      expect(getGradeFromScore(90)).toBe("A+");
      expect(getGradeFromScore(85)).toBe("A");
      expect(getGradeFromScore(80)).toBe("A-");
      expect(getGradeFromScore(75)).toBe("B+");
      expect(getGradeFromScore(70)).toBe("B");
      expect(getGradeFromScore(65)).toBe("C+");
      expect(getGradeFromScore(60)).toBe("C");
      expect(getGradeFromScore(50)).toBe("D");
      expect(getGradeFromScore(49)).toBe("F");
      expect(getGradeFromScore(0)).toBe("F");
    });

    it("getGradePointFromScore returns correct points for all grades", () => {
      expect(getGradePointFromScore(95)).toBe(4.00);
      expect(getGradePointFromScore(87)).toBe(4.00);
      expect(getGradePointFromScore(82)).toBe(3.75);
      expect(getGradePointFromScore(77)).toBe(3.50);
      expect(getGradePointFromScore(72)).toBe(3.00);
      expect(getGradePointFromScore(67)).toBe(2.50);
      expect(getGradePointFromScore(62)).toBe(2.00);
      expect(getGradePointFromScore(55)).toBe(1.00);
      expect(getGradePointFromScore(40)).toBe(0.00);
    });

    it("getGradePointFromStandardScale works for all letter grades", () => {
      expect(getGradePointFromStandardScale("A+")).toBe(4.00);
      expect(getGradePointFromStandardScale("A")).toBe(4.00);
      expect(getGradePointFromStandardScale("A-")).toBe(3.75);
      expect(getGradePointFromStandardScale("B+")).toBe(3.50);
      expect(getGradePointFromStandardScale("B")).toBe(3.00);
      expect(getGradePointFromStandardScale("C+")).toBe(2.50);
      expect(getGradePointFromStandardScale("C")).toBe(2.00);
      expect(getGradePointFromStandardScale("D")).toBe(1.00);
      expect(getGradePointFromStandardScale("F")).toBe(0.00);
      expect(getGradePointFromStandardScale("X")).toBeNull();
    });

    it("invalid scores return null", () => {
      expect(getGradeFromScore(-1)).toBeNull();
      expect(getGradeFromScore(101)).toBeNull();
      expect(getGradeFromScore(NaN)).toBeNull();
      expect(getGradeFromScore(Infinity)).toBeNull();
      expect(getGradePointFromScore(-1)).toBeNull();
      expect(getGradePointFromScore(101)).toBeNull();
    });

    it("decimal boundary values work correctly", () => {
      expect(getGradeFromScore(89.99)).toBe("A");
      expect(getGradeFromScore(84.99)).toBe("A-");
      expect(getGradeFromScore(79.99)).toBe("B+");
      expect(getGradeFromScore(74.99)).toBe("B");
      expect(getGradeFromScore(74.99)).toBe("B");
      expect(getGradeFromScore(69.99)).toBe("C+");
      expect(getGradeFromScore(64.99)).toBe("C");
      expect(getGradeFromScore(59.99)).toBe("D");
      expect(getGradeFromScore(49.99)).toBe("F");
    });
  });

  describe("formatRange utility", () => {
    it("formats A+ range correctly", () => {
      const aPlus = standardEthiopianGradingScale.find(g => g.letter === "A+");
      expect(formatRange(aPlus!)).toBe("90–100");
    });

    it("formats A range correctly", () => {
      const a = standardEthiopianGradingScale.find(g => g.letter === "A");
      expect(formatRange(a!)).toBe("85–89");
    });

    it("formats F range correctly", () => {
      const f = standardEthiopianGradingScale.find(g => g.letter === "F");
      expect(formatRange(f!)).toBe("0–49");
    });

    it("formats middle ranges correctly", () => {
      const b = standardEthiopianGradingScale.find(g => g.letter === "B");
      expect(formatRange(b!)).toBe("70–74");
    });
  });

  describe("Grade Scale Reference content verification", () => {
    it("standard scale has all 9 grades in correct order", () => {
      const letters = standardEthiopianGradingScale.map(g => g.letter);
      expect(letters).toEqual(["A+", "A", "A-", "B+", "B", "C+", "C", "D", "F"]);
    });

    it("grade points match expected values", () => {
      const points = standardEthiopianGradingScale.map(g => g.points);
      expect(points).toEqual([4.00, 4.00, 3.75, 3.50, 3.00, 2.50, 2.00, 1.00, 0.00]);
    });

    it("all ranges are contiguous", () => {
      for (let i = 0; i < standardEthiopianGradingScale.length - 1; i++) {
        const current = standardEthiopianGradingScale[i];
        const next = standardEthiopianGradingScale[i + 1];
        expect(current.minimumMark).toBe((next.maximumMark ?? 0) + 1);
      }
    });

    it("minimum marks are correct", () => {
      const mins = standardEthiopianGradingScale.map(g => g.minimumMark);
      expect(mins).toEqual([90, 85, 80, 75, 70, 65, 60, 50, 0]);
    });

    it("maximum marks are correct", () => {
      const maxs = standardEthiopianGradingScale.map(g => g.maximumMark);
      expect(maxs).toEqual([100, 89, 84, 79, 74, 69, 64, 59, 49]);
    });
  });

  describe("Boundary convention verification", () => {
    const testCases = [
      { score: 90, expectedGrade: "A+" },
      { score: 85, expectedGrade: "A" },
      { score: 84.99, expectedGrade: "A-" },
      { score: 80, expectedGrade: "A-" },
      { score: 79.99, expectedGrade: "B+" },
      { score: 75, expectedGrade: "B+" },
      { score: 70, expectedGrade: "B" },
      { score: 69.99, expectedGrade: "C+" },
      { score: 65, expectedGrade: "C+" },
      { score: 60, expectedGrade: "C" },
      { score: 59.99, expectedGrade: "D" },
      { score: 50, expectedGrade: "D" },
      { score: 49.99, expectedGrade: "F" },
      { score: 0, expectedGrade: "F" },
      { score: 100, expectedGrade: "A+" },
    ];

    testCases.forEach(({ score, expectedGrade }) => {
      it(`maps ${score} to ${expectedGrade}`, () => {
        expect(getGradeFromScore(score)).toBe(expectedGrade);
      });
    });

    it("returns correct grade points for boundary scores", () => {
      expect(getGradePointFromScore(90)).toBe(4.00);
      expect(getGradePointFromScore(85)).toBe(4.00);
      expect(getGradePointFromScore(80)).toBe(3.75);
      expect(getGradePointFromScore(75)).toBe(3.50);
      expect(getGradePointFromScore(70)).toBe(3.00);
      expect(getGradePointFromScore(65)).toBe(2.50);
      expect(getGradePointFromScore(60)).toBe(2.00);
      expect(getGradePointFromScore(50)).toBe(1.00);
      expect(getGradePointFromScore(49)).toBe(0.00);
      expect(getGradePointFromScore(0)).toBe(0.00);
    });
  });

  describe("Invalid input handling", () => {
    it("returns null for negative scores", () => {
      expect(getGradeFromScore(-1)).toBeNull();
      expect(getGradeFromScore(-0.01)).toBeNull();
      expect(getGradePointFromScore(-1)).toBeNull();
    });

    it("returns null for scores above 100", () => {
      expect(getGradeFromScore(100.01)).toBeNull();
      expect(getGradeFromScore(101)).toBeNull();
      expect(getGradePointFromScore(100.01)).toBeNull();
    });

    it("returns null for NaN", () => {
      expect(getGradeFromScore(NaN)).toBeNull();
      expect(getGradePointFromScore(NaN)).toBeNull();
    });

    it("returns null for Infinity", () => {
      expect(getGradeFromScore(Infinity)).toBeNull();
      expect(getGradeFromScore(-Infinity)).toBeNull();
      expect(getGradePointFromScore(Infinity)).toBeNull();
    });

    it("getGradePointFromStandardScale returns null for unknown grades", () => {
      expect(getGradePointFromStandardScale("X")).toBeNull();
      expect(getGradePointFromStandardScale("")).toBeNull();
      expect(getGradePointFromStandardScale("B-")).toBeNull();
      expect(getGradePointFromStandardScale("C-")).toBeNull();
      expect(getGradePointFromStandardScale("D+")).toBeNull();
    });
  });
});