import { useEffect, useState } from "react";
import useDoctorData from "./hooks/useDoctorData";
import {
  filterDoctors,
  getFilterStateFromUrl,
  getUrlParams,
  sortDoctors,
} from "./utils/filterUtils";
import { FilterState } from "./types";
import SortOptions from "./components/SortOptions";
import FilterPanel from "./components/FilterPanel";
import DoctorCard from "./components/DoctorCard";
import "./styles/styles.css";
import Header from "./components/Header";

function App() {
  const { doctors, loading, error } = useDoctorData();
  const [filterState, setFilterState] = useState<FilterState>(
    getFilterStateFromUrl()
  );

  // Update URL when filters change
  useEffect(() => {
    const queryParams = getUrlParams(filterState);
    const newUrl = queryParams
      ? `${window.location.pathname}?${queryParams}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  }, [filterState]);

  // Set initial filter state from URL
  useEffect(() => {
    const handlePopState = () => {
      setFilterState(getFilterStateFromUrl());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilterState({
      searchTerm: "",
      consultationType: "All",
      specialities: [],
      sortBy: "",
    });
  };

  // Apply filters and sorting
  const filteredDoctors = loading ? [] : filterDoctors(doctors, filterState);
  const sortedDoctors = filterState.sortBy
    ? sortDoctors(filteredDoctors, filterState.sortBy)
    : filteredDoctors;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app">
      <Header
        doctors={doctors}
        searchTerm={filterState.searchTerm}
        setSearchTerm={(term) => updateFilter("searchTerm", term)}
      />
      <div className="main-content">
        <div className="sidebar">
          <SortOptions
            sortBy={filterState.sortBy}
            onSortChange={(option) => updateFilter("sortBy", option)}
          />

          <FilterPanel
            doctors={doctors}
            filterState={filterState}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
          />
        </div>

        <div className="doctor-list">
          {loading && <div className="loading">Loading doctors...</div>}

          {error && <div className="error">Error loading doctors: {error}</div>}

          {!loading && !error && sortedDoctors.length === 0 && (
            <div className="no-results">
              No doctors found matching your criteria
            </div>
          )}

          {!loading &&
            !error &&
            sortedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
