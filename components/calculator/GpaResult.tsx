"use client";

import { BiggestBoostResult } from "@/lib/calculations/biggest-boost";

interface GpaResultProps {
  gpa: number | null;
  courseCount: number;
  validCourseCount: number;
  totalCredits: number;
  totalQualityPoints: number;
  onCopySummary: () => void;
  onShareResult: () => void;
  copyStatus: "idle" | "copied" | "shared" | "error";
  biggestBoost: BiggestBoostResult | null;
}

export function GpaResult({
  gpa,
  courseCount,
  validCourseCount,
  totalCredits,
  totalQualityPoints,
  onCopySummary,
  onShareResult,
  copyStatus,
  biggestBoost,
}: GpaResultProps) {
  if (gpa === null) {
    return (
      <div className="card p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-3 bg-ivory-muted rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-stone-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-base font-medium text-ink mb-1">Add courses to calculate</h2>
        <p className="text-stone text-sm leading-relaxed">
          Enter at least one course with credits and a valid grade to see your semester GPA.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 text-center space-y-4">
      <h2 className="text-base font-medium text-ink">Your Semester GPA</h2>
      <div className="result-value">
        {gpa.toFixed(2)}
      </div>
      <div className="text-sm text-stone leading-relaxed">
        {courseCount === 1 ? "1 course" : `${courseCount} courses`}
        {validCourseCount !== courseCount && (
          <>
            &nbsp;·&nbsp;
            {validCourseCount === 1 ? "1 course included in GPA" : `${validCourseCount} courses included in GPA`}
          </>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 pt-3 border-t border-line">
        <div className="text-center p-2.5 bg-ivory-muted rounded-lg">
          <div className="text-xl font-bold text-ink font-mono">{totalCredits.toFixed(1)}</div>
          <div className="text-xs text-stone">Total Credits</div>
        </div>
        <div className="text-center p-2.5 bg-ivory-muted rounded-lg relative group">
          <div className="text-xl font-bold text-ink font-mono">{totalQualityPoints.toFixed(2)}</div>
          <div className="text-xs text-stone">Quality Points</div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-ink text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
            Sum of grade points × course credits
          </div>
        </div>
      </div>

      {biggestBoost && biggestBoost.increase > 0 && (
        <div className="pt-3 border-t border-line text-left">
          <h3 className="text-sm font-semibold text-ink mb-1.5">Biggest boost</h3>
          <p className="text-sm text-stone leading-relaxed">
            Improve <strong className="text-ink">{biggestBoost.courseName}</strong> from{" "}
            <strong className="text-ink">{biggestBoost.currentGrade}</strong> to{" "}
            <strong className="text-bronze">{biggestBoost.targetGrade}</strong>. Your semester GPA would increase from{" "}
            <strong className="text-ink">{gpa.toFixed(2)}</strong> to{" "}
            <strong className="text-bronze">{biggestBoost.newGPA.toFixed(2)}</strong>{" "}
            (<strong className="text-bronze">+{biggestBoost.increase.toFixed(2)}</strong>).
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
        <button
          type="button"
          onClick={onCopySummary}
          disabled={copyStatus !== "idle"}
          className="btn-secondary flex items-center gap-1.5 text-sm px-3 py-2"
          aria-busy={copyStatus !== "idle"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v12a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          </svg>
          <span>
            {copyStatus === "copied" && "Copied!"}
            {copyStatus === "error" && "Failed"}
            {copyStatus === "idle" && "Copy Summary"}
          </span>
        </button>
        <button
          type="button"
          onClick={onShareResult}
          disabled={copyStatus !== "idle"}
          className="btn-secondary flex items-center gap-1.5 text-sm px-3 py-2"
          aria-busy={copyStatus !== "idle"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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