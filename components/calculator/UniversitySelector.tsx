"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ethiopianUniversities, searchUniversities, UniversityDirectoryEntry } from "@/lib/universities/directory";
import { SupportedUniversityId } from "@/lib/universities";

interface UniversitySelectorProps {
  selectedUniversity: SupportedUniversityId;
  onChange: (universityId: SupportedUniversityId) => void;
  placeholder?: string;
}

export function UniversitySelector({ selectedUniversity, onChange, placeholder = "Search any Ethiopian university" }: UniversitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const filteredUniversities = searchUniversities(searchQuery);
  const selectedUniversityInfo = ethiopianUniversities.find((u) => u.id === selectedUniversity);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  }, []);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, []);

  const handleSelect = useCallback((university: UniversityDirectoryEntry) => {
    onChange(university.id as SupportedUniversityId);
    closeDropdown();
  }, [onChange, closeDropdown]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => Math.min(prev + 1, filteredUniversities.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredUniversities.length) {
            handleSelect(filteredUniversities[highlightedIndex]);
          }
          break;
        case "Escape":
          closeDropdown();
          break;
      }
    },
    [isOpen, filteredUniversities, highlightedIndex, handleSelect, closeDropdown]
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current) {
      const option = optionsRef.current.children[highlightedIndex] as HTMLElement;
      if (option) {
        option.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  const selectedDisplay = selectedUniversityInfo?.name ?? placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor="university-search" className="label-base">
        University
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id="university-search"
          type="text"
          value={isOpen ? searchQuery : ""}
          placeholder={isOpen ? placeholder : selectedDisplay}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setHighlightedIndex(-1);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={openDropdown}
          onClick={openDropdown}
          onKeyDown={handleKeyDown}
          className="select-base pr-10"
          readOnly={!isOpen}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="university-options"
          aria-haspopup="listbox"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          id="university-options"
          ref={optionsRef}
          className="absolute z-50 w-full mt-1.5 max-h-96 overflow-y-auto bg-white border border-line rounded-lg shadow-lg divide-y divide-line"
          role="listbox"
          aria-label="Ethiopian universities"
        >
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university, index) => (
              <button
                key={university.id}
                type="button"
                role="option"
                aria-selected={selectedUniversity === university.id}
                onClick={() => handleSelect(university)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  index === highlightedIndex
                    ? "bg-ivory"
                    : "hover:bg-ivory"
                } ${
                  selectedUniversity === university.id
                    ? "text-forest font-medium"
                    : "text-charcoal"
                }`}
              >
                <div className="font-medium">{university.name}</div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral">
                  {university.abbreviation && (
                    <span className="px-2 py-0.5 bg-ivory rounded text-neutral">
                      {university.abbreviation}
                    </span>
                  )}
                  <span>{university.region}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-sm text-neutral">
              No universities match &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}