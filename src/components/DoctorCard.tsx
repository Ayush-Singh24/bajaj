import { Doctor } from "../types";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const experienceYears = doctor.experience.match(/\d+/)?.[0] || "";

  // const feeAmount = doctor.fees.replace(/[^\d]/g, "");

  return (
    <div data-testid="doctor-card" className="doctor-card">
      <div className="doctor-info">
        <div className="doctor-image">
          <img src={doctor.photo} alt={doctor.name} />
        </div>
        <div className="doctor-details">
          <h2 data-testid="doctor-name" className="doctor-name">
            {doctor.name}
          </h2>
          <div data-testid="doctor-speciality" className="doctor-speciality">
            {doctor.specialities.map((spec) => spec.name).join(", ")}
          </div>
          <div className="doctor-qualifications">
            {doctor.doctor_introduction}
          </div>
          <div data-testid="doctor-experience" className="doctor-experience">
            {experienceYears} yrs exp.
          </div>
          <div className="doctor-languages">
            <span className="label">Languages:</span>{" "}
            {doctor.languages.join(", ")}
          </div>
          <div className="doctor-clinic">
            <i className="clinic-icon"></i>
            {doctor.clinic.name}
          </div>
          <div className="doctor-location">
            <i className="location-icon"></i>
            {doctor.clinic.address.locality}, {doctor.clinic.address.city}
          </div>
          <div className="consultation-types">
            {doctor.video_consult && (
              <span className="video-consult">Video Consult</span>
            )}
            {doctor.in_clinic && <span className="in-clinic">In-clinic</span>}
          </div>
        </div>
      </div>
      <div className="doctor-action">
        <div data-testid="doctor-fee" className="doctor-fee">
          {doctor.fees}
        </div>
        <button className="book-appointment-btn">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
