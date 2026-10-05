"use client";

import { RequiredGPAResult } from "@/lib/calculations/planner";

interface PlannerResultProps {
  result: RequiredGPAResult | null;
  upcomingCredits: number | null;
  targetCGPA: number | null;
  currentCGPA: number | null;
}

export function PlannerResult({
  result,
  upcomingCredits,
  targetCGPA,
  currentCGPA,
}: PlannerResultProps) {
  if (!result) {
    return (
      <div className="card p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-zinc-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-zinc-900 mb-2">Enter your details to calculate</h2>
        <p className="text-zinc-500 text-sm">
          Fill in your current CGPA, completed credits, target CGPA, and upcoming credits.
        </p>
      </div>
    );
  }

  const { requiredGPA, maxGradePoint, status } = result;

  switch (status) {
    case "already-achieved":
      return (
        <div className="card p-8 text-center">
          <h2 className="text-lg font-medium text-green-800 mb-2">Target already reached</h2>
          <div className="text-5xl font-bold text-green-700 mb-4 font-mono">
            ✓
          </div>
          <div className="text-sm text-zinc-500">
            {currentCGPA !== null && targetCGPA !== null && (
              <>
                Your current CGPA of <span className="font-medium">{currentCGPA.toFixed(2)}</span> is already above your target of{" "}
                <span className="font-medium">{targetCGPA.toFixed(2)}</span>.
              </>
            )}
          </div>
        </div>
      );

    case "maximum":
      return (
        <div className="card p-8 text-center">
          <h2 className="text-lg font-medium text-zinc-900 mb-2">Required GPA</h2>
          <div className="text-5xl font-bold text-zinc-900 mb-4 font-mono">
            {requiredGPA.toFixed(2)}
          </div>
          <div className="text-sm text-zinc-600">
            <p className="mb-2">
              Your target is reachable, but you&apos;ll need the maximum possible GPA across your upcoming credits.
            </p>
            {upcomingCredits && targetCGPA && (
              <p>
                You need an average GPA of <span className="font-medium">{requiredGPA.toFixed(2)}</span> across your next{" "}
                <span className="font-medium">{upcomingCredits}</span> credits to reach a{" "}
                <span className="font-medium">{targetCGPA.toFixed(2)}</span> CGPA.
              </p>
            )}
          </div>
        </div>
      );

    case "impossible":
      return (
        <div className="card p-8 text-center">
          <h2 className="text-lg font-medium text-red-800 mb-2">Target not reachable</h2>
          <div className="text-5xl font-bold text-red-600 mb-4 font-mono">
            {requiredGPA.toFixed(2)}
          </div>
          <div className="text-sm text-zinc-600">
            <p className="mb-2">
              This target isn&apos;t reachable within the next {upcomingCredits} credits because the maximum GPA is{" "}
              {maxGradePoint !== null ? maxGradePoint.toFixed(2) : "unknown"}.
            </p>
            {targetCGPA && maxGradePoint !== null && (
              <p>
                To reach <span className="font-medium">{targetCGPA.toFixed(2)}</span>, you would need a{" "}
                <span className="font-medium">{requiredGPA.toFixed(2)}</span> GPA, which exceeds the maximum of{" "}
                <span className="font-medium">{maxGradePoint.toFixed(2)}</span>.
              </p>
            )}
          </div>
        </div>
      );

    case "reachable":
    default:
      return (
        <div className="card p-8 text-center">
          <h2 className="text-lg font-medium text-zinc-900 mb-2">Required GPA</h2>
          <div className="text-5xl font-bold text-zinc-900 mb-4 font-mono">
            {requiredGPA.toFixed(2)}
          </div>
          <div className="text-sm text-zinc-600">
            {upcomingCredits && targetCGPA && (
              <p>
                You need an average GPA of <span className="font-medium">{requiredGPA.toFixed(2)}</span> across your next{" "}
                <span className="font-medium">{upcomingCredits}</span> credits to reach a{" "}
                <span className="font-medium">{targetCGPA.toFixed(2)}</span> CGPA.
              </p>
            )}
          </div>
        </div>
      );
  }
}