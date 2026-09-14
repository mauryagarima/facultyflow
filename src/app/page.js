"use client";

import Link from "next/link";
import "./dashboard.css";

export default function PrincipalDashboard() {
  const dashboardSections = [
    {
      title: "Faculty Management",
      icon: "👨‍🏫",
      description: "Manage all faculty members and their information.",
      links: [
        { name: "Add Faculty", path: "/add-faculty" },
        { name: "Faculty List", path: "/faculty-list" },
      ],
    },
    {
      title: "Student Management",
      icon: "🧑‍🎓",
      description: "Manage student information and academic details.",
      links: [
        { name: "Add Student", path: "/add-student" },
        { name: "Student List", path: "/student-list" },
      ],
    },
    {
      title: "Task Management",
      icon: "📋",
      description: "Create tasks and monitor faculty work.",
      links: [
        { name: "Create Task", path: "/create-task" },
        { name: "Monitor Tasks", path: "/task-list" },
      ],
    },
    {
      title: "Academic Monitoring",
      icon: "📊",
      description: "Monitor student academic activities and records.",
      links: [
        { name: "Attendance", path: "/attendance-records" },
        { name: "Internal Marks", path: "/internal-marks" },
        { name: "Assignments", path: "/assignment-records" },
        { name: "Practical Records", path: "/practical-records" },
      ],
    },
    {
      title: "Notice Management",
      icon: "📢",
      description: "Create and manage important notices.",
      links: [
        { name: "Manage Notices", path: "/notices" },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: "📈",
      description: "View academic and faculty performance reports.",
      links: [
        { name: "View Reports", path: "/reports" },
      ],
    },
  ];

  return (
    <main className="principal-dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>FacultyFlow</h1>
          <p>Principal Dashboard</p>
        </div>

        <Link href="/role-selection" className="logout-button">
          Logout
        </Link>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div>
          <h2>Welcome, Principal! 👋</h2>
          <p>
            Manage faculty, students and academic activities from one place.
          </p>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="overview-section">
        <h2>Dashboard Overview</h2>

        <div className="overview-grid">

          <div className="overview-card">
            <span>👨‍🏫</span>
            <div>
              <h3>Total Faculty</h3>
              <p>Manage faculty members</p>
            </div>
          </div>

          <div className="overview-card">
            <span>🧑‍🎓</span>
            <div>
              <h3>Total Students</h3>
              <p>Manage student records</p>
            </div>
          </div>

          <div className="overview-card">
            <span>📋</span>
            <div>
              <h3>Task Management</h3>
              <p>Monitor assigned tasks</p>
            </div>
          </div>

          <div className="overview-card">
            <span>📊</span>
            <div>
              <h3>Academic Records</h3>
              <p>Attendance and marks</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Management Sections */}
      <section className="management-section">
        <h2>Management Panel</h2>

        <div className="management-grid">

          {dashboardSections.map((section) => (
            <div className="management-card" key={section.title}>

              <div className="card-icon">
                {section.icon}
              </div>

              <h3>{section.title}</h3>

              <p>{section.description}</p>

              <div className="card-links">
                {section.links.map((link) => (
                  <Link
                    href={link.path}
                    key={link.name}
                    className="dashboard-link"
                  >
                    {link.name} →
                  </Link>
                ))}
              </div>

            </div>
          ))}

        </div>
      </section>

    </main>
  );
}