import { describe, it, expect } from "vitest";
import {
  createEmptyProfile,
  generateId,
  createSemester,
  createCourse,
  AcademicProfile,
  Semester,
  Course,
} from "./types";

describe("Academic Data Model", () => {
  describe("createEmptyProfile", () => {
    it("creates a profile with required fields", () => {
      const profile = createEmptyProfile("jimma");
      expect(profile.universityId).toBe("jimma");
      expect(profile.targetCGPA).toBeNull();
      expect(profile.semesters).toEqual([]);
      expect(profile.createdAt).toBeDefined();
      expect(profile.updatedAt).toBeDefined();
    });

    it("uses provided university ID", () => {
      const profile = createEmptyProfile("hawassa");
      expect(profile.universityId).toBe("hawassa");
    });

    it("sets createdAt and updatedAt to current time (approximately)", () => {
      const before = new Date().toISOString();
      const profile = createEmptyProfile("jimma");
      const after = new Date().toISOString();
      expect(profile.createdAt >= before && profile.createdAt <= after).toBe(true);
      expect(profile.updatedAt >= before && profile.updatedAt <= after).toBe(true);
    });
  });

  describe("generateId", () => {
    it("generates unique IDs", () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(generateId());
      }
      expect(ids.size).toBe(100);
    });

    it("generates IDs with timestamp prefix", () => {
      const id = generateId();
      expect(id).toMatch(/^\d+-/);
    });
  });

  describe("createSemester", () => {
    it("creates a semester with required fields", () => {
      const semester = createSemester("2024-2025", "Fall");
      expect(semester.academicYear).toBe("2024-2025");
      expect(semester.label).toBe("Fall");
      expect(semester.courses).toEqual([]);
      expect(semester.id).toBeDefined();
      expect(semester.createdAt).toBeDefined();
      expect(semester.updatedAt).toBeDefined();
    });

    it("accepts initial courses", () => {
      const course = createCourse("Math", 3, "A", 4.0, true);
      const semester = createSemester("2024-2025", "Fall", [course]);
      expect(semester.courses).toHaveLength(1);
      expect(semester.courses[0]).toEqual(course);
    });
  });

  describe("createCourse", () => {
    it("creates a course with all fields", () => {
      const course = createCourse("Calculus I", 4, "A", 4.0, true);
      expect(course.name).toBe("Calculus I");
      expect(course.credits).toBe(4);
      expect(course.grade).toBe("A");
      expect(course.gradePoint).toBe(4.0);
      expect(course.includedInGPA).toBe(true);
      expect(course.id).toBeDefined();
    });

    it("handles non-GPA courses", () => {
      const course = createCourse("PE", 1, "P", 0, false);
      expect(course.includedInGPA).toBe(false);
      expect(course.gradePoint).toBe(0);
    });
  });

  describe("Type structure validation", () => {
    it("AcademicProfile has correct structure", () => {
      const profile: AcademicProfile = {
        universityId: "jimma",
        targetCGPA: 3.5,
        semesters: [],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      };
      expect(profile.universityId).toBe("jimma");
      expect(profile.targetCGPA).toBe(3.5);
    });

    it("Semester has correct structure", () => {
      const semester: Semester = {
        id: "test-1",
        academicYear: "2024-2025",
        label: "Spring",
        courses: [],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      };
      expect(semester.id).toBe("test-1");
    });

    it("Course has correct structure", () => {
      const course: Course = {
        id: "course-1",
        name: "Physics",
        credits: 3,
        grade: "B+",
        gradePoint: 3.33,
        includedInGPA: true,
      };
      expect(course.name).toBe("Physics");
    });
  });
});