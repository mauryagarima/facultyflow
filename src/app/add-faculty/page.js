 "use client";

import { useState } from "react";
import "./add-faculty.css";

export default function AddFaculty() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Faculty added successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
          designation: "",
        });
      } else {
        setMessage(result.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Error connecting to server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-faculty-page">
      <div className="form-wrapper">

        <div className="form-header">
          <div>
            <h1>Add New Faculty</h1>
            <p>
              Enter the faculty member's details to add them to the system.
            </p>
          </div>

          <a href="/faculty-list" className="back-button">
            ← Faculty List
          </a>
        </div>

        <div className="form-card">

          {message && (
            <div className="message-box">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="input-group">
                <label>Faculty Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter faculty name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Example: Assistant Professor"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Adding Faculty..." : "+ Add Faculty"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </main>
  );
}