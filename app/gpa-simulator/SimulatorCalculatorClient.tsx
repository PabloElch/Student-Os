"use client";

import { useState, useMemo, useCallback } from "react";
import { calculateSimulatorResults, calculateProjectedCGPA, SimulatorResult as SimulatorResultType } from "@/lib/calculations/simulator";
import { getGradePointForUniversity, isNonGpaGradeForUniversity, getUniversityConfig, SupportedUniversityId } from "@/lib/universities";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { SimulatorCourseRow } from "@/components/calculator/SimulatorCourseRow";
import { SimulatorResult } from "@/components/calculator/SimulatorResult";

interface CourseInput {
  id: string;
  name: string;
  credits: string;
  baselineGrade: string;
  hypotheticalGrade: string;
}

interface CGPAProjectionInput {
  currentCGPA: string;
  completedCredits: string;
}

interface CGPAProjectionResult {
  baselineProjectedCGPA: number | null;
  hypotheticalProjectedCGPA: number | null;
  difference: number | null;
  error: string | null;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const initialCourse: CourseInput = {
  id: generateId(),
  name: "",
  credits: "",
  baselineGrade: "",
  hypotheticalGrade: "",
};

const initialCGPAInputs: CGPAProjectionInput = {
  currentCGPA: "",
  completedCredits: "",
};

export function SimulatorCalculatorClient() {
  const [selectedUniversity, setSelectedUniversity] = useState<SupportedUniversityId>("jimma");
  const [courses, setCourses] = useState<CourseInput[]>([initialCourse]);
  const [creditsErrors, setCreditsErrors] = useState<Record<string, string>>({});
  const [cgpaInputs, setCgpaInputs] = useState<CGPAProjectionInput>(initialCGPAInputs);
  const [cgpaErrors, setCgpaErrors] = useState<Record<string, string>>({});
  const [showCGPAProjection, setShowCGPAProjection] = useState(false);

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

  const handleNameChange = useCallback((id: string, name: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, name } : course))
    );
  }, []);

  const handleBaselineGradeChange = useCallback((id: string, grade: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== id) return course;
        const newCourse = { ...course, baselineGrade: grade };
        if (course.hypotheticalGrade === course.baselineGrade) {
          newCourse.hypotheticalGrade = grade;
        }
        return newCourse;
      })
    );
  }, []);

  const handleHypotheticalGradeChange = useCallback((id: string, grade: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, hypotheticalGrade: grade } : course))
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

  const handleResetHypothetical = useCallback(() => {
    setCourses((prev) =>
      prev.map((course) => ({ ...course, hypotheticalGrade: course.baselineGrade }))
    );
  }, []);

  const handleResetAll = useCallback(() => {
    setCourses([{ ...initialCourse, id: generateId() }]);
    setCreditsErrors({});
    setCgpaInputs(initialCGPAInputs);
    setCgpaErrors({});
    setShowCGPAProjection(false);
  }, []);

  const validateCGPAInput = useCallback((value: string, fieldName: string): string | undefined => {
    if (!value.trim()) return `Enter ${fieldName}`;
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (!isFinite(num)) return "Enter a finite number";
    if (num < 0) return `${fieldName} cannot be negative`;
    return undefined;
  }, []);

  const validateCreditsInput = useCallback((value: string, fieldName: string): string | undefined => {
    if (!value.trim()) return `Enter ${fieldName}`;
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (!isFinite(num)) return "Enter a finite number";
    if (num <= 0) return `${fieldName} must be greater than 0`;
    return undefined;
  }, []);

  const handleCGPAInputChange = useCallback((field: keyof CGPAProjectionInput, value: string) => {
    setCgpaInputs((prev) => ({ ...prev, [field]: value }));
    let error: string | undefined;
    if (field === "currentCGPA") error = validateCGPAInput(value, "current CGPA");
    else if (field === "completedCredits") error = validateCreditsInput(value, "completed credits");
    setCgpaErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }, [validateCGPAInput, validateCreditsInput]);

  const gradeOptions = useMemo((): { value: string; label: string; points: number }[] => {
    if (!currentConfig?.gradingScale?.length) return [];
    return [
      { value: "", label: "Select grade", points: 0 },
      ...currentConfig.gradingScale.map((g) => ({
        value: g.letter,
        label: `${g.letter} (${g.points.toFixed(2)})`,
        points: g.points,
      })),
    ];
  }, [currentConfig]);

  const calculationInput = useMemo(() => {
    return courses
      .map((course) => {
        if (!course.credits.trim()) return null;
        const creditsNum = parseFloat(course.credits);
        if (isNaN(creditsNum) || !isFinite(creditsNum) || creditsNum <= 0) return null;

        const baselineGradePoint = course.baselineGrade
          ? getGradePointForUniversity(selectedUniversity, course.baselineGrade)
          : null;
        const hypotheticalGradePoint = course.hypotheticalGrade
          ? getGradePointForUniversity(selectedUniversity, course.hypotheticalGrade)
          : null;

        if (baselineGradePoint === null || hypotheticalGradePoint === null) return null;
        if (isNonGpaGradeForUniversity(selectedUniversity, course.baselineGrade)) return null;
        if (isNonGpaGradeForUniversity(selectedUniversity, course.hypotheticalGrade)) return null;

        return {
          credits: creditsNum,
          baselineGradePoint,
          hypotheticalGradePoint,
        };
      })
      .filter((c): c is { credits: number; baselineGradePoint: number; hypotheticalGradePoint: number } => c !== null);
  }, [courses, selectedUniversity]);

  const simulatorResult = useMemo((): SimulatorResultType => {
    return calculateSimulatorResults(calculationInput);
  }, [calculationInput]);

  const cgpaProjection = useMemo((): CGPAProjectionResult => {
    if (!showCGPAProjection) {
      return {
        baselineProjectedCGPA: null,
        hypotheticalProjectedCGPA: null,
        difference: null,
        error: null,
      };
    }

    if (!cgpaInputs.currentCGPA.trim() || !cgpaInputs.completedCredits.trim()) {
      return {
        baselineProjectedCGPA: null,
        hypotheticalProjectedCGPA: null,
        difference: null,
        error: null,
      };
    }

    const currentCGPA = parseFloat(cgpaInputs.currentCGPA);
    const completedCredits = parseFloat(cgpaInputs.completedCredits);

    if (
      isNaN(currentCGPA) ||
      !isFinite(currentCGPA) ||
      currentCGPA < 0 ||
      isNaN(completedCredits) ||
      !isFinite(completedCredits) ||
      completedCredits < 0
    ) {
      return {
        baselineProjectedCGPA: null,
        hypotheticalProjectedCGPA: null,
        difference: null,
        error: "Enter valid CGPA and completed credits",
      };
    }

    const { baselineGPA, hypotheticalGPA, totalCredits } = simulatorResult;

    if (baselineGPA === null || hypotheticalGPA === null || totalCredits === 0) {
      return {
        baselineProjectedCGPA: null,
        hypotheticalProjectedCGPA: null,
        difference: null,
        error: "Add courses with valid grades to project CGPA",
      };
    }

    const baselineProjected = calculateProjectedCGPA(currentCGPA, completedCredits, baselineGPA, totalCredits);
    const hypotheticalProjected = calculateProjectedCGPA(currentCGPA, completedCredits, hypotheticalGPA, totalCredits);

    let difference: number | null = null;
    if (baselineProjected !== null && hypotheticalProjected !== null) {
      difference = hypotheticalProjected - baselineProjected;
    }

    return {
      baselineProjectedCGPA: baselineProjected,
      hypotheticalProjectedCGPA: hypotheticalProjected,
      difference,
      error: null,
    };
  }, [showCGPAProjection, cgpaInputs, simulatorResult]);

  const hasGradingScale = currentConfig?.gradingScale?.length > 0;
  const validCourseCount = calculationInput.length;

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">GPA What-If Simulator</h1>
        <p className="text-zinc-600">
          Compare your baseline grades against hypothetical scenarios to see the impact on your GPA.
        </p>
      </div>

      <div className="card p-6 space-y-6">
        <UniversitySelector
          selectedUniversity={selectedUniversity}
          onChange={setSelectedUniversity}
        />

        {!hasGradingScale && currentConfig && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Grading scale not available for {currentConfig.name}. Please select another university.
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Courses</h2>

          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_80px_140px_140px_50px] gap-x-4 gap-y-3 px-4 py-3 bg-zinc-50 border-b border-zinc-200 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              <div>Course Name</div>
              <div className="text-right">Credits</div>
              <div>Baseline Grade</div>
              <div>Hypothetical Grade</div>
              <div></div>
            </div>

            <div className="divide-y divide-zinc-200">
              {courses.map((course) => (
                <SimulatorCourseRow
                  key={course.id}
                  course={course}
                  universityId={selectedUniversity}
                  gradeOptions={gradeOptions}
                  creditsError={creditsErrors[course.id]}
                  onNameChange={handleNameChange}
                  onCreditsChange={handleCreditsChange}
                  onBaselineGradeChange={handleBaselineGradeChange}
                  onHypotheticalGradeChange={handleHypotheticalGradeChange}
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
          <SimulatorResult
            baselineGPA={simulatorResult.baselineGPA}
            hypotheticalGPA={simulatorResult.hypotheticalGPA}
            difference={simulatorResult.difference}
            status={simulatorResult.status}
            baselineQualityPoints={simulatorResult.baselineQualityPoints}
            hypotheticalQualityPoints={simulatorResult.hypotheticalQualityPoints}
            totalCredits={simulatorResult.totalCredits}
            validCourseCount={simulatorResult.validCourseCount}
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleResetHypothetical}
              className="btn-secondary"
              disabled={validCourseCount === 0}
            >
              Reset Hypothetical to Baseline
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              className="btn-secondary"
            >
              Reset All
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-6">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Cumulative CGPA Projection (Optional)</h3>
          <p className="text-sm text-zinc-600 mb-4">
            Enter your current CGPA and completed credits to see how this semester affects your cumulative GPA.
          </p>

          <button
            type="button"
            onClick={() => setShowCGPAProjection(!showCGPAProjection)}
            className="btn-secondary w-full sm:w-auto mb-4"
          >
            {showCGPAProjection ? "Hide CGPA Projection" : "Show CGPA Projection"}
          </button>

          {showCGPAProjection && (
            <div className="space-y-4">
              <div>
                <label htmlFor="current-cgpa" className="block text-sm font-medium text-zinc-900 mb-1">
                  Current CGPA
                </label>
                <input
                  type="text"
                  id="current-cgpa"
                  value={cgpaInputs.currentCGPA}
                  onChange={(e) => handleCGPAInputChange("currentCGPA", e.target.value)}
                  placeholder="3.67"
                  className={`input-base ${cgpaErrors.currentCGPA ? "border-red-500 focus:ring-red-500" : ""}`}
                  aria-invalid={!!cgpaErrors.currentCGPA}
                  aria-describedby={cgpaErrors.currentCGPA ? "current-cgpa-error" : undefined}
                />
                {cgpaErrors.currentCGPA && (
                  <p id="current-cgpa-error" className="mt-1 text-sm text-red-600" role="alert">
                    {cgpaErrors.currentCGPA}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="completed-credits" className="block text-sm font-medium text-zinc-900 mb-1">
                  Completed Credits
                </label>
                <input
                  type="text"
                  id="completed-credits"
                  value={cgpaInputs.completedCredits}
                  onChange={(e) => handleCGPAInputChange("completedCredits", e.target.value)}
                  placeholder="36"
                  className={`input-base ${cgpaErrors.completedCredits ? "border-red-500 focus:ring-red-500" : ""}`}
                  aria-invalid={!!cgpaErrors.completedCredits}
                  aria-describedby={cgpaErrors.completedCredits ? "completed-credits-error" : undefined}
                />
                {cgpaErrors.completedCredits && (
                  <p id="completed-credits-error" className="mt-1 text-sm text-red-600" role="alert">
                    {cgpaErrors.completedCredits}
                  </p>
                )}
              </div>

              {cgpaProjection.baselineProjectedCGPA !== null || cgpaProjection.hypotheticalProjectedCGPA !== null || cgpaProjection.error ? (
                <div className="card p-6 space-y-4">
                  <h4 className="font-semibold text-zinc-900">Projected CGPA</h4>
                  {cgpaProjection.error && (
                    <p className="text-sm text-red-600">{cgpaProjection.error}</p>
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="card p-4">
                      <h5 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Baseline Projected CGPA</h5>
                      <div className="text-3xl font-bold text-zinc-900 font-mono">
                        {cgpaProjection.baselineProjectedCGPA !== null ? cgpaProjection.baselineProjectedCGPA.toFixed(2) : "—"}
                      </div>
                    </div>
                    <div className="card p-4">
                      <h5 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Hypothetical Projected CGPA</h5>
                      <div className="text-3xl font-bold text-zinc-900 font-mono">
                        {cgpaProjection.hypotheticalProjectedCGPA !== null ? cgpaProjection.hypotheticalProjectedCGPA.toFixed(2) : "—"}
                      </div>
                    </div>
                  </div>
                  {cgpaProjection.difference !== null && (
                    <div className="card p-4 bg-zinc-50 border-zinc-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-900">CGPA Difference</span>
                        <span className={`font-mono font-semibold ${cgpaProjection.difference > 0 ? "text-green-700" : cgpaProjection.difference < 0 ? "text-red-700" : "text-zinc-700"}`}>
                          {cgpaProjection.difference > 0 ? "+" : ""}{cgpaProjection.difference.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-zinc-500 text-center py-4">Enter CGPA and completed credits to see projection</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="card p-4 text-sm text-zinc-600">
        <h3 className="font-medium text-zinc-900 mb-2">How it works</h3>
        <ul className="space-y-1 text-zinc-600">
          <li>• Select your university to load the correct grading scale</li>
          <li>• Add courses with credits, baseline grades, and hypothetical grades</li>
          <li>• Hypothetical grades start matching baseline grades</li>
          <li>• Changing a baseline grade updates the hypothetical grade if they were the same</li>
          <li>• GPA is calculated using: Σ(credits × grade points) / Σ(credits)</li>
          <li>• Use the optional CGPA projection to see cumulative impact</li>
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