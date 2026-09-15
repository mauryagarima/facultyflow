
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      default: "",
    },
    semester: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const AccountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      default: "",
    },
    semester: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

const Student =
  mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);

const StudentAccount =
  mongoose.models.StudentAccount ||
  mongoose.model("StudentAccount", AccountSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      enrollmentNumber,
      email,
      mobile,
      branch,
      semester,
      username,
      password,
      confirmPassword,
    } = body;

    if (
      !fullName ||
      !enrollmentNumber ||
      !email ||
      !branch ||
      !semester ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password and Confirm Password do not match.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const student = await Student.findOne({
      enrollmentNumber: enrollmentNumber.trim(),
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student not found. Please check your enrollment number.",
        },
        { status: 404 }
      );
    }

    const existingAccount = await StudentAccount.findOne({
      $or: [
        { enrollmentNumber: enrollmentNumber.trim() },
        { username: username.trim() },
        { email: email.trim().toLowerCase() },
      ],
    });

    if (existingAccount) {
      if (
        existingAccount.enrollmentNumber ===
        enrollmentNumber.trim()
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "An account already exists for this enrollment number.",
          },
          { status: 409 }
        );
      }

      if (existingAccount.username === username.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: "Username already exists.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Email already registered.",
        },
        { status: 409 }
      );
    }

    const account = await StudentAccount.create({
      fullName: fullName.trim(),
      enrollmentNumber: enrollmentNumber.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile?.trim() || "",
      branch,
      semester,
      username: username.trim(),
      password,
      studentId: student._id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student account created successfully.",
        data: {
          id: account._id,
          fullName: account.fullName,
          enrollmentNumber: account.enrollmentNumber,
          username: account.username,
          studentId: account.studentId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student Registration API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}

