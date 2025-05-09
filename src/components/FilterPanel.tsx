import { useState } from "react";
import { FilterState } from "../types";
import { allSpecialities } from "../utils/filterUtils";

interface FilterPanelProps {
  filterState: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  clearFilters: () => void;
}

const FilterPanel = ({
  filterState,
  updateFilter,
  clearFilters,
}: FilterPanelProps) => {
  const [specialitySearch, setSpecialitySearch] = useState("");
  const [showSpecialities, setShowSpecialities] = useState(true);
  const [showConsultation, setShowConsultation] = useState(true);

  const filteredSpecialities = specialitySearch
    ? allSpecialities.filter((s) =>
        s.toLowerCase().includes(specialitySearch.toLowerCase())
      )
    : allSpecialities;

  const handleConsultationChange = (type: FilterState["consultationType"]) => {
    updateFilter("consultationType", type);
  };

  const handleSpecialityChange = (speciality: string) => {
    const updatedSpecialities = filterState.specialities.includes(speciality)
      ? filterState.specialities.filter((s) => s !== speciality)
      : [...filterState.specialities, speciality];

    updateFilter("specialities", updatedSpecialities);
  };

  return (
    <div className="filter-panel">
      <div className="filters-header">
        <h2>Filters</h2>
        <button onClick={clearFilters} className="clear-all-btn">
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => setShowConsultation(!showConsultation)}
        >
          <h3 data-testid="filter-header-moc">Mode of consultation</h3>
          <span className="dropdown-icon">{showConsultation ? "▼" : "▶"}</span>
        </div>
        {showConsultation && (
          <div className="filter-content">
            <label className="radio-option">
              <input
                type="radio"
                name="consultation"
                checked={filterState.consultationType === "Video Consult"}
                onChange={() => handleConsultationChange("Video Consult")}
                data-testid="filter-video-consult"
              />
              Video Consultation
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="consultation"
                checked={filterState.consultationType === "In-clinic"}
                onChange={() => handleConsultationChange("In-clinic")}
                data-testid="filter-in-clinic"
              />
              In-clinic Consultation
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="consultation"
                checked={filterState.consultationType === "All"}
                onChange={() => handleConsultationChange("All")}
              />
              All
            </label>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => setShowSpecialities(!showSpecialities)}
        >
          <h3 data-testid="filter-header-speciality">Specialities</h3>
          <span className="dropdown-icon">{showSpecialities ? "▼" : "▶"}</span>
        </div>
        {showSpecialities && (
          <div className="filter-content">
            <div className="speciality-search">
              <input
                type="text"
                placeholder="Search specialities"
                className="speciality-search-input"
                value={specialitySearch}
                onChange={(e) => setSpecialitySearch(e.target.value)}
              />
            </div>
            <div className="speciality-list">
              {filteredSpecialities.map((speciality) => (
                <label key={speciality} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filterState.specialities.includes(speciality)}
                    onChange={() => handleSpecialityChange(speciality)}
                    data-testid={`filter-speciality-${speciality}`}
                  />
                  {speciality}
                </label>
              ))}
              {filteredSpecialities.length === 0 && (
                <div className="no-specialities">No specialities found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
