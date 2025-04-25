import { useState, useRef, useEffect } from "react";
import { Doctor } from "../types";

interface SearchBarProps {
  doctors: Doctor[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ doctors, searchTerm, setSearchTerm }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const matchedDoctors = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matchedDoctors);
      setShowSuggestions(matchedDoctors.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete" ref={searchRef}>
      <input
        type="text"
        placeholder="Search Symptoms, Doctors, Specialists, Clinics"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      {showSuggestions && (
        <div className="suggestions">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
