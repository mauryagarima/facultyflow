"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./student-academic-record.css";

export default function StudentAcademicRecord() {
  const router = useRouter();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/student");
      const result = await response.json();

      if (result.success) {
        setStudents(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  const openStudentRecord = (studentId) => {
    router.push(`/student-academic-record/${studentId}`);
  };

  return (
    <main className="academic-record-page">
      <div className="academic-record-container">

        <div className="academic-record-header">
          <div>
            <h1>📊 Student Academic Records</h1>
            <p>Select a student to view complete academic performance.</p>
          </div>

          <button
            className="back-button"
            onClick={() => router.push("/academic-monitoring")}
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <div className="loading">
            Loading students...
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <h2>No Students Found</h2>
            <p>Please add students first.</p>
          </div>
        ) : (
          <div className="student-grid">
            {students.map((student) => (
              <div className="student-card" key={student._id}>

                <div className="student-icon">
                  👨‍🎓
                </div>

                <div className="student-info">
                  <h2>{student.name}</h2>

                  <p>
                    <strong>Enrollment:</strong>{" "}
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

                <button
                  className="view-record-button"
                  onClick={() => openStudentRecord(student._id)}
                >
                  View Complete Record →
                </button>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}