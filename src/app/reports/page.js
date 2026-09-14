"use client";

import { useEffect, useState } from "react";
import "./reports.css";

export default function Reports() {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [internalMarks, setInternalMarks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [
        studentResponse,
        facultyResponse,
        taskResponse,
        attendanceResponse,
        marksResponse,
      ] = await Promise.all([
        fetch("/api/student"),
        fetch("/api/faculty"),
        fetch("/api/task"),
        fetch("/api/attendance"),
        fetch("/api/internal-marks"),
      ]);

      const studentData = await studentResponse.json();
      const facultyData = await facultyResponse.json();
      const taskData = await taskResponse.json();
      const attendanceData = await attendanceResponse.json();
      const marksData = await marksResponse.json();

      if (studentData.success) {
        setStudents(studentData.data);
      }

      if (facultyData.success) {
        setFaculty(facultyData.data);
      }

      if (taskData.success) {
        setTasks(taskData.data);
      }

      if (attendanceData.success) {
        setAttendance(attendanceData.data);
      }

      if (marksData.success) {
        setInternalMarks(marksData.data);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "Completed" ||
      task.status === "Complete"
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const attendancePercentage =
    attendance.length > 0
      ? ((presentCount / attendance.length) * 100).toFixed(1)
      : "0.0";

  const totalMarks = internalMarks.reduce(
    (sum, record) => sum + Number(record.totalMarks || 0),
    0
  );

  const obtainedMarks = internalMarks.reduce(
    (sum, record) => sum + Number(record.marks || 0),
    0
  );

  const marksPercentage =
    totalMarks > 0
      ? ((obtainedMarks / totalMarks) * 100).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <main className="reports-page">
        <div className="reports-container">
          <div className="loading-box">
            Loading Reports & Analytics...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="reports-page">
      <div className="reports-container">

        <div className="reports-header">
          <div>
            <h1>📈 Reports & Analytics</h1>
            <p>
              View college performance and management summary.
            </p>
          </div>

          <button
            className="back-button"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>
        </div>

        {/* Overview */}

        <section className="report-section">
          <div className="section-title">
            <h2>📊 College Overview</h2>
            <p>Overall system statistics</p>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👨‍🏫</div>
              <h3>{faculty.length}</h3>
              <p>Total Faculty</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <h3>{tasks.length}</h3>
              <p>Total Tasks</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <h3>{completedTasks}</h3>
              <p>Completed Tasks</p>
            </div>

          </div>
        </section>

        {/* Academic Report */}

        <section className="report-section">
          <div className="section-title">
            <h2>🎓 Academic Performance</h2>
            <p>Student academic summary</p>
          </div>

          <div className="academic-stats">

            <div className="academic-card">
              <span>📅</span>
              <div>
                <h3>{attendancePercentage}%</h3>
                <p>Overall Attendance</p>
              </div>
            </div>

            <div className="academic-card">
              <span>📝</span>
              <div>
                <h3>{marksPercentage}%</h3>
                <p>Internal Marks</p>
              </div>
            </div>

            <div className="academic-card">
              <span>⏳</span>
              <div>
                <h3>{pendingTasks}</h3>
                <p>Pending Tasks</p>
              </div>
            </div>

          </div>
        </section>

        {/* Task Report */}

        <section className="report-section">
          <div className="section-title">
            <h2>📋 Faculty Task Report</h2>
            <p>Task completion summary</p>
          </div>

          <div className="task-report">

            <div>
              <span>Completed Tasks</span>
              <strong>{completedTasks}</strong>
            </div>

            <div>
              <span>Pending Tasks</span>
              <strong>{pendingTasks}</strong>
            </div>

            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>

          </div>
        </section>

        {/* Report Actions */}

        <section className="report-section">
          <div className="section-title">
            <h2>📄 Reports</h2>
            <p>Generate useful management reports</p>
          </div>

          <div className="report-buttons">

            <button onClick={() => window.print()}>
              🖨️ Print Complete Report
            </button>

            <button onClick={() => window.print()}>
              📊 Print Academic Report
            </button>

            <button onClick={() => window.print()}>
              👨‍🏫 Print Faculty Report
            </button>

            <button onClick={() => window.print()}>
              📋 Print Task Report
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}