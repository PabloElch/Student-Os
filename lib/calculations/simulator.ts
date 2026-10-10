import { CourseGrade, calculateSemesterGPA } from "./gpa";
import { calculateCGPAFromSummary, CGPASummaryInput } from "./cgpa";

export interface SimulatorCourse {
  id: string;
  name: string;
  credits: number;
  baselineGrade: string;
  hypotheticalGrade: string;
}

export interface SimulatorResult {
  baselineGPA: number | null;
  hypotheticalGPA: number | null;
  difference: number | null;
  status: "improved" | "decreased" | "unchanged" | "incomplete";
  baselineQualityPoints: number;
  hypotheticalQualityPoints: number;
  totalCredits: number;
  validCourseCount: number;
}

export interface CGPAProjectionResult {
  baselineProjectedCGPA: number | null;
  hypotheticalProjectedCGPA: number | null;
  difference: number | null;
  error: string | null;
}

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

function validateCredits(credits: number): void {
  if (!isFiniteNumber(credits)) {
    throw new Error("Course credits must be a finite number.");
  }
  if (credits <= 0) {
    throw new Error("Course credits must be greater than zero.");
  }
}

function validateGradePoint(gradePoint: number): void {
  if (!isFiniteNumber(gradePoint)) {
    throw new Error("Grade point must be a finite number.");
  }
  if (gradePoint < 0) {
    throw new Error("Grade point must be non-negative.");
  }
}

function validateCourse(course: CourseGrade): void {
  validateCredits(course.credits);
  validateGradePoint(course.gradePoint);
}

export function calculateBaselineGPA(
  courses: ReadonlyArray<CourseGrade>
): number | null {
  if (!courses || courses.length === 0) {
    return null;
  }
  for (const course of courses) {
    validateCourse(course);
  }
  return calculateSemesterGPA(courses);
}

export function calculateHypotheticalGPA(
  courses: ReadonlyArray<CourseGrade>
): number | null {
  if (!courses || courses.length === 0) {
    return null;
  }
  for (const course of courses) {
    validateCourse(course);
  }
  return calculateSemesterGPA(courses);
}

export function calculateGPAComparison(
  baselineGPA: number | null,
  hypotheticalGPA: number | null
): { difference: number | null; status: "improved" | "decreased" | "unchanged" | "incomplete" } {
  if (baselineGPA === null || hypotheticalGPA === null) {
    return { difference: null, status: "incomplete" };
  }
  const difference = hypotheticalGPA - baselineGPA;
  const epsilon = 0.0001;
  let status: "improved" | "decreased" | "unchanged";
  if (Math.abs(difference) < epsilon) {
    status = "unchanged";
  } else if (difference > 0) {
    status = "improved";
  } else {
    status = "decreased";
  }
  return { difference, status };
}

export function calculateProjectedCGPA(
  currentCGPA: number,
  completedCredits: number,
  semesterGPA: number,
  semesterCredits: number
): number | null {
  if (!isFiniteNumber(currentCGPA) || currentCGPA < 0) {
    return null;
  }
  if (!isFiniteNumber(completedCredits) || completedCredits < 0) {
    return null;
  }
  if (!isFiniteNumber(semesterGPA) || semesterGPA < 0) {
    return null;
  }
  if (!isFiniteNumber(semesterCredits) || semesterCredits <= 0) {
    return null;
  }

  try {
    const input: CGPASummaryInput = {
      previousCGPA: currentCGPA,
      previousIncludedCredits: completedCredits,
      currentSemesterGPA: semesterGPA,
      currentSemesterIncludedCredits: semesterCredits,
    };
    return calculateCGPAFromSummary(input);
  } catch {
    return null;
  }
}

export function calculateQualityPointsAndCredits(
  courses: ReadonlyArray<CourseGrade>
): { qualityPoints: number; credits: number; validCourseCount: number } {
  let totalQualityPoints = 0;
  let totalCredits = 0;
  let validCourseCount = 0;

  for (const course of courses) {
    totalQualityPoints += course.credits * course.gradePoint;
    totalCredits += course.credits;
    validCourseCount++;
  }

  return { qualityPoints: totalQualityPoints, credits: totalCredits, validCourseCount };
}

export function calculateSimulatorResults(
  courses: ReadonlyArray<{
    credits: number;
    baselineGradePoint: number;
    hypotheticalGradePoint: number;
  }>
): SimulatorResult {
  if (!courses || courses.length === 0) {
    return {
      baselineGPA: null,
      hypotheticalGPA: null,
      difference: null,
      status: "incomplete",
      baselineQualityPoints: 0,
      hypotheticalQualityPoints: 0,
      totalCredits: 0,
      validCourseCount: 0,
    };
  }

  const baselineCourses: CourseGrade[] = courses.map((c) => ({
    credits: c.credits,
    gradePoint: c.baselineGradePoint,
  }));

  const hypotheticalCourses: CourseGrade[] = courses.map((c) => ({
    credits: c.credits,
    gradePoint: c.hypotheticalGradePoint,
  }));

  const baselineGPA = calculateBaselineGPA(baselineCourses);
  const hypotheticalGPA = calculateHypotheticalGPA(hypotheticalCourses);
  const comparison = calculateGPAComparison(baselineGPA, hypotheticalGPA);

  const baselineQualityPoints = baselineCourses.reduce(
    (sum, c) => sum + c.credits * c.gradePoint,
    0
  );
  const hypotheticalQualityPoints = hypotheticalCourses.reduce(
    (sum, c) => sum + c.credits * c.gradePoint,
    0
  );
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  return {
    baselineGPA,
    hypotheticalGPA,
    difference: comparison.difference,
    status: comparison.status,
    baselineQualityPoints,
    hypotheticalQualityPoints,
    totalCredits,
    validCourseCount: courses.length,
  };
}