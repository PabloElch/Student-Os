"use client";

import { getGradePointForUniversity, isNonGpaGradeForUniversity, SupportedUniversityId } from "@/lib/universities";

interface CourseInput {
  id: string;
  name: string;
  credits: string;
  baselineGrade: string;
  hypotheticalGrade: string;
}

interface SimulatorCourseRowProps {
  course: CourseInput;
  universityId: SupportedUniversityId;
  gradeOptions: { value: string; label: string; points: number }[];
  creditsError?: string;
  onNameChange: (id: string, name: string) => void;
  onCreditsChange: (id: string, credits: string) => void;
  onBaselineGradeChange: (id: string, grade: string) => void;
  onHypotheticalGradeChange: (id: string, grade: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

function getGradeInfo(universityId: SupportedUniversityId, grade: string) {
  const gradePoint = grade ? getGradePointForUniversity(universityId, grade) : null;
  const isNonGpaGrade = grade ? isNonGpaGradeForUniversity(universityId, grade) : false;
  const hasGrade = grade && gradePoint !== null;
  return { gradePoint, isNonGpaGrade, hasGrade };
}

export function SimulatorCourseRow({
  course,
  universityId,
  gradeOptions,
  creditsError,
  onNameChange,
  onCreditsChange,
  onBaselineGradeChange,
  onHypotheticalGradeChange,
  onRemove,
  canRemove,
}: SimulatorCourseRowProps) {
  const baselineInfo = getGradeInfo(universityId, course.baselineGrade);
  const hypotheticalInfo = getGradeInfo(universityId, course.hypotheticalGrade);

  return (
    <div className="bg-white">
      <div className="grid gap-3 sm:grid-cols-[1fr_80px_140px_140px_50px] gap-x-4 px-4 py-3 items-start">
        <div className="space-y-2">
          <label htmlFor={`course-name-${course.id}`} className="block text-xs font-medium text-neutral sm:hidden">
            Course name
          </label>
          <input
            type="text"
            id={`course-name-${course.id}`}
            value={course.name}
            onChange={(e) => onNameChange(course.id, e.target.value)}
            placeholder="e.g., Calculus I"
            className="input-base w-full"
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`course-credits-${course.id}`} className="block text-xs font-medium text-neutral sm:hidden">
            Credits
          </label>
          <div className="relative">
            <input
              type="number"
              id={`course-credits-${course.id}`}
              value={course.credits}
              onChange={(e) => onCreditsChange(course.id, e.target.value)}
              placeholder="3"
              step="0.5"
              min="0.5"
              className={`input-base w-full sm:w-[80px] text-right ${creditsError ? "border-error focus:ring-error" : ""}`}
              aria-invalid={!!creditsError}
              aria-describedby={creditsError ? `credits-error-${course.id}` : undefined}
            />
            {creditsError && (
              <p id={`credits-error-${course.id}`} className="absolute -bottom-5 left-0 text-xs text-error sm:static sm:mt-1" role="alert">
                {creditsError}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={`course-baseline-grade-${course.id}`} className="block text-xs font-medium text-neutral sm:hidden">
            Baseline Grade
          </label>
          <div className="relative">
            <select
              id={`course-baseline-grade-${course.id}`}
              value={course.baselineGrade}
              onChange={(e) => onBaselineGradeChange(course.id, e.target.value)}
              className="select-base w-full sm:w-[140px]"
              disabled={gradeOptions.length <= 1}
            >
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {gradeOptions.length <= 1 && (
              <p className="absolute -bottom-5 left-0 text-xs text-neutral sm:static sm:mt-1">
                No grading scale available
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={`course-hypothetical-grade-${course.id}`} className="block text-xs font-medium text-neutral sm:hidden">
            Hypothetical Grade
          </label>
          <div className="relative">
            <select
              id={`course-hypothetical-grade-${course.id}`}
              value={course.hypotheticalGrade}
              onChange={(e) => onHypotheticalGradeChange(course.id, e.target.value)}
              className="select-base w-full sm:w-[140px]"
              disabled={gradeOptions.length <= 1}
            >
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {gradeOptions.length <= 1 && (
              <p className="absolute -bottom-5 left-0 text-xs text-neutral sm:static sm:mt-1">
                No grading scale available
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start justify-end sm:justify-start pt-1">
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(course.id)}
              className="p-2 text-neutral hover:text-charcoal hover:bg-ivory rounded-lg transition-colors sm:ml-2"
              aria-label={`Remove ${course.name || "course"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="sm:hidden">
        <div className="px-4 py-3 space-y-2">
          <div className="flex items-center gap-2 text-xs text-neutral-light">
            <span>Course {course.name ? `"${course.name}"` : "untitled"}</span>
            <span className="flex-1"></span>
            {course.credits && (
              <span className="font-medium text-neutral">{course.credits} credits</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-24 text-neutral">Baseline:</span>
            {course.baselineGrade && !baselineInfo.hasGrade && (
              <span className="text-error">Grade not recognized</span>
            )}
            {course.baselineGrade && baselineInfo.isNonGpaGrade && (
              <span className="text-warning">{course.baselineGrade} — Not in GPA</span>
            )}
            {course.baselineGrade && baselineInfo.hasGrade && !baselineInfo.isNonGpaGrade && (
              <span className="text-success">Grade point: {baselineInfo.gradePoint?.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-24 text-neutral">Hypothetical:</span>
            {course.hypotheticalGrade && !hypotheticalInfo.hasGrade && (
              <span className="text-error">Grade not recognized</span>
            )}
            {course.hypotheticalGrade && hypotheticalInfo.isNonGpaGrade && (
              <span className="text-warning">{course.hypotheticalGrade} — Not in GPA</span>
            )}
            {course.hypotheticalGrade && hypotheticalInfo.hasGrade && !hypotheticalInfo.isNonGpaGrade && (
              <span className="text-success">Grade point: {hypotheticalInfo.gradePoint?.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>

      {(course.baselineGrade && !baselineInfo.hasGrade) || (course.baselineGrade && baselineInfo.isNonGpaGrade) || (course.hypotheticalGrade && !hypotheticalInfo.hasGrade) || (course.hypotheticalGrade && hypotheticalInfo.isNonGpaGrade) ? (
        <div className="px-4 pb-3 sm:hidden">
          <div className="p-3 bg-ivory border-t border-border rounded-b-xl">
            <div className="flex items-center gap-2 text-xs text-neutral">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                {course.baselineGrade && !baselineInfo.hasGrade && `Baseline grade "${course.baselineGrade}" not recognized`}
                {course.baselineGrade && baselineInfo.isNonGpaGrade && `${course.baselineGrade} — Not included in GPA calculation`}
                {course.hypotheticalGrade && !hypotheticalInfo.hasGrade && `Hypothetical grade "${course.hypotheticalGrade}" not recognized`}
                {course.hypotheticalGrade && hypotheticalInfo.isNonGpaGrade && `${course.hypotheticalGrade} — Not included in GPA calculation`}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}