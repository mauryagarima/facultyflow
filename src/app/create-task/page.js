"use client";

import { useEffect, useState } from "react";
import "./create-task.css";

export default function CreateTask() {
  const [faculties, setFaculties] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    priority: "Medium",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Faculty list प्राप्त करना
  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await fetch("/api/faculty");
      const result = await response.json();

      if (result.success) {
        setFaculties(result.data);
      }
    } catch (error) {
      console.error("Failed to load faculties", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Task assigned successfully!");

        setFormData({
          title: "",
          description: "",
          assignedTo: "",
          deadline: "",
          priority: "Medium",
        });
      } else {
        setMessage(result.message || "Failed to create task");
      }
    } catch (error) {
      setMessage("Server connection error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-task-page">
      <div className="task-wrapper">

        <div className="task-header">
          <div>
            <h1>Create New Task</h1>
            <p>Assign a task to a faculty member and track its progress.</p>
          </div>

          <a href="/" className="back-dashboard">
            ← Dashboard
          </a>
        </div>

        <div className="task-card">

          {message && (
            <div className="message-box">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Task Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Task Description</label>

              <textarea
                name="description"
                placeholder="Describe the task"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
              />
            </div>

            <div className="form-grid">

              <div className="input-group">
                <label>Assign To Faculty</label>

                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Faculty</option>

                  {faculties.map((faculty) => (
                    <option key={faculty._id} value={faculty._id}>
                      {faculty.name} - {faculty.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Deadline</label>

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

            </div>

            <div className="task-actions">
              <button
                type="submit"
                className="task-button"
                disabled={loading}
              >
                {loading ? "Creating Task..." : "+ Assign Task"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}