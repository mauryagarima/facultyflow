import connectDB from "@/lib/mongodb";
import InternalMarks from "@/models/InternalMarks";

// सभी Internal Marks प्राप्त करने के लिए
export async function GET() {
  try {
    await connectDB();

    const marks = await InternalMarks.find({})
      .populate("student")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: marks,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch internal marks",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// Internal Marks Save करने के लिए
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const marksRecords = body.marks;

    if (
      !marksRecords ||
      !Array.isArray(marksRecords) ||
      marksRecords.length === 0
    ) {
      return Response.json(
        {
          success: false,
          message: "No marks data provided",
        },
        {
          status: 400,
        }
      );
    }

    const savedMarks = await InternalMarks.insertMany(
      marksRecords
    );

    return Response.json(
      {
        success: true,
        message: "Internal marks saved successfully!",
        data: savedMarks,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to save internal marks",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}