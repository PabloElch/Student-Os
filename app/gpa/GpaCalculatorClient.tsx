"use client";

import { useState, useMemo, useCallback } from "react";
import { calculateSemesterGPA, CourseGrade } from "@/lib/calculations/gpa";
import { getAllUniversityConfigs, getGradePointForUniversity, isNonGpaGradeForUniversity, SupportedUniversityId } from "@/lib/universities";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { CourseRow } from "@/components/calculator/CourseRow";
import { GpaResult } from "@/components/calculator/GpaResult";

interface CourseInput {
  name: string;
  credits: string;
  grade: string;
}

const initialCourse: CourseInput = {
  name: "",
  credits: "",
  grade: "",
};

export function GPACalculatorClient() {
  const [selectedUniversity, setSelectedUniversity] = useState<SupportedUniversityId>("jimma");
  const [courses, setCourses] = useState<CourseInput[]>([initialCourse]);
  const [creditsErrors, setCreditsErrors] = useState<Record<number, string>>({});

  const universityConfigs = getAllUniversityConfigs();
  const currentConfig = universityConfigs.find((u) => u.id === selectedUniversity);

  const validateCredits = useCallback((value: string): string | undefined => {
    if (!value.trim()) return "Enter a credit value";
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (!isFinite(num)) return "Enter a finite number";
    if (num <= 0) return "Credits must be greater than 0";
    return undefined;
  }, []);

  const handleCreditsChange = useCallback((index: number, value: string) => {
    setCourses((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], credits: value };
      return next;
    });
    const error = validateCredits(value);
    setCreditsErrors((prev) => {
      const next = { ...prev };
      if (error) next[index] = error;
      else delete next[index];
      return next;
    });
  }, [validateCredits]);

  const handleGradeChange = useCallback((index: number, grade: string) => {
    setCourses((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], grade };
      return next;
    });
  }, []);

  const handleNameChange = useCallback((index: number, name: string) => {
    setCourses((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], name };
      return next;
    });
  }, []);

  const handleAddCourse = useCallback(() => {
    setCourses((prev) => [...prev, initialCourse]);
  }, []);

  const handleRemoveCourse = useCallback((index: number) => {
    setCourses((prev) => prev.filter((_, i) => i !== index));
    setCreditsErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      const reindexed: Record<number, string> = {};
      Object.entries(next).forEach(([key, value]) => {
        const numKey = parseInt(key, 10);
        reindexed[numKey > index ? numKey - 1 : numKey] = value;
      });
      return reindexed;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCourses([initialCourse]);
    setCreditsErrors({});
  }, []);

  const calculationInput = useMemo((): CourseGrade[] => {
    return courses
      .map((course) => {
        if (!course.credits.trim() || !course.grade) return null;
        const creditsNum = parseFloat(course.credits);
        if (isNaN(creditsNum) || !isFinite(creditsNum) || creditsNum <= 0) return null;
        const gradePoint = getGradePointForUniversity(selectedUniversity, course.grade);
        if (gradePoint === null) return null;
        if (isNonGpaGradeForUniversity(selectedUniversity, course.grade)) return null;
        return { credits: creditsNum, gradePoint };
      })
      .filter((c): c is CourseGrade => c !== null);
  }, [courses, selectedUniversity]);

  const gpa = useMemo(() => {
    if (calculationInput.length === 0) return null;
    try {
      return calculateSemesterGPA(calculationInput);
    } catch {
      return null;
    }
  }, [calculationInput]);

  const validCourseCount = calculationInput.length;

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">GPA Calculator</h1>
        <p className="text-zinc-600">
          Select your university, add courses, and calculate your semester GPA.
        </p>
      </div>

      <div className="card p-6 space-y-6">
        <UniversitySelector
          selectedUniversity={selectedUniversity}
          onChange={setSelectedUniversity}
        />

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Courses</h2>
          {courses.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              <p>No courses added yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course, index) => (
                <CourseRow
                  key={`${index}-${course.name}-${course.credits}-${course.grade}`}
                  index={index}
                  universityId={selectedUniversity}
                  name={course.name}
                  credits={course.credits}
                  grade={course.grade}
                  onNameChange={handleNameChange}
                  onCreditsChange={handleCreditsChange}
                  onGradeChange={handleGradeChange}
                  onRemove={handleRemoveCourse}
                  canRemove={courses.length > 1}
                  creditsError={creditsErrors[index]}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleAddCourse}
            className="btn-secondary w-full sm:w-auto mt-4"
            disabled={!currentConfig?.gradingScale.length}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course
          </button>

          {!currentConfig?.gradingScale.length && (
            <p className="mt-3 text-sm text-zinc-500">
              Grading scale not available for {currentConfig?.name}. Please select another university.
            </p>
          )}
        </div>

        <div className="border-t border-zinc-200 pt-6">
          <GpaResult
            gpa={gpa}
            courseCount={courses.filter((c) => c.credits.trim() || c.grade).length}
            validCourseCount={validCourseCount}
          />

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              Reset Calculator
            </button>
          </div>
        </div>
      </div>

      <div className="card p-4 text-sm text-zinc-600">
        <h3 className="font-medium text-zinc-900 mb-2">How it works</h3>
        <ul className="space-y-1 text-zinc-600">
          <li>• Select your university to load the correct grading scale</li>
          <li>• Add courses with credits and grades</li>
          <li>• Grades marked &ldquo;Not included in GPA&rdquo; don&apos;t affect the calculation</li>
          <li>• GPA is calculated using the official formula: &Sigma;(credits &times; grade points) / &Sigma;(credits)</li>
        </ul>
        {currentConfig?.source && (
          <p className="mt-3 text-xs text-zinc-500">
            Source: {currentConfig.source.title} ({currentConfig.source.dateAccessed})
          </p>
        )}
      </div>
    </div>
  );
}