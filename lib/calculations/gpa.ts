export interface CourseGrade {
  credits: number;
  gradePoint: number;
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

export function calculateSemesterGPA(courses: ReadonlyArray<CourseGrade>): number {
  if (!courses || courses.length === 0) {
    throw new Error("At least one course is required to calculate GPA.");
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