import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();
  const [type, setType] = useState("theory");
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [name, setName] = useState(""); // subject name
  const [unitTitle, setUnitTitle] = useState("");
  const [unitContent, setUnitContent] = useState("");
  const [materials, setMaterials] = useState([]);

  // Fetch subjects
  const fetchMaterials = async () => {
    const res = await fetch(
      `https://studentblog-backend.onrender.com/admin/materials/${type}/${year}/${semester}`
    );
    const data = await res.json();
    if (res.ok) setMaterials(data);
  };

  useEffect(() => {
    fetchMaterials();
  }, [type, year, semester]);

  // Add Material
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://studentblog-backend.onrender.com/admin/material", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, year, semester, name, unitTitle, unitContent }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ Material added successfully!");
      setUnitTitle("");
      setUnitContent("");
      fetchMaterials();
    } else {
      alert("❌ Error: " + data.error);
    }
  };

  // Delete Unit
  const handleDeleteUnit = async (subjectId, unitIndex) => {
    const res = await fetch(
      `https://studentblog-backend.onrender.com/admin/material/${subjectId}/unit/${unitIndex}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      alert("🗑️ Unit deleted");
      fetchMaterials();
    } else {
      const data = await res.json();
      alert("❌ Error: " + data.error);
    }
  };

  // Delete Subject
  const handleDeleteSubject = async (subjectId) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this subject?")) return;

    const res = await fetch(`https://studentblog-backend.onrender.com/admin/material/${subjectId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("🗑️ Subject deleted");
      fetchMaterials();
    } else {
      const data = await res.json();
      alert("❌ Error: " + data.error);
    }
  };

  return (

    <div className="container py-5">
<button onClick={() => navigate("/register")} className="btn btn-primary">
      Register
    </button>      <h1 className="text-center mb-5">📚 Admin Dashboard</h1>

      {/* Add Material Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <label>Material Type</label>
        <select className="form-control mb-3" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="theory">Theory</option>
          <option value="practical">Practical</option>
          <option value="previous">Previous Papers</option>
        </select>

        <label>Year</label>
        <select className="form-control mb-3" value={year} onChange={(e) => setYear(Number(e.target.value))}>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <label>Semester</label>
        <select className="form-control mb-3" value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
        </select>

        {/* Subject Dropdown */}
        <label>Select Existing Subject (or type new)</label>
        <select
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">-- Add New Subject --</option>
          {materials.map((m) => (
            <option key={m._id} value={m.name}>
              {m.name} ({m.units.length} units)
            </option>
          ))}
        </select>

        {/* Subject Name Input (only if new subject) */}
        {!materials.some((m) => m.name === name) && (
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter new subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <label>Unit Title</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="e.g., Unit 1"
          value={unitTitle}
          onChange={(e) => setUnitTitle(e.target.value)}
          required
        />

        <label>Unit Content / Link</label>
        <textarea
          className="form-control mb-3"
          placeholder="Enter content or link"
          value={unitContent}
          onChange={(e) => setUnitContent(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">Save Material</button>
      </form>

      {/* Existing Subjects List */}
      <h3>📖 Existing Subjects</h3>
      {materials.length > 0 ? (
        materials.map((m) => (
          <div key={m._id} className="card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4>
                {m.name} ({m.units.length} units)
              </h4>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteSubject(m._id)}
              >
                🗑️ Delete Subject
              </button>
            </div>
            <ul>
              {m.units.map((u, i) => (
                <li key={i} className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>{u.title}:</strong>{" "}
                    <a href={u.content} target="_blank" rel="noopener noreferrer">
                      {u.content}
                    </a>
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteUnit(m._id, i)}
                  >
                    ❌ Delete Unit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No subjects found</p>
      )}
    </div>
  );
}

export default AdminDashboard;
