"use client";

import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { X } from "lucide-react";

interface SelectProps {
  selected?: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}

export function MultiCountrySelect({ setSelected }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
    { value: "in", label: "India" },
    { value: "cn", label: "China" },
  ];
  const toggleCountry = (value: string) => {
    setSelectedCountries((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const removeCountry = (value: string) => {
    setSelectedCountries((prev) => prev.filter((c) => c !== value));
    setSelected((prev) => prev.filter((c) => c !== value));
  };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <div className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[42px]">
        {selectedCountries.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedCountries.map((value) => {
              const country = countries.find((c) => c.value === value);
              return (
                <div
                  key={value}
                  className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {country?.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCountry(value);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-400">Select countries...</span>
        )}
      </div>
      <button
        className="absolute inset-y-0 right-0 flex items-center pr-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search countries..."
            className="w-full p-2 border-b border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <li
                key={country.value}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleCountry(country.value)}
              >
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country.value)}
                  onChange={() => {}}
                  className="mr-2"
                />
                {country.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function MultiStudyProgramSelect({ setSelected }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const studyPrograms = [
    { value: "cs", label: "Computer Science" },
    { value: "eng", label: "Engineering" },
    { value: "bio", label: "Biology" },
    { value: "chem", label: "Chemistry" },
    { value: "phys", label: "Physics" },
    { value: "math", label: "Mathematics" },
    { value: "psych", label: "Psychology" },
    { value: "econ", label: "Economics" },
    { value: "bus", label: "Business Administration" },
    { value: "med", label: "Medicine" },
  ];

  const toggleProgram = (value: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const removeProgram = (value: string) => {
    setSelectedPrograms((prev) => prev.filter((p) => p !== value));
    setSelected((prev) => prev.filter((p) => p !== value));
  };

  const filteredPrograms = studyPrograms.filter((program) =>
    program.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[42px]">
        {selectedPrograms.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedPrograms.map((value) => {
              const program = studyPrograms.find((p) => p.value === value);
              return (
                <div
                  key={value}
                  className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {program?.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProgram(value);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-400">Select study programs...</span>
        )}
      </div>
      <button
        className="absolute inset-y-0 right-0 flex items-center pr-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search study programs..."
            className="w-full p-2 border-b border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto">
            {filteredPrograms.map((program) => (
              <li
                key={program.value}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleProgram(program.value)}
              >
                <input
                  type="checkbox"
                  checked={selectedPrograms.includes(program.value)}
                  onChange={() => {}}
                  className="mr-2"
                />
                {program.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
