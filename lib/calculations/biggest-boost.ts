import { CourseGrade } from "./gpa";
import { GradeRule } from "@/lib/universities/types";

export interface BiggestBoostInput {
  courses: ReadonlyArray<CourseGrade & { name: string; grade: string }>;
  gradingScale: ReadonlyArray<GradeRule>;
}

export interface BiggestBoostResult {
  courseName: string;
  currentGrade: string;
  targetGrade: string;
  newGPA: number;
  increase: number;
}

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

function calculateGPA(courses: ReadonlyArray<CourseGrade>): number {
  if (!courses || courses.length === 0) {
    throw new Error("At least one course is required to calculate GPA.");
  }

  let totalQualityPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    if (!isFiniteNumber(course.credits) || course.credits <= 0) {
      throw new Error("Course credits must be a finite number greater than zero.");
    }
    if (!isFiniteNumber(course.gradePoint) || course.gradePoint < 0) {
      throw new Error("Grade point must be a finite non-negative number.");
    }
    totalQualityPoints += course.credits * course.gradePoint;
    totalCredits += course.credits;
  }

  return totalQualityPoints / totalCredits;
}

function getNextGrade(currentGrade: string, gradingScale: ReadonlyArray<GradeRule>): GradeRule | null {
  const currentIndex = gradingScale.findIndex((g) => g.letter === currentGrade);
  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }
  return gradingScale[currentIndex - 1];
}

export function calculateBiggestBoost(input: BiggestBoostInput): BiggestBoostResult | null {
  const { courses, gradingScale } = input;

  if (!courses || courses.length === 0) {
    return null;
  }

  if (!gradingScale || gradingScale.length === 0) {
    return null;
  }

  const validCourses = courses.filter((course) => {
    if (!course.name?.trim()) return false;
    if (!course.grade?.trim()) return false;
    if (!isFiniteNumber(course.credits) || course.credits <= 0) return false;
    if (!isFiniteNumber(course.gradePoint) || course.gradePoint < 0) return false;
    return true;
  });

  if (validCourses.length === 0) {
    return null;
  }

  const currentGPA = calculateGPA(validCourses);

  let bestRecommendation: BiggestBoostResult | null = null;
  let bestIncrease = 0;

  for (const course of validCourses) {
    const nextGrade = getNextGrade(course.grade, gradingScale);
    if (!nextGrade) {
      continue;
    }

    if (nextGrade.points <= course.gradePoint) {
      continue;
    }

    const newCourses = validCourses.map((c) =>
      c === course ? { ...c, gradePoint: nextGrade.points } : c
    );

    try {
      const newGPA = calculateGPA(newCourses);
      const increase = newGPA - currentGPA;

      if (increase > bestIncrease) {
        bestIncrease = increase;
        bestRecommendation = {
          courseName: course.name,
          currentGrade: course.grade,
          targetGrade: nextGrade.letter,
          newGPA,
          increase,
        };
      } else if (increase === bestIncrease && increase > 0 && bestRecommendation) {
        const currentBest = bestRecommendation;
        const currentCredits = course.credits;
        const bestCredits = validCourses.find((c) => c.name === currentBest.courseName)?.credits ?? 0;
        if (currentCredits > bestCredits) {
          bestRecommendation = {
            courseName: course.name,
            currentGrade: course.grade,
            targetGrade: nextGrade.letter,
            newGPA,
            increase,
          };
        } else if (currentCredits === bestCredits) {
          // Deterministic tie-breaker: alphabetical by course name
          if (course.name.localeCompare(currentBest.courseName) < 0) {
            bestRecommendation = {
              courseName: course.name,
              currentGrade: course.grade,
              targetGrade: nextGrade.letter,
              newGPA,
              increase,
            };
          }
        }
      }
    } catch {
      continue;
    }
  }

  if (!bestRecommendation || bestIncrease <= 0) {
    return null;
  }

  return bestRecommendation;
}