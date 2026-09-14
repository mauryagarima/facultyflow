import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

// सभी Students प्राप्त करने के लिए
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find({}).sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      data: students,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch students",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// नया Student Add करने के लिए
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const student = await Student.create(body);

    return Response.json(
      {
        success: true,
        message: "Student added successfully!",
        data: student,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to add student",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}