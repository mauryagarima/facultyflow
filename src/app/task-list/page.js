"use client";

import { useEffect, useState } from "react";
import "./task-list.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/task");
      const result = await response.json();

      if (result.success) {
        setTasks(result.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityClass = (priority) => {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "status-completed";
    if (status === "In Progress") return "status-progress";
    return "status-pending";
  };

  if (loading) {
    return <div className="loading">Loading Tasks...</div>;
  }

  return (
    <main className="task-list-page">
      <div className="task-list-wrapper">

        {/* Header */}
        <div className="task-list-header">
          <div>
            <h1>Task Management</h1>
            <p>Track and manage all faculty work assignments.</p>
          </div>

          <a href="/create-task" className="create-task-button">
            + Create Task
          </a>
        </div>

        {/* Statistics */}
        <div className="task-stats">

          <div className="task-stat-card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
          </div>

          <div className="task-stat-card">
            <span>Pending</span>
            <h2>
              {tasks.filter((task) => task.status === "Pending").length}
            </h2>
          </div>

          <div className="task-stat-card">
            <span>Completed</span>
            <h2>
              {tasks.filter((task) => task.status === "Completed").length}
            </h2>
          </div>

        </div>

        {/* Task Table */}
        <div className="task-table-card">

          {tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No Tasks Found</h3>
              <p>Create your first task to start managing faculty work.</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assigned To</th>
                    <th>Department</th>
                    <th>Deadline</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td>
                        <strong>{task.title}</strong>
                        <p className="task-description">
                          {task.description}
                        </p>
                      </td>

                      <td>
                        {task.assignedTo?.name || "Unknown"}
                      </td>

                      <td>
                        {task.assignedTo?.department || "-"}
                      </td>

                      <td>
                        {new Date(task.deadline).toLocaleDateString()}
                      </td>

                      <td>
                        <span
                          className={`priority-badge ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${getStatusClass(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}