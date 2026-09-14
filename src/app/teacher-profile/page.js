"use client";

import { useRouter } from "next/navigation";
import "./teacher-profile.css";

export default function TeacherProfile() {
  const router = useRouter();

  const teacher = {
    name: "Divyanshu Maurya",
    email: "teacher1@example.com",
    phone: "9876543210",
    employeeId: "FAC001",
    department: "Computer Science",
    designation: "Assistant Professor",
    qualification: "M.Tech in Computer Science",
    joiningDate: "15 July 2024",
  };

  return (
    <main className="teacher-profile-page">
      <div className="profile-container">

        {/* Header */}
        <div className="profile-header">
          <div>
            <h1>👤 My Profile</h1>
            <p>View your personal and professional information.</p>
          </div>

          <button
            className="back-button"
            onClick={() => router.push("/teacher-dashboard")}
          >
            ← Back
          </button>
        </div>

        {/* Profile Card */}
        <section className="profile-main-card">

          <div className="profile-avatar">
            👨‍🏫
          </div>

          <div className="profile-basic">
            <h2>{teacher.name}</h2>
            <p>{teacher.designation}</p>
            <span>Teacher</span>
          </div>

        </section>

        {/* Personal Information */}
        <section className="profile-section">

          <div className="section-heading">
            <h2>👤 Personal Information</h2>
            <p>Your basic personal details</p>
          </div>

          <div className="info-grid">

            <div className="info-card">
              <label>Full Name</label>
              <p>{teacher.name}</p>
            </div>

            <div className="info-card">
              <label>Email Address</label>
              <p>{teacher.email}</p>
            </div>

            <div className="info-card">
              <label>Phone Number</label>
              <p>{teacher.phone}</p>
            </div>

          </div>

        </section>

        {/* Professional Information */}
        <section className="profile-section">

          <div className="section-heading">
            <h2>💼 Professional Information</h2>
            <p>Your professional and academic details</p>
          </div>

          <div className="info-grid">

            <div className="info-card">
              <label>Employee ID</label>
              <p>{teacher.employeeId}</p>
            </div>

            <div className="info-card">
              <label>Department</label>
              <p>{teacher.department}</p>
            </div>

            <div className="info-card">
              <label>Designation</label>
              <p>{teacher.designation}</p>
            </div>

            <div className="info-card">
              <label>Qualification</label>
              <p>{teacher.qualification}</p>
            </div>

            <div className="info-card">
              <label>Joining Date</label>
              <p>{teacher.joiningDate}</p>
            </div>

          </div>

        </section>

        {/* Account Information */}
        <section className="profile-section">

          <div className="section-heading">
            <h2>🔐 Account Information</h2>
            <p>Your FacultyFlow account details</p>
          </div>

          <div className="account-box">

            <div>
              <strong>Role</strong>
              <span>Teacher</span>
            </div>

            <div>
              <strong>Account Status</strong>
              <span className="active-status">● Active</span>
            </div>

          </div>

        </section>

        {/* Buttons */}
        <div className="profile-actions">

          <button className="edit-button">
            ✏️ Edit Profile
          </button>

          <button className="password-button">
            🔒 Change Password
          </button>

        </div>

      </div>
    </main>
  );
}