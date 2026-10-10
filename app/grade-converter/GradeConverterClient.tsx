"use client";

import { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import Link from "next/link";
import { getGradeFromScore, getGradePointFromScore, standardEthiopianGradingScale } from "@/lib/universities/standard-scale";

function formatRange(grade: typeof standardEthiopianGradingScale[0]): string {
  if (grade.minimumMark === 0 && grade.maximumMark === 49) {
    return "0–49";
  }
  if (grade.maximumMark === 100) {
    return `${grade.minimumMark}–100`;
  }
  return `${grade.minimumMark}–${grade.maximumMark}`;
}

function getGradeDescription(letter: string): string {
  switch (letter) {
    case "A+": return "Outstanding";
    case "A": return "Excellent";
    case "A-": return "Excellent";
    case "B+": return "Very Good";
    case "B": return "Good";
    case "C+": return "Satisfactory";
    case "C": return "Fair";
    case "D": return "Unsatisfactory";
    case "F": return "Fail";
    default: return "";
  }
}

export function GradeConverterClient() {
  const [inputValue, setInputValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  const score = rawValue === "" ? null : parseFloat(rawValue);
  const isValidScore = score !== null && !isNaN(score) && isFinite(score) && score >= 0 && score <= 100;
  const letterGrade = isValidScore && score !== null ? getGradeFromScore(score) : null;
  const gradePoints = isValidScore && score !== null ? getGradePointFromScore(score) : null;
  const currentGradeRule = letterGrade ? standardEthiopianGradingScale.find(g => g.letter === letterGrade) : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setRawValue(value);
  };

  const handleBlur = () => {
    if (rawValue !== "") {
      const parsed = parseFloat(rawValue);
      if (!isNaN(parsed) && isFinite(parsed)) {
        setInputValue(parsed.toString());
      }
    }
  };

  const getErrorMessage = (): string | null => {
    if (rawValue === "") return null;
    const parsed = parseFloat(rawValue);
    if (isNaN(parsed)) return "Enter a valid number";
    if (!isFinite(parsed)) return "Enter a finite number";
    if (parsed < 0) return "Score cannot be negative";
    if (parsed > 100) return "Score cannot exceed 100";
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12 md:py-20">
        <article className="space-y-10">
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Percentage to Grade Converter</h1>
            <p className="text-lg text-zinc-600 max-w-xl mx-auto">
              Enter a percentage score (0–100) to see the corresponding Ethiopian university letter grade and grade points.
            </p>
          </header>

          <section className="card p-6 md:p-8" aria-labelledby="converter-heading">
            <h2 id="converter-heading" className="text-xl font-semibold text-zinc-900 mb-6">Converter</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="percentage-input" className="block text-sm font-medium text-zinc-900 mb-2">
                  Percentage Score (0–100)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="percentage-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g., 87"
                    className={`input-base text-center text-2xl font-mono font-medium ${errorMessage ? "border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? "percentage-error" : "percentage-hint"}
                    autoComplete="off"
                    inputMode="decimal"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-mono">%</span>
                  {errorMessage && (
                    <p id="percentage-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  {!errorMessage && rawValue !== "" && (
                    <p id="percentage-hint" className="mt-2 text-sm text-zinc-500">
                      Enter a score between 0 and 100
                    </p>
                  )}
                </div>
              </div>

              {isValidScore && letterGrade && gradePoints !== null && currentGradeRule && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-4" role="status" aria-live="polite">
                  <div className="grid gap-4 md:grid-cols-3 text-center">
                    <div className="p-4 bg-white rounded-lg border border-zinc-200">
                      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Letter Grade</p>
                      <p className="text-4xl font-bold text-zinc-900 font-mono">{letterGrade}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-zinc-200">
                      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Grade Points</p>
                      <p className="text-4xl font-bold text-zinc-900 font-mono">{gradePoints.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-zinc-200">
                      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Description</p>
                      <p className="text-lg font-medium text-zinc-700">{getGradeDescription(letterGrade)}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200">
                    <p className="text-sm text-zinc-600">
                      Your score of <strong className="text-zinc-900">{parseFloat(rawValue).toFixed(rawValue.includes(".") ? 2 : 0)}%</strong>
                      falls in the <strong className="text-zinc-900">{currentGradeRule.letter}</strong> range
                      (<strong className="text-zinc-900">{formatRange(currentGradeRule)}</strong>).
                    </p>
                  </div>
                </div>
              )}

              {!isValidScore && rawValue !== "" && errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
                  {errorMessage}
                </div>
              )}

              {rawValue === "" && (
                <p className="text-center text-zinc-500 text-sm">
                  Enter a percentage score above to see the conversion
                </p>
              )}
            </div>
          </section>

          <section className="card p-6 md:p-8" aria-labelledby="scale-heading">
            <h2 id="scale-heading" className="text-xl font-semibold text-zinc-900 mb-4">Quick Reference Scale</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-4 py-3 font-medium text-zinc-900">Letter Grade</th>
                    <th className="px-4 py-3 font-medium text-zinc-900">Percentage Range</th>
                    <th className="px-4 py-3 font-medium text-zinc-900">Grade Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {standardEthiopianGradingScale.map((grade, index) => (
                    <tr key={grade.letter} className={index % 2 === 1 ? "bg-zinc-50" : ""}>
                      <td className="px-4 py-3 font-mono font-medium text-zinc-900">{grade.letter}</td>
                      <td className="px-4 py-3 text-zinc-600">{formatRange(grade)}</td>
                      <td className="px-4 py-3 font-mono text-zinc-900">{grade.points.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card p-6 md:p-8 bg-zinc-50 border border-zinc-200" aria-labelledby="boundary-heading">
            <h2 id="boundary-heading" className="text-xl font-semibold text-zinc-900 mb-2">Boundary Convention</h2>
            <p className="text-zinc-600 text-sm mb-4">
              Ranges are inclusive at the lower boundary. For example:
            </p>
            <ul className="space-y-1 text-zinc-600 text-sm">
              <li>85.00 → A (not A−)</li>
              <li>84.99 → A−</li>
              <li>90.00 → A+</li>
              <li>89.99 → A</li>
              <li>50.00 → D</li>
              <li>49.99 → F</li>
            </ul>
          </section>

          <section className="card p-6 md:p-8 text-center" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-semibold text-zinc-900 mb-4">Related Tools</h2>
            <p className="text-zinc-600 mb-4">Use these calculators with the standard grade scale:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/grade-scale"
                className="btn-primary text-center"
              >
                Grade Scale Reference
              </Link>
              <Link
                href="/gpa"
                className="btn-secondary text-center"
              >
                GPA Calculator
              </Link>
              <Link
                href="/cgpa"
                className="btn-secondary text-center"
              >
                CGPA Calculator
              </Link>
              <Link
                href="/planner"
                className="btn-secondary text-center"
              >
                GPA Target Planner
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}