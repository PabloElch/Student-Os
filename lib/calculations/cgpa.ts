import { CourseGrade } from "./gpa";

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

export function calculateCGPA(courses: ReadonlyArray<CourseGrade>): number {
  if (!courses || courses.length === 0) {
    throw new Error("At least one course is required to calculate CGPA.");
  }

  for (const course of courses) {
    validateCourse(course);
  }

  let totalQualityPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    totalQualityPoints += course.credits * course.gradePoint;
    totalCredits += course.credits;
  }

  return totalQualityPoints / totalCredits;
}

export interface CGPASummaryInput {
  previousCGPA: number;
  previousIncludedCredits: number;
  currentSemesterGPA: number;
  currentSemesterIncludedCredits: number;
}

export function calculateCGPAFromSummary(input: CGPASummaryInput): number {
  const { previousCGPA, previousIncludedCredits, currentSemesterGPA, currentSemesterIncludedCredits } = input;

  if (!isFiniteNumber(previousCGPA) || previousCGPA < 0) {
    throw new Error("Previous CGPA must be a finite non-negative number.");
  }
  if (!isFiniteNumber(previousIncludedCredits) || previousIncludedCredits < 0) {
    throw new Error("Previous included credits must be a finite non-negative number.");
  }
  if (!isFiniteNumber(currentSemesterGPA) || currentSemesterGPA < 0) {
    throw new Error("Current semester GPA must be a finite non-negative number.");
  }
  if (!isFiniteNumber(currentSemesterIncludedCredits) || currentSemesterIncludedCredits <= 0) {
    throw new Error("Current semester included credits must be a finite number greater than zero.");
  }

  const previousQualityPoints = previousCGPA * previousIncludedCredits;
  const currentQualityPoints = currentSemesterGPA * currentSemesterIncludedCredits;

  const totalQualityPoints = previousQualityPoints + currentQualityPoints;
  const totalIncludedCredits = previousIncludedCredits + currentSemesterIncludedCredits;

  return totalQualityPoints / totalIncludedCredits;
}