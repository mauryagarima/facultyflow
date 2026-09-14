"use client";

import Link from "next/link";
import "./dashboard.css";

export default function Dashboard() {
  const dashboardItems = [
    {
      icon: "👨‍🏫",
      title: "Faculty Management",
      description: "Add and manage faculty members",
      link: "/faculty-list",
    },
    {
      icon: "🧑‍🎓",
      title: "Student Management",
      description: "Add and manage students",
      link: "/student-list",
    },
    {
      icon: "📋",
      title: "Task Management",
      description: "Create and monitor faculty tasks",
      link: "/task-list",
    },
    {
      icon: "📊",
      title: "Academic Monitoring",
      description: "Monitor attendance and academic records",
      link: "/academic-monitoring",
    },
    {
      icon: "📢",
      title: "Notice Management",
      description: "Create and manage college notices",
      link: "/notice-management",
    },
    {
      icon: "📈",
      title: "Reports & Analytics",
      description: "View reports and academic performance",
      link: "/reports",
    },
  ];

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        
        <div className="dashboard-header">
          <div>
            <h1>Principal Dashboard</h1>
            <p>Welcome to FacultyFlow Management System</p>
          </div>

          <Link href="/" className="logout-button">
            Logout
          </Link>
        </div>

        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <Link
              href={item.link}
              className="dashboard-card"
              key={index}
            >
              <span className="dashboard-icon">
                {item.icon}
              </span>

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <span className="card-arrow">→</span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}