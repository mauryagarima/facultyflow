"use client";

import Link from "next/link";
import "./teacher-dashboard.css";

export default function TeacherDashboard() {
  const features = [
    {
      icon: "📋",
      title: "My Tasks",
      description: "View and manage your assigned tasks.",
      link: "/my-tasks",
    },
    {
      icon: "🧑‍🎓",
      title: "Student Attendance",
      description: "Mark and manage student attendance.",
      link: "/attendance",
    },
    {
      icon: "📊",
      title: "Internal Marks",
      description: "Add and manage internal examination marks.",
      link: "/internal-marks",
    },
    {
      icon: "✏️",
      title: "Create Assignment",
      description: "Create and assign academic assignments to students.",
      link: "/assignments",
    },
    {
      icon: "📝",
      title: "Assignment Records",
      description: "Manage student assignment submissions and marks.",
      link: "/assignment-records",
    },
    {
      icon: "🔬",
      title: "Practical Records",
      description: "Manage student practical records.",
      link: "/practical-records",
    },
    {
      icon: "📊",
      title: "Academic Monitoring",
      description: "Monitor attendance and academic records",
      link: "/academic-monitoring",
    },
    {
      icon: "📅",
      title: "My Timetable",
      description: "View your teaching schedule.",
      link: "/teacher-timetable",
    },
    {
      icon: "📢",
      title: "Notices",
      description: "View important announcements.",
      link: "/notices",
    },
    {
      icon: "👤",
      title: "My Profile",
      description: "View your personal and professional details.",
      link: "/teacher-profile",
    },
  ];

  return (
    <main className="teacher-dashboard">

      <header className="dashboard-header">
        <div>
          <h1>FacultyFlow</h1>
          <p>Teacher Dashboard</p>
        </div>

        <button className="logout-button">
          Logout
        </button>
      </header>

      <section className="welcome-section">
        <h2>Welcome, Teacher! 👋</h2>

        <p>
          Manage your academic activities and assigned work from one place.
        </p>
      </section>

      <section className="summary-container">

        <div className="summary-card">
          <span>📋</span>
          <div>
            <h3>My Tasks</h3>
            <p>Manage assigned work</p>
          </div>
        </div>

        <div className="summary-card">
          <span>🧑‍🎓</span>
          <div>
            <h3>Attendance</h3>
            <p>Manage student attendance</p>
          </div>
        </div>

        <div className="summary-card">
          <span>📊</span>
          <div>
            <h3>Internal Marks</h3>
            <p>Manage student marks</p>
          </div>
        </div>

      </section>

      <section className="features-section">

        <h2>Academic Management</h2>

        <div className="features-grid">

          {features.map((feature) => (
            <Link
              href={feature.link}
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="open-link">
                Open →
              </span>
            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}