import { Doctor, FilterState } from "../types";

export const filterDoctors = (
  doctors: Doctor[],
  filterState: FilterState
): Doctor[] => {
  return doctors.filter((doctor) => {
    // Filter by search term
    if (
      filterState.searchTerm &&
      !doctor.name.toLowerCase().includes(filterState.searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by consultation type
    if (
      filterState.consultationType === "Video Consult" &&
      !doctor.video_consult
    ) {
      return false;
    }
    if (filterState.consultationType === "In-clinic" && !doctor.in_clinic) {
      return false;
    }

    // Filter by specialities
    if (
      filterState.specialities.length > 0 &&
      !filterState.specialities.some((speciality) =>
        doctor.specialities.some((spec) => spec.name === speciality)
      )
    ) {
      return false;
    }

    return true;
  });
};

export const sortDoctors = (doctors: Doctor[], sortBy: string): Doctor[] => {
  const sortedDoctors = [...doctors];

  switch (sortBy) {
    case "Price: Low-High":
      return sortedDoctors.sort((a, b) => {
        const aFees = parseInt(a.fees.replace(/[^\d]/g, ""));
        const bFees = parseInt(b.fees.replace(/[^\d]/g, ""));
        return aFees - bFees;
      });
    case "Experience: Most Experience first":
      return sortedDoctors.sort((a, b) => {
        const aExp = parseInt(a.experience.match(/\d+/)?.[0] || "0");
        const bExp = parseInt(b.experience.match(/\d+/)?.[0] || "0");
        return bExp - aExp;
      });
    default:
      return sortedDoctors;
  }
};

export const allSpecialities = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Cardiologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian/Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ayurveda",
  "Homeopath",
];

export const getUrlParams = (filterState: FilterState): string => {
  const params = new URLSearchParams();

  if (filterState.searchTerm) {
    params.set("search", filterState.searchTerm);
  }

  if (filterState.consultationType !== "All") {
    params.set("consultation", filterState.consultationType);
  }

  if (filterState.specialities.length > 0) {
    params.set("specialities", filterState.specialities.join(","));
  }

  if (filterState.sortBy) {
    params.set("sort", filterState.sortBy);
  }

  return params.toString();
};

export const getFilterStateFromUrl = (): FilterState => {
  const params = new URLSearchParams(window.location.search);
  const consultationType =
    (params.get("consultation") as FilterState["consultationType"]) || "All";
  const sortBy = (params.get("sort") as FilterState["sortBy"]) || "";

  return {
    searchTerm: params.get("search") || "",
    consultationType: consultationType,
    specialities: params.get("specialities")
      ? params.get("specialities")!.split(",")
      : [],
    sortBy: sortBy,
  };
};
