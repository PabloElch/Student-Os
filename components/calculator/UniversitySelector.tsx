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
  verified: "bg-green-100 text-green-800",
  "partially-verified": "bg-amber-100 text-amber-800",
  "needs-verification": "bg-zinc-100 text-zinc-800",
};

export function UniversitySelector({ selectedUniversity, onChange }: UniversitySelectorProps) {
  const universities = getAllUniversityConfigs();

  return (
    <div className="space-y-2">
      <label htmlFor="university-select" className="block text-sm font-medium text-zinc-900">
        University
      </label>
      <div className="relative">
        <select
          id="university-select"
          value={selectedUniversity}
          onChange={(e) => onChange(e.target.value as SupportedUniversityId)}
          className="select-base appearance-none pr-10 w-full"
          aria-describedby="university-status"
        >
          {universities.map((university) => (
            <option key={university.id} value={university.id}>
              {universityDisplayNames[university.id as SupportedUniversityId]}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <p id="university-status" className="text-xs text-zinc-500" role="status" aria-live="polite">
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