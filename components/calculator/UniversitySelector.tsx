"use client";

import { getAllUniversityConfigs, SupportedUniversityId } from "@/lib/universities";

interface UniversitySelectorProps {
  selectedUniversity: SupportedUniversityId;
  onChange: (university: SupportedUniversityId) => void;
}

const universityDisplayNames: Record<SupportedUniversityId, string> = {
  jimma: "Jimma University",
  "addis-ababa": "Addis Ababa University",
  "bahir-dar": "Bahir Dar University",
  hawassa: "Hawassa University",
  haramaya: "Haramaya University",
};

const universityStatuses: Record<SupportedUniversityId, "verified" | "partially-verified" | "needs-verification"> = {
  jimma: "partially-verified",
  "addis-ababa": "needs-verification",
  "bahir-dar": "partially-verified",
  hawassa: "verified",
  haramaya: "needs-verification",
};

const statusLabels: Record<string, string> = {
  verified: "Verified",
  "partially-verified": "Partially verified",
  "needs-verification": "Needs verification",
};

const statusColors: Record<string, string> = {
  verified: "bg-success-bg text-success",
  "partially-verified": "bg-warning-bg text-warning",
  "needs-verification": "bg-ivory text-neutral",
};

export function UniversitySelector({ selectedUniversity, onChange }: UniversitySelectorProps) {
  const universities = getAllUniversityConfigs();

  return (
    <div className="space-y-2">
      <label htmlFor="university-select" className="label-base">
        University
      </label>
      <div className="relative">
        <select
          id="university-select"
          value={selectedUniversity}
          onChange={(e) => onChange(e.target.value as SupportedUniversityId)}
          className="select-base"
          aria-describedby="university-status"
        >
          {universities.map((university) => (
            <option key={university.id} value={university.id}>
              {universityDisplayNames[university.id as SupportedUniversityId]}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p id="university-status" className="text-xs text-neutral" role="status" aria-live="polite">
        {universityStatuses[selectedUniversity] && (
          <>
            <span className={`inline-flex items-center px-2 py-0.5 rounded ${statusColors[statusLabels[universityStatuses[selectedUniversity]]]}`}>
              {statusLabels[universityStatuses[selectedUniversity]]}
            </span>
            {" "}
            <span className="hidden sm:inline">
              {universityStatuses[selectedUniversity] === "verified"
                ? "Grading scale and calculation rules verified from official sources."
                : universityStatuses[selectedUniversity] === "partially-verified"
                ? "Some academic rules are still being verified."
                : "Grading scale not yet verified. Calculator may not be fully accurate."}
            </span>
          </>
        )}
      </p>
    </div>
  );
}