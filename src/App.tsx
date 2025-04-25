import { useEffect, useState } from "react";
import useDoctorData from "./hooks/useDoctorData";
import {
  filterDoctors,
  getFilterStateFromUrl,
  getUrlParams,
  sortDoctors,
} from "./utils/filterUtils";
import { FilterState } from "./types";

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
    <>
      {sortedDoctors.map((doctor) => (
        <div key={doctor.id}>
          <h2>{doctor.name}</h2>
        </div>
      ))}
    </>
  );
}

export default App;
