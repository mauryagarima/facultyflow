"use client";

import { useState } from "react";
import Link from "next/link";
import "./assignment-records.css";

export default function AssignmentPage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [students, setStudents] = useState([]);
  const [assignmentData, setAssignmentData] = useState({});

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Students load करने के लिए
  const loadStudents = async () => {
    if (!branch || !semester) {
      setMessage("Please select Branch and Semester.");
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
          setStudents([]);
          setMessage(
            "No students found for the selected Branch and Semester."
          );
          return;
        }

        setStudents(filteredStudents);

        // सभी students के लिए default values
        const initialData = {};

        filteredStudents.forEach((student) => {
          initialData[student._id] = {
            status: "Submitted",
            marks: "",
          };
        });

        setAssignmentData(initialData);
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

  // Status बदलने के लिए
  const changeStatus = (studentId, status) => {
    setAssignmentData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  // Marks बदलने के लिए
  const changeMarks = (studentId, marks) => {
    setAssignmentData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        marks,
      },
    }));
  };

  // Assignment records save करने के लिए
  const saveAssignments = async () => {
    if (students.length === 0) {
      setMessage("Please load students first.");
      return;
    }

    if (!subject.trim()) {
      setMessage("Please enter the subject name.");
      return;
    }

    if (!assignmentTitle.trim()) {
      setMessage("Please enter the assignment title.");
      return;
    }

    if (!totalMarks || Number(totalMarks) <= 0) {
      setMessage("Please enter valid total marks.");
      return;
    }

    // सभी छात्रों के marks validate करें
    for (const student of students) {
      const data = assignmentData[student._id];

      if (!data || data.marks === "") {
        setMessage(`Please enter marks for ${student.name}.`);
        return;
      }

      if (
        Number(data.marks) < 0 ||
        Number(data.marks) > Number(totalMarks)
      ) {
        setMessage(`Invalid marks for ${student.name}.`);
        return;
      }
    }

    setLoading(true);
    setMessage("");

    const assignments = students.map((student) => ({
      student: student._id,
      studentName: student.name,
      enrollmentNumber: student.enrollmentNumber,
      branch: student.branch,
      semester: student.semester,
      subject: subject,
      assignmentTitle: assignmentTitle,
      status: assignmentData[student._id].status,
      marks: Number(assignmentData[student._id].marks),
      totalMarks: Number(totalMarks),
    }));

    try {
      const response = await fetch("/api/assignment", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          assignments: assignments,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Assignment records saved successfully! ✅");
      } else {
        setMessage(
          result.message || "Failed to save assignment records."
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
    <main className="assignment-page">
      <div className="assignment-container">

        <Link href="/teacher-dashboard" className="back-button">
          ← Back to Dashboard
        </Link>

        <div className="assignment-card">
          <h1>📝 Assignment Record Management</h1>

          <p>
            Manage student assignment submission and marks.
          </p>

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
              <label>Assignment Title</label>

              <input
                type="text"
                placeholder="Example: Assignment 1"
                value={assignmentTitle}
                onChange={(e) =>
                  setAssignmentTitle(e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <label>Total Marks</label>

              <input
                type="number"
                placeholder="Example: 10"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                min="1"
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

          {students.length > 0 && (
            <div className="students-section">

              <h2>Student Assignment Records</h2>

              <div className="assignment-table">
                <table>

                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Student Name</th>
                      <th>Enrollment Number</th>
                      <th>Status</th>
                      <th>Marks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student._id}>

                        <td>{index + 1}</td>

                        <td>{student.name}</td>

                        <td>{student.enrollmentNumber}</td>

                        <td>
                          <select
                            value={
                              assignmentData[student._id]
                                ?.status || "Submitted"
                            }
                            onChange={(e) =>
                              changeStatus(
                                student._id,
                                e.target.value
                              )
                            }
                          >
                            <option value="Submitted">
                              Submitted
                            </option>

                            <option value="Not Submitted">
                              Not Submitted
                            </option>
                          </select>
                        </td>

                        <td>
                          <input
                            type="number"
                            placeholder={`Out of ${totalMarks || 0}`}
                            value={
                              assignmentData[student._id]
                                ?.marks || ""
                            }
                            onChange={(e) =>
                              changeMarks(
                                student._id,
                                e.target.value
                              )
                            }
                            min="0"
                            max={totalMarks || ""}
                          />
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              <button
                className="save-button"
                onClick={saveAssignments}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Assignment Records"}
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