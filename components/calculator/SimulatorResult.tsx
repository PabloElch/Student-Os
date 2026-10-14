"use client";

interface SimulatorResultProps {
  baselineGPA: number | null;
  hypotheticalGPA: number | null;
  difference: number | null;
  status: "improved" | "decreased" | "unchanged" | "incomplete";
  baselineQualityPoints: number;
  hypotheticalQualityPoints: number;
  totalCredits: number;
  validCourseCount: number;
}

const statusColors: Record<string, string> = {
  improved: "text-success bg-success-light border-success",
  decreased: "text-error bg-error-light border-error",
  unchanged: "text-neutral bg-ivory border-border",
  incomplete: "text-neutral bg-ivory border-border",
};

const statusLabels: Record<string, string> = {
  improved: "Improved",
  decreased: "Decreased",
  unchanged: "Unchanged",
  incomplete: "Incomplete",
};

const statusDescriptions: Record<string, string> = {
  improved: "Your hypothetical GPA is higher than your baseline.",
  decreased: "Your hypothetical GPA is lower than your baseline.",
  unchanged: "Your hypothetical GPA matches your baseline.",
  incomplete: "Add courses with both baseline and hypothetical grades to compare.",
};

export function SimulatorResult({
  baselineGPA,
  hypotheticalGPA,
  difference,
  status,
  baselineQualityPoints,
  hypotheticalQualityPoints,
  totalCredits,
  validCourseCount,
}: SimulatorResultProps) {
  if (baselineGPA === null && hypotheticalGPA === null) {
    return (
      <div className="card p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-ivory rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-neutral-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-charcoal mb-2">Add courses to compare</h2>
        <p className="text-neutral text-sm">
          Enter at least one course with credits and both baseline and hypothetical grades to see the comparison.
        </p>
      </div>
    );
  }

  const statusColor = statusColors[status] || statusColors.incomplete;
  const statusLabel = statusLabels[status] || statusLabels.incomplete;
  const statusDescription = statusDescriptions[status] || statusDescriptions.incomplete;

  const diffDisplay = difference !== null
    ? `${difference > 0 ? "+" : ""}${difference.toFixed(2)}`
    : "—";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-neutral uppercase tracking-wider mb-2">Baseline GPA</h3>
          <div className="text-4xl font-bold text-charcoal font-mono">
            {baselineGPA !== null ? baselineGPA.toFixed(2) : "—"}
          </div>
          <p className="text-xs text-neutral mt-1">
            {baselineQualityPoints.toFixed(2)} quality points / {totalCredits} credits
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-neutral uppercase tracking-wider mb-2">Hypothetical GPA</h3>
          <div className="text-4xl font-bold text-charcoal font-mono">
            {hypotheticalGPA !== null ? hypotheticalGPA.toFixed(2) : "—"}
          </div>
          <p className="text-xs text-neutral mt-1">
            {hypotheticalQualityPoints.toFixed(2)} quality points / {totalCredits} credits
          </p>
        </div>
      </div>

      <div className={`card p-6 border ${statusColor}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
              {statusLabel}
            </div>
            <span className="text-lg font-mono font-semibold text-charcoal">
              Difference: {diffDisplay}
            </span>
          </div>
          <p className="text-sm text-neutral sm:text-right">{statusDescription}</p>
        </div>
      </div>

      {validCourseCount > 0 && (
        <div className="card p-4 bg-ivory border-border">
          <h4 className="font-medium text-charcoal mb-2">Summary</h4>
          <ul className="space-y-1 text-sm text-neutral">
            <li>{validCourseCount} course{validCourseCount !== 1 ? "s" : ""} included in calculation</li>
            <li>Total credits: {totalCredits}</li>
            <li>Baseline quality points: {baselineQualityPoints.toFixed(2)}</li>
            <li>Hypothetical quality points: {hypotheticalQualityPoints.toFixed(2)}</li>
          </ul>
        </div>
      )}
    </div>
  );
}