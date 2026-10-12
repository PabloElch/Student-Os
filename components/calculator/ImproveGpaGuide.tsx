"use client";

import Link from "next/link";

interface ImproveGpaGuideProps {
  calculatorType: "gpa" | "cgpa";
}

export function ImproveGpaGuide({ calculatorType }: ImproveGpaGuideProps) {
  return (
    <div className="card p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2">
        <span className="mono-label">Guide</span>
        <h3 className="text-lg font-semibold text-charcoal">How to Improve Your GPA at University</h3>
      </div>
      <p className="text-sm text-neutral leading-relaxed">
        There&apos;s no guaranteed shortcut to a higher GPA. But building better study habits, keeping up with coursework, and preparing consistently for assessments can help you understand your courses and improve your chances of earning better grades.
      </p>
      <div className="space-y-5 text-sm text-neutral leading-relaxed">
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
        <div className="pt-4 border-t border-line">
          <h4 className="font-medium text-charcoal mb-1">
            {calculatorType === "gpa" ? "Plan for the next semester using CGPA" : "Plan for the next semester using CGPA"}
          </h4>
          <p>
            {calculatorType === "gpa" ? (
              <>
                Your CGPA reflects performance across completed semesters, and one semester&apos;s grades affect the cumulative result according to credit-weighting rules. Use the{" "}
                <Link href="/cgpa" className="text-forest underline hover:text-forest-light">
                  CGPA calculator
                </Link>{" "}
                to track cumulative progress, and the{" "}
                <Link href="/planner" className="text-forest underline hover:text-forest-light">
                  GPA target planner
                </Link>{" "}
                to explore what grades may be needed to reach a future target. A target&apos;s achievability depends on calculated academic inputs.
              </>
            ) : (
              <>
                Your CGPA reflects performance across all completed semesters, and each semester&apos;s grades affect the cumulative result according to credit-weighting rules. Use the{" "}
                <Link href="/gpa" className="text-forest underline hover:text-forest-light">
                  GPA calculator
                </Link>{" "}
                to estimate semester results, and the{" "}
                <Link href="/planner" className="text-forest underline hover:text-forest-light">
                  GPA target planner
                </Link>{" "}
                to explore what grades may be needed to reach a future CGPA target. A target&apos;s achievability depends on calculated academic inputs.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}