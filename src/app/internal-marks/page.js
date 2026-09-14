"use client";

import { useState } from "react";
import Link from "next/link";
import "./internal-marks.css";

export default function InternalMarksPage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Students Load करने के लिए
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

        // शुरुआत में सभी छात्रों के marks खाली रहेंगे
        const initialMarks = {};

        filteredStudents.forEach((student) => {
          initialMarks[student._id] = "";
        });

        setMarks(initialMarks);

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

  // Marks बदलने के लिए
  const handleMarksChange = (studentId, value) => {
    setMarks({
      ...marks,
      [studentId]: value,
    });
  };

  // Marks Save करने के लिए
  const saveMarks = async () => {
    if (students.length === 0) {
      setMessage("Please load students first.");
      return;
    }

    if (!subject.trim()) {
      setMessage("Please enter the subject name.");
      return;
    }

    if (!totalMarks || Number(totalMarks) <= 0) {
      setMessage("Please enter valid total marks.");
      return;
    }

    // सभी students के marks check करें
    for (const student of students) {
      const studentMarks = marks[student._id];

      if (studentMarks === "" || studentMarks === undefined) {
        setMessage(
          `Please enter marks for ${student.name}.`
        );
        return;
      }

      if (
        Number(studentMarks) < 0 ||
        Number(studentMarks) > Number(totalMarks)
      ) {
        setMessage(
          `Invalid marks for ${student.name}.`
        );
        return;
      }
    }

    setLoading(true);
    setMessage("");

    const marksData = students.map((student) => ({
      student: student._id,
      studentName: student.name,
      enrollmentNumber: student.enrollmentNumber,
      branch: student.branch,
      semester: student.semester,
      subject: subject,
      marks: Number(marks[student._id]),
      totalMarks: Number(totalMarks),
    }));

    try {
      const response = await fetch("/api/internal-marks", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          marks: marksData,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Internal marks saved successfully! ✅");
      } else {
        setMessage(
          result.message || "Failed to save marks."
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
    <main className="internal-marks-page">
      <div className="internal-container">

        <Link href="/teacher-dashboard" className="back-button">
          ← Back to Dashboard
        </Link>

        <div className="marks-card">

          <h1>📊 Internal Marks Management</h1>

          <p>
            Select class details, enter student marks and save records.
          </p>

          <div className="selection-grid">

            {/* Branch */}
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

            {/* Semester */}
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

            {/* Subject */}
            <div className="input-group">
              <label>Subject</label>

              <input
                type="text"
                placeholder="Enter subject name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Total Marks */}
            <div className="input-group">
              <label>Total Marks</label>

              <input
                type="number"
                placeholder="Example: 30"
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

          {/* Student List */}

          {students.length > 0 && (

            <div className="students-section">

              <h2>Enter Student Marks</h2>

              <div className="marks-table">

                <table>

                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Student Name</th>
                      <th>Enrollment Number</th>
                      <th>Marks</th>
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

                          <input
                            type="number"
                            placeholder={`Out of ${totalMarks || 0}`}
                            value={
                              marks[student._id] || ""
                            }
                            onChange={(e) =>
                              handleMarksChange(
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
                onClick={saveMarks}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Internal Marks"}
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