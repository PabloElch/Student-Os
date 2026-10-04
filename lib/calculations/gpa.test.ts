import { describe, it, expect } from "vitest";
import { calculateSemesterGPA, CourseGrade } from "./gpa";

describe("calculateSemesterGPA", () => {
  describe("Basic weighted GPA", () => {
    it("calculates correct GPA for multiple courses with different credits and grades", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
        { credits: 2, gradePoint: 3.5 },
      ];

      const result = calculateSemesterGPA(courses);
      expect(result).toBe(3.5);
    });
  });

  describe("Single course", () => {
    it("returns the grade point when only one course is provided", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 4.0 },
      ];

      const result = calculateSemesterGPA(courses);
      expect(result).toBe(4.0);
    });
  });

  describe("Different credit weights", () => {
    it("gives proportionally greater influence to higher-credit courses", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 4, gradePoint: 4.0 },
        { credits: 1, gradePoint: 2.0 },
      ];

      const result = calculateSemesterGPA(courses);
      expect(result).toBeCloseTo(3.6, 5);
    });

    it("weights correctly when credits vary significantly", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 5, gradePoint: 4.0 },
        { credits: 1, gradePoint: 1.0 },
      ];

      const result = calculateSemesterGPA(courses);
      expect(result).toBeCloseTo(3.5, 5);
    });
  });

  describe("Fractional result", () => {
    it("returns non-integer GPA for inputs producing fractional result", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
      ];

      const result = calculateSemesterGPA(courses);
      expect(result).toBeCloseTo(3.5, 5);
    });

    it("handles more precise fractional results", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: 3.7 },
        { credits: 4, gradePoint: 3.3 },
      ];

      const result = calculateSemesterGPA(courses);
      expect(result).toBeCloseTo(3.4714, 4);
    });
  });

  describe("Empty course list", () => {
    it("throws error for empty array", () => {
      expect(() => calculateSemesterGPA([])).toThrow("At least one course is required to calculate GPA.");
    });

    it("throws error for undefined", () => {
      expect(() => calculateSemesterGPA(undefined as unknown as ReadonlyArray<CourseGrade>)).toThrow("At least one course is required to calculate GPA.");
    });

    it("throws error for null", () => {
      expect(() => calculateSemesterGPA(null as unknown as ReadonlyArray<CourseGrade>)).toThrow("At least one course is required to calculate GPA.");
    });
  });

  describe("Zero credits", () => {
    it("throws error for zero credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 0, gradePoint: 4.0 },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Course credits must be greater than zero.");
    });
  });

  describe("Negative credits", () => {
    it("throws error for negative credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: -3, gradePoint: 4.0 },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Course credits must be greater than zero.");
    });
  });

  describe("Negative grade point", () => {
    it("throws error for negative grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: -1.0 },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Grade point must be non-negative.");
    });
  });

  describe("NaN values", () => {
    it("throws error for NaN credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: NaN, gradePoint: 4.0 },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws error for NaN grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: NaN },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Grade point must be a finite number.");
    });
  });

  describe("Infinity values", () => {
    it("throws error for positive Infinity credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: Infinity, gradePoint: 4.0 },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws error for negative Infinity credits", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: -Infinity, gradePoint: 4.0 },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Course credits must be a finite number.");
    });

    it("throws error for positive Infinity grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: Infinity },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Grade point must be a finite number.");
    });

    it("throws error for negative Infinity grade point", () => {
      const courses: ReadonlyArray<CourseGrade> = [
        { credits: 3, gradePoint: -Infinity },
      ];

      expect(() => calculateSemesterGPA(courses)).toThrow("Grade point must be a finite number.");
    });
  });

  describe("Input immutability", () => {
    it("does not mutate the original course array", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
        { credits: 3, gradePoint: 3.0 },
      ];
      const originalCourses = [...courses];

      calculateSemesterGPA(courses);

      expect(courses).toEqual(originalCourses);
      expect(courses.length).toBe(originalCourses.length);
      expect(courses[0]).toEqual(originalCourses[0]);
      expect(courses[1]).toEqual(originalCourses[1]);
    });

    it("does not mutate individual course objects", () => {
      const courses: CourseGrade[] = [
        { credits: 3, gradePoint: 4.0 },
      ];

      calculateSemesterGPA(courses);

      expect(courses[0].credits).toBe(3);
      expect(courses[0].gradePoint).toBe(4.0);
    });
  });
});