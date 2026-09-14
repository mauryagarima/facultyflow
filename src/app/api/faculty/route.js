import connectDB from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

// GET: सभी Faculty की जानकारी प्राप्त करने के लिए
export async function GET() {
  try {
    await connectDB();

    const faculties = await Faculty.find({}).sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      data: faculties,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch faculty data",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// POST: नई Faculty Add करने के लिए
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const faculty = await Faculty.create(body);

    return Response.json(
      {
        success: true,
        message: "Faculty added successfully!",
        data: faculty,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to add faculty",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}