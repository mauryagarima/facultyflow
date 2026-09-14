"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./submit-assignment.css";

export default function SubmitAssignment() {
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!subject || !title || !file) {
      setError("Please select subject, enter title and upload file.");
      return;
    }

    setLoading(true);

    try {
      // Get logged-in student
      let student;

      try {
        student = JSON.parse(localStorage.getItem("student"));
      } catch {
        student = null;
      }

      if (!student?._id) {
        setError("Student login required. Please login first.");
        setLoading(false);
        return;
      }

      // Temporary frontend submission
      // API will be connected in the next step
      console.log({
        studentId: student._id,
        subject,
        title,
        description,
        fileName: file.name,
      });

      setMessage("✅ Assignment submitted successfully!");

      setSubject("");
      setTitle("");
      setDescription("");
      setFile(null);

      document.getElementById("assignment-file").value = "";
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="submit-assignment-page">
      <div className="assignment-container">

        <button
          onClick={() => router.push("/student-dashboard")}
          className="back-button"
        >
          ← Back to Dashboard
        </button>

        <div className="assignment-card">

          <div className="assignment-icon">📤</div>

          <h1>Submit Assignment</h1>

          <p className="assignment-description">
            Upload your assignment and submit it to your teacher.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Select Subject</label>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">-- Select Subject --</option>
                <option value="Java">Java</option>
                <option value="Information Security">
                  Information Security
                </option>
                <option value="Multimedia">Multimedia</option>
                <option value="IoT">IoT</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Assignment Title</label>

              <input
                type="text"
                placeholder="Enter assignment title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                placeholder="Enter assignment description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Upload Assignment</label>

              <input
                id="assignment-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <small>
                Accepted formats: PDF, DOC, DOCX
              </small>
            </div>

            {file && (
              <div className="selected-file">
                📄 Selected: {file.name}
              </div>
            )}

            <button
              type="submit"
              className="submit-assignment-button"
              disabled={loading}
            >
              {loading ? "Submitting..." : "📤 Submit Assignment"}
            </button>

          </form>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}