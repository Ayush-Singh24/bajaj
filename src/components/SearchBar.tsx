import { useState, useRef, useEffect } from "react";
import { Doctor } from "../types";

const profileIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5OTk5OTkiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI0Ij48L2NpcmNsZT48cGF0aCBkPSJNNiAyMXYtMmE0IDQgMCAwIDEgNC00aDRhNCA0IDAgMCAxIDQgNHYyIj48L3BhdGg+PC9zdmc+";

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
        className="autocomplete-input"
        data-testid="autocomplete-input"
      />
      {showSuggestions && (
        <div className="suggestions">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              className="suggestion-item"
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              <div className="suggestion-content">
                <div className="suggestion-view">
                  <div className="suggestion-image">
                    <img src={doctor.photo || profileIcon} alt={doctor.name} />
                  </div>
                  <div className="suggestion-details">
                    <div className="suggestion-name">{doctor.name}</div>
                    <div className="suggestion-specialty">
                      {doctor.specialities[0]?.name}
                    </div>
                  </div>
                </div>
                <div className="suggestion-arrow">›</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
