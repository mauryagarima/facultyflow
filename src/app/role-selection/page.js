import Link from "next/link";
import "./role-selection.css";

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-container">

        <div className="project-info">
          <h1>FacultyFlow</h1>
          <p>Smart Faculty Work Management System</p>
        </div>

        <div className="selection-box">
          <h2>Welcome to FacultyFlow</h2>
          <p>Select your role to continue</p>

          <div className="role-buttons">

            {/* Principal */}
            <Link href="/principal-login" className="role-button">
              <span className="role-icon"></span>

              <div>
                <h3>As a Principal</h3>
                <p>Manage faculty and monitor work</p>
              </div>

              <span className="arrow">→</span>
            </Link>

            {/* Teacher */}
            <Link href="/teacher-login" className="role-button">
              <span className="role-icon"></span>

              <div>
                <h3>As a Teacher</h3>
                <p>View and manage assigned tasks</p>
              </div>

              <span className="arrow">→</span>
            </Link>

            {/* Student */}
            <Link href="/student-login" className="role-button">
              <span className="role-icon"></span>

              <div>
                <h3>As a Student</h3>
                <p>Mark attendance and submit assignments</p>
              </div>

              <span className="arrow">→</span>
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}