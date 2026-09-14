
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import Student from "@/models/Student";

// College Campus Location
const COLLEGE_LATITUDE = 25.714444;
const COLLEGE_LONGITUDE = 82.700250;

// Allowed Radius
const ALLOWED_RADIUS = 150; // meters

// Calculate distance between two locations
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;

  const toRadians = (degree) => (degree * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// =========================
// GET ATTENDANCE
// =========================
export async function GET() {
  try {
    await connectDB();

    const attendance = await Attendance.find({})
      .populate("student", "name enrollmentNumber branch semester")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Fetch Attendance Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch attendance records",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================
// MARK ATTENDANCE
// =========================
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      studentId,
      subject,
      latitude,
      longitude,
    } = body;

    // -------------------------
    // Required fields
    // -------------------------
    if (
      !studentId ||
      !subject ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return Response.json(
        {
          success: false,
          message: "Student, subject and location are required.",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // Find Student
    // -------------------------
    const student = await Student.findById(studentId);

    if (!student) {
      return Response.json(
        {
          success: false,
          message: "Student not found.",
        },
        { status: 404 }
      );
    }

    // -------------------------
    // Calculate Distance
    // -------------------------
    const distance = calculateDistance(
      Number(latitude),
      Number(longitude),
      COLLEGE_LATITUDE,
      COLLEGE_LONGITUDE
    );

    // -------------------------
    // Check College Location
    // -------------------------
    if (distance > ALLOWED_RADIUS) {
      return Response.json(
        {
          success: false,
          message: "You are outside the college campus.",
          distance: Math.round(distance),
        },
        { status: 403 }
      );
    }

    // -------------------------
    // Current Date & Time
    // -------------------------
    const now = new Date();

    const date = now.toISOString().split("T")[0];

    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // -------------------------
    // Check Duplicate Attendance
    // -------------------------
    const existingAttendance = await Attendance.findOne({
      studentId: student._id.toString(),
      subject,
      date,
    });

    if (existingAttendance) {
      return Response.json(
        {
          success: false,
          message: "Attendance already marked for today.",
          distance: Math.round(distance),
        },
        { status: 409 }
      );
    }

    // -------------------------
    // Save Attendance
    // -------------------------
    const attendance = await Attendance.create({
      student: student._id,
      studentId: student._id.toString(),
      studentName: student.name,
      enrollmentNumber: student.enrollmentNumber,
      branch: student.branch,
      semester: String(student.semester),
      subject,
      date,
      time,
      latitude: Number(latitude),
      longitude: Number(longitude),
      status: "Present",
    });

    // -------------------------
    // Success Response
    // -------------------------
    return Response.json(
      {
        success: true,
        message: "Attendance marked successfully!",
        distance: Math.round(distance),
        data: attendance,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Attendance Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to save attendance.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

