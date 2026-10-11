"use client";

import { getUniversityConfig, SupportedUniversityId } from "@/lib/universities";

interface CgpaResultProps {
  cgpa: number | null;
  courseCount: number;
  validCourseCount: number;
  universityId: SupportedUniversityId;
  onCopySummary: () => void;
  copyStatus: "idle" | "copied" | "shared" | "error";
}

export function CgpaResult({
  cgpa,
  courseCount,
  validCourseCount,
  universityId,
  onCopySummary,
  copyStatus,
}: CgpaResultProps) {
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
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onCopySummary}
          disabled={copyStatus !== "idle"}
          className="btn-secondary flex items-center gap-2"
          aria-busy={copyStatus !== "idle"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v12a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          </svg>
          <span>
            {copyStatus === "copied" && "Copied!"}
            {copyStatus === "shared" && "Shared!"}
            {copyStatus === "error" && "Failed"}
            {copyStatus === "idle" && "Copy Summary"}
          </span>
        </button>
        <button
          type="button"
          onClick={onCopySummary}
          disabled={copyStatus !== "idle"}
          className="btn-secondary flex items-center gap-2"
          aria-busy={copyStatus !== "idle"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>
            {copyStatus === "shared" && "Shared!"}
            {copyStatus === "idle" && "Share Result"}
          </span>
        </button>
      </div>
    </div>
  );
}