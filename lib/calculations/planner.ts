function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

export interface RequiredGPAInput {
  currentCGPA: number;
  completedCredits: number;
  targetCGPA: number;
  upcomingCredits: number;
}

export interface RequiredGPAResult {
  requiredGPA: number;
  maxGradePoint: number | null;
  status: "reachable" | "maximum" | "impossible" | "already-achieved";
}

export function calculateRequiredGPA(input: RequiredGPAInput): RequiredGPAResult {
  const { currentCGPA, completedCredits, targetCGPA, upcomingCredits } = input;

  if (!isFiniteNumber(currentCGPA) || currentCGPA < 0) {
    throw new Error("Current CGPA must be a finite non-negative number.");
  }
  if (!isFiniteNumber(completedCredits) || completedCredits <= 0) {
    throw new Error("Completed credits must be a finite number greater than zero.");
  }
  if (!isFiniteNumber(targetCGPA) || targetCGPA < 0) {
    throw new Error("Target CGPA must be a finite non-negative number.");
  }
  if (!isFiniteNumber(upcomingCredits) || upcomingCredits <= 0) {
    throw new Error("Upcoming credits must be a finite number greater than zero.");
  }

  if (currentCGPA >= targetCGPA) {
    return {
      requiredGPA: 0,
      maxGradePoint: null,
      status: "already-achieved",
    };
  }

  const requiredGPA = (targetCGPA * (completedCredits + upcomingCredits) - currentCGPA * completedCredits) / upcomingCredits;

  return {
    requiredGPA,
    maxGradePoint: null,
    status: "reachable",
  };
}

export function calculateRequiredGPAWithMax(
  input: RequiredGPAInput,
  maxGradePoint: number
): RequiredGPAResult {
  const { currentCGPA, completedCredits, targetCGPA, upcomingCredits } = input;

  if (!isFiniteNumber(currentCGPA) || currentCGPA < 0) {
    throw new Error("Current CGPA must be a finite non-negative number.");
  }
  if (!isFiniteNumber(completedCredits) || completedCredits <= 0) {
    throw new Error("Completed credits must be a finite number greater than zero.");
  }
  if (!isFiniteNumber(targetCGPA) || targetCGPA < 0) {
    throw new Error("Target CGPA must be a finite non-negative number.");
  }
  if (!isFiniteNumber(upcomingCredits) || upcomingCredits <= 0) {
    throw new Error("Upcoming credits must be a finite number greater than zero.");
  }
  if (!isFiniteNumber(maxGradePoint) || maxGradePoint <= 0) {
    throw new Error("Maximum grade point must be a finite positive number.");
  }

  if (currentCGPA >= targetCGPA) {
    return {
      requiredGPA: 0,
      maxGradePoint,
      status: "already-achieved",
    };
  }

  if (targetCGPA > maxGradePoint) {
    return {
      requiredGPA: (targetCGPA * (completedCredits + upcomingCredits) - currentCGPA * completedCredits) / upcomingCredits,
      maxGradePoint,
      status: "impossible",
    };
  }

  const requiredGPA = (targetCGPA * (completedCredits + upcomingCredits) - currentCGPA * completedCredits) / upcomingCredits;

  if (requiredGPA > maxGradePoint) {
    return {
      requiredGPA,
      maxGradePoint,
      status: "impossible",
    };
  }

  if (requiredGPA === maxGradePoint || Math.abs(requiredGPA - maxGradePoint) < 0.00001) {
    return {
      requiredGPA: maxGradePoint,
      maxGradePoint,
      status: "maximum",
    };
  }

  return {
    requiredGPA,
    maxGradePoint,
    status: "reachable",
  };
}

export function getMaxGradePointFromConfig(config: { gradingScale?: { points: number }[] }): number | null {
  if (!config.gradingScale || config.gradingScale.length === 0) {
    return null;
  }
  return Math.max(...config.gradingScale.map((g) => g.points));
}