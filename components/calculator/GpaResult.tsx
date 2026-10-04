"use client";

interface GpaResultProps {
  gpa: number | null;
  courseCount: number;
  validCourseCount: number;
}

export function GpaResult({ gpa, courseCount, validCourseCount }: GpaResultProps) {
  if (gpa === null) {
    return (
      <div className="card p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-zinc-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-zinc-900 mb-2">Add courses to calculate</h2>
        <p className="text-zinc-500 text-sm">
          Enter at least one course with credits and a valid grade to see your semester GPA.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-8 text-center">
      <h2 className="text-lg font-medium text-zinc-900 mb-2">Your Semester GPA</h2>
      <div className="text-5xl font-bold text-zinc-900 mb-4 font-mono">
        {gpa.toFixed(2)}
      </div>
      <div className="text-sm text-zinc-500">
        {courseCount === 1
          ? "1 course"
          : `${courseCount} courses`}
        {validCourseCount !== courseCount && (
          <>
            &nbsp;·&nbsp;
            {validCourseCount === 1
              ? "1 course included in GPA"
              : `${validCourseCount} courses included in GPA`}
          </>
        )}
      </div>
    </div>
  );
}