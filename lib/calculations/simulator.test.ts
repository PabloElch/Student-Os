import { describe, it, expect } from "vitest";
import {
  calculateBaselineGPA,
  calculateHypotheticalGPA,
  calculateGPAComparison,
  calculateProjectedCGPA,
  calculateQualityPointsAndCredits,
  calculateSimulatorResults,
} from "./simulator";
import { standardEthiopianGradingScale, getGradePointFromStandardScale, getGradeFromScore, getGradePointFromScore } from "../universities/standard-scale";
import { calculateSemesterGPA } from "./gpa";
import { calculateCGPAFromSummary } from "./cgpa";
import { CourseGrade } from "./gpa";

describe("Simulator Calculation Functions", () => {
  describe("calculateBaselineGPA", () => {
    it("returns null for empty array", () => {
      expect(calculateBaselineGPA([])).toBeNull();
    });

    it("returns correct GPA for single course", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
      ];
      expect(calculateBaselineGPA(courses)).toBe(4.0);
    });

    it("returns correct weighted GPA for multiple courses", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
        { credits: 2, gradePoint: 3.5 },
      ];
      expect(calculateBaselineGPA(courses)).toBeCloseTo(3.5, 5);
    });

    it("returns correct weighted GPA with different credit weights", () => {
      const courses: CourseGrade[] = [
        { credits: 4, gradePoint: 4.0 },
        { credits: 1, gradePoint: 2.0 },
      ];
      expect(calculateBaselineGPA(courses)).toBeCloseTo(3.6, 5);
    });

    it("throws for zero credits", () => {
      const courses: CourseGrade[] = [
        { credits: 0, gradePoint: 4.0 },
      ];
      expect(() => calculateBaselineGPA(courses)).toThrow("Course credits must be greater than zero.");
    });

    it("throws for negative credits", () => {
      const courses: CourseGrade[] = [
        { credits: -3, gradePoint: 4.0 },
      ];
      expect(() => calculateBaselineGPA(courses)).toThrow("Course credits must be greater than zero.");
    });

    it("throws for negative grade point", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: -1.0 },
      ];
      expect(() => calculateBaselineGPA(courses)).toThrow("Grade point must be non-negative.");
    });

    it("throws for NaN credits", () => {
      const courses: CourseGrade[] = [
        { credits: NaN, gradePoint: 4.0 },
      ];
      expect(() => calculateBaselineGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws for NaN grade point", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: NaN },
      ];
      expect(() => calculateBaselineGPA(courses)).toThrow("Grade point must be a finite number.");
    });

    it("throws for Infinity credits", () => {
      const courses: CourseGrade[] = [
        { credits: Infinity, gradePoint: 4.0 },
      ];
      expect(() => calculateBaselineGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws for Infinity grade point", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: Infinity },
      ];
      expect(() => calculateBaselineGPA(courses)).toThrow("Grade point must be a finite number.");
    });
  });

  describe("calculateHypotheticalGPA", () => {
    it("returns null for empty array", () => {
      expect(calculateHypotheticalGPA([])).toBeNull();
    });

    it("returns correct GPA for single course", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 3.75 },
      ];
      expect(calculateHypotheticalGPA(courses)).toBe(3.75);
    });

    it("returns correct weighted GPA for multiple courses", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.5 },
      ];
      expect(calculateHypotheticalGPA(courses)).toBeCloseTo(3.75, 5);
    });
  });

  describe("calculateGPAComparison", () => {
    it("returns incomplete for null baseline", () => {
      expect(calculateGPAComparison(null, 3.5)).toEqual({
        difference: null,
        status: "incomplete",
      });
    });

    it("returns incomplete for null hypothetical", () => {
      expect(calculateGPAComparison(3.5, null)).toEqual({
        difference: null,
        status: "incomplete",
      });
    });

    it("returns unchanged for equal GPAs", () => {
      expect(calculateGPAComparison(3.5, 3.5)).toEqual({
        difference: 0,
        status: "unchanged",
      });
    });

    it("returns improved for higher hypothetical GPA", () => {
      expect(calculateGPAComparison(3.5, 3.75)).toEqual({
        difference: 0.25,
        status: "improved",
      });
    });

    it("returns decreased for lower hypothetical GPA", () => {
      expect(calculateGPAComparison(3.75, 3.5)).toEqual({
        difference: -0.25,
        status: "decreased",
      });
    });

    it("handles small differences within epsilon as unchanged", () => {
      const result = calculateGPAComparison(3.5, 3.50005);
      expect(result.status).toBe("unchanged");
      expect(result.difference).toBeCloseTo(0.00005, 5);
    });
  });

  describe("calculateProjectedCGPA", () => {
    it("returns correct projected CGPA", () => {
      const result = calculateProjectedCGPA(3.5, 36, 3.8, 18);
      expect(result).toBeCloseTo(3.6, 5);
    });

    it("returns correct projected CGPA with different values", () => {
      const result = calculateProjectedCGPA(3.67, 36, 4.0, 18);
      expect(result).toBeCloseTo(3.78, 3);
    });

    it("returns null for negative current CGPA", () => {
      expect(calculateProjectedCGPA(-1, 36, 3.8, 18)).toBeNull();
    });

    it("returns null for negative completed credits", () => {
      expect(calculateProjectedCGPA(3.5, -10, 3.8, 18)).toBeNull();
    });

    it("returns null for negative semester GPA", () => {
      expect(calculateProjectedCGPA(3.5, 36, -1, 18)).toBeNull();
    });

    it("returns null for zero semester credits", () => {
      expect(calculateProjectedCGPA(3.5, 36, 3.8, 0)).toBeNull();
    });

    it("returns null for negative semester credits", () => {
      expect(calculateProjectedCGPA(3.5, 36, 3.8, -5)).toBeNull();
    });

    it("returns null for NaN current CGPA", () => {
      expect(calculateProjectedCGPA(NaN, 36, 3.8, 18)).toBeNull();
    });

    it("returns null for Infinity semester GPA", () => {
      expect(calculateProjectedCGPA(3.5, 36, Infinity, 18)).toBeNull();
    });

    it("handles zero completed credits correctly", () => {
      const result = calculateProjectedCGPA(3.5, 0, 3.8, 18);
      expect(result).toBeCloseTo(3.8, 5);
    });
  });

  describe("calculateQualityPointsAndCredits", () => {
    it("returns correct quality points, credits, and count", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
        { credits: 2, gradePoint: 3.5 },
      ];
      const result = calculateQualityPointsAndCredits(courses);
      expect(result.qualityPoints).toBe(28); // 3*4 + 3*3 + 2*3.5 = 12 + 9 + 7 = 28
      expect(result.credits).toBe(8);
      expect(result.validCourseCount).toBe(3);
    });
  });

  describe("calculateSimulatorResults", () => {
    it("returns null results for empty courses", () => {
      const result = calculateSimulatorResults([]);
      expect(result.baselineGPA).toBeNull();
      expect(result.hypotheticalGPA).toBeNull();
      expect(result.difference).toBeNull();
      expect(result.status).toBe("incomplete");
      expect(result.validCourseCount).toBe(0);
    });

    it("calculates correct results for identical baseline and hypothetical", () => {
      const courses = [
        { credits: 3, baselineGradePoint: 4.0, hypotheticalGradePoint: 4.0 },
        { credits: 3, baselineGradePoint: 3.0, hypotheticalGradePoint: 3.0 },
      ];
      const result = calculateSimulatorResults(courses);
      expect(result.baselineGPA).toBe(3.5);
      expect(result.hypotheticalGPA).toBe(3.5);
      expect(result.difference).toBe(0);
      expect(result.status).toBe("unchanged");
    });

    it("calculates improved status correctly", () => {
      const courses = [
        { credits: 3, baselineGradePoint: 3.0, hypotheticalGradePoint: 4.0 },
      ];
      const result = calculateSimulatorResults(courses);
      expect(result.baselineGPA).toBe(3.0);
      expect(result.hypotheticalGPA).toBe(4.0);
      expect(result.difference).toBe(1.0);
      expect(result.status).toBe("improved");
    });

    it("calculates decreased status correctly", () => {
      const courses = [
        { credits: 3, baselineGradePoint: 4.0, hypotheticalGradePoint: 3.0 },
      ];
      const result = calculateSimulatorResults(courses);
      expect(result.baselineGPA).toBe(4.0);
      expect(result.hypotheticalGPA).toBe(3.0);
      expect(result.difference).toBe(-1.0);
      expect(result.status).toBe("decreased");
    });

    it("calculates correct quality points and credits", () => {
      const courses = [
        { credits: 3, baselineGradePoint: 4.0, hypotheticalGradePoint: 4.0 },
        { credits: 3, baselineGradePoint: 3.0, hypotheticalGradePoint: 4.0 },
      ];
      const result = calculateSimulatorResults(courses);
      expect(result.baselineQualityPoints).toBe(21); // 3*4 + 3*3 = 12 + 9 = 21
      expect(result.hypotheticalQualityPoints).toBe(24); // 3*4 + 3*4 = 12 + 12 = 24
      expect(result.totalCredits).toBe(6);
      expect(result.validCourseCount).toBe(2);
    });
  });

  describe("Grade scale boundary tests", () => {
    it("maps exact boundary values correctly using getGradeFromScore", () => {
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
      expect(getGradeFromScore(-1)).toBeNull();
      expect(getGradeFromScore(-0.01)).toBeNull();
      expect(getGradeFromScore(100.01)).toBeNull();
      expect(getGradeFromScore(101)).toBeNull();
      expect(getGradeFromScore(NaN)).toBeNull();
      expect(getGradeFromScore(Infinity)).toBeNull();
      expect(getGradeFromScore(-Infinity)).toBeNull();
      expect(getGradePointFromScore(-1)).toBeNull();
      expect(getGradePointFromScore(101)).toBeNull();
      expect(getGradePointFromScore(NaN)).toBeNull();
    });
  });

  describe("Standard scale integration", () => {
    it("has correct grade points for all grades", () => {
      const points = standardEthiopianGradingScale.map((g) => g.points);
      expect(points).toEqual([4.00, 4.00, 3.75, 3.50, 3.00, 2.50, 2.00, 1.00, 0.00]);
    });

    it("has correct letter grades in order", () => {
      const letters = standardEthiopianGradingScale.map((g) => g.letter);
      expect(letters).toEqual(["A+", "A", "A-", "B+", "B", "C+", "C", "D", "F"]);
    });

    it("getGradePointFromStandardScale returns correct values", () => {
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
      expect(getGradePointFromStandardScale("B-")).toBeNull();
    });
  });

  describe("Integration with existing GPA/CGPA functions", () => {
    it("calculateSemesterGPA works with simulator courses", () => {
      const courses = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.75 },
      ];
      const result = calculateSemesterGPA(courses);
      expect(result).toBeCloseTo(3.875, 5);
    });

    it("calculateCGPAFromSummary works for projected CGPA", () => {
      const result = calculateCGPAFromSummary({
        previousCGPA: 3.5,
        previousIncludedCredits: 36,
        currentSemesterGPA: 3.8,
        currentSemesterIncludedCredits: 18,
      });
      expect(result).toBeCloseTo(3.6, 5);
    });

    it("getGradePointFromStandardScale matches calculateSemesterGPA", () => {
      const courses = [
        { credits: 3, gradePoint: getGradePointFromStandardScale("A+")! },
        { credits: 3, gradePoint: getGradePointFromStandardScale("B+")! },
      ];
      const result = calculateSemesterGPA(courses);
      expect(result).toBeCloseTo(3.75, 5);
    });
  });
});