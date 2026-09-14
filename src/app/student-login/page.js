"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./student-login.css";

export default function StudentLogin() {
  const router = useRouter();

  const [studentName, setStudentName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          enrollmentNumber,
          studentId,
          dateOfBirth,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert("❌ " + result.message);
        return;
      }

      alert("✅ Student Login Successful!");

// Logged-in student की information save करें
localStorage.setItem(
  "student",
  JSON.stringify(result.data)
);

router.push("/student-dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="student-login-page">
      <div className="student-login-container">

        <Link href="/" className="back-button">
          ← Back
        </Link>

        <div className="student-login-card">

          <div className="student-login-icon">👨‍🎓</div>

          <h1>Student Login</h1>

          <p className="subtitle">
            Login to access your Student Dashboard.
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label>Student Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Enrollment Number</label>

              <input
                type="text"
                placeholder="Enter enrollment number"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Student ID</label>

              <input
                type="text"
                placeholder="Enter student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Date of Birth</label>

              <input
                type="text"
                placeholder="Date of Birth (DDMMYYYY)"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="student-login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login as Student"}
            </button>

          </form>

        </div>
      </div>
    </main>
  );
}