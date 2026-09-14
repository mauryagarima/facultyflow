"use client";

import { useState } from "react";
import Link from "next/link";
import "./attendance.css";

export default function AttendancePage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // छात्रों को Load करने के लिए
  const loadStudents = async () => {
    if (!branch || !semester) {
      setMessage("Please select Branch and Semester first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/student");
      const result = await response.json();

      if (response.ok && result.success) {
        const filteredStudents = result.data.filter(
          (student) =>
            student.branch === branch &&
            student.semester === semester
        );

        if (filteredStudents.length === 0) {
          setMessage(
            "No students found for the selected Branch and Semester."
          );
          setStudents([]);
          return;
        }

        setStudents(filteredStudents);

        // सभी students को Default रूप से Present रखना
        const initialAttendance = {};

        filteredStudents.forEach((student) => {
          initialAttendance[student._id] = "Present";
        });

        setAttendance(initialAttendance);
      } else {
        setMessage("Failed to load students.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  // Present / Absent बदलने के लिए
  const changeAttendance = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  // Attendance Save करने के लिए
  const saveAttendance = async () => {
    if (students.length === 0) {
      setMessage("Please load students first.");
      return;
    }

    if (!subject.trim()) {
      setMessage("Please enter the subject name.");
      return;
    }

    setLoading(true);
    setMessage("");

    const attendanceData = students.map((student) => ({
      student: student._id,
      studentName: student.name,
      enrollmentNumber: student.enrollmentNumber,
      branch: student.branch,
      semester: student.semester,
      subject: subject,
      date: date,
      status: attendance[student._id],
    }));

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          attendance: attendanceData,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Attendance saved successfully! ✅");

        // Form reset नहीं करेंगे ताकि Teacher records देख सके
      } else {
        setMessage(
          result.message || "Failed to save attendance."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="attendance-page">
      <div className="attendance-container">

        <Link href="/teacher-dashboard" className="back-button">
          ← Back to Dashboard
        </Link>

        <div className="attendance-card">
          <h1>🧑‍🎓 Student Attendance</h1>
          <p>Select class details and mark student attendance.</p>

          {/* Class Selection */}

          <div className="selection-grid">

            <div className="input-group">
              <label>Branch</label>

              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="EE">Electrical Engineering</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="CE">Civil Engineering</option>
              </select>
            </div>

            <div className="input-group">
              <label>Semester</label>

              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
              </select>
            </div>

            <div className="input-group">
              <label>Subject</label>

              <input
                type="text"
                placeholder="Enter subject name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

          </div>

          <button
            className="load-button"
            onClick={loadStudents}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load Students"}
          </button>

          {/* Students List */}

          {students.length > 0 && (
            <div className="students-section">

              <h2>Student List</h2>

              <div className="attendance-table">

                <table>

                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Student Name</th>
                      <th>Enrollment Number</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student._id}>

                        <td>{index + 1}</td>

                        <td>{student.name}</td>

                        <td>
                          {student.enrollmentNumber}
                        </td>

                        <td>

                          <select
                            value={
                              attendance[student._id] ||
                              "Present"
                            }
                            onChange={(e) =>
                              changeAttendance(
                                student._id,
                                e.target.value
                              )
                            }
                          >
                            <option value="Present">
                              Present
                            </option>

                            <option value="Absent">
                              Absent
                            </option>

                          </select>

                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

              <button
                className="save-button"
                onClick={saveAttendance}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Attendance"}
              </button>

            </div>
          )}

          {message && (
            <div className="message">
              {message}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}