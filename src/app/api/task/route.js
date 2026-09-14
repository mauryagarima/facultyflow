import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

// सभी Tasks प्राप्त करने के लिए
export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find({})
      .populate("assignedTo", "name email department")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch tasks",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// नया Task बनाने के लिए
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const task = await Task.create(body);

    return Response.json(
      {
        success: true,
        message: "Task created successfully!",
        data: task,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create task",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
// Task का Status Update करने के लिए
export async function PATCH(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { taskId, status } = body;

    if (!taskId || !status) {
      return Response.json(
        {
          success: false,
          message: "Task ID and status are required",
        },
        {
          status: 400,
        }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    ).populate("assignedTo", "name email department");

    if (!updatedTask) {
      return Response.json(
        {
          success: false,
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      success: true,
      message: "Task status updated successfully!",
      data: updatedTask,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to update task status",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}