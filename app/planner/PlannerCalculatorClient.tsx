"use client";

import { useState, useMemo, useCallback } from "react";
import { calculateRequiredGPAWithMax, getMaxGradePointFromConfig, RequiredGPAResult } from "@/lib/calculations/planner";
import { getUniversityConfig, SupportedUniversityId } from "@/lib/universities";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { PlannerResult } from "@/components/calculator/PlannerResult";

interface InputErrors {
  currentCGPA?: string;
  completedCredits?: string;
  targetCGPA?: string;
  upcomingCredits?: string;
}

const initialValues = {
  currentCGPA: "",
  completedCredits: "",
  targetCGPA: "",
  upcomingCredits: "",
};

export function PlannerCalculatorClient() {
  const [selectedUniversity, setSelectedUniversity] = useState<SupportedUniversityId>("jimma");
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState<InputErrors>({});

  const currentConfig = getUniversityConfig(selectedUniversity);
  const maxGradePoint = useMemo(() => getMaxGradePointFromConfig(currentConfig), [currentConfig]);
  const hasGradingScale = currentConfig?.gradingScale?.length > 0;

  const validateCGPA = useCallback((value: string, fieldName: string): string | undefined => {
    if (!value.trim()) return `Enter your ${fieldName}`;
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (!isFinite(num)) return "Enter a finite number";
    if (num < 0) return `${fieldName} cannot be negative`;
    if (maxGradePoint !== null && num > maxGradePoint) return `${fieldName} cannot exceed ${maxGradePoint.toFixed(2)}`;
    return undefined;
  }, [maxGradePoint]);

  const validateCredits = useCallback((value: string, fieldName: string): string | undefined => {
    if (!value.trim()) return `Enter your ${fieldName}`;
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (!isFinite(num)) return "Enter a finite number";
    if (num <= 0) return `${fieldName} must be greater than 0`;
    return undefined;
  }, []);

  const handleInputChange = useCallback(
    (field: keyof typeof initialValues, value: string) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
      let error: string | undefined;
      if (field === "currentCGPA") error = validateCGPA(value, "current CGPA");
      else if (field === "targetCGPA") error = validateCGPA(value, "target CGPA");
      else if (field === "completedCredits") error = validateCredits(value, "completed credits");
      else if (field === "upcomingCredits") error = validateCredits(value, "upcoming credits");
      setErrors((prev) => {
        const next = { ...prev };
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
    },
    [validateCGPA, validateCredits]
  );

  const handleReset = useCallback(() => {
    setInputs(initialValues);
    setErrors({});
  }, []);

  const calculationInput = useMemo(() => {
    if (
      !inputs.currentCGPA.trim() ||
      !inputs.completedCredits.trim() ||
      !inputs.targetCGPA.trim() ||
      !inputs.upcomingCredits.trim()
    ) {
      return null;
    }

    const currentCGPA = parseFloat(inputs.currentCGPA);
    const completedCredits = parseFloat(inputs.completedCredits);
    const targetCGPA = parseFloat(inputs.targetCGPA);
    const upcomingCredits = parseFloat(inputs.upcomingCredits);

    if (
      isNaN(currentCGPA) ||
      !isFinite(currentCGPA) ||
      currentCGPA < 0 ||
      isNaN(completedCredits) ||
      !isFinite(completedCredits) ||
      completedCredits <= 0 ||
      isNaN(targetCGPA) ||
      !isFinite(targetCGPA) ||
      targetCGPA < 0 ||
      isNaN(upcomingCredits) ||
      !isFinite(upcomingCredits) ||
      upcomingCredits <= 0
    ) {
      return null;
    }

    return { currentCGPA, completedCredits, targetCGPA, upcomingCredits };
  }, [inputs]);

  const result = useMemo((): RequiredGPAResult | null => {
    if (!calculationInput) return null;
    if (!maxGradePoint) {
      return calculateRequiredGPAWithMax(calculationInput, 4.0);
    }
    return calculateRequiredGPAWithMax(calculationInput, maxGradePoint);
  }, [calculationInput, maxGradePoint]);

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">GPA Target Planner</h1>
        <p className="text-zinc-600">
          Find out what GPA you need to reach your target CGPA.
        </p>
      </div>

      <div className="card p-6 space-y-6">
        <UniversitySelector
          selectedUniversity={selectedUniversity}
          onChange={setSelectedUniversity}
        />

        {!hasGradingScale && currentConfig && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Grading scale not available for {currentConfig.name}. Maximum GPA assumed as 4.00.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="current-cgpa" className="block text-sm font-medium text-zinc-900 mb-1">
              Current CGPA
            </label>
            <input
              type="text"
              id="current-cgpa"
              value={inputs.currentCGPA}
              onChange={(e) => handleInputChange("currentCGPA", e.target.value)}
              placeholder="3.67"
              className={`input-base ${errors.currentCGPA ? "border-red-500 focus:ring-red-500" : ""}`}
              aria-invalid={!!errors.currentCGPA}
              aria-describedby={errors.currentCGPA ? "current-cgpa-error" : undefined}
            />
            {errors.currentCGPA && (
              <p id="current-cgpa-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.currentCGPA}
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
              value={inputs.completedCredits}
              onChange={(e) => handleInputChange("completedCredits", e.target.value)}
              placeholder="36"
              className={`input-base ${errors.completedCredits ? "border-red-500 focus:ring-red-500" : ""}`}
              aria-invalid={!!errors.completedCredits}
              aria-describedby={errors.completedCredits ? "completed-credits-error" : undefined}
            />
            {errors.completedCredits && (
              <p id="completed-credits-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.completedCredits}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="target-cgpa" className="block text-sm font-medium text-zinc-900 mb-1">
              Target CGPA
            </label>
            <input
              type="text"
              id="target-cgpa"
              value={inputs.targetCGPA}
              onChange={(e) => handleInputChange("targetCGPA", e.target.value)}
              placeholder="3.80"
              className={`input-base ${errors.targetCGPA ? "border-red-500 focus:ring-red-500" : ""}`}
              aria-invalid={!!errors.targetCGPA}
              aria-describedby={errors.targetCGPA ? "target-cgpa-error" : undefined}
            />
            {errors.targetCGPA && (
              <p id="target-cgpa-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.targetCGPA}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="upcoming-credits" className="block text-sm font-medium text-zinc-900 mb-1">
              Upcoming Credits
            </label>
            <input
              type="text"
              id="upcoming-credits"
              value={inputs.upcomingCredits}
              onChange={(e) => handleInputChange("upcomingCredits", e.target.value)}
              placeholder="18"
              className={`input-base ${errors.upcomingCredits ? "border-red-500 focus:ring-red-500" : ""}`}
              aria-invalid={!!errors.upcomingCredits}
              aria-describedby={errors.upcomingCredits ? "upcoming-credits-error" : undefined}
            />
            {errors.upcomingCredits && (
              <p id="upcoming-credits-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.upcomingCredits}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-6">
          <PlannerResult
            result={result}
            upcomingCredits={calculationInput?.upcomingCredits ?? null}
            targetCGPA={calculationInput?.targetCGPA ?? null}
            currentCGPA={calculationInput?.currentCGPA ?? null}
          />

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              Reset Planner
            </button>
          </div>
        </div>
      </div>

      <div className="card p-4 text-sm text-zinc-600">
        <h3 className="font-medium text-zinc-900 mb-2">How it works</h3>
        <ul className="space-y-1 text-zinc-600">
          <li>• Select your university to use the correct grading scale and maximum GPA</li>
          <li>• Enter your current CGPA and total completed credits</li>
          <li>• Enter your target CGPA and upcoming credits (e.g., next semester)</li>
          <li>• The planner calculates the required future GPA using: (Target × Total - Current × Completed) / Upcoming</li>
          <li>• Results show whether your target is reachable, requires maximum GPA, or is impossible</li>
        </ul>
        {currentConfig?.source && (
          <p className="mt-3 text-xs text-zinc-500">
            Source: {currentConfig.source.title} ({currentConfig.source.dateAccessed})
          </p>
        )}
        <p className="mt-3 text-sm text-zinc-600">
          <a href="/gpa-simulator" className="text-zinc-900 underline hover:text-zinc-700">Try the GPA What-If Simulator</a> to compare baseline vs. hypothetical grades.
        </p>
      </div>
    </div>
  );
}