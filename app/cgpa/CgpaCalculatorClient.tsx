"use client";

import { useState, useMemo, useCallback } from "react";
import { calculateCGPA } from "@/lib/calculations/cgpa";
import { CourseGrade } from "@/lib/calculations/gpa";
import { getGradePointForUniversity, isNonGpaGradeForUniversity, getUniversityConfig, SupportedUniversityId, GradeRule } from "@/lib/universities";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { CourseRow } from "@/components/calculator/CourseRow";
import { CgpaResult } from "@/components/calculator/CgpaResult";
import { copyOrShare, copyToClipboardOnly, generateCgpaSummary } from "@/lib/utils/share";

interface CourseInput {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const initialCourse: CourseInput = {
  id: generateId(),
  name: "",
  credits: "",
  grade: "",
};

export function CgpaCalculatorClient() {
  const [selectedUniversity, setSelectedUniversity] = useState<SupportedUniversityId>("jimma");
  const [courses, setCourses] = useState<CourseInput[]>([initialCourse]);
  const [creditsErrors, setCreditsErrors] = useState<Record<string, string>>({});

  const currentConfig = getUniversityConfig(selectedUniversity);

  const validateCredits = useCallback((value: string): string | undefined => {
    if (!value.trim()) return "Enter a credit value";
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (!isFinite(num)) return "Enter a finite number";
    if (num <= 0) return "Credits must be greater than 0";
    return undefined;
  }, []);

  const handleCreditsChange = useCallback((id: string, value: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, credits: value } : course))
    );
    const error = validateCredits(value);
    setCreditsErrors((prev) => {
      const next = { ...prev };
      if (error) next[id] = error;
      else delete next[id];
      return next;
    });
  }, [validateCredits]);

  const handleGradeChange = useCallback((id: string, grade: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, grade } : course))
    );
  }, []);

  const handleNameChange = useCallback((id: string, name: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, name } : course))
    );
  }, []);

  const handleAddCourse = useCallback(() => {
    setCourses((prev) => [
      ...prev,
      { ...initialCourse, id: generateId() },
      { ...initialCourse, id: generateId() },
    ]);
  }, []);

  const handleRemoveCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
    setCreditsErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCourses([{ ...initialCourse, id: generateId() }]);
    setCreditsErrors({});
  }, []);

  const gradeOptions = useMemo((): { value: string; label: string; points: number }[] => {
    if (!currentConfig?.gradingScale?.length) return [];
    return [
      { value: "", label: "Select grade", points: 0 },
      ...currentConfig.gradingScale.map((g: GradeRule) => ({
        value: g.letter,
        label: `${g.letter} (${g.points.toFixed(2)})`,
        points: g.points,
      })),
    ];
  }, [currentConfig]);

  const calculationInput = useMemo((): CourseGrade[] => {
    return courses
      .map((course) => {
        if (!course.credits.trim() || !course.grade) return null;
        const creditsNum = parseFloat(course.credits);
        if (isNaN(creditsNum) || !isFinite(creditsNum) || creditsNum <= 0) return null;
        const gradePoint = getGradePointForUniversity(selectedUniversity, course.grade);
        if (gradePoint === null) return null;
        if (isNonGpaGradeForUniversity(selectedUniversity, course.grade)) return null;
        return { credits: creditsNum, gradePoint };
      })
      .filter((c): c is CourseGrade => c !== null);
  }, [courses, selectedUniversity]);

  const cgpa = useMemo(() => {
    if (calculationInput.length === 0) return null;
    try {
      return calculateCGPA(calculationInput);
    } catch {
      return null;
    }
  }, [calculationInput]);

  const validCourseCount = calculationInput.length;
  const hasGradingScale = currentConfig?.gradingScale?.length > 0;
  const totalCoursesWithData = courses.filter((c) => c.credits.trim() || c.grade).length;
  const totalCredits = calculationInput.reduce((sum, c) => sum + c.credits, 0);

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "shared" | "error">("idle");

  const handleCopySummary = async () => {
    if (!cgpa) return;
    const summary = generateCgpaSummary({
      label: "CGPA",
      value: cgpa.toFixed(2),
      totalCredits,
    });
    const copied = await copyToClipboardOnly(summary);
    if (copied) {
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } else {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleShareResult = async () => {
    if (!cgpa) return;
    const summary = generateCgpaSummary({
      label: "CGPA",
      value: cgpa.toFixed(2),
      totalCredits,
    });
    await copyOrShare(
      summary,
      "CGPA Result",
      (method) => {
        setCopyStatus(method === "copy" ? "copied" : "shared");
        setTimeout(() => setCopyStatus("idle"), 2000);
      },
      () => {
        setCopyStatus("error");
        setTimeout(() => setCopyStatus("idle"), 2000);
      }
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h1 className="page-heading mb-2">CGPA Calculator</h1>
        <p className="page-subheading">
          Select your university, add all your courses, and calculate your cumulative GPA.
        </p>
      </div>

      <div className="card p-6 space-y-6">
        <UniversitySelector
          selectedUniversity={selectedUniversity}
          onChange={setSelectedUniversity}
        />

        <div>
          <h2 className="section-heading">Courses</h2>

          {!hasGradingScale && currentConfig && (
            <div className="mb-4 p-3 bg-warning-bg border border-warning rounded-lg text-sm text-warning" role="alert">
              Grading scale not available for {currentConfig.name}. Please select another university.
            </div>
          )}

          <div className="border border-border rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_80px_140px_50px] gap-x-4 gap-y-3 px-4 py-3 bg-ivory border-b border-border text-xs font-medium text-neutral uppercase tracking-wider">
              <div>Course Name</div>
              <div className="text-right">Credits</div>
              <div>Grade</div>
              <div></div>
            </div>

            <div className="divide-y divide-border">
              {courses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  universityId={selectedUniversity}
                  gradeOptions={gradeOptions}
                  creditsError={creditsErrors[course.id]}
                  onNameChange={handleNameChange}
                  onCreditsChange={handleCreditsChange}
                  onGradeChange={handleGradeChange}
                  onRemove={handleRemoveCourse}
                  canRemove={courses.length > 1}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCourse}
            className="btn-secondary w-full sm:w-auto mt-4"
            disabled={!hasGradingScale}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course
          </button>
        </div>

        <div className="border-t border-border pt-6">
          <CgpaResult
            cgpa={cgpa}
            courseCount={totalCoursesWithData}
            validCourseCount={validCourseCount}
            universityId={selectedUniversity}
            onCopySummary={handleCopySummary}
            onShareResult={handleShareResult}
            copyStatus={copyStatus}
          />

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              Reset Calculator
            </button>
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-medium text-charcoal mb-3">How it works</h3>
        <ul className="space-y-2 text-sm text-neutral">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Select your university to load the correct grading scale</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Add all courses that count toward your cumulative GPA</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Grades marked &ldquo;Not included in GPA&rdquo; don&apos;t affect the calculation</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-forest" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>CGPA is calculated using the official formula: &Sigma;(credits &times; grade points) / &Sigma;(credits)</span>
          </li>
        </ul>
        {currentConfig?.source && (
          <p className="text-xs text-neutral-light mt-4 pt-4 border-t border-border">
            Source: {currentConfig.source.title} ({currentConfig.source.dateAccessed})
          </p>
        )}
        <p className="text-sm text-neutral mt-4 pt-4 border-t border-border">
          <a href="/gpa-simulator" className="text-forest underline hover:text-forest-light">Try the GPA What-If Simulator</a> to compare baseline vs. hypothetical grades.
        </p>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-medium text-charcoal mb-3">How to Improve Your GPA at University</h3>
        <p className="text-sm text-neutral">
          There&apos;s no guaranteed shortcut to a higher GPA. But building better study habits, keeping up with coursework, and preparing consistently for assessments can help you understand your courses and improve your chances of earning better grades.
        </p>
        <div className="space-y-4 text-sm text-neutral">
          <div>
            <h4 className="font-medium text-charcoal mb-1">Attend classes and participate</h4>
            <p>
              Regularly attending lectures and tutorials helps you understand difficult topics, ask instructors questions, learn about assessment expectations, and avoid missing important announcements. Clarify confusing concepts early rather than waiting until exam week.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-1">Make a realistic study plan</h4>
            <p>
              Plan your week around lectures, assignments, quizzes, midterms, final exams, and personal responsibilities. Set aside specific study blocks for difficult courses, break large assignments into smaller tasks, and leave time for unexpected changes. No single rigid schedule works for everyone.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-1">Study throughout the semester</h4>
            <p>
              Short, repeated review sessions are often more useful than trying to learn an entire course the night before an exam. Review lecture notes after class, practise questions, summarise key concepts from memory, and revisit topics that remain unclear.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-1">Prioritise courses strategically</h4>
            <p>
              Pay attention to both your current performance and course credit hours when deciding where to focus effort. A difficult, high-credit course may deserve more study time because its grade has a greater effect on a credit-weighted GPA. This doesn&apos;t mean low-credit courses are unimportant.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-1">Learn from assessments and feedback</h4>
            <p>
              Review quiz, assignment, midterm, and exam mistakes. Identify whether errors came from misunderstanding concepts, weak preparation, misreading questions, or running out of time, then adjust your approach. Ask instructors or classmates for clarification when appropriate.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-1">Use study groups wisely</h4>
            <p>
              Discussing concepts with classmates, solving practice questions together, and explaining topics to one another can reveal gaps in understanding. Make sure group study remains focused and that you can solve questions independently.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-charcoal mb-1">Plan for the next semester using CGPA</h4>
            <p>
              Your CGPA reflects performance across all completed semesters, and each semester&apos;s grades affect the cumulative result according to credit-weighting rules. Use the <a href="/gpa" className="text-forest underline hover:text-forest-light">GPA calculator</a> to estimate semester results, and the <a href="/planner" className="text-forest underline hover:text-forest-light">GPA target planner</a> to explore what grades may be needed to reach a future CGPA target. A target&apos;s achievability depends on calculated academic inputs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}