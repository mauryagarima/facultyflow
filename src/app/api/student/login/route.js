import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      studentName,
      enrollmentNumber,
      studentId,
      dateOfBirth,
    } = body;

    // Check required fields
    if (
      !studentName ||
      !enrollmentNumber ||
      !studentId ||
      !dateOfBirth
    ) {
      return Response.json(
        {
          success: false,
          message: "Please fill all fields",
        },
        { status: 400 }
      );
    }

    // Find student using enrollment number
    const student = await Student.findOne({
      name: studentName,
      enrollmentNumber: enrollmentNumber,
    });

    // Student not found
    if (!student) {
      return Response.json(
        {
          success: false,
          message: "Invalid student details",
        },
        { status: 401 }
      );
    }

    // Login successful
    return Response.json({
      success: true,
      message: "Student login successful!",
      data: {
        _id: student._id,
        name: student.name,
        enrollmentNumber: student.enrollmentNumber,
        branch: student.branch,
        semester: student.semester,
        email: student.email,
        mobile: student.mobile,
      },
    });
  } catch (error) {
    console.error("Student Login Error:", error);

    return Response.json(
      {
        success: false,
        message: "Student login failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}