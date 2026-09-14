import connectDB from "@/lib/mongodb";
import Assignment from "@/models/Assignment-records";

// सभी Assignment Records प्राप्त करने के लिए
export async function GET() {
  try {
    await connectDB();

    const assignments = await Assignment.find({})
      .populate("student")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch assignment records",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// नए Assignment Records Save करने के लिए
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const assignmentRecords = body.assignments;

    if (
      !assignmentRecords ||
      !Array.isArray(assignmentRecords) ||
      assignmentRecords.length === 0
    ) {
      return Response.json(
        {
          success: false,
          message: "No assignment data provided",
        },
        {
          status: 400,
        }
      );
    }

    const savedAssignments = await Assignment.insertMany(
      assignmentRecords
    );

    return Response.json(
      {
        success: true,
        message: "Assignment records saved successfully!",
        data: savedAssignments,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to save assignment records",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}