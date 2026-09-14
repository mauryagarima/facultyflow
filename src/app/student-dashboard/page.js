"use client";

import Link from "next/link";
import "./student-dashboard.css";

export default function StudentDashboard() {
  return (
    <main className="student-dashboard">
      <div className="student-container">

        {/* Header */}
        <div className="student-header">
          <div>
            <h1>Student Dashboard</h1>
            <p>Manage your attendance and assignments</p>
          </div>

          <Link href="/role-selection" className="logout-button">
            Logout
          </Link>
        </div>

        {/* Welcome */}
        <div className="welcome-card">
          <div className="welcome-icon">👨‍🎓</div>

          <div>
            <h2>Welcome, Student!</h2>
            <p>
              You can mark your attendance and submit your assignments
              from here.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="student-grid">

          {/* Attendance */}
          <Link href="/mark-attendance" className="student-card">
            <div className="card-icon">📍</div>

            <h3>Mark Attendance</h3>

            <p>
              Mark your attendance using your college campus location.
            </p>

            <span>Mark Now →</span>
          </Link>

          {/* Assignment */}
          <Link href="/submit-assignment" className="student-card">
            <div className="card-icon">📤</div>

            <h3>Submit Assignment</h3>

            <p>
              Upload and submit your subject assignments.
            </p>

            <span>Submit Now →</span>
          </Link>

          {/* Attendance Record */}
          <Link href="/my-attendance" className="student-card">
            <div className="card-icon">📊</div>

            <h3>My Attendance</h3>

            <p>
              Check your attendance records and attendance percentage.
            </p>

            <span>View Attendance →</span>
          </Link>

        </div>

      </div>
    </main>
  );
}