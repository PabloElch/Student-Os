import { describe, it, expect } from "vitest";
import {
  calculateRequiredGPA,
  calculateRequiredGPAWithMax,
  getMaxGradePointFromConfig,
  RequiredGPAInput,
} from "./planner";

describe("calculateRequiredGPA", () => {
  describe("Already achieved target", () => {
    it("returns already-achieved when current CGPA equals target", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.8,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };

      const result = calculateRequiredGPA(input);
      expect(result.status).toBe("already-achieved");
      expect(result.requiredGPA).toBe(0);
    });

    it("returns already-achieved when current CGPA exceeds target", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.82,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };

      const result = calculateRequiredGPA(input);
      expect(result.status).toBe("already-achieved");
    });
  });

  describe("Reachable target", () => {
    it("calculates correct required GPA for reachable target", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 30,
        targetCGPA: 3.6,
        upcomingCredits: 30,
      };

      const result = calculateRequiredGPA(input);
      expect(result.status).toBe("reachable");
      expect(result.requiredGPA).toBeCloseTo(3.7, 5);
    });

    it("handles decimal values correctly", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.67,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };

      const result = calculateRequiredGPA(input);
      expect(result.status).toBe("reachable");
      expect(result.requiredGPA).toBeCloseTo(4.06, 2);
    });
  });

  describe("Invalid inputs", () => {
    it("throws for NaN current CGPA", () => {
      const input: RequiredGPAInput = {
        currentCGPA: NaN,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Current CGPA must be a finite non-negative number.");
    });

    it("throws for negative current CGPA", () => {
      const input: RequiredGPAInput = {
        currentCGPA: -1,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Current CGPA must be a finite non-negative number.");
    });

    it("throws for Infinity current CGPA", () => {
      const input: RequiredGPAInput = {
        currentCGPA: Infinity,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Current CGPA must be a finite non-negative number.");
    });

    it("throws for zero completed credits", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 0,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Completed credits must be a finite number greater than zero.");
    });

    it("throws for negative completed credits", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: -10,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Completed credits must be a finite number greater than zero.");
    });

    it("throws for NaN completed credits", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: NaN,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Completed credits must be a finite number greater than zero.");
    });

    it("throws for NaN target CGPA", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: NaN,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Target CGPA must be a finite non-negative number.");
    });

    it("throws for negative target CGPA", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: -1,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Target CGPA must be a finite non-negative number.");
    });

    it("throws for zero upcoming credits", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 0,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Upcoming credits must be a finite number greater than zero.");
    });

    it("throws for negative upcoming credits", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: -5,
      };
      expect(() => calculateRequiredGPA(input)).toThrow("Upcoming credits must be a finite number greater than zero.");
    });
  });
});

describe("calculateRequiredGPAWithMax", () => {
  const maxGradePoint = 4.0;

  describe("Already achieved target", () => {
    it("returns already-achieved when current CGPA equals target", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.8,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };

      const result = calculateRequiredGPAWithMax(input, maxGradePoint);
      expect(result.status).toBe("already-achieved");
      expect(result.maxGradePoint).toBe(maxGradePoint);
    });
  });

  describe("Target above maximum grade point", () => {
    it("returns impossible when target CGPA exceeds maximum", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: 4.1,
        upcomingCredits: 18,
      };

      const result = calculateRequiredGPAWithMax(input, maxGradePoint);
      expect(result.status).toBe("impossible");
      expect(result.maxGradePoint).toBe(maxGradePoint);
    });
  });

  describe("Required GPA exceeds maximum", () => {
    it("returns impossible when required GPA exceeds maximum", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.67,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };

      const result = calculateRequiredGPAWithMax(input, maxGradePoint);
      expect(result.status).toBe("impossible");
      expect(result.requiredGPA).toBeGreaterThan(maxGradePoint);
    });
  });

  describe("Required GPA equals maximum", () => {
    it("returns maximum when required GPA equals max grade point", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.0,
        completedCredits: 36,
        targetCGPA: 3.5,
        upcomingCredits: 36,
      };

      const result = calculateRequiredGPAWithMax(input, maxGradePoint);
      expect(result.status).toBe("maximum");
      expect(result.requiredGPA).toBe(maxGradePoint);
    });
  });

  describe("Reachable target", () => {
    it("returns reachable when required GPA is below maximum", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: 3.6,
        upcomingCredits: 36,
      };

      const result = calculateRequiredGPAWithMax(input, maxGradePoint);
      expect(result.status).toBe("reachable");
      expect(result.requiredGPA).toBeLessThan(maxGradePoint);
    });
  });

  describe("Invalid max grade point", () => {
    it("throws for NaN max grade point", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPAWithMax(input, NaN)).toThrow("Maximum grade point must be a finite positive number.");
    });

    it("throws for zero max grade point", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPAWithMax(input, 0)).toThrow("Maximum grade point must be a finite positive number.");
    });

    it("throws for negative max grade point", () => {
      const input: RequiredGPAInput = {
        currentCGPA: 3.5,
        completedCredits: 36,
        targetCGPA: 3.8,
        upcomingCredits: 18,
      };
      expect(() => calculateRequiredGPAWithMax(input, -1)).toThrow("Maximum grade point must be a finite positive number.");
    });
  });
});

describe("getMaxGradePointFromConfig", () => {
  it("returns max grade point from grading scale", () => {
    const config = {
      gradingScale: [
        { letter: "A", points: 4.0 },
        { letter: "B", points: 3.0 },
        { letter: "C", points: 2.0 },
      ],
    };
    expect(getMaxGradePointFromConfig(config)).toBe(4.0);
  });

  it("returns null for empty grading scale", () => {
    const config = { gradingScale: [] };
    expect(getMaxGradePointFromConfig(config)).toBeNull();
  });

  it("returns null for undefined grading scale", () => {
    const config = { gradingScale: undefined as { points: number }[] | undefined };
    expect(getMaxGradePointFromConfig(config as { gradingScale?: { points: number }[] })).toBeNull();
  });
});