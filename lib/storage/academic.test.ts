// Mock window for browser environment BEFORE imports using vitest's hoisted
import { vi } from "vitest";

vi.stubGlobal("window", { localStorage: undefined });

import { describe, it, expect, beforeEach } from "vitest";
import {
  loadProfile,
  saveProfile,
  clearProfile,
  getOrCreateProfile,
  calculateProfileCGPA,
  calculateSemesterGPAFromProfile,
  getCompletedCredits,
  getSemesterCount,
  getLatestSemesterGPA,
  getProgressTowardTarget,
  addSemester,
  updateSemester,
  deleteSemester,
  addCourseToSemester,
  updateCourseInSemester,
  deleteCourseFromSemester,
  setTargetCGPA,
  setUniversity,
  setIsBrowserEnv,
  STORAGE_KEY,
} from "./academic";
import { AcademicProfile, Semester, Course } from "../academic/types";

// Enable browser environment for tests
setIsBrowserEnv(true);

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get store() { return store; },
    set store(value: Record<string, string>) { store = value; },
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock, writable: true, configurable: true });
Object.defineProperty(global.window, "localStorage", { value: localStorageMock, writable: true, configurable: true });

describe("Academic Profile Storage", () => {
  const createTestProfile = (overrides: Partial<AcademicProfile> = {}): AcademicProfile => ({
    universityId: "jimma",
    targetCGPA: 3.5,
    semesters: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  });

  const createTestSemester = (overrides: Partial<Semester> = {}): Semester => ({
    id: "sem-1",
    academicYear: "2024-2025",
    label: "Fall",
    courses: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  });

  const createTestCourse = (overrides: Partial<Course> = {}): Course => ({
    id: "course-1",
    name: "Calculus I",
    credits: 4,
    grade: "A",
    gradePoint: 4.0,
    includedInGPA: true,
    ...overrides,
  });

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("loadProfile", () => {
    it("returns null when no data exists", () => {
      expect(loadProfile()).toBeNull();
    });

    it("returns null for malformed JSON", () => {
      localStorageMock.setItem(STORAGE_KEY, "not valid json");
      expect(loadProfile()).toBeNull();
    });

    it("returns null for wrong version", () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 999, profile: createTestProfile() }));
      expect(loadProfile()).toBeNull();
    });

    it("returns null for invalid profile structure", () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile: { invalid: true } }));
      expect(loadProfile()).toBeNull();
    });

    it("loads valid profile", () => {
      const profile = createTestProfile();
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile }));
      const loaded = loadProfile();
      expect(loaded).toEqual(expect.objectContaining({
        universityId: profile.universityId,
        targetCGPA: profile.targetCGPA,
        semesters: profile.semesters,
        createdAt: profile.createdAt,
      }));
      expect(loaded?.updatedAt).toBeDefined();
    });

    it("sanitizes profile with invalid semesters", () => {
      const profile = createTestProfile({
        semesters: [
          createTestSemester(),
          { invalid: "semester" } as unknown as Semester,
        ],
      });
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile }));
      const loaded = loadProfile();
      expect(loaded?.semesters).toHaveLength(1);
    });

    it("sanitizes profile with invalid courses", () => {
      const profile = createTestProfile({
        semesters: [
          createTestSemester({
            courses: [
              createTestCourse(),
              { invalid: "course" } as unknown as Course,
            ],
          }),
        ],
      });
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile }));
      const loaded = loadProfile();
      expect(loaded?.semesters[0].courses).toHaveLength(1);
    });

    it("falls back to default university for unsupported ID", () => {
      const profile = createTestProfile({ universityId: "unknown-university" });
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile }));
      const loaded = loadProfile();
      expect(loaded?.universityId).toBe("jimma");
    });

    it("handles null targetCGPA", () => {
      const profile = createTestProfile({ targetCGPA: null });
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile }));
      const loaded = loadProfile();
      expect(loaded?.targetCGPA).toBeNull();
    });

    it("handles non-finite targetCGPA", () => {
      const profile = createTestProfile({ targetCGPA: NaN });
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile }));
      const loaded = loadProfile();
      expect(loaded?.targetCGPA).toBeNull();
    });
  });

  describe("saveProfile", () => {
    it("saves profile to localStorage", () => {
      const profile = createTestProfile();
      saveProfile(profile);
      const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY) || "{}");
      expect(stored.version).toBe(1);
      expect(stored.profile.universityId).toBe("jimma");
    });

    it("updates updatedAt timestamp", () => {
      const profile = createTestProfile({ updatedAt: "2024-01-01T00:00:00.000Z" });
      saveProfile(profile);
      const stored = JSON.parse(localStorageMock.getItem(STORAGE_KEY) || "{}");
      expect(stored.profile.updatedAt).not.toBe("2024-01-01T00:00:00.000Z");
    });

    it("does not throw on error", () => {
      // Simulate localStorage being full
      vi.spyOn(localStorageMock, "setItem").mockImplementationOnce(() => {
        throw new Error("Quota exceeded");
      });
      expect(() => saveProfile(createTestProfile())).not.toThrow();
    });
  });

  describe("clearProfile", () => {
    it("removes profile from localStorage", () => {
      saveProfile(createTestProfile());
      clearProfile();
      expect(localStorageMock.getItem(STORAGE_KEY)).toBeNull();
    });

    it("does not throw when key does not exist", () => {
      expect(() => clearProfile()).not.toThrow();
    });
  });

  describe("getOrCreateProfile", () => {
    it("returns existing profile when present", () => {
      const profile = createTestProfile();
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ version: 1, profile }));
      const result = getOrCreateProfile("hawassa");
      expect(result).toEqual(expect.objectContaining({
        universityId: profile.universityId,
        targetCGPA: profile.targetCGPA,
        semesters: profile.semesters,
        createdAt: profile.createdAt,
      }));
      expect(result.updatedAt).toBeDefined();
    });

    it("creates new profile when none exists", () => {
      const result = getOrCreateProfile("hawassa");
      expect(result.universityId).toBe("hawassa");
      expect(result.targetCGPA).toBeNull();
      expect(result.semesters).toEqual([]);
    });
  });

  describe("calculateProfileCGPA", () => {
    it("returns null for empty profile", () => {
      const profile = createTestProfile();
      expect(calculateProfileCGPA(profile)).toBeNull();
    });

    it("calculates CGPA from all included courses", () => {
      const course1 = createTestCourse({ credits: 3, gradePoint: 4.0 });
      const course2 = createTestCourse({ credits: 3, gradePoint: 3.0 });
      const profile = createTestProfile({
        semesters: [
          createTestSemester({ courses: [course1, course2] }),
        ],
      });
      const cgpa = calculateProfileCGPA(profile);
      expect(cgpa).toBeCloseTo(3.5, 5);
    });

    it("excludes non-GPA courses", () => {
      const course1 = createTestCourse({ credits: 3, gradePoint: 4.0, includedInGPA: true });
      const course2 = createTestCourse({ credits: 3, gradePoint: 0, includedInGPA: false });
      const profile = createTestProfile({
        semesters: [
          createTestSemester({ courses: [course1, course2] }),
        ],
      });
      const cgpa = calculateProfileCGPA(profile);
      expect(cgpa).toBeCloseTo(4.0, 5);
    });

    it("handles multiple semesters", () => {
      const course1 = createTestCourse({ credits: 6, gradePoint: 4.0 });
      const course2 = createTestCourse({ credits: 3, gradePoint: 3.0 });
      const profile = createTestProfile({
        semesters: [
          createTestSemester({ courses: [course1] }),
          createTestSemester({ courses: [course2] }),
        ],
      });
      const cgpa = calculateProfileCGPA(profile);
      expect(cgpa).toBeCloseTo(3.66667, 4);
    });

    it("returns null on calculation error", () => {
      const course = createTestCourse({ credits: -3, gradePoint: 4.0 });
      const profile = createTestProfile({
        semesters: [createTestSemester({ courses: [course] })],
      });
      expect(calculateProfileCGPA(profile)).toBeNull();
    });
  });

  describe("calculateSemesterGPAFromProfile", () => {
    it("returns null for empty semester", () => {
      const semester = createTestSemester();
      expect(calculateSemesterGPAFromProfile(semester)).toBeNull();
    });

    it("calculates GPA for semester", () => {
      const course1 = createTestCourse({ credits: 3, gradePoint: 4.0 });
      const course2 = createTestCourse({ credits: 3, gradePoint: 3.0 });
      const semester = createTestSemester({ courses: [course1, course2] });
      const gpa = calculateSemesterGPAFromProfile(semester);
      expect(gpa).toBeCloseTo(3.5, 5);
    });

    it("excludes non-GPA courses", () => {
      const course1 = createTestCourse({ credits: 3, gradePoint: 4.0, includedInGPA: true });
      const course2 = createTestCourse({ credits: 3, gradePoint: 0, includedInGPA: false });
      const semester = createTestSemester({ courses: [course1, course2] });
      const gpa = calculateSemesterGPAFromProfile(semester);
      expect(gpa).toBeCloseTo(4.0, 5);
    });
  });

  describe("getCompletedCredits", () => {
    it("returns 0 for empty profile", () => {
      expect(getCompletedCredits(createTestProfile())).toBe(0);
    });

    it("sums credits of included courses", () => {
      const course1 = createTestCourse({ credits: 3, includedInGPA: true });
      const course2 = createTestCourse({ credits: 4, includedInGPA: true });
      const course3 = createTestCourse({ credits: 2, includedInGPA: false });
      const profile = createTestProfile({
        semesters: [createTestSemester({ courses: [course1, course2, course3] })],
      });
      expect(getCompletedCredits(profile)).toBe(7);
    });
  });

  describe("getSemesterCount", () => {
    it("returns correct count", () => {
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1" }), createTestSemester({ id: "2" })],
      });
      expect(getSemesterCount(profile)).toBe(2);
    });
  });

  describe("getLatestSemesterGPA", () => {
    it("returns null for empty profile", () => {
      expect(getLatestSemesterGPA(createTestProfile())).toBeNull();
    });

    it("returns GPA of last semester", () => {
      const course1 = createTestCourse({ credits: 3, gradePoint: 4.0 });
      const course2 = createTestCourse({ credits: 3, gradePoint: 3.0 });
      const profile = createTestProfile({
        semesters: [
          createTestSemester({ id: "1", courses: [course1] }),
          createTestSemester({ id: "2", courses: [course2] }),
        ],
      });
      expect(getLatestSemesterGPA(profile)).toBeCloseTo(3.0, 5);
    });
  });

  describe("getProgressTowardTarget", () => {
    it("returns null when no target set", () => {
      const profile = createTestProfile({ targetCGPA: null });
      expect(getProgressTowardTarget(profile)).toBeNull();
    });

    it("returns null when no CGPA calculated", () => {
      const profile = createTestProfile({ targetCGPA: 3.5 });
      expect(getProgressTowardTarget(profile)).toBeNull();
    });

    it("calculates progress percentage", () => {
      const course = createTestCourse({ credits: 3, gradePoint: 3.5 });
      const profile = createTestProfile({
        targetCGPA: 4.0,
        semesters: [createTestSemester({ courses: [course] })],
      });
      const progress = getProgressTowardTarget(profile);
      expect(progress).toBeCloseTo(87.5, 1);
    });

    it("caps at 100%", () => {
      const course = createTestCourse({ credits: 3, gradePoint: 4.0 });
      const profile = createTestProfile({
        targetCGPA: 3.5,
        semesters: [createTestSemester({ courses: [course] })],
      });
      const progress = getProgressTowardTarget(profile);
      expect(progress).toBe(100);
    });
  });

  describe("addSemester", () => {
    it("adds semester to profile", () => {
      const profile = createTestProfile();
      const updated = addSemester(profile, "2024-2025", "Spring");
      expect(updated.semesters).toHaveLength(1);
      expect(updated.semesters[0].academicYear).toBe("2024-2025");
      expect(updated.semesters[0].label).toBe("Spring");
    });

    it("preserves existing semesters", () => {
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1" })],
      });
      const updated = addSemester(profile, "2024-2025", "Spring");
      expect(updated.semesters).toHaveLength(2);
      expect(updated.semesters[0].id).toBe("1");
    });

    it("updates updatedAt", () => {
      const profile = createTestProfile({ updatedAt: "2024-01-01T00:00:00.000Z" });
      const updated = addSemester(profile, "2024-2025", "Spring");
      expect(updated.updatedAt).not.toBe("2024-01-01T00:00:00.000Z");
    });
  });

  describe("updateSemester", () => {
    it("updates semester fields", () => {
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1", academicYear: "2023-2024" })],
      });
      const updated = updateSemester(profile, "1", { academicYear: "2024-2025" });
      expect(updated.semesters[0].academicYear).toBe("2024-2025");
    });

    it("does not modify non-matching semesters", () => {
      const profile = createTestProfile({
        semesters: [
          createTestSemester({ id: "1", label: "Fall" }),
          createTestSemester({ id: "2", label: "Spring" }),
        ],
      });
      const updated = updateSemester(profile, "1", { label: "Updated" });
      expect(updated.semesters[0].label).toBe("Updated");
      expect(updated.semesters[1].label).toBe("Spring");
    });
  });

  describe("deleteSemester", () => {
    it("removes semester from profile", () => {
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1" }), createTestSemester({ id: "2" })],
      });
      const updated = deleteSemester(profile, "1");
      expect(updated.semesters).toHaveLength(1);
      expect(updated.semesters[0].id).toBe("2");
    });

    it("handles non-existent semester gracefully", () => {
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1" })],
      });
      const updated = deleteSemester(profile, "non-existent");
      expect(updated.semesters).toHaveLength(1);
    });
  });

  describe("addCourseToSemester", () => {
    it("adds course to semester", () => {
      const course = createTestCourse({ id: "course-1" });
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1", courses: [] })],
      });
      const updated = addCourseToSemester(profile, "1", course);
      expect(updated.semesters[0].courses).toHaveLength(1);
      expect(updated.semesters[0].courses[0]).toEqual(course);
    });
  });

  describe("updateCourseInSemester", () => {
    it("updates course fields", () => {
      const course = createTestCourse({ id: "course-1", name: "Old Name" });
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1", courses: [course] })],
      });
      const updated = updateCourseInSemester(profile, "1", "course-1", { name: "New Name" });
      expect(updated.semesters[0].courses[0].name).toBe("New Name");
    });
  });

  describe("deleteCourseFromSemester", () => {
    it("removes course from semester", () => {
      const course1 = createTestCourse({ id: "course-1" });
      const course2 = createTestCourse({ id: "course-2" });
      const profile = createTestProfile({
        semesters: [createTestSemester({ id: "1", courses: [course1, course2] })],
      });
      const updated = deleteCourseFromSemester(profile, "1", "course-1");
      expect(updated.semesters[0].courses).toHaveLength(1);
      expect(updated.semesters[0].courses[0].id).toBe("course-2");
    });
  });

  describe("setTargetCGPA", () => {
    it("sets target CGPA", () => {
      const profile = createTestProfile({ targetCGPA: null });
      const updated = setTargetCGPA(profile, 3.8);
      expect(updated.targetCGPA).toBe(3.8);
    });

    it("clears target CGPA when null", () => {
      const profile = createTestProfile({ targetCGPA: 3.8 });
      const updated = setTargetCGPA(profile, null);
      expect(updated.targetCGPA).toBeNull();
    });
  });

  describe("setUniversity", () => {
    it("updates university", () => {
      const profile = createTestProfile({ universityId: "jimma" });
      const updated = setUniversity(profile, "hawassa");
      expect(updated.universityId).toBe("hawassa");
    });
  });
});