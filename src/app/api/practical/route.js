import connectDB from "@/lib/mongodb";
import Practical from "@/models/Practical";

// सभी Practical Records प्राप्त करने के लिए
export async function GET() {
  try {
    await connectDB();

    const practicalRecords = await Practical.find({})
      .populate("student", "name enrollmentNumber branch semester")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: practicalRecords,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch practical records",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// नया Practical Record बनाने के लिए
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const practical = await Practical.create(body);

    return Response.json(
      {
        success: true,
        message: "Practical record added successfully!",
        data: practical,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to add practical record",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}