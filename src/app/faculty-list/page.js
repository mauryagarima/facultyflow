"use client";

import { useEffect, useState } from "react";
import "./faculty.css";

export default function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await fetch("/api/faculty");
      const result = await response.json();

      if (result.success) {
        setFaculties(result.data);
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading Faculty Data...
      </div>
    );
  }

  return (
    <main className="faculty-page">
      {/* Header */}
      <div className="faculty-header">
        <div>
          <h1>Faculty Management</h1>
          <p>Manage and view all faculty members in one place.</p>
        </div>

        <a href="/add-faculty" className="add-button">
          + Add Faculty
        </a>
      </div>

      {/* Statistics */}
      <div className="stats-container">
        <div className="stat-card">
          <span>Total Faculty</span>
          <h2>{faculties.length}</h2>
        </div>

        <div className="stat-card">
          <span>Departments</span>
          <h2>
            {new Set(faculties.map((faculty) => faculty.department)).size}
          </h2>
        </div>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <div className="table-title">
          <h2>Faculty Members</h2>
          <span>{faculties.length} Records</span>
        </div>

        {faculties.length === 0 ? (
          <div className="empty-state">
            <h3>No Faculty Found</h3>
            <p>Add your first faculty member to get started.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                </tr>
              </thead>

              <tbody>
                {faculties.map((faculty) => (
                  <tr key={faculty._id}>
                    <td className="faculty-name">
                      {faculty.name}
                    </td>
                    <td>{faculty.email}</td>
                    <td>{faculty.phone}</td>
                    <td>
                      <span className="department-badge">
                        {faculty.department}
                      </span>
                    </td>
                    <td>{faculty.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}