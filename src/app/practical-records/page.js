"use client";

import { useEffect, useState } from "react";
import "./practical-records.css";

export default function PracticalRecords() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    practicalName: "",
    maxMarks: 10,
    obtainedMarks: "",
    status: "Complete",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // सभी students प्राप्त करने के लिए
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/student");
      const result = await response.json();

      if (result.success) {
        setStudents(result.data);
      } else {
        setMessage("Failed to load students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage("Server connection error while loading students");
    }
  };

  // Input values बदलने के लिए
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/practical", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,
          maxMarks: Number(formData.maxMarks),
          obtainedMarks: Number(formData.obtainedMarks),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Practical record added successfully! ✅");

        setFormData({
          student: "",
          subject: "",
          practicalName: "",
          maxMarks: 10,
          obtainedMarks: "",
          status: "Complete",
        });
      } else {
        setMessage(result.message || "Failed to add practical record");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server connection error");
    }

    setLoading(false);
  };

  return (
    <main className="practical-page">

      <div className="practical-container">

        <div className="page-header">
          <h1>🔬 Practical Records</h1>
          <p>Add and manage student practical records.</p>
        </div>

        <form className="practical-form" onSubmit={handleSubmit}>

          {/* Student Select */}
          <div className="form-group">
            <label>Select Student</label>

            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              required
            >
              <option value="">Select a student</option>

              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} - {student.enrollmentNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="form-group">
            <label>Subject</label>

            <input
              type="text"
              name="subject"
              placeholder="Enter subject name"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* Practical Name */}
          <div className="form-group">
            <label>Practical Name</label>

            <input
              type="text"
              name="practicalName"
              placeholder="Enter practical name"
              value={formData.practicalName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="marks-row">

            {/* Maximum Marks */}
            <div className="form-group">
              <label>Maximum Marks</label>

              <input
                type="number"
                name="maxMarks"
                min="1"
                value={formData.maxMarks}
                onChange={handleChange}
                required
              />
            </div>

            {/* Obtained Marks */}
            <div className="form-group">
              <label>Obtained Marks</label>

              <input
                type="number"
                name="obtainedMarks"
                min="0"
                max={formData.maxMarks}
                placeholder="Enter marks"
                value={formData.obtainedMarks}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Status */}
          <div className="form-group">
            <label>Practical Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Message */}
          {message && (
            <p className="message">{message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="save-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Practical Record"}
          </button>

        </form>

      </div>

    </main>
  );
}