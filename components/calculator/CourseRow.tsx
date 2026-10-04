"use client";

import { getGradePointForUniversity, isNonGpaGradeForUniversity, SupportedUniversityId } from "@/lib/universities";

interface CourseRowProps {
  index: number;
  universityId: SupportedUniversityId;
  name: string;
  credits: string;
  grade: string;
  onNameChange: (index: number, name: string) => void;
  onCreditsChange: (index: number, credits: string) => void;
  onGradeChange: (index: number, grade: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  creditsError?: string;
}

const gradeDisplayNames: Record<string, string> = {
  A: "A (Excellent)",
  "A-": "A- (Excellent)",
  "A+": "A+ (Exceptional)",
  B: "B (Good)",
  "B+": "B+ (Very Good)",
  "B-": "B- (Good)",
  C: "C (Satisfactory)",
  "C+": "C+ (Satisfactory)",
  "C-": "C- (Passing)",
  D: "D (Passing)",
  "D+": "D+ (Passing)",
  "D-": "D- (Passing)",
  F: "F (Fail)",
  FX: "FX (Fail - Supplementary)",
  P: "P (Pass)",
  W: "W (Withdrawn)",
  I: "I (Incomplete)",
  NG: "NG (No Grade)",
  DO: "DO (Drop Out)",
  AU: "AU (Audit)",
  CR: "CR (Credit)",
  S: "S (Satisfactory)",
  U: "U (Unsatisfactory)",
  E: "E (Fail)",
};

export function CourseRow({
  index,
  universityId,
  name,
  credits,
  grade,
  onNameChange,
  onCreditsChange,
  onGradeChange,
  onRemove,
  canRemove,
  creditsError,
}: CourseRowProps) {
  const config = getGradePointForUniversity(universityId, "") !== null
    ? true
    : false;

  const gradeOptions = [
    { value: "", label: "Select grade" },
    ...Object.entries(gradeDisplayNames).map(([value, label]) => ({ value, label })),
  ];

  const gradePoint = grade ? getGradePointForUniversity(universityId, grade) : null;
  const isNonGpaGrade = grade ? isNonGpaGradeForUniversity(universityId, grade) : false;
  const hasGrade = grade && gradePoint !== null;

  return (
    <div className="space-y-3 p-4 bg-white border border-zinc-200 rounded-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-medium text-zinc-900">Course {index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label={`Remove course ${index + 1}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor={`course-name-${index}`} className="block text-xs font-medium text-zinc-700 mb-1">
            Course name (optional)
          </label>
          <input
            type="text"
            id={`course-name-${index}`}
            value={name}
            onChange={(e) => onNameChange(index, e.target.value)}
            placeholder="e.g., Calculus I"
            className="input-base"
            maxLength={100}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor={`course-credits-${index}`} className="block text-xs font-medium text-zinc-700 mb-1">
              Credits
            </label>
            <input
              type="number"
              id={`course-credits-${index}`}
              value={credits}
              onChange={(e) => onCreditsChange(index, e.target.value)}
              placeholder="3"
              step="0.5"
              min="0.5"
              className={`input-base ${creditsError ? "border-red-500 focus:ring-red-500" : ""}`}
              aria-invalid={!!creditsError}
              aria-describedby={creditsError ? `credits-error-${index}` : undefined}
            />
            {creditsError && (
              <p id={`credits-error-${index}`} className="mt-1 text-xs text-red-600" role="alert">
                {creditsError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`course-grade-${index}`} className="block text-xs font-medium text-zinc-700 mb-1">
              Grade
            </label>
            <select
              id={`course-grade-${index}`}
              value={grade}
              onChange={(e) => onGradeChange(index, e.target.value)}
              className="select-base"
              disabled={!config}
            >
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {!config && (
              <p className="mt-1 text-xs text-zinc-500">
                Grading scale not available for this university
              </p>
            )}
          </div>
        </div>

        {(grade && !hasGrade) || (grade && isNonGpaGrade) ? (
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                {isNonGpaGrade
                  ? `${grade} — Not included in GPA calculation`
                  : `Grade "${grade}" is not recognized for ${universityId}`}
              </span>
            </div>
          </div>
        ) : grade && hasGrade && !isNonGpaGrade ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-green-800">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Grade point: {gradePoint?.toFixed(2)}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}