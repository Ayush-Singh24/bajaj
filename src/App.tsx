import useDoctorData from "./hooks/useDoctorData";

function App() {
  const { doctors, loading, error } = useDoctorData();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      {doctors.map((doctor) => (
        <div key={doctor.id}>
          <h2>{doctor.name}</h2>
        </div>
      ))}
    </>
  );
}

export default App;
