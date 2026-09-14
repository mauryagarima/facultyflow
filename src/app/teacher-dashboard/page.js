
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./teacher-dashboard.css";

export default function TeacherDashboard() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();

    setCurrentDate(
      date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const features = [
    {
      icon: "📋",
      title: "My Tasks",
      description: "View and manage your assigned tasks.",
      link: "/my-tasks",
      tag: "Tasks",
    },
    {
      icon: "🧑‍🎓",
      title: "Student Attendance",
      description: "Mark and manage student attendance.",
      link: "/attendance",
      tag: "Attendance",
    },
    {
      icon: "📊",
      title: "Internal Marks",
      description: "Add and manage internal examination marks.",
      link: "/internal-marks",
      tag: "Marks",
    },
    {
      icon: "✏️",
      title: "Create Assignment",
      description: "Create and assign academic assignments.",
      link: "/assignments",
      tag: "Assignment",
    },
    {
      icon: "📝",
      title: "Assignment Records",
      description: "Manage student submissions and marks.",
      link: "/assignment-records",
      tag: "Records",
    },
    {
      icon: "🔬",
      title: "Practical Records",
      description: "Manage student practical records.",
      link: "/practical-records",
      tag: "Practical",
    },
    {
      icon: "📈",
      title: "Academic Monitoring",
      description: "Monitor attendance and academic records.",
      link: "/academic-monitoring",
      tag: "Analytics",
    },
    {
      icon: "📅",
      title: "My Timetable",
      description: "View your teaching schedule.",
      link: "/teacher-timetable",
      tag: "Schedule",
    },
    {
      icon: "📢",
      title: "Notices",
      description: "View important announcements.",
      link: "/notices",
      tag: "Updates",
    },
    {
      icon: "👤",
      title: "My Profile",
      description: "View your professional details.",
      link: "/teacher-profile",
      tag: "Profile",
    },
  ];

  const quickActions = [
    {
      icon: "🧑‍🎓",
      title: "Mark Attendance",
      link: "/attendance",
    },
    {
      icon: "✏️",
      title: "Create Assignment",
      link: "/assignments",
    },
    {
      icon: "📊",
      title: "Add Internal Marks",
      link: "/internal-marks",
    },
    {
      icon: "📅",
      title: "View Timetable",
      link: "/teacher-timetable",
    },
  ];

  return (
    <main className="teacher-dashboard">

      {/* Decorative Background */}
      <div className="dashboard-orb orb-one"></div>
      <div className="dashboard-orb orb-two"></div>

      {/* Navbar */}
      <header className="teacher-navbar">

        <div className="navbar-brand">
          <div className="brand-logo">F</div>

          <div>
            <h1>FacultyFlow</h1>
            <span>Teacher Portal</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="notification-button">
            🔔
            <span className="notification-dot"></span>
          </div>

          <div className="teacher-mini-profile">
            <div className="teacher-avatar">👩‍🏫</div>

            <div>
              <strong>Teacher</strong>
              <small>Faculty Member</small>
            </div>
          </div>

          <Link href="/role-selection" className="logout-button">
            Logout
          </Link>
        </div>

      </header>

      <div className="teacher-dashboard-container">

        {/* Welcome */}
        <section className="teacher-welcome">

          <div className="welcome-content">
            <span className="welcome-label">
              TEACHER PORTAL
            </span>

            <h2>
              Welcome back, Teacher! 👋
            </h2>

            <p>
              Manage your classes, academic activities and
              assigned work from one place.
            </p>

            {currentDate && (
              <div className="current-date">
                📅 {currentDate}
              </div>
            )}
          </div>

          <div className="welcome-illustration">
            <div className="illustration-circle">
              👩‍🏫
            </div>
            <div className="floating-icon icon-a">📚</div>
            <div className="floating-icon icon-b">📊</div>
            <div className="floating-icon icon-c">✓</div>
          </div>

        </section>

        {/* Statistics */}
        <section className="summary-section">

          <div className="summary-card">
            <div className="summary-icon task-icon">
              📋
            </div>

            <div className="summary-content">
              <span>My Tasks</span>
              <h3>Manage</h3>
              <p>Assigned work</p>
            </div>

            <span className="summary-arrow">→</span>
          </div>

          <div className="summary-card">
            <div className="summary-icon attendance-icon">
              🧑‍🎓
            </div>

            <div className="summary-content">
              <span>Attendance</span>
              <h3>Manage</h3>
              <p>Student attendance</p>
            </div>

            <span className="summary-arrow">→</span>
          </div>

          <div className="summary-card">
            <div className="summary-icon marks-icon">
              📊
            </div>

            <div className="summary-content">
              <span>Internal Marks</span>
              <h3>Update</h3>
              <p>Student performance</p>
            </div>

            <span className="summary-arrow">→</span>
          </div>

          <div className="summary-card">
            <div className="summary-icon notice-icon">
              📢
            </div>

            <div className="summary-content">
              <span>Notices</span>
              <h3>View</h3>
              <p>Latest announcements</p>
            </div>

            <span className="summary-arrow">→</span>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="quick-section">

          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Frequently used teacher activities</p>
            </div>
          </div>

          <div className="quick-grid">

            {quickActions.map((action) => (
              <Link
                href={action.link}
                className="quick-action"
                key={action.title}
              >
                <span className="quick-action-icon">
                  {action.icon}
                </span>

                <span>{action.title}</span>

                <strong>→</strong>
              </Link>
            ))}

          </div>

        </section>

        {/* Academic Management */}
        <section className="features-section">

          <div className="section-heading">

            <div>
              <span className="section-label">
                ACADEMIC MANAGEMENT
              </span>

              <h2>Manage Your Work</h2>

              <p>
                Access all your teaching and academic tools.
              </p>
            </div>

            <span className="feature-count">
              {features.length} Features
            </span>

          </div>

          <div className="features-grid">

            {features.map((feature, index) => (
              <Link
                href={feature.link}
                className="feature-card"
                key={feature.title}
              >

                <div className="feature-top">

                  <div className="feature-icon">
                    {feature.icon}
                  </div>

                  <span className="feature-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <span className="feature-tag">
                  {feature.tag}
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <div className="feature-footer">
                  <span>Open Module</span>
                  <span className="feature-arrow">→</span>
                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* Bottom Info */}
        <section className="bottom-info-grid">

          <div className="info-card notice-info-card">

            <div className="info-icon">
              📢
            </div>

            <div>
              <span>STAY UPDATED</span>
              <h3>Check Latest Notices</h3>
              <p>
                Stay informed about important college
                announcements and updates.
              </p>

              <Link href="/notices">
                View Notices →
              </Link>
            </div>

          </div>

          <div className="info-card profile-info-card">

            <div className="info-icon">
              👤
            </div>

            <div>
              <span>YOUR ACCOUNT</span>
              <h3>Teacher Profile</h3>
              <p>
                View and manage your professional information.
              </p>

              <Link href="/teacher-profile">
                View Profile →
              </Link>
            </div>

          </div>

        </section>

        {/* Footer */}
        <footer className="teacher-footer">
          <div>
            <strong>FacultyFlow</strong>
            <span>Smart Faculty Work Management System</span>
          </div>

          <p>© 2026 FacultyFlow. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}

