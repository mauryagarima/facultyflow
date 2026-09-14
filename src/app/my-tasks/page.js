"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./my-tasks.css";

export default function MyTasks() {
    const router = useRouter();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingTask, setUpdatingTask] = useState(null);

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
            console.error("Failed to fetch tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            setUpdatingTask(taskId);

            const response = await fetch("/api/task", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    taskId,
                    status: newStatus,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setTasks((currentTasks) =>
                    currentTasks.map((task) =>
                        task._id === taskId
                            ? { ...task, status: newStatus }
                            : task
                    )
                );
            } else {
                alert(result.message || "Failed to update task status");
            }
        } catch (error) {
            console.error("Failed to update task status:", error);
            alert("Something went wrong.");
        } finally {
            setUpdatingTask(null);
        }
    };

    const getStatusClass = (status) => {
        if (status === "Completed") {
            return "status completed";
        }

        if (status === "In Progress") {
            return "status progress";
        }

        return "status pending";
    };

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    return (
        <main className="my-tasks-page">
            <div className="my-tasks-container">

                {/* Header */}

                <div className="tasks-header">
                    <div>
                        <h1>📋 My Tasks</h1>
                        <p>
                            View and manage your assigned tasks.
                        </p>
                    </div>

                    <button
                        className="back-button"
                        onClick={() =>
                            router.push("/teacher-dashboard")
                        }
                    >
                        ← Back
                    </button>
                </div>

                {/* Summary */}

                <div className="task-summary">

                    <div className="summary-card">
                        <span>📋</span>
                        <div>
                            <h3>{tasks.length}</h3>
                            <p>Total Tasks</p>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span>⏳</span>
                        <div>
                            <h3>{pendingTasks}</h3>
                            <p>Pending</p>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span>🔄</span>
                        <div>
                            <h3>{inProgressTasks}</h3>
                            <p>In Progress</p>
                        </div>
                    </div>

                    <div className="summary-card">
                        <span>✅</span>
                        <div>
                            <h3>{completedTasks}</h3>
                            <p>Completed</p>
                        </div>
                    </div>

                </div>

                {/* Tasks */}

                <section className="tasks-section">

                    <div className="section-title">
                        <h2>Assigned Tasks</h2>
                        <p>
                            Tasks assigned to faculty members
                        </p>
                    </div>

                    {loading ? (
                        <div className="loading-box">
                            Loading tasks...
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="empty-box">
                            <div>📋</div>
                            <h2>No Tasks Found</h2>
                            <p>
                                No tasks have been assigned yet.
                            </p>
                        </div>
                    ) : (
                        <div className="tasks-grid">

                            {tasks.map((task) => (

                                <div
                                    className="task-card"
                                    key={task._id}
                                >

                                    <div className="task-card-top">

                                        <span className="task-icon">
                                            📋
                                        </span>

                                        {/* Change Status */}

                                        <select
                                            className={getStatusClass(
                                                task.status
                                            )}
                                            value={
                                                task.status ||
                                                "Pending"
                                            }
                                            disabled={
                                                updatingTask ===
                                                task._id
                                            }
                                            onChange={(e) =>
                                                updateTaskStatus(
                                                    task._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="In Progress">
                                                In Progress
                                            </option>

                                            <option value="Completed">
                                                Completed
                                            </option>
                                        </select>

                                    </div>

                                    <h2>
                                        {task.title}
                                    </h2>

                                    <p className="task-description">
                                        {task.description}
                                    </p>

                                    <div className="task-details">

                                        <div>
                                            <strong>
                                                📅 Deadline
                                            </strong>

                                            <span>
                                                {task.deadline
                                                    ? new Date(
                                                        task.deadline
                                                    ).toLocaleDateString()
                                                    : "Not specified"}
                                            </span>
                                        </div>

                                        <div>
                                            <strong>
                                                🎯 Priority
                                            </strong>

                                            <span>
                                                {task.priority ||
                                                    "Normal"}
                                            </span>
                                        </div>

                                    </div>

                                    {task.assignedTo && (
                                        <div className="assigned-by">
                                            👨‍🏫 Assigned Faculty:{" "}
                                            {task.assignedTo.name ||
                                                "Faculty"}
                                        </div>
                                    )}

                                </div>

                            ))}

                        </div>
                    )}

                </section>

            </div>
        </main>
    );
}