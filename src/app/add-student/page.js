"use client";

import { useState } from "react";
import Link from "next/link";
import "./add-student.css";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    enrollmentNumber: "",
    branch: "",
    semester: "",
    email: "",
    mobile: "",
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
      const response = await fetch("/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Student added successfully! ✅");

        setFormData({
          name: "",
          enrollmentNumber: "",
          branch: "",
          semester: "",
          email: "",
          mobile: "",
        });
      } else {
        setMessage(result.message || "Failed to add student ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server connection error ❌");
    }

    setLoading(false);
  };

  return (
    <main className="add-student-page">
      <div className="student-container">

        <Link href="/" className="back-button">
          ← Back to Dashboard
        </Link>

        <div className="student-form-card">

          <div className="student-icon">🧑‍🎓</div>

          <h1>Add Student</h1>

          <p>
            Enter student details to add them to the system.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Student Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="input-group">
              <label>Enrollment Number</label>

              <input
                type="text"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                placeholder="Enter enrollment number"
                required
              />
            </div>

            <div className="form-row">

              <div className="input-group">
                <label>Branch</label>

                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                </select>
              </div>

              <div className="input-group">
                <label>Semester</label>

                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                </select>
              </div>

            </div>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="input-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
              />
            </div>

            {message && (
              <p className="message">
                {message}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Adding Student..." : "Add Student"}
            </button>

          </form>

        </div>
      </div>
    </main>
  );
}