"use client";

import { useState, useMemo, useCallback } from "react";
import { SupportedUniversityId, getUniversityConfig } from "@/lib/universities";
import {
  AcademicProfile,
  Course,
  createEmptyProfile,
  createCourse,
} from "@/lib/academic/types";
import {
  loadProfile,
  saveProfile,
  clearProfile,
  calculateProfileCGPA,
  calculateSemesterGPAFromProfile,
  getCompletedCredits,
  getSemesterCount,
  getLatestSemesterGPA,
  getProgressTowardTarget,
  addSemester,
  updateSemester,
  deleteSemester,
  addCourseToSemester,
  updateCourseInSemester,
  deleteCourseFromSemester,
  setTargetCGPA,
  setUniversity,
  getGradePointForUniversity,
  isNonGpaGradeForUniversity,
} from "@/lib/storage/academic";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { CourseRow } from "@/components/calculator/CourseRow";

export function DashboardClient() {
  const [profile, setProfile] = useState<AcademicProfile | null>(() => {
    if (typeof window !== "undefined") {
      return loadProfile();
    }
    return null;
  });
  const [showAddSemester, setShowAddSemester] = useState(false);
  const [newSemesterYear, setNewSemesterYear] = useState("");
  const [newSemesterLabel, setNewSemesterLabel] = useState("");
  const [editingSemesterId, setEditingSemesterId] = useState<string | null>(null);
  const [editSemesterYear, setEditSemesterYear] = useState("");
  const [editSemesterLabel, setEditSemesterLabel] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [targetCGPAInput, setTargetCGPAInput] = useState("");
  const [addingCourseToSemester, setAddingCourseToSemester] = useState<string | null>(null);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCredits, setNewCourseCredits] = useState("");
  const [newCourseGrade, setNewCourseGrade] = useState("");
  const [creditsErrors, setCreditsErrors] = useState<Record<string, string>>({});
  const [targetCGPAError, setTargetCGPAError] = useState<string | null>(null);

  const persistProfile = useCallback((updatedProfile: AcademicProfile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  }, []);

  const handleUniversityChange = useCallback((universityId: SupportedUniversityId) => {
    if (profile) {
      persistProfile(setUniversity(profile, universityId));
    }
  }, [profile, persistProfile]);

  const handleSetTargetCGPA = useCallback(() => {
    if (!profile) return;
    const value = targetCGPAInput.trim();
    if (!value) {
      persistProfile(setTargetCGPA(profile, null));
      setTargetCGPAError(null);
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num) || !isFinite(num)) {
      setTargetCGPAError("Enter a valid number");
      return;
    }
    if (num < 0) {
      setTargetCGPAError("Target CGPA cannot be negative");
      return;
    }
    const config = getUniversityConfig(profile.universityId as SupportedUniversityId);
    const maxGradePoint = config?.gradingScale?.length
      ? Math.max(...config.gradingScale.map((g) => g.points))
      : 4.0;
    if (num > maxGradePoint) {
      setTargetCGPAError(`Target CGPA cannot exceed ${maxGradePoint.toFixed(2)}`);
      return;
    }
    persistProfile(setTargetCGPA(profile, num));
    setTargetCGPAError(null);
  }, [profile, targetCGPAInput, persistProfile]);

  const handleAddSemester = useCallback(() => {
    if (!profile) return;
    const year = newSemesterYear.trim();
    const label = newSemesterLabel.trim();
    if (!year || !label) return;
    persistProfile(addSemester(profile, year, label));
    setShowAddSemester(false);
    setNewSemesterYear("");
    setNewSemesterLabel("");
  }, [profile, newSemesterYear, newSemesterLabel, persistProfile]);

  const handleEditSemester = useCallback(() => {
    if (!profile || !editingSemesterId) return;
    const year = editSemesterYear.trim();
    const label = editSemesterLabel.trim();
    if (!year || !label) return;
    persistProfile(updateSemester(profile, editingSemesterId, { academicYear: year, label }));
    setEditingSemesterId(null);
  }, [profile, editingSemesterId, editSemesterYear, editSemesterLabel, persistProfile]);

  const handleDeleteSemester = useCallback((semesterId: string) => {
    if (!profile) return;
    persistProfile(deleteSemester(profile, semesterId));
  }, [profile, persistProfile]);

  const handleAddCourse = useCallback((semesterId: string) => {
    if (!profile) return;
    const name = newCourseName.trim();
    const creditsStr = newCourseCredits.trim();
    const grade = newCourseGrade;
    if (!name || !creditsStr || !grade) return;
    const credits = parseFloat(creditsStr);
    if (isNaN(credits) || credits <= 0) return;
    const gradePoint = getGradePointForUniversity(profile.universityId as SupportedUniversityId, grade);
    if (gradePoint === null) return;
    const includedInGPA = !isNonGpaGradeForUniversity(profile.universityId as SupportedUniversityId, grade);
    const course = createCourse(name, credits, grade, gradePoint, includedInGPA);
    persistProfile(addCourseToSemester(profile, semesterId, course));
    setAddingCourseToSemester(null);
    setNewCourseName("");
    setNewCourseCredits("");
    setNewCourseGrade("");
  }, [profile, newCourseName, newCourseCredits, newCourseGrade, persistProfile]);

  const handleUpdateCourse = useCallback((
    semesterId: string,
    courseId: string,
    updates: Partial<Course>
  ) => {
    if (!profile) return;
    persistProfile(updateCourseInSemester(profile, semesterId, courseId, updates));
  }, [profile, persistProfile]);

  const handleDeleteCourse = useCallback((semesterId: string, courseId: string) => {
    if (!profile) return;
    persistProfile(deleteCourseFromSemester(profile, semesterId, courseId));
  }, [profile, persistProfile]);

  const handleCreditsChange = useCallback((courseId: string, value: string) => {
    if (!value.trim()) {
      setCreditsErrors(prev => ({ ...prev, [courseId]: "Enter a credit value" }));
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num) || !isFinite(num)) {
      setCreditsErrors(prev => ({ ...prev, [courseId]: "Enter a valid number" }));
      return;
    }
    if (num <= 0) {
      setCreditsErrors(prev => ({ ...prev, [courseId]: "Credits must be greater than 0" }));
      return;
    }
    setCreditsErrors(prev => {
      const next = { ...prev };
      delete next[courseId];
      return next;
    });
  }, []);

  const handleClearData = useCallback(() => {
    clearProfile();
    setProfile(createEmptyProfile("jimma"));
    setShowClearConfirm(false);
  }, []);

  const cgpa = useMemo(() => profile ? calculateProfileCGPA(profile) : null, [profile]);
  const completedCredits = useMemo(() => profile ? getCompletedCredits(profile) : 0, [profile]);
  const semesterCount = useMemo(() => profile ? getSemesterCount(profile) : 0, [profile]);
  const latestSemesterGPA = useMemo(() => profile ? getLatestSemesterGPA(profile) : null, [profile]);
  const progressTowardTarget = useMemo(() => profile ? getProgressTowardTarget(profile) : null, [profile]);
  const currentConfig = useMemo(() => profile ? getUniversityConfig(profile.universityId as SupportedUniversityId) : null, [profile]);

  const gradeOptions = useMemo((): { value: string; label: string; points: number }[] => {
    if (!currentConfig?.gradingScale?.length) return [];
    return [
      { value: "", label: "Select grade", points: 0 },
      ...currentConfig.gradingScale.map((g) => ({
        value: g.letter,
        label: `${g.letter} (${g.points.toFixed(2)})`,
        points: g.points,
      })),
    ];
  }, [currentConfig]);

  const hasGradingScale = (currentConfig?.gradingScale?.length ?? 0) > 0;

  if (!profile) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Academic Dashboard</h1>
          <p className="text-zinc-600">Create your academic profile to get started.</p>
        </div>
        <div className="card p-6 space-y-6">
          <UniversitySelector
            selectedUniversity="jimma"
            onChange={(u) => {
              const newProfile = createEmptyProfile(u);
              setProfile(newProfile);
              saveProfile(newProfile);
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newProfile = createEmptyProfile("jimma");
              setProfile(newProfile);
              saveProfile(newProfile);
            }}
            className="btn-primary w-full"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Academic Dashboard</h1>
          <p className="text-zinc-600 mt-1">Track your progress toward your target CGPA</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setShowAddSemester(true)}
            className="btn-primary"
            disabled={!hasGradingScale}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Semester
          </button>
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="btn-secondary text-red-600 border-red-300 hover:bg-red-50"
          >
            Clear All Data
          </button>
        </div>
      </div>

      <div className="text-sm text-zinc-500 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Your academic data is saved locally on this device. Wutete does not require an account.</span>
        </div>
      </div>

      {showAddSemester && (
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">Add New Semester</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="semester-year" className="block text-sm font-medium text-zinc-900 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                id="semester-year"
                value={newSemesterYear}
                onChange={(e) => setNewSemesterYear(e.target.value)}
                placeholder="2024-2025"
                className="input-base"
              />
            </div>
            <div>
              <label htmlFor="semester-label" className="block text-sm font-medium text-zinc-900 mb-1">
                Semester Label
              </label>
              <input
                type="text"
                id="semester-label"
                value={newSemesterLabel}
                onChange={(e) => setNewSemesterLabel(e.target.value)}
                placeholder="Fall / Spring / Summer"
                className="input-base"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setShowAddSemester(false)} className="btn-secondary">Cancel</button>
            <button type="button" onClick={handleAddSemester} className="btn-primary" disabled={!newSemesterYear.trim() || !newSemesterLabel.trim()}>Add Semester</button>
          </div>
        </div>
      )}

      {editingSemesterId && (
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">Edit Semester</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-semester-year" className="block text-sm font-medium text-zinc-900 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                id="edit-semester-year"
                value={editSemesterYear}
                onChange={(e) => setEditSemesterYear(e.target.value)}
                placeholder="2024-2025"
                className="input-base"
              />
            </div>
            <div>
              <label htmlFor="edit-semester-label" className="block text-sm font-medium text-zinc-900 mb-1">
                Semester Label
              </label>
              <input
                type="text"
                id="edit-semester-label"
                value={editSemesterLabel}
                onChange={(e) => setEditSemesterLabel(e.target.value)}
                placeholder="Fall / Spring / Summer"
                className="input-base"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setEditingSemesterId(null)} className="btn-secondary">Cancel</button>
            <button type="button" onClick={handleEditSemester} className="btn-primary" disabled={!editSemesterYear.trim() || !editSemesterLabel.trim()}>Save Changes</button>
          </div>
        </div>
      )}

      <div className="card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <UniversitySelector
              selectedUniversity={profile.universityId as SupportedUniversityId}
              onChange={handleUniversityChange}
            />
            <div className="flex items-center gap-2">
              <label htmlFor="target-cgpa-input" className="text-sm font-medium text-zinc-900">Target CGPA</label>
              <input
                type="text"
                id="target-cgpa-input"
                value={targetCGPAInput}
                onChange={(e) => {
                  setTargetCGPAInput(e.target.value);
                  setTargetCGPAError(null);
                }}
                onBlur={handleSetTargetCGPA}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSetTargetCGPA();
                  }
                }}
                placeholder="e.g., 3.80"
                className={`input-base w-28 text-center ${targetCGPAError ? "border-red-500 focus:ring-red-500" : ""}`}
                aria-invalid={!!targetCGPAError}
              />
              {profile.targetCGPA !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setTargetCGPAInput("");
                    persistProfile(setTargetCGPA(profile, null));
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-600"
                  aria-label="Clear target CGPA"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {targetCGPAError && (
            <p className="text-sm text-red-600" role="alert">{targetCGPAError}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-zinc-50 rounded-lg">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Current CGPA</p>
            <p className="text-3xl font-bold text-zinc-900 font-mono">
              {cgpa !== null ? cgpa.toFixed(2) : "—"}
              {currentConfig?.gradingScale?.length && (
                <span className="text-lg font-normal text-zinc-500 ml-1">/ {Math.max(...currentConfig.gradingScale.map(g => g.points)).toFixed(2)}</span>
              )}
            </p>
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Target CGPA</p>
            <p className="text-3xl font-bold text-zinc-900 font-mono">
              {profile.targetCGPA !== null ? profile.targetCGPA.toFixed(2) : "Not set"}
            </p>
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Completed Credits</p>
            <p className="text-3xl font-bold text-zinc-900 font-mono">{completedCredits}</p>
          </div>
          <div className="p-4 bg-zinc-50 rounded-lg">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Semesters</p>
            <p className="text-3xl font-bold text-zinc-900 font-mono">{semesterCount}</p>
          </div>
        </div>

        {progressTowardTarget !== null && (
          <div className="border-t border-zinc-200 pt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-zinc-900">Progress toward target</span>
              <span className="text-zinc-600">{progressTowardTarget.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 rounded-full transition-all duration-300"
                style={{ width: `${progressTowardTarget}%` }}
              ></div>
            </div>
          </div>
        )}

        {latestSemesterGPA !== null && (
          <div className="border-t border-zinc-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-900">Latest Semester GPA</span>
              <span className="text-2xl font-bold text-zinc-900 font-mono">{latestSemesterGPA.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {profile.semesters.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-zinc-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-zinc-900 mb-2">No semesters yet</h2>
          <p className="text-zinc-500 mb-6">Add your first semester to start tracking your academic progress.</p>
          <button type="button" onClick={() => setShowAddSemester(true)} className="btn-primary" disabled={!hasGradingScale}>
            Add Semester
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {profile.semesters.map((semester) => {
            const semesterGPA = calculateSemesterGPAFromProfile(semester);
            const semesterCredits = semester.courses
              .filter((c) => c.includedInGPA)
              .reduce((sum, c) => sum + c.credits, 0);
            const isEditing = editingSemesterId === semester.id;

            return (
              <div key={semester.id} className="card overflow-hidden">
                <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900">{semester.academicYear} — {semester.label}</h3>
                      <p className="text-sm text-zinc-500">
                        {semester.courses.length} course{semester.courses.length !== 1 ? "s" : ""}
                        {semesterCredits > 0 && ` · ${semesterCredits} credits`}
                        {semesterGPA !== null && ` · GPA: ${semesterGPA.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditSemesterYear(semester.academicYear);
                        setEditSemesterLabel(semester.label);
                        setEditingSemesterId(semester.id);
                      }}
                      className="btn-secondary text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSemester(semester.id)}
                      className="btn-secondary text-sm text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {!isEditing && addingCourseToSemester === semester.id && (
                  <div className="p-4 border-b border-zinc-200 bg-zinc-50 space-y-4">
                    <h4 className="font-medium text-zinc-900">Add Course</h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <label htmlFor={`course-name-${semester.id}`} className="block text-sm font-medium text-zinc-900 mb-1">
                          Course Name
                        </label>
                        <input
                          type="text"
                          id={`course-name-${semester.id}`}
                          value={newCourseName}
                          onChange={(e) => setNewCourseName(e.target.value)}
                          placeholder="e.g., Calculus I"
                          className="input-base"
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <label htmlFor={`course-credits-${semester.id}`} className="block text-sm font-medium text-zinc-900 mb-1">
                          Credits
                        </label>
                        <input
                          type="number"
                          id={`course-credits-${semester.id}`}
                          value={newCourseCredits}
                          onChange={(e) => setNewCourseCredits(e.target.value)}
                          placeholder="3"
                          step="0.5"
                          min="0.5"
                          className="input-base"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor={`course-grade-${semester.id}`} className="block text-sm font-medium text-zinc-900 mb-1">
                          Grade
                        </label>
                        <select
                          id={`course-grade-${semester.id}`}
                          value={newCourseGrade}
                          onChange={(e) => setNewCourseGrade(e.target.value)}
                          className="select-base"
                          disabled={gradeOptions.length <= 1}
                        >
                          {gradeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button type="button" onClick={() => setAddingCourseToSemester(null)} className="btn-secondary">Cancel</button>
                      <button type="button" onClick={() => handleAddCourse(semester.id)} className="btn-primary" disabled={!newCourseName.trim() || !newCourseCredits.trim() || !newCourseGrade || !hasGradingScale}>Add Course</button>
                    </div>
                  </div>
                )}

                <div className="divide-y divide-zinc-200">
                  {semester.courses.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500">
                      <p className="mb-2">No courses in this semester yet.</p>
                      {!addingCourseToSemester && !isEditing && (
                        <button
                          type="button"
                          onClick={() => setAddingCourseToSemester(semester.id)}
                          className="btn-secondary text-sm"
                          disabled={!hasGradingScale}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Course
                        </button>
                      )}
                    </div>
                  ) : (
                    semester.courses.map((course) => {
                      const gradeError = creditsErrors[course.id];

                      return (
                        <div key={course.id} className="p-4">
                          <CourseRow
                            course={{
                              id: course.id,
                              name: course.name,
                              credits: course.credits.toString(),
                              grade: course.grade,
                            }}
                            universityId={profile.universityId as SupportedUniversityId}
                            gradeOptions={gradeOptions}
                            creditsError={gradeError}
                            onNameChange={(id, name) => handleUpdateCourse(semester.id, id, { name })}
                            onCreditsChange={(id, value) => {
                              handleCreditsChange(id, value);
                              const num = parseFloat(value);
                              if (!isNaN(num) && isFinite(num) && num > 0) {
                                handleUpdateCourse(semester.id, id, { credits: num });
                              }
                            }}
                            onGradeChange={(id, grade) => {
                              const gradePoint = getGradePointForUniversity(profile.universityId as SupportedUniversityId, grade);
                              const includedInGPA = !isNonGpaGradeForUniversity(profile.universityId as SupportedUniversityId, grade);
                              if (gradePoint !== null) {
                                handleUpdateCourse(semester.id, id, { grade, gradePoint, includedInGPA });
                              }
                            }}
                            onRemove={() => handleDeleteCourse(semester.id, course.id)}
                            canRemove={true}
                          />
                        </div>
                      );
                    })
                  )}
                </div>

                {!addingCourseToSemester && !isEditing && (
                  <div className="p-4 border-t border-zinc-200">
                    <button
                      type="button"
                      onClick={() => setAddingCourseToSemester(semester.id)}
                      className="btn-secondary text-sm w-full sm:w-auto"
                      disabled={!hasGradingScale}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Course
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900">Clear All Academic Data?</h2>
            <p className="text-zinc-600">This will permanently delete your university, target CGPA, semesters, and courses. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowClearConfirm(false)} className="btn-secondary">Cancel</button>
              <button type="button" onClick={handleClearData} className="btn-secondary text-red-600 border-red-300 hover:bg-red-50">Clear Everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}