"use client";

import { useState, useMemo, useCallback } from "react";
import { calculateSemesterGPA, CourseGrade } from "@/lib/calculations/gpa";
import { calculateBiggestBoost, BiggestBoostResult } from "@/lib/calculations/biggest-boost";
import { getGradePointForUniversity, isNonGpaGradeForUniversity, getUniversityConfig, SupportedUniversityId, GradeRule } from "@/lib/universities";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { CourseRow } from "@/components/calculator/CourseRow";
import { GpaResult } from "@/components/calculator/GpaResult";
import Link from "next/link";
import { copyOrShare, copyToClipboardOnly, generateGpaSummary } from "@/lib/utils/share";

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

export function HomepageCalculator() {
  const [selectedUniversity, setSelectedUniversity] = useState<SupportedUniversityId>("jimma");
  const [courses, setCourses] = useState<CourseInput[]>([
    { ...initialCourse, id: generateId() },
    { ...initialCourse, id: generateId() },
    { ...initialCourse, id: generateId() },
  ]);
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
    setCourses([
      { ...initialCourse, id: generateId() },
      { ...initialCourse, id: generateId() },
      { ...initialCourse, id: generateId() },
    ]);
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
  const totalCoursesWithData = courses.filter((c) => c.credits.trim() || c.grade).length;
  const totalCredits = calculationInput.reduce((sum, c) => sum + c.credits, 0);
  const totalQualityPoints = calculationInput.reduce((sum, c) => sum + c.credits * c.gradePoint, 0);

  const biggestBoostInput = useMemo(() => {
    const validCoursesWithNames = courses
      .map((course) => {
        if (!course.credits.trim() || !course.grade) return null;
        const creditsNum = parseFloat(course.credits);
        if (isNaN(creditsNum) || !isFinite(creditsNum) || creditsNum <= 0) return null;
        const gradePoint = getGradePointForUniversity(selectedUniversity, course.grade);
        if (gradePoint === null) return null;
        if (isNonGpaGradeForUniversity(selectedUniversity, course.grade)) return null;
        return { credits: creditsNum, gradePoint, name: course.name, grade: course.grade };
      })
      .filter((c): c is CourseGrade & { name: string; grade: string } => c !== null && c.name.trim() !== "");
    return {
      courses: validCoursesWithNames,
      gradingScale: currentConfig.gradingScale,
    };
  }, [courses, selectedUniversity, currentConfig]);

  const biggestBoost = useMemo((): BiggestBoostResult | null => {
    if (!gpa || biggestBoostInput.courses.length === 0 || biggestBoostInput.gradingScale.length === 0) {
      return null;
    }
    try {
      return calculateBiggestBoost(biggestBoostInput);
    } catch {
      return null;
    }
  }, [gpa, biggestBoostInput]);

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "shared" | "error">("idle");

  const handleCopySummary = async () => {
    if (!gpa) return;
    const summary = generateGpaSummary({
      label: "GPA",
      value: gpa.toFixed(2),
      totalCredits,
    });
    const copied = await copyToClipboardOnly(summary);
    if (copied) {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } else {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleShareResult = async () => {
    if (!gpa) return;
    const summary = generateGpaSummary({
      label: "GPA",
      value: gpa.toFixed(2),
      totalCredits,
    });
    await copyOrShare(
      summary,
      "GPA Result",
      (method) => {
        setCopyStatus(method === "copy" ? "copied" : "shared");
        setTimeout(() => setCopyStatus("idle"), 2000);
      },
      () => {
        setCopyStatus("error");
        setTimeout(() => setCopyStatus("idle"), 2000);
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-charcoal">GPA Calculator</h2>
            <p className="text-sm text-neutral mt-1">
              Add courses with credits and grades to calculate your semester GPA instantly.
            </p>
          </div>
          <UniversitySelector
            selectedUniversity={selectedUniversity}
            onChange={setSelectedUniversity}
          />
        </div>

        {!hasGradingScale && currentConfig && (
          <div className="p-3 bg-warning-bg border border-warning rounded-lg text-sm text-warning" role="alert">
            Grading scale not available for {currentConfig.name}. Please select another university.
          </div>
        )}

        <div className="border border-border rounded-xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1fr_80px_140px_50px] gap-x-4 gap-y-3 px-4 py-3 bg-ivory border-b border-border text-xs font-medium text-neutral uppercase tracking-wider">
            <div>Course Name</div>
            <div className="text-right">Credits</div>
            <div>Grade</div>
            <div></div>
          </div>

          <div className="divide-y divide-border">
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

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pt-4 border-t border-border">
          <button
            type="button"
            onClick={handleAddCourse}
            className="btn-secondary w-full sm:w-auto"
            disabled={!hasGradingScale}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-ghost w-full sm:w-auto"
            disabled={courses.length === 3 && courses.every(c => !c.name && !c.credits && !c.grade)}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <GpaResult
          gpa={gpa}
          courseCount={totalCoursesWithData}
          validCourseCount={validCourseCount}
          totalCredits={totalCredits}
          totalQualityPoints={totalQualityPoints}
          onCopySummary={handleCopySummary}
          onShareResult={handleShareResult}
          copyStatus={copyStatus}
          biggestBoost={biggestBoost}
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-border">
          <Link
            href="/gpa"
            className="btn-primary w-full sm:w-auto text-center"
          >
            Open Full GPA Calculator
          </Link>
          <Link
            href="/cgpa"
            className="btn-secondary w-full sm:w-auto text-center"
          >
            Calculate CGPA
          </Link>
        </div>
      </div>
    </div>
  );
}