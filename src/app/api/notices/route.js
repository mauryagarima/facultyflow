import connectDB from "@/lib/mongodb";
import Notice from "@/models/Notice";

// सभी Notices प्राप्त करना
export async function GET() {
  try {
    await connectDB();

    const notices = await Notice.find({}).sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      data: notices,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch notices",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// नया Notice बनाना
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const notice = await Notice.create(body);

    return Response.json(
      {
        success: true,
        message: "Notice created successfully!",
        data: notice,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create notice",
        error: error.message,
      },
      { status: 500 }
    );
  }
}