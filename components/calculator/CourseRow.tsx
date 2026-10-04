"use client";

import { getGradePointForUniversity, isNonGpaGradeForUniversity, SupportedUniversityId } from "@/lib/universities";

interface CourseInput {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

interface CourseRowProps {
  course: CourseInput;
  universityId: SupportedUniversityId;
  gradeOptions: { value: string; label: string; points: number }[];
  creditsError?: string;
  onNameChange: (id: string, name: string) => void;
  onCreditsChange: (id: string, credits: string) => void;
  onGradeChange: (id: string, grade: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function CourseRow({
  course,
  universityId,
  gradeOptions,
  creditsError,
  onNameChange,
  onCreditsChange,
  onGradeChange,
  onRemove,
  canRemove,
}: CourseRowProps) {
  const gradePoint = course.grade ? getGradePointForUniversity(universityId, course.grade) : null;
  const isNonGpaGrade = course.grade ? isNonGpaGradeForUniversity(universityId, course.grade) : false;
  const hasGrade = course.grade && gradePoint !== null;

  return (
    <div className="bg-white">
      <div className="md:grid md:grid-cols-[1fr_80px_140px_50px] gap-x-4 gap-y-3 px-4 py-3 items-start">
        <div className="space-y-2 md:space-y-0">
          <label htmlFor={`course-name-${course.id}`} className="block text-xs font-medium text-zinc-700 md:hidden">
            Course name
          </label>
          <input
            type="text"
            id={`course-name-${course.id}`}
            value={course.name}
            onChange={(e) => onNameChange(course.id, e.target.value)}
            placeholder="e.g., Calculus I"
            className="input-base w-full md:w-auto"
            maxLength={100}
          />
        </div>

        <div className="space-y-2 md:space-y-0 md:items-center">
          <label htmlFor={`course-credits-${course.id}`} className="block text-xs font-medium text-zinc-700 md:hidden">
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
              className={`input-base w-full md:w-[80px] text-right ${creditsError ? "border-red-500 focus:ring-red-500" : ""}`}
              aria-invalid={!!creditsError}
              aria-describedby={creditsError ? `credits-error-${course.id}` : undefined}
            />
            {creditsError && (
              <p id={`credits-error-${course.id}`} className="absolute -bottom-5 left-0 text-xs text-red-600 md:static md:mt-1" role="alert">
                {creditsError}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 md:space-y-0 md:items-center">
          <label htmlFor={`course-grade-${course.id}`} className="block text-xs font-medium text-zinc-700 md:hidden">
            Grade
          </label>
          <div className="relative">
            <select
              id={`course-grade-${course.id}`}
              value={course.grade}
              onChange={(e) => onGradeChange(course.id, e.target.value)}
              className="select-base w-full md:w-[140px]"
              disabled={gradeOptions.length <= 1}
            >
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {gradeOptions.length <= 1 && (
              <p className="absolute -bottom-5 left-0 text-xs text-zinc-500 md:static md:mt-1">
                No grading scale available
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start justify-end md:justify-start pt-1">
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(course.id)}
              className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors md:ml-2"
              aria-label={`Remove ${course.name || "course"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {(course.grade && !hasGrade) || (course.grade && isNonGpaGrade) ? (
        <div className="px-4 pb-3 md:hidden">
          <div className="p-3 bg-zinc-50 border-t border-zinc-200 rounded-b-xl">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                {isNonGpaGrade
                  ? `${course.grade} — Not included in GPA calculation`
                  : `Grade "${course.grade}" is not recognized`}
              </span>
            </div>
          </div>
        </div>
      ) : course.grade && hasGrade && !isNonGpaGrade ? (
        <div className="px-4 pb-3 md:hidden">
          <div className="p-3 bg-green-50 border-t border-zinc-200 rounded-b-xl">
            <div className="flex items-center gap-2 text-xs text-green-800">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Grade point: {gradePoint?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : null}

      <div className="md:hidden">
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Course {course.name ? `"${course.name}"` : "untitled"}</span>
            <span className="flex-1"></span>
            {course.credits && (
              <span className="font-medium text-zinc-600">{course.credits} credits</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}