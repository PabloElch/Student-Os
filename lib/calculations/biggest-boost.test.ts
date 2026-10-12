import { describe, it, expect } from "vitest";
import { calculateBiggestBoost, BiggestBoostInput } from "./biggest-boost";
import { standardEthiopianGradingScale } from "../../lib/universities/standard-scale";

const createCourse = (
  name: string,
  credits: number,
  grade: string,
  gradePoint: number
): BiggestBoostInput["courses"][0] => ({
  name,
  credits,
  grade,
  gradePoint,
});

describe("calculateBiggestBoost", () => {
  const standardScale = standardEthiopianGradingScale;

  describe("Basic recommendation", () => {
    it("identifies the course with the biggest GPA increase", () => {
      const courses = [
        createCourse("Calculus I", 3, "B", 3.00),
        createCourse("Physics I", 3, "C+", 2.50),
        createCourse("Chemistry I", 3, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      // All three courses give the same increase (0.1667), so any is valid
      // Deterministic tie-breaker: first course in array with highest increase
      expect(["Calculus I", "Physics I", "Chemistry I"]).toContain(result!.courseName);
      expect(result!.increase).toBeCloseTo(0.1667, 3);
      expect(result!.newGPA).toBeCloseTo(2.8333, 3);
    });

    it("prefers higher credit courses when increase is equal", () => {
      const courses = [
        createCourse("Course A", 4, "C+", 2.50),
        createCourse("Course B", 2, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Course A");
      // Course A: 4 credits * 0.5 / 6 total = 0.3333
      // Course B: 2 credits * 0.5 / 6 total = 0.1667
      expect(result!.increase).toBeCloseTo(0.3333, 3);
    });
  });

  describe("Credit weighting", () => {
    it("correctly weighs higher credit courses", () => {
      const courses = [
        createCourse("High Credit", 5, "C", 2.00),
        createCourse("Low Credit", 1, "C", 2.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("High Credit");
      expect(result!.increase).toBeGreaterThan(0);
    });

    it("calculates correct increase for higher credit course improvement", () => {
      const courses = [
        createCourse("Math", 4, "C+", 2.50),
        createCourse("English", 2, "B", 3.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      // Math: C+->B (4 credits * 0.5 / 6 total = 0.3333)
      // English: B->B+ (2 credits * 0.5 / 6 total = 0.1667)
      expect(result!.courseName).toBe("Math");
      expect(result!.increase).toBeCloseTo(0.3333, 3);
    });
  });

  describe("A+ and A both mapping to 4.00", () => {
    it("does not recommend improving A to A+ since both are 4.00", () => {
      const courses = [
        createCourse("Course A", 3, "A", 4.00),
        createCourse("Course B", 3, "B", 3.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Course B");
      expect(result!.currentGrade).toBe("B");
      expect(result!.targetGrade).toBe("B+");
    });

    it("does not recommend improving A+ since it is already at max", () => {
      const courses = [
        createCourse("Course A", 3, "A+", 4.00),
        createCourse("Course B", 3, "B", 3.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Course B");
    });
  });

  describe("Courses already at maximum grade", () => {
    it("excludes courses at maximum grade point from recommendations", () => {
      const courses = [
        createCourse("Perfect Course", 3, "A+", 4.00),
        createCourse("Imperfect Course", 3, "B", 3.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Imperfect Course");
    });

    it("returns null when all courses are at maximum grade", () => {
      const courses = [
        createCourse("Course A", 3, "A", 4.00),
        createCourse("Course B", 3, "A+", 4.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).toBeNull();
    });
  });

  describe("Incomplete and invalid course rows", () => {
    it("ignores courses with empty names", () => {
      const courses = [
        createCourse("", 3, "C+", 2.50),
        createCourse("Valid Course", 3, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Valid Course");
    });

    it("ignores courses with empty grades", () => {
      const courses = [
        createCourse("No Grade", 3, "", 2.50),
        createCourse("Valid Course", 3, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Valid Course");
    });

    it("ignores courses with zero credits", () => {
      const courses = [
        createCourse("Zero Credits", 0, "C+", 2.50),
        createCourse("Valid Course", 3, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Valid Course");
    });

    it("ignores courses with negative credits", () => {
      const courses = [
        createCourse("Negative Credits", -3, "C+", 2.50),
        createCourse("Valid Course", 3, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Valid Course");
    });

    it("ignores courses with invalid grade points", () => {
      const courses = [
        createCourse("Invalid GP", 3, "C+", NaN),
        createCourse("Valid Course", 3, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Valid Course");
    });

    it("ignores courses with grades not in grading scale", () => {
      const courses = [
        createCourse("Unknown Grade", 3, "X", 2.50),
        createCourse("Valid Course", 3, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Valid Course");
    });
  });

  describe("Empty course lists and no possible improvement", () => {
    it("returns null for empty course list", () => {
      const result = calculateBiggestBoost({ courses: [], gradingScale: standardScale });
      expect(result).toBeNull();
    });

    it("returns null when no valid courses exist", () => {
      const courses = [
        createCourse("", 3, "C+", 2.50),
        createCourse("No Grade", 3, "", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });
      expect(result).toBeNull();
    });

    it("returns null when no improvement is possible", () => {
      const courses = [
        createCourse("Course A", 3, "A+", 4.00),
        createCourse("Course B", 3, "A", 4.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });
      expect(result).toBeNull();
    });
  });

  describe("Equal-improvement tie cases", () => {
    it("uses higher credits as tie-breaker", () => {
      const courses = [
        createCourse("Course A", 4, "C+", 2.50),
        createCourse("Course B", 2, "C+", 2.50),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Course A");
    });

    it("is deterministic when course order changes (same credits, same increase)", () => {
      const courses1 = [
        createCourse("Course A", 3, "C+", 2.50),
        createCourse("Course B", 3, "C+", 2.50),
      ];

      const courses2 = [
        createCourse("Course B", 3, "C+", 2.50),
        createCourse("Course A", 3, "C+", 2.50),
      ];

      const result1 = calculateBiggestBoost({ courses: courses1, gradingScale: standardScale });
      const result2 = calculateBiggestBoost({ courses: courses2, gradingScale: standardScale });

      expect(result1).not.toBeNull();
      expect(result2).not.toBeNull();
      // With same credits and same increase, should be deterministic
      // Using name as final tie-breaker for determinism
      expect(result1!.courseName).toBe(result2!.courseName);
    });
  });

  describe("Correct resulting GPA and GPA increase", () => {
    it("calculates correct new GPA and increase for single course improvement", () => {
      const courses = [
        createCourse("Course A", 3, "C+", 2.50),
        createCourse("Course B", 3, "B", 3.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      // Current GPA: (3*2.50 + 3*3.00) / 6 = 16.5/6 = 2.75
      // Course A: C+->B (3.00), new GPA: (3*3.00 + 3*3.00) / 6 = 18/6 = 3.00, increase = 0.25
      // Course B: B->B+ (3.50), new GPA: (3*2.50 + 3*3.50) / 6 = 18/6 = 3.00, increase = 0.25
      // Tie - first course wins
      expect(result!.courseName).toBe("Course A");
      expect(result!.newGPA).toBeCloseTo(3.00, 3);
      expect(result!.increase).toBeCloseTo(0.25, 3);
    });

    it("handles next grade level correctly", () => {
      const courses = [
        createCourse("Course A", 3, "D", 1.00),
        createCourse("Course B", 3, "B", 3.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Course A");
      expect(result!.currentGrade).toBe("D");
      expect(result!.targetGrade).toBe("C");
      // Current GPA: (3*1.00 + 3*3.00) / 6 = 12/6 = 2.00
      // D->C: (3*2.00 + 3*3.00) / 6 = 15/6 = 2.50, increase = 0.50
      expect(result!.increase).toBeCloseTo(0.50, 3);
      expect(result!.newGPA).toBeCloseTo(2.50, 3);
    });

    it("consistency with existing GPA calculator calculation and rounding", () => {
      const courses = [
        createCourse("Math", 3, "B+", 3.50),
        createCourse("Physics", 4, "C+", 2.50),
        createCourse("Chemistry", 2, "B", 3.00),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: standardScale });

      expect(result).not.toBeNull();
      // Current GPA: (3*3.50 + 4*2.50 + 2*3.00) / 9 = (10.5 + 10 + 6) / 9 = 26.5/9 = 2.9444
      // Math: B+->A- (3.75), increase = 3*0.25/9 = 0.0833
      // Physics: C+->B (3.00), increase = 4*0.5/9 = 0.2222
      // Chemistry: B->B+ (3.50), increase = 2*0.5/9 = 0.1111
      // Best: Physics
      expect(result!.courseName).toBe("Physics");
      expect(result!.newGPA).toBeCloseTo(3.1667, 3);
      expect(result!.increase).toBeCloseTo(0.2222, 3);
    });
  });

  describe("Edge cases with different grading scales", () => {
    it("works with custom grading scale", () => {
      const customScale: typeof standardScale = [
        { letter: "A", points: 4.0, minimumMark: 90, maximumMark: 100 },
        { letter: "B", points: 3.0, minimumMark: 80, maximumMark: 89 },
        { letter: "C", points: 2.0, minimumMark: 70, maximumMark: 79 },
        { letter: "D", points: 1.0, minimumMark: 60, maximumMark: 69 },
        { letter: "F", points: 0.0, minimumMark: 0, maximumMark: 59 },
      ];

      const courses = [
        createCourse("Course A", 3, "C", 2.0),
        createCourse("Course B", 3, "B", 3.0),
      ];

      const result = calculateBiggestBoost({ courses, gradingScale: customScale });

      expect(result).not.toBeNull();
      expect(result!.courseName).toBe("Course A");
      expect(result!.targetGrade).toBe("B");
      // Current GPA: (3*2.0 + 3*3.0) / 6 = 15/6 = 2.5
      // Course A: C->B, new GPA: (3*3.0 + 3*3.0) / 6 = 3.0, increase = 0.5
      // Course B: B->A, new GPA: (3*2.0 + 3*4.0) / 6 = 3.0, increase = 0.5
      // Tie - first course wins
      expect(result!.increase).toBeCloseTo(0.5, 3);
    });
  });

  describe("Empty grading scale", () => {
    it("returns null for empty grading scale", () => {
      const courses = [createCourse("Course A", 3, "C+", 2.50)];

      const result = calculateBiggestBoost({ courses, gradingScale: [] });
      expect(result).toBeNull();
    });
  });
});