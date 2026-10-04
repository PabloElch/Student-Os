export interface GradeRule {
  letter: string;
  points: number;
  minimumMark?: number;
  maximumMark?: number;
}

export interface CreditSystem {
  unit: string;
  ectsConversion?: number;
}

export interface CalculationPolicy {
  repeatCoursePolicy: string;
  passFailPolicy: string;
  withdrawalPolicy: string;
  incompletePolicy: string;
  transferPolicy: string;
}

export interface SourceReference {
  title: string;
  url?: string;
  documentType: "senate-legislation" | "academic-regulations" | "student-handbook" | "registrar-document" | "official-website" | "curriculum-document" | "ministry-of-education" | "other";
  dateAccessed: string;
  datePublished?: string;
  version?: string;
}

export interface UniversityRules {
  id: string;
  name: string;
  gradingScale: GradeRule[];
  creditSystem: CreditSystem;
  calculationPolicy: CalculationPolicy;
  source: SourceReference;
  status: "verified" | "partially-verified" | "needs-verification";
  notes?: string;
}