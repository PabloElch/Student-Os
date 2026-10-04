import { describe, it, expect } from "vitest";
import { calculateCGPA, calculateCGPAFromSummary } from "./cgpa";
import { CourseGrade } from "./gpa";

describe("calculateCGPA", () => {
  describe("Equal-credit semesters", () => {
    it("calculates correct CGPA when all courses have equal credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
        { credits: 3, gradePoint: 3.5 },
        { credits: 3, gradePoint: 2.5 },
      ];

      const result = calculateCGPA(courses);
      expect(result).toBeCloseTo(3.25, 5);
    });
  });

  describe("Unequal-credit semesters", () => {
    it("gives proportionally greater influence to higher-credit courses", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 6, gradePoint: 4.0 },
        { credits: 3, gradePoint: 2.0 },
      ];

      const result = calculateCGPA(courses);
      expect(result).toBeCloseTo(3.33333, 4);
    });

    it("weights correctly when credits vary significantly", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 12, gradePoint: 3.5 },
        { credits: 3, gradePoint: 4.0 },
      ];

      const result = calculateCGPA(courses);
      expect(result).toBeCloseTo(3.6, 5);
    });
  });

  describe("Course-level calculation", () => {
    it("calculates CGPA from multiple courses with different credits and grade points", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 4, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.7 },
        { credits: 3, gradePoint: 3.3 },
        { credits: 2, gradePoint: 3.0 },
        { credits: 1, gradePoint: 2.5 },
      ];

      const result = calculateCGPA(courses);
      expect(result).toBeCloseTo(3.5, 5);
    });
  });

  describe("Single course", () => {
    it("returns the grade point when only one course is provided", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 3.8 },
      ];

      const result = calculateCGPA(courses);
      expect(result).toBeCloseTo(3.8, 5);
    });
  });

  describe("Fractional CGPA", () => {
    it("returns non-integer CGPA for inputs producing fractional result", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
      ];

      const result = calculateCGPA(courses);
      expect(result).toBeCloseTo(3.5, 5);
    });

    it("handles more precise fractional results", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 3.7 },
        { credits: 4, gradePoint: 3.3 },
      ];

      const result = calculateCGPA(courses);
      expect(result).toBeCloseTo(3.4714, 4);
    });
  });

  describe("Empty input", () => {
    it("throws error for empty array", () => {
      expect(() => calculateCGPA([])).toThrow("At least one course is required to calculate CGPA.");
    });

    it("throws error for undefined", () => {
      expect(() => calculateCGPA(undefined as unknown as ReadonlyArray<CourseGrade>)).toThrow("At least one course is required to calculate CGPA.");
    });

    it("throws error for null", () => {
      expect(() => calculateCGPA(null as unknown as ReadonlyArray<CourseGrade>)).toThrow("At least one course is required to calculate CGPA.");
    });
  });

  describe("Zero credits", () => {
    it("throws error for zero credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 0, gradePoint: 4.0 },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Course credits must be greater than zero.");
    });
  });

  describe("Negative credits", () => {
    it("throws error for negative credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: -3, gradePoint: 4.0 },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Course credits must be greater than zero.");
    });
  });

  describe("Negative grade point", () => {
    it("throws error for negative grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: -1.0 },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Grade point must be non-negative.");
    });
  });

  describe("NaN values", () => {
    it("throws error for NaN credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: NaN, gradePoint: 4.0 },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws error for NaN grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: NaN },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Grade point must be a finite number.");
    });
  });

  describe("Infinity values", () => {
    it("throws error for positive Infinity credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: Infinity, gradePoint: 4.0 },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws error for negative Infinity credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: -Infinity, gradePoint: 4.0 },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws error for positive Infinity grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: Infinity },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Grade point must be a finite number.");
    });

    it("throws error for negative Infinity grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: -Infinity },
      ];

      expect(() => calculateCGPA(courses)).toThrow("Grade point must be a finite number.");
    });
  });

  describe("Input immutability", () => {
    it("does not mutate the original course array", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
      ];
      const originalCourses = [...courses];

      calculateCGPA(courses);

      expect(courses).toEqual(originalCourses);
      expect(courses.length).toBe(originalCourses.length);
      expect(courses[0]).toEqual(originalCourses[0]);
      expect(courses[1]).toEqual(originalCourses[1]);
    });

    it("does not mutate individual course objects", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
      ];

      calculateCGPA(courses);

      expect(courses[0].credits).toBe(3);
      expect(courses[0].gradePoint).toBe(4.0);
    });
  });

  describe("GPA-vs-CGPA weighting (critical test)", () => {
    it("verifies that averaging semester GPAs is incorrect when credit loads differ", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 12, gradePoint: 4.0 },
        { credits: 24, gradePoint: 3.0 },
      ];

      const correctCGPA = calculateCGPA(courses);

      const incorrectAverage = (4.0 + 3.0) / 2;

      expect(correctCGPA).not.toBe(incorrectAverage);
      expect(correctCGPA).toBeCloseTo(3.33333, 4);
    });

    it("verifies correct CGPA calculation for Semester 1: GPA=4.0, Credits=12 and Semester 2: GPA=3.0, Credits=24", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 12, gradePoint: 4.0 },
        { credits: 24, gradePoint: 3.0 },
      ];

      const result = calculateCGPA(courses);

      expect(result).toBeCloseTo(3.33333, 4);
      expect(result).not.toBe(3.5);
    });
  });
});

describe("calculateCGPAFromSummary", () => {
  it("calculates correct CGPA from summary inputs with equal credits", () => {
    const input = {
      previousCGPA: 3.5,
      previousIncludedCredits: 18,
      currentSemesterGPA: 3.8,
      currentSemesterIncludedCredits: 18,
    };

    const result = calculateCGPAFromSummary(input);
    expect(result).toBeCloseTo(3.65, 5);
  });

  it("calculates correct CGPA from summary inputs with unequal credits", () => {
    const input = {
      previousCGPA: 3.5,
      previousIncludedCredits: 36,
      currentSemesterGPA: 4.0,
      currentSemesterIncludedCredits: 18,
    };

    const result = calculateCGPAFromSummary(input);
    expect(result).toBeCloseTo(3.66667, 4);
  });

  it("throws error for invalid previous CGPA", () => {
    const input = {
      previousCGPA: NaN,
      previousIncludedCredits: 36,
      currentSemesterGPA: 3.5,
      currentSemesterIncludedCredits: 18,
    };

    expect(() => calculateCGPAFromSummary(input)).toThrow("Previous CGPA must be a finite non-negative number.");
  });

  it("throws error for invalid previous included credits", () => {
    const input = {
      previousCGPA: 3.5,
      previousIncludedCredits: -10,
      currentSemesterGPA: 3.5,
      currentSemesterIncludedCredits: 18,
    };

    expect(() => calculateCGPAFromSummary(input)).toThrow("Previous included credits must be a finite non-negative number.");
  });

  it("throws error for invalid current semester GPA", () => {
    const input = {
      previousCGPA: 3.5,
      previousIncludedCredits: 36,
      currentSemesterGPA: -1,
      currentSemesterIncludedCredits: 18,
    };

    expect(() => calculateCGPAFromSummary(input)).toThrow("Current semester GPA must be a finite non-negative number.");
  });

  it("throws error for zero current semester included credits", () => {
    const input = {
      previousCGPA: 3.5,
      previousIncludedCredits: 36,
      currentSemesterGPA: 3.5,
      currentSemesterIncludedCredits: 0,
    };

    expect(() => calculateCGPAFromSummary(input)).toThrow("Current semester included credits must be a finite number greater than zero.");
  });

  it("throws error for negative current semester included credits", () => {
    const input = {
      previousCGPA: 3.5,
      previousIncludedCredits: 36,
      currentSemesterGPA: 3.5,
      currentSemesterIncludedCredits: -5,
    };

    expect(() => calculateCGPAFromSummary(input)).toThrow("Current semester included credits must be a finite number greater than zero.");
  });

  it("does not mutate input object", () => {
    const input = {
      previousCGPA: 3.5,
      previousIncludedCredits: 36,
      currentSemesterGPA: 3.8,
      currentSemesterIncludedCredits: 18,
    };
    const originalInput = { ...input };

    calculateCGPAFromSummary(input);

    expect(input).toEqual(originalInput);
  });
});