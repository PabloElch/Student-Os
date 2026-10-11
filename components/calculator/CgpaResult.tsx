"use client";

import { getUniversityConfig, SupportedUniversityId } from "@/lib/universities";

interface CgpaResultProps {
  cgpa: number | null;
  courseCount: number;
  validCourseCount: number;
  universityId: SupportedUniversityId;
}

export function CgpaResult({ cgpa, courseCount, validCourseCount, universityId }: CgpaResultProps) {
  const config = getUniversityConfig(universityId);
  const maxGradePoint = config?.gradingScale.length > 0
    ? Math.max(...config.gradingScale.map((g) => g.points))
    : null;

  if (cgpa === null) {
    return (
      <div className="card p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-ivory rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-neutral-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-charcoal mb-2">Add courses to calculate</h2>
        <p className="text-neutral text-sm">
          Enter at least one course with credits and a valid grade to see your CGPA.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-8 text-center">
      <h2 className="text-lg font-medium text-charcoal mb-2">Your CGPA</h2>
      <div className="text-5xl md:text-6xl font-bold text-forest mb-2 font-mono flex items-baseline justify-center gap-2">
        <span>{cgpa.toFixed(2)}</span>
        {maxGradePoint !== null && (
          <span className="text-2xl font-normal text-neutral">/ {maxGradePoint.toFixed(2)}</span>
        )}
      </div>
      <div className="text-sm text-neutral">
        {courseCount === 1 ? "1 course" : `${courseCount} courses`}
        {validCourseCount !== courseCount && (
          <>
            &nbsp;·&nbsp;
            {validCourseCount === 1
              ? "1 course included in CGPA"
              : `${validCourseCount} courses included in CGPA`}
          </>
        )}
      </div>
    </div>
  );
}