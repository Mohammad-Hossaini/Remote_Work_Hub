function Applicant() {
  return (
    <div>
      <h1>Applicant page</h1>
      <input
        type="search"
        style={{
          border: "1px solid #ccc",
          padding: "0.8rem 1rem",
          width: "300px",   // Set the width
          fontSize: "1.6rem", // Set the text size
          borderRadius: "8px"
        }}
        placeholder="Search applicants..."
      />
    </div>
  );
}

export default Applicant;
