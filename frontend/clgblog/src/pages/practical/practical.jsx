import React, { useState } from "react";
import "./practical.css";

function Practical() {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You selected: ${year} Year, ${semester} Semester (Practical)`);
    // Later: replace alert with showing a subject list
  };

  return (
    <div className="practical-container">
      <h1>Practical Subjects</h1>

      <form onSubmit={handleSubmit} className="practical-form">
        {/* Year Selection */}
        <div className="form-group">
          <label>Select Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">-- Choose Year --</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* Semester Selection */}
        <div className="form-group">
          <label>Select Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="">-- Choose Semester --</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Practical;
