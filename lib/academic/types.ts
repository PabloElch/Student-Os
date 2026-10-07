export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  gradePoint: number;
  includedInGPA: boolean;
}

export interface Semester {
  id: string;
  academicYear: string;
  label: string;
  courses: Course[];
  createdAt: string;
  updatedAt: string;
}

export interface AcademicProfile {
  universityId: string;
  targetCGPA: number | null;
  semesters: Semester[];
  createdAt: string;
  updatedAt: string;
}

export const STORAGE_KEY = "wutete-academic-profile";
export const STORAGE_VERSION = 1;

export function createEmptyProfile(universityId: string): AcademicProfile {
  return {
    universityId,
    targetCGPA: null,
    semesters: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createSemester(
  academicYear: string,
  label: string,
  courses: Course[] = []
): Semester {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    academicYear,
    label,
    courses,
    createdAt: now,
    updatedAt: now,
  };
}

export function createCourse(
  name: string,
  credits: number,
  grade: string,
  gradePoint: number,
  includedInGPA: boolean
): Course {
  return {
    id: generateId(),
    name,
    credits,
    grade,
    gradePoint,
    includedInGPA,
  };
}