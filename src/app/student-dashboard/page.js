
"use client";

import Link from "next/link";
import "./student-dashboard.css";

export default function StudentDashboard() {
  return (
    <main className="student-dashboard">
      <div className="student-container">

        <header className="student-header">
          <div className="student-brand">
            <div className="student-logo">🎓</div>
            <div>
              <h1>FacultyFlow</h1>
              <p>Student Dashboard</p>
            </div>
          </div>

          <Link href="/role-selection" className="logout-button">
            Logout
          </Link>
        </header>

        <section className="welcome-card">
          <div className="welcome-content">
            <div className="welcome-icon">👨‍🎓</div>

            <div>
              <span className="welcome-label">STUDENT PORTAL</span>
              <h2>Welcome, Student! 👋</h2>
              <p>
                Manage your attendance and assignments easily from your
                dashboard.
              </p>
            </div>
          </div>

          <div className="welcome-decoration">📚</div>
        </section>

        <section className="options-section">
          <div className="section-heading">
            <div>
              <span>QUICK ACCESS</span>
              <h2>Student Activities</h2>
            </div>

            <p>Choose an option to continue</p>
          </div>

          <div className="student-grid">

            <Link href="/mark-attendance" className="student-card">
              <div className="card-top">
                <div className="card-icon">📍</div>
                <div className="card-arrow">→</div>
              </div>

              <h3>Mark Attendance</h3>

              <p>
                Mark your attendance using your college campus location.
              </p>

              <div className="card-action">
                <span>Mark Now</span>
                <span>→</span>
              </div>
            </Link>

            <Link href="/submit-assignment" className="student-card">
              <div className="card-top">
                <div className="card-icon">📤</div>
                <div className="card-arrow">→</div>
              </div>

              <h3>Submit Assignment</h3>

              <p>
                Upload and submit your subject assignments easily.
              </p>

              <div className="card-action">
                <span>Submit Now</span>
                <span>→</span>
              </div>
            </Link>

            <Link href="/my-attendance" className="student-card">
              <div className="card-top">
                <div className="card-icon">📊</div>
                <div className="card-arrow">→</div>
              </div>

              <h3>My Attendance</h3>

              <p>
                Check your attendance records and attendance percentage.
              </p>

              <div className="card-action">
                <span>View Attendance</span>
                <span>→</span>
              </div>
            </Link>

          </div>
        </section>

        <footer className="student-footer">
          © 2026 FacultyFlow • Smart Faculty Work Management System
        </footer>

      </div>
    </main>
  );
}

