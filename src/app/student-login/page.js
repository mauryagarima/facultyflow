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
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

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
        setError(result.message || "Invalid student details.");
        setLoading(false);
        return;
      }

      // Logged-in student's information save करें
      localStorage.setItem(
        "student",
        JSON.stringify(result.data)
      );

      router.push("/student-dashboard");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="student-login-page">

      {/* Background Decorations */}
      <div className="student-blob student-blob-one"></div>
      <div className="student-blob student-blob-two"></div>

      <div className="student-login-container">

        {/* Back Button */}
        <Link href="/" className="back-button">
          <span>←</span> Back to Roles
        </Link>

        {/* Login Card */}
        <div className="student-login-card">

          {/* Brand */}
          <div className="brand-section">

            <div className="student-login-icon">
              🎓
            </div>

            <div className="brand-name">
              Faculty<span>Flow</span>
            </div>

          </div>

          <h1>Student Login</h1>

          <p className="subtitle">
            Welcome back! Login to access your dashboard,
            attendance and academic records.
          </p>

          <form onSubmit={handleLogin}>

            {/* Student Name */}
            <div className="input-group">
              <label>Student Name</label>

              <div className="input-wrapper">
                <span className="input-icon">👤</span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={studentName}
                  onChange={(e) =>
                    setStudentName(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Enrollment Number */}
            <div className="input-group">
              <label>Enrollment Number</label>

              <div className="input-wrapper">
                <span className="input-icon">🪪</span>

                <input
                  type="text"
                  placeholder="Enter enrollment number"
                  value={enrollmentNumber}
                  onChange={(e) =>
                    setEnrollmentNumber(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Student ID */}
            <div className="input-group">
              <label>Student ID</label>

              <div className="input-wrapper">
                <span className="input-icon">🔢</span>

                <input
                  type="text"
                  placeholder="Enter student ID"
                  value={studentId}
                  onChange={(e) =>
                    setStudentId(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="input-group">
              <label>Date of Birth</label>

              <div className="input-wrapper">
                <span className="input-icon">📅</span>

                <input
                  type="text"
                  placeholder="DDMMYYYY"
                  value={dateOfBirth}
                  onChange={(e) =>
                    setDateOfBirth(e.target.value)
                  }
                  required
                />
              </div>

              <small className="input-hint">
                Enter your date of birth as DDMMYYYY
              </small>
            </div>

            {/* Error */}
            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="student-login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Checking...
                </>
              ) : (
                <>
                  Login as Student
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>

            {/* Create Account */}
            <p className="create-account-text">
              Don't have an account?{" "}
              <Link
                href="/student-register"
                className="create-account-link"
              >
                Create Account
              </Link>
            </p>

          </form>

          {/* Security Note */}
          <div className="security-note">
            <span>🔐</span>
            <p>Your student information is securely verified</p>
          </div>

        </div>

        {/* Footer */}
        <p className="login-footer">
          © 2026 FacultyFlow · Smart Faculty Work Management System
        </p>

      </div>
    </main>
  );
}



