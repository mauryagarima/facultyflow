"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./student-academic-record.css";

export default function StudentAcademicRecordDetails() {
  const params = useParams();
  const router = useRouter();

  const studentId = params.id;

  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [internalMarks, setInternalMarks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [practicals, setPracticals] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) {
      fetchAcademicRecords();
    }
  }, [studentId]);

  const fetchAcademicRecords = async () => {
    try {
      setLoading(true);

      const [
        studentResponse,
        attendanceResponse,
        marksResponse,
        assignmentResponse,
        practicalResponse,
      ] = await Promise.all([
        fetch("/api/student"),
        fetch("/api/attendance"),
        fetch("/api/internal-marks"),
        fetch("/api/assignment-records"),
        fetch("/api/practical"),
      ]);

      const studentData = await studentResponse.json();
      const attendanceData = await attendanceResponse.json();
      const marksData = await marksResponse.json();
      const assignmentData = await assignmentResponse.json();
      const practicalData = await practicalResponse.json();

      // Selected Student
      if (studentData.success) {
        const selectedStudent = studentData.data.find(
          (item) => item._id === studentId
        );

        setStudent(selectedStudent || null);
      }

      // Attendance
      if (attendanceData.success) {
        const studentAttendance = attendanceData.data.filter(
          (item) => item.student?._id === studentId
        );

        setAttendance(studentAttendance);
      }

      // Internal Marks
      if (marksData.success) {
        const studentMarks = marksData.data.filter(
          (item) => item.student?._id === studentId
        );

        setInternalMarks(studentMarks);
      }

      // Assignments
      if (assignmentData.success) {
        const studentAssignments = assignmentData.data.filter(
          (item) => item.student?._id === studentId
        );

        setAssignments(studentAssignments);
      }

      // Practicals
      if (practicalData.success) {
        const studentPracticals = practicalData.data.filter(
          (item) => item.student?._id === studentId
        );

        setPracticals(studentPracticals);
      }
    } catch (error) {
      console.error("Failed to fetch academic records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Attendance Calculation
  const totalClasses = attendance.length;

  const presentClasses = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentClasses = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const attendancePercentage =
    totalClasses > 0
      ? ((presentClasses / totalClasses) * 100).toFixed(1)
      : "0.0";
      // Internal Marks Calculation
const internalObtained = internalMarks.reduce(
  (total, record) => total + Number(record.marks || 0),
  0
);

const internalTotal = internalMarks.reduce(
  (total, record) => total + Number(record.totalMarks || 0),
  0
);

const internalPercentage =
  internalTotal > 0
    ? ((internalObtained / internalTotal) * 100).toFixed(1)
    : "0.0";


// Assignment Marks Calculation
const assignmentObtained = assignments.reduce(
  (total, record) => total + Number(record.marks || 0),
  0
);

const assignmentTotal = assignments.reduce(
  (total, record) => total + Number(record.totalMarks || 0),
  0
);

const assignmentPercentage =
  assignmentTotal > 0
    ? ((assignmentObtained / assignmentTotal) * 100).toFixed(1)
    : "0.0";


// Practical Marks Calculation
const practicalObtained = practicals.reduce(
  (total, record) => total + Number(record.obtainedMarks || 0),
  0
);

const practicalTotal = practicals.reduce(
  (total, record) => total + Number(record.maxMarks || 0),
  0
);

const practicalPercentage =
  practicalTotal > 0
    ? ((practicalObtained / practicalTotal) * 100).toFixed(1)
    : "0.0";


// Overall Academic Performance
const performanceValues = [
  Number(attendancePercentage),
  Number(internalPercentage),
  Number(assignmentPercentage),
  Number(practicalPercentage),
].filter((value) => value > 0);

const overallPerformance =
  performanceValues.length > 0
    ? (
        performanceValues.reduce((sum, value) => sum + value, 0) /
        performanceValues.length
      ).toFixed(1)
    : "0.0";

  if (loading) {
    return (
      <main className="academic-detail-page">
        <div className="academic-detail-container">
          <div className="loading-box">
            Loading academic records...
          </div>
        </div>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="academic-detail-page">
        <div className="academic-detail-container">
          <div className="empty-box">
            <h2>Student Not Found</h2>
            <p>The selected student record could not be found.</p>

            <button
              onClick={() => router.push("/student-academic-record")}
            >
              ← Back to Students
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="academic-detail-page">
      <div className="academic-detail-container">

        {/* Header */}
        <div className="detail-header">
  <div>
    <h1>🎓 Complete Academic Record</h1>
    <p>Student academic performance overview</p>
  </div>

  <div className="header-buttons">
    <button
      className="print-button"
      onClick={() => window.print()}
    >
      🖨️ Print Report
    </button>

    <button
      className="back-button"
      onClick={() => router.push("/student-academic-record")}
    >
      ← Back
    </button>
  </div>
</div>

        {/* Student Information */}
        <section className="student-profile-card">
          <div className="profile-icon">👨‍🎓</div>

          <div className="profile-info">
            <h2>{student.name}</h2>

            <div className="student-details">
              <p>
                <strong>Enrollment No:</strong>{" "}
                {student.enrollmentNumber}
              </p>

              <p>
                <strong>Branch:</strong>{" "}
                {student.branch}
              </p>

              <p>
                <strong>Semester:</strong>{" "}
                {student.semester}
              </p>
            </div>
          </div>
        </section>
        {/* Overall Academic Performance */}
<section className="record-section performance-section">
  <div className="section-title">
    <h2>📊 Overall Academic Performance</h2>
    <p>Complete academic performance summary</p>
  </div>

  <div className="performance-grid">

    <div className="performance-card">
      <div className="performance-icon">📅</div>
      <h3>{attendancePercentage}%</h3>
      <p>Attendance</p>
    </div>

    <div className="performance-card">
      <div className="performance-icon">📝</div>
      <h3>{internalPercentage}%</h3>
      <p>Internal Marks</p>
      <small>
        {internalObtained}/{internalTotal} Marks
      </small>
    </div>

    <div className="performance-card">
      <div className="performance-icon">📚</div>
      <h3>{assignmentPercentage}%</h3>
      <p>Assignments</p>
      <small>
        {assignmentObtained}/{assignmentTotal} Marks
      </small>
    </div>

    <div className="performance-card">
      <div className="performance-icon">🔬</div>
      <h3>{practicalPercentage}%</h3>
      <p>Practicals</p>
      <small>
        {practicalObtained}/{practicalTotal} Marks
      </small>
    </div>

  </div>

  <div className="overall-performance">
    <span>Overall Performance</span>
    <strong>{overallPerformance}%</strong>
  </div>
</section>

        {/* Attendance */}
        <section className="record-section">
          <div className="section-title">
            <h2>📅 Attendance</h2>
            <p>Student attendance summary and records</p>
          </div>

          <div className="attendance-summary">

            <div className="summary-card">
              <span>📚</span>
              <h3>{totalClasses}</h3>
              <p>Total Classes</p>
            </div>

            <div className="summary-card">
              <span>✅</span>
              <h3>{presentClasses}</h3>
              <p>Present</p>
            </div>

            <div className="summary-card">
              <span>❌</span>
              <h3>{absentClasses}</h3>
              <p>Absent</p>
            </div>

            <div className="summary-card">
              <span>📊</span>
              <h3>{attendancePercentage}%</h3>
              <p>Attendance</p>
            </div>

          </div>

          {attendance.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((record) => (
                    <tr key={record._id}>
                      <td>{record.subject}</td>
                      <td>{record.date}</td>
                      <td>
                        <span
                          className={
                            record.status === "Present"
                              ? "status present"
                              : "status absent"
                          }
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-record">
              No attendance records found.
            </div>
          )}
        </section>


        {/* Internal Marks */}
        <section className="record-section">
          <div className="section-title">
            <h2>📝 Internal Marks</h2>
            <p>Subject-wise internal examination marks</p>
          </div>

          {internalMarks.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Obtained Marks</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>

                <tbody>
                  {internalMarks.map((record) => (
                    <tr key={record._id}>
                      <td>{record.subject}</td>
                      <td>{record.marks}</td>
                      <td>{record.totalMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-record">
              No internal marks found.
            </div>
          )}
        </section>

        {/* Assignments */}
        <section className="record-section">
          <div className="section-title">
            <h2>📚 Assignment Records</h2>
            <p>Student assignment submission and marks</p>
          </div>

          {assignments.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Assignment</th>
                    <th>Status</th>
                    <th>Marks</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>

                <tbody>
                  {assignments.map((record) => (
                    <tr key={record._id}>
                      <td>{record.subject}</td>
                      <td>{record.assignmentTitle}</td>
                      <td>
                        <span
                          className={
                            record.status === "Submitted"
                              ? "status present"
                              : "status absent"
                          }
                        >
                          {record.status}
                        </span>
                      </td>
                      <td>{record.marks}</td>
                      <td>{record.totalMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-record">
              No assignment records found.
            </div>
          )}
        </section>

        {/* Practical Records */}
        <section className="record-section">
          <div className="section-title">
            <h2>🔬 Practical Records</h2>
            <p>Student practical performance</p>
          </div>

          {practicals.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Practical</th>
                    <th>Obtained Marks</th>
                    <th>Total Marks</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {practicals.map((record) => (
                    <tr key={record._id}>
                      <td>{record.subject}</td>
                      <td>{record.practicalName}</td>
                      <td>{record.obtainedMarks}</td>
                      <td>{record.maxMarks}</td>
                      <td>
                        <span
                          className={
                            record.status === "Complete"
                              ? "status present"
                              : "status absent"
                          }
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-record">
              No practical records found.
            </div>
          )}
        </section>

      </div>
    </main>
  );
}