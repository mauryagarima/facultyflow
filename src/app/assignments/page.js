"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./assignments.css";

export default function CreateAssignment() {
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!subject || !title || !dueDate) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Temporary frontend test
      console.log({
        subject,
        title,
        description,
        dueDate,
      });

      setMessage("✅ Assignment created successfully!");

      setSubject("");
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="assignment-page">
      <div className="assignment-container">

        <button
          onClick={() => router.push("/")}
          className="back-button"
        >
          ← Back to Dashboard
        </button>

        <div className="assignment-card">

          <div className="assignment-icon">📝</div>

          <h1>Create Assignment</h1>

          <p className="assignment-subtitle">
            Create and assign academic work to students.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Subject *</label>

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
              <label>Assignment Title *</label>

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
                placeholder="Enter assignment instructions"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Due Date *</label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="create-assignment-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "📝 Create Assignment"}
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