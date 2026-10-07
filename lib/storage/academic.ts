import { AcademicProfile, createEmptyProfile, STORAGE_KEY, STORAGE_VERSION, Semester, Course } from "../academic/types";
import { getUniversityConfig, isUniversitySupported, SupportedUniversityId } from "../universities";
import { calculateSemesterGPA, CourseGrade } from "../calculations/gpa";
import { calculateCGPA } from "../calculations/cgpa";

export { STORAGE_KEY, STORAGE_VERSION };

interface StoredData {
  version: number;
  profile: AcademicProfile;
}

// Allow overriding in tests
let isBrowserEnv = true;

function isBrowser(): boolean {
  return isBrowserEnv;
}

// Export for testing
export function setIsBrowserEnv(value: boolean): void {
  isBrowserEnv = value;
}

function isValidProfile(data: unknown): data is AcademicProfile {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.universityId === "string" &&
    (obj.targetCGPA === null || typeof obj.targetCGPA === "number") &&
    Array.isArray(obj.semesters) &&
    typeof obj.createdAt === "string" &&
    typeof obj.updatedAt === "string"
  );
}

function isValidSemester(data: unknown): data is Semester {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    typeof obj.academicYear === "string" &&
    typeof obj.label === "string" &&
    Array.isArray(obj.courses) &&
    typeof obj.createdAt === "string" &&
    typeof obj.updatedAt === "string"
  );
}

function isValidCourse(data: unknown): data is Course {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.credits === "number" &&
    typeof obj.grade === "string" &&
    typeof obj.gradePoint === "number" &&
    typeof obj.includedInGPA === "boolean"
  );
}

function sanitizeProfile(profile: AcademicProfile): AcademicProfile {
  const validSemesters = profile.semesters
    .filter(isValidSemester)
    .map((semester) => ({
      ...semester,
      courses: semester.courses.filter(isValidCourse),
    }));

  const universityId = isUniversitySupported(profile.universityId)
    ? profile.universityId
    : "jimma";

  const targetCGPA =
    profile.targetCGPA !== null && typeof profile.targetCGPA === "number" && isFinite(profile.targetCGPA)
      ? profile.targetCGPA
      : null;

  return {
    universityId,
    targetCGPA,
    semesters: validSemesters,
    createdAt: profile.createdAt,
    updatedAt: new Date().toISOString(),
  };
}

export function loadProfile(): AcademicProfile | null {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredData;

    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== STORAGE_VERSION) return null;
    if (!isValidProfile(parsed.profile)) return null;

    return sanitizeProfile(parsed.profile);
  } catch {
    return null;
  }
}

export function saveProfile(profile: AcademicProfile): void {
  if (!isBrowser()) return;

  try {
    const data: StoredData = {
      version: STORAGE_VERSION,
      profile: {
        ...profile,
        updatedAt: new Date().toISOString(),
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail - localStorage might be full or unavailable
  }
}

export function clearProfile(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getOrCreateProfile(universityId: SupportedUniversityId = "jimma"): AcademicProfile {
  const existing = loadProfile();
  if (existing) return existing;
  return createEmptyProfile(universityId);
}

function getAllCoursesForCGPA(profile: AcademicProfile): CourseGrade[] {
  const courses: CourseGrade[] = [];
  for (const semester of profile.semesters) {
    for (const course of semester.courses) {
      if (course.includedInGPA) {
        courses.push({ credits: course.credits, gradePoint: course.gradePoint });
      }
    }
  }
  return courses;
}

function getAllCoursesForSemesterGPA(semester: Semester): CourseGrade[] {
  return semester.courses
    .filter((c) => c.includedInGPA)
    .map((c) => ({ credits: c.credits, gradePoint: c.gradePoint }));
}

export function calculateProfileCGPA(profile: AcademicProfile): number | null {
  const courses = getAllCoursesForCGPA(profile);
  if (courses.length === 0) return null;
  try {
    return calculateCGPA(courses);
  } catch {
    return null;
  }
}

export function calculateSemesterGPAFromProfile(semester: Semester): number | null {
  const courses = getAllCoursesForSemesterGPA(semester);
  if (courses.length === 0) return null;
  try {
    return calculateSemesterGPA(courses);
  } catch {
    return null;
  }
}

export function getCompletedCredits(profile: AcademicProfile): number {
  let total = 0;
  for (const semester of profile.semesters) {
    for (const course of semester.courses) {
      if (course.includedInGPA) {
        total += course.credits;
      }
    }
  }
  return total;
}

export function getSemesterCount(profile: AcademicProfile): number {
  return profile.semesters.length;
}

export function getLatestSemesterGPA(profile: AcademicProfile): number | null {
  if (profile.semesters.length === 0) return null;
  const latest = profile.semesters[profile.semesters.length - 1];
  return calculateSemesterGPAFromProfile(latest);
}

export function getProgressTowardTarget(profile: AcademicProfile): number | null {
  if (profile.targetCGPA === null) return null;
  const currentCGPA = calculateProfileCGPA(profile);
  if (currentCGPA === null) return null;
  if (profile.targetCGPA <= 0) return 100;
  return Math.min(100, (currentCGPA / profile.targetCGPA) * 100);
}

export function addSemester(profile: AcademicProfile, academicYear: string, label: string): AcademicProfile {
  const newSemester = createSemester(academicYear, label);
  return {
    ...profile,
    semesters: [...profile.semesters, newSemester],
    updatedAt: new Date().toISOString(),
  };
}

export function updateSemester(profile: AcademicProfile, semesterId: string, updates: Partial<Semester>): AcademicProfile {
  return {
    ...profile,
    semesters: profile.semesters.map((s) =>
      s.id === semesterId ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function deleteSemester(profile: AcademicProfile, semesterId: string): AcademicProfile {
  return {
    ...profile,
    semesters: profile.semesters.filter((s) => s.id !== semesterId),
    updatedAt: new Date().toISOString(),
  };
}

export function addCourseToSemester(
  profile: AcademicProfile,
  semesterId: string,
  course: Course
): AcademicProfile {
  return {
    ...profile,
    semesters: profile.semesters.map((s) =>
      s.id === semesterId
        ? { ...s, courses: [...s.courses, course], updatedAt: new Date().toISOString() }
        : s
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function updateCourseInSemester(
  profile: AcademicProfile,
  semesterId: string,
  courseId: string,
  updates: Partial<Course>
): AcademicProfile {
  return {
    ...profile,
    semesters: profile.semesters.map((s) =>
      s.id === semesterId
        ? {
            ...s,
            courses: s.courses.map((c) =>
              c.id === courseId ? { ...c, ...updates } : c
            ),
            updatedAt: new Date().toISOString(),
          }
        : s
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function deleteCourseFromSemester(
  profile: AcademicProfile,
  semesterId: string,
  courseId: string
): AcademicProfile {
  return {
    ...profile,
    semesters: profile.semesters.map((s) =>
      s.id === semesterId
        ? { ...s, courses: s.courses.filter((c) => c.id !== courseId), updatedAt: new Date().toISOString() }
        : s
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function setTargetCGPA(profile: AcademicProfile, targetCGPA: number | null): AcademicProfile {
  return {
    ...profile,
    targetCGPA,
    updatedAt: new Date().toISOString(),
  };
}

export function setUniversity(profile: AcademicProfile, universityId: SupportedUniversityId): AcademicProfile {
  return {
    ...profile,
    universityId,
    updatedAt: new Date().toISOString(),
  };
}

export function getGradePointForUniversity(universityId: SupportedUniversityId, grade: string): number | null {
  const config = getUniversityConfig(universityId);
  if (!config || !config.gradingScale?.length) return null;
  const rule = config.gradingScale.find((g) => g.letter === grade);
  return rule ? rule.points : null;
}

export function isNonGpaGradeForUniversity(universityId: SupportedUniversityId, grade: string): boolean {
  switch (universityId) {
    case "jimma":
      return ["I", "P", "W", "AU", "CR", "S", "U"].includes(grade);
    case "addis-ababa":
      return ["W", "DO", "NG", "I", "P"].includes(grade);
    case "bahir-dar":
      return ["P", "F", "I", "W", "NG"].includes(grade);
    case "hawassa":
      return ["W", "DO", "NG", "P"].includes(grade);
    case "haramaya":
      return false;
    default:
      return false;
  }
}

function createSemester(academicYear: string, label: string, courses: Course[] = []): Semester {
  const now = new Date().toISOString();
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    academicYear,
    label,
    courses,
    createdAt: now,
    updatedAt: now,
  };
}