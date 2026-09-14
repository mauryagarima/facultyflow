"use client";

import { useRouter } from "next/navigation";
import "./teacher-timetable.css";

export default function TeacherTimetable() {
  const router = useRouter();

  const timetable = [
    {
      day: "Monday",
      classes: [
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Java Programming",
          className: "CSE - 5th Semester",
          room: "Room 101",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Database Management",
          className: "CSE - 5th Semester",
          room: "Room 102",
        },
        {
          time: "11:30 AM - 12:30 PM",
          subject: "Operating System",
          className: "CSE - 5th Semester",
          room: "Room 103",
        },
      ],
    },

    {
      day: "Tuesday",
      classes: [
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Python Programming",
          className: "CSE - 5th Semester",
          room: "Lab 1",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Java Programming",
          className: "CSE - 5th Semester",
          room: "Room 101",
        },
      ],
    },

    {
      day: "Wednesday",
      classes: [
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Database Management",
          className: "CSE - 5th Semester",
          room: "Room 102",
        },
        {
          time: "11:00 AM - 12:00 PM",
          subject: "Python Programming",
          className: "CSE - 5th Semester",
          room: "Room 104",
        },
      ],
    },

    {
      day: "Thursday",
      classes: [
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Operating System",
          className: "CSE - 5th Semester",
          room: "Room 103",
        },
        {
          time: "11:00 AM - 12:00 PM",
          subject: "Java Programming",
          className: "CSE - 5th Semester",
          room: "Room 101",
        },
      ],
    },

    {
      day: "Friday",
      classes: [
        {
          time: "9:00 AM - 10:00 AM",
          subject: "Python Programming",
          className: "CSE - 5th Semester",
          room: "Room 104",
        },
        {
          time: "10:00 AM - 11:00 AM",
          subject: "Database Management",
          className: "CSE - 5th Semester",
          room: "Room 102",
        },
      ],
    },

    {
      day: "Saturday",
      classes: [
        {
          time: "9:00 AM - 11:00 AM",
          subject: "Programming Lab",
          className: "CSE - 5th Semester",
          room: "Computer Lab",
        },
      ],
    },
  ];

  return (
    <main className="teacher-timetable-page">
      <div className="timetable-container">

        {/* Header */}
        <div className="timetable-header">
          <div>
            <h1>📅 My Timetable</h1>
            <p>View your weekly teaching schedule.</p>
          </div>

          <button
            className="back-button"
            onClick={() => router.push("/teacher-dashboard")}
          >
            ← Back
          </button>
        </div>

        {/* Teacher Information */}
        <div className="teacher-info">
          <div>
            <span>👨‍🏫</span>
            <div>
              <h3>Teacher</h3>
              <p>Faculty Member</p>
            </div>
          </div>

          <div>
            <span>🏫</span>
            <div>
              <h3>Department</h3>
              <p>Computer Science</p>
            </div>
          </div>

          <div>
            <span>📚</span>
            <div>
              <h3>Semester</h3>
              <p>5th Semester</p>
            </div>
          </div>
        </div>

        {/* Timetable */}
        <section className="timetable-section">
          <div className="section-title">
            <h2>Weekly Schedule</h2>
            <p>Your teaching classes for the week</p>
          </div>

          <div className="timetable-grid">

            {timetable.map((day) => (
              <div className="day-card" key={day.day}>

                <div className="day-header">
                  <h2>{day.day}</h2>
                </div>

                <div className="day-classes">

                  {day.classes.length === 0 ? (
                    <p className="no-class">No classes scheduled</p>
                  ) : (
                    day.classes.map((item, index) => (
                      <div className="class-card" key={index}>

                        <div className="class-time">
                          ⏰ {item.time}
                        </div>

                        <h3>{item.subject}</h3>

                        <p>🎓 {item.className}</p>

                        <p>🏫 {item.room}</p>

                      </div>
                    ))
                  )}

                </div>

              </div>
            ))}

          </div>
        </section>

      </div>
    </main>
  );
}