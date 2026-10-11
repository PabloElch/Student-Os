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
        <div className="w-20 h-20 mx-auto mb-4 bg-ivory rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-neutral-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-charcoal mb-2">Enter your details to calculate</h2>
        <p className="text-neutral text-sm">
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
          <div className="w-20 h-20 mx-auto mb-4 bg-success-bg rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-success mb-2">Target already reached</h2>
          <div className="text-5xl font-bold text-success mb-4 font-mono">
            ✓
          </div>
          <div className="text-sm text-neutral">
            {currentCGPA !== null && targetCGPA !== null && (
              <>
                Your current CGPA of <span className="font-medium text-charcoal">{currentCGPA.toFixed(2)}</span> is already above your target of{" "}
                <span className="font-medium text-charcoal">{targetCGPA.toFixed(2)}</span>.
              </>
            )}
          </div>
        </div>
      );

    case "maximum":
      return (
        <div className="card p-8 text-center">
          <h2 className="text-lg font-medium text-charcoal mb-2">Required GPA</h2>
          <div className="text-5xl font-bold text-forest mb-4 font-mono">
            {requiredGPA.toFixed(2)}
          </div>
          <div className="text-sm text-neutral">
            <p className="mb-2">
              Your target is reachable, but you&apos;ll need the maximum possible GPA across your upcoming credits.
            </p>
            {upcomingCredits && targetCGPA && (
              <p>
                You need an average GPA of <span className="font-medium text-charcoal">{requiredGPA.toFixed(2)}</span> across your next{" "}
                <span className="font-medium text-charcoal">{upcomingCredits}</span> credits to reach a{" "}
                <span className="font-medium text-charcoal">{targetCGPA.toFixed(2)}</span> CGPA.
              </p>
            )}
          </div>
        </div>
      );

    case "impossible":
      return (
        <div className="card p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-error-light rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-error" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-error mb-2">Target not reachable</h2>
          <div className="text-5xl font-bold text-error mb-4 font-mono">
            {requiredGPA.toFixed(2)}
          </div>
          <div className="text-sm text-neutral">
            <p className="mb-2">
              This target isn&apos;t reachable within the next {upcomingCredits} credits because the maximum GPA is{" "}
              {maxGradePoint !== null ? maxGradePoint.toFixed(2) : "unknown"}.
            </p>
            {targetCGPA && maxGradePoint !== null && (
              <p>
                To reach <span className="font-medium text-charcoal">{targetCGPA.toFixed(2)}</span>, you would need a{" "}
                <span className="font-medium text-charcoal">{requiredGPA.toFixed(2)}</span> GPA, which exceeds the maximum of{" "}
                <span className="font-medium text-charcoal">{maxGradePoint.toFixed(2)}</span>.
              </p>
            )}
          </div>
        </div>
      );

    case "reachable":
    default:
      return (
        <div className="card p-8 text-center">
          <h2 className="text-lg font-medium text-charcoal mb-2">Required GPA</h2>
          <div className="text-5xl font-bold text-forest mb-4 font-mono">
            {requiredGPA.toFixed(2)}
          </div>
          <div className="text-sm text-neutral">
            {upcomingCredits && targetCGPA && (
              <p>
                You need an average GPA of <span className="font-medium text-charcoal">{requiredGPA.toFixed(2)}</span> across your next{" "}
                <span className="font-medium text-charcoal">{upcomingCredits}</span> credits to reach a{" "}
                <span className="font-medium text-charcoal">{targetCGPA.toFixed(2)}</span> CGPA.
              </p>
            )}
          </div>
        </div>
      );
  }
}