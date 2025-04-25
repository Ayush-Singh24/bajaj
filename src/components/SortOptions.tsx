import { useState } from "react";
import { FilterState } from "../types";

interface SortOptionsProps {
  sortBy: FilterState["sortBy"];
  onSortChange: (sortOption: FilterState["sortBy"]) => void;
}

const SortOptions = ({ sortBy, onSortChange }: SortOptionsProps) => {
  const [showSortOptions, setShowSortOptions] = useState(true);

  return (
    <div className="sort-options">
      <div
        className="sort-header filter-header-sort"
        onClick={() => setShowSortOptions(!showSortOptions)}
      >
        <h3 data-testid="filter-header-sort">Sort by</h3>
        <span className="dropdown-icon">{showSortOptions ? "▼" : "▶"}</span>
      </div>
      {showSortOptions && (
        <div className="sort-content">
          <label className="radio-option">
            <input
              type="radio"
              name="sort"
              data-testid="sort-fees"
              checked={sortBy === "Price: Low-High"}
              onChange={() => onSortChange("Price: Low-High")}
            />
            Price: Low-High
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="sort"
              data-testid="sort-experience"
              checked={sortBy === "Experience: Most Experience first"}
              onChange={() => onSortChange("Experience: Most Experience first")}
            />
            Experience: Most Experience first
          </label>
        </div>
      )}
    </div>
  );
};

export default SortOptions;
