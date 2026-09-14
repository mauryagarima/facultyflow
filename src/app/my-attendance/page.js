
"use client";

import { useRouter } from "next/navigation";
import "./my-attendance.css";

export default function MyAttendance() {
  const router = useRouter();

  const attendanceData = [
    {
      subject: "Java",
      total: 40,
      present: 36,
      absent: 4,
      percentage: 90,
    },
    {
      subject: "Information Security",
      total: 35,
      present: 30,
      absent: 5,
      percentage: 85.71,
    },
    {
      subject: "Multimedia",
      total: 30,
      present: 26,
      absent: 4,
      percentage: 86.67,
    },
    {
      subject: "IoT",
      total: 32,
      present: 27,
      absent: 5,
      percentage: 84.38,
    },
    {
      subject: "Software Engineering",
      total: 38,
      present: 34,
      absent: 4,
      percentage: 89.47,
    },
  ];

  const totalClasses = attendanceData.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const totalPresent = attendanceData.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalAbsent = attendanceData.reduce(
    (sum, item) => sum + item.absent,
    0
  );

  const overallPercentage = (
    (totalPresent / totalClasses) *
    100
  ).toFixed(2);

  return (
    <main className="attendance-page">
      <div className="attendance-container">

        <button
          className="back-button"
          onClick={() => router.push("/student-dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="attendance-header">
          <div>
            <h1>My Attendance</h1>
            <p>View your subject-wise attendance records.</p>
          </div>
        </div>

        <div className="attendance-summary">

          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div>
              <span>Overall Attendance</span>
              <strong>{overallPercentage}%</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">📚</div>
            <div>
              <span>Total Classes</span>
              <strong>{totalClasses}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">✅</div>
            <div>
              <span>Present</span>
              <strong>{totalPresent}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">❌</div>
            <div>
              <span>Absent</span>
              <strong>{totalAbsent}</strong>
            </div>
          </div>

        </div>

        <div className="attendance-card">

          <h2>Subject-wise Attendance</h2>

          <div className="table-wrapper">
            <table>

              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Total Classes</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>{item.total}</td>
                    <td className="present">{item.present}</td>
                    <td className="absent">{item.absent}</td>
                    <td>
                      <div className="percentage-box">
                        <span>{item.percentage}%</span>

                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${item.percentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </main>
  );
}

