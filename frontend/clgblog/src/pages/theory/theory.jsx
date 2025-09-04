import React, { useState, useEffect } from "react";
import "./theory.css";

function Theory() {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `https://studentblog-backend.onrender.com/materials/theory/${year}/${semester}`
    );
    const data = await res.json();

    if (res.ok) {
      // Sort alphabetically by subject name for clean order
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setSubjects(sorted);
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="theory-container">
      <h1>Theory Subjects</h1>

      <form onSubmit={handleSubmit} className="theory-form">
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
          Get Materials
        </button>
      </form>

      {/* Subject Cards */}
      <div className="subjects-grid">
        {subjects.length > 0 ? (
          subjects.map((subj) => (
            <div key={subj._id} className="subject-card">
              <h2>{subj.name}</h2>
              <hr />
              <div className="units-list">
                {subj.units.map((u, i) => (
                  <div key={i} className="unit-item">
                    <a
                      href={u.content}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📎 {u.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No subjects found</p>
        )}
      </div>
    </div>
  );
}

export default Theory;
