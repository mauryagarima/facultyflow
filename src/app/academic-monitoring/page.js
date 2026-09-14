"use client";

import { useState } from "react";
import "./academic-monitoring.css";

export default function AcademicMonitoring() {
  const [activeSection, setActiveSection] = useState(null);

  const academicOptions = [
    {
  title: "Student Academic Records",
  icon: "🎓",
  description: "View complete academic records of students.",
  link: "/student-academic-record",
},
  ];

  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <main className="academic-page">
      <div className="academic-container">

        <div className="academic-header">
          <h1>📊 Academic Monitoring</h1>

          <p>
            Monitor all student academic records from one place.
          </p>
        </div>

        <div className="academic-grid">
          {academicOptions.map((item, index) => (
            <div
              className="academic-card"
              key={index}
              onClick={() => handleClick(item.link)}
            >
              <div className="academic-icon">
                {item.icon}
              </div>

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <button>
                View Records →
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}