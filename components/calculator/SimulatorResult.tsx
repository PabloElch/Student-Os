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
  improved: "text-green-700 bg-green-50 border-green-200",
  decreased: "text-red-700 bg-red-50 border-red-200",
  unchanged: "text-zinc-700 bg-zinc-50 border-zinc-200",
  incomplete: "text-zinc-700 bg-zinc-50 border-zinc-200",
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
        <div className="w-20 h-20 mx-auto mb-4 bg-zinc-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-zinc-900 mb-2">Add courses to compare</h2>
        <p className="text-zinc-500 text-sm">
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
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Baseline GPA</h3>
          <div className="text-4xl font-bold text-zinc-900 font-mono">
            {baselineGPA !== null ? baselineGPA.toFixed(2) : "—"}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            {baselineQualityPoints.toFixed(2)} quality points / {totalCredits} credits
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Hypothetical GPA</h3>
          <div className="text-4xl font-bold text-zinc-900 font-mono">
            {hypotheticalGPA !== null ? hypotheticalGPA.toFixed(2) : "—"}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            {hypotheticalQualityPoints.toFixed(2)} quality points / {totalCredits} credits
          </p>
        </div>
      </div>

      <div className={`card p-6 border ${statusColor}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
              {statusLabel}
            </div>
            <span className="text-lg font-mono font-semibold text-zinc-900">
              Difference: {diffDisplay}
            </span>
          </div>
          <p className="text-sm text-zinc-600 md:text-right">{statusDescription}</p>
        </div>
      </div>

      {validCourseCount > 0 && (
        <div className="card p-4 bg-zinc-50 border-zinc-200">
          <h4 className="font-medium text-zinc-900 mb-2">Summary</h4>
          <ul className="space-y-1 text-sm text-zinc-600">
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