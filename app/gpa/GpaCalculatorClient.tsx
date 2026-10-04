"use client";

import { useState, useMemo, useCallback } from "react";
import { calculateSemesterGPA, CourseGrade } from "@/lib/calculations/gpa";
import { getGradePointForUniversity, isNonGpaGradeForUniversity, getUniversityConfig, SupportedUniversityId, GradeRule } from "@/lib/universities";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { CourseRow } from "@/components/calculator/CourseRow";
import { GpaResult } from "@/components/calculator/GpaResult";

interface CourseInput {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const initialCourse: CourseInput = {
  id: generateId(),
  name: "",
  credits: "",
  grade: "",
};

export function GPACalculatorClient() {
  const [selectedUniversity, setSelectedUniversity] = useState<SupportedUniversityId>("jimma");
  const [courses, setCourses] = useState<CourseInput[]>([initialCourse]);
  const [creditsErrors, setCreditsErrors] = useState<Record<string, string>>({});

  const currentConfig = getUniversityConfig(selectedUniversity);

  const validateCredits = useCallback((value: string): string | undefined => {
    if (!value.trim()) return "Enter a credit value";
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (!isFinite(num)) return "Enter a finite number";
    if (num <= 0) return "Credits must be greater than 0";
    return undefined;
  }, []);

  const handleCreditsChange = useCallback((id: string, value: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, credits: value } : course))
    );
    const error = validateCredits(value);
    setCreditsErrors((prev) => {
      const next = { ...prev };
      if (error) next[id] = error;
      else delete next[id];
      return next;
    });
  }, [validateCredits]);

  const handleGradeChange = useCallback((id: string, grade: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, grade } : course))
    );
  }, []);

  const handleNameChange = useCallback((id: string, name: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, name } : course))
    );
  }, []);

  const handleAddCourse = useCallback(() => {
    setCourses((prev) => [...prev, { ...initialCourse, id: generateId() }]);
  }, []);

  const handleRemoveCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
    setCreditsErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCourses([{ ...initialCourse, id: generateId() }]);
    setCreditsErrors({});
  }, []);

  const gradeOptions = useMemo((): { value: string; label: string; points: number }[] => {
    if (!currentConfig?.gradingScale?.length) return [];
    return [
      { value: "", label: "Select grade", points: 0 },
      ...currentConfig.gradingScale.map((g: GradeRule) => ({
        value: g.letter,
        label: `${g.letter} (${g.points.toFixed(2)})`,
        points: g.points,
      })),
    ];
  }, [currentConfig]);

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
  const hasGradingScale = currentConfig?.gradingScale?.length > 0;

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

          {!hasGradingScale && currentConfig && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              Grading scale not available for {currentConfig.name}. Please select another university.
            </div>
          )}

          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_80px_140px_50px] gap-x-4 gap-y-3 px-4 py-3 bg-zinc-50 border-b border-zinc-200 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              <div>Course Name</div>
              <div className="text-right">Credits</div>
              <div>Grade</div>
              <div></div>
            </div>

            <div className="divide-y divide-zinc-200">
              {courses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  universityId={selectedUniversity}
                  gradeOptions={gradeOptions}
                  creditsError={creditsErrors[course.id]}
                  onNameChange={handleNameChange}
                  onCreditsChange={handleCreditsChange}
                  onGradeChange={handleGradeChange}
                  onRemove={handleRemoveCourse}
                  canRemove={courses.length > 1}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCourse}
            className="btn-secondary w-full sm:w-auto mt-4"
            disabled={!hasGradingScale}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course
          </button>
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