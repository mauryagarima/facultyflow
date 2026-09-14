"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./student-list.css";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/student");
      const result = await response.json();

      if (response.ok && result.success) {
        setStudents(result.data);
      } else {
        setMessage(result.message || "Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setMessage("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <main className="student-list-page">
      <div className="student-list-container">

        <div className="page-top">
          <div>
            <Link href="/" className="back-button">
              ← Back to Dashboard
            </Link>

            <h1>Student List</h1>
            <p>View all students registered in the system.</p>
          </div>

          <Link href="/add-student" className="add-student-button">
            + Add Student
          </Link>
        </div>

        {loading ? (
          <div className="status-message">
            Loading students...
          </div>
        ) : message ? (
          <div className="status-message error-message">
            {message}
          </div>
        ) : students.length === 0 ? (
          <div className="status-message">
            No students found. Add your first student!
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Enrollment No.</th>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Email</th>
                  <th>Mobile</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.enrollmentNumber}</td>
                    <td>{student.branch}</td>
                    <td>{student.semester}</td>
                    <td>{student.email}</td>
                    <td>{student.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  );
}