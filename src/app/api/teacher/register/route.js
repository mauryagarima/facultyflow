import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Faculty from "@/models/Faculty";

const TeacherAccountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
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

    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeacherAccount =
  mongoose.models.TeacherAccount ||
  mongoose.model("TeacherAccount", TeacherAccountSchema);

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
      employeeId,
      email,
      mobile,
      department,
      designation,
      username,
      password,
      confirmPassword,
    } = body;

    if (
      !fullName ||
      !employeeId ||
      !email ||
      !department ||
      !designation ||
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

    const employee = employeeId.trim();

    const faculty = await Faculty.findOne({
      employeeId: employee,
    });

    if (!faculty) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Faculty not found. Please enter a valid Employee ID.",
        },
        { status: 404 }
      );
    }

    const existingEmployee = await TeacherAccount.findOne({
      employeeId: employee,
    });

    if (existingEmployee) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An account already exists for this Employee ID.",
        },
        { status: 409 }
      );
    }

    const existingUsername = await TeacherAccount.findOne({
      username: username.trim(),
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Username already exists. Please choose another username.",
        },
        { status: 409 }
      );
    }

    const existingEmail = await TeacherAccount.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered.",
        },
        { status: 409 }
      );
    }

    const account = await TeacherAccount.create({
      fullName: faculty.name,
      employeeId: faculty.employeeId,
      email: email.trim().toLowerCase(),
      mobile: mobile?.trim() || faculty.phone,
      department: faculty.department,
      designation: faculty.designation,
      username: username.trim(),
      password,
      facultyId: faculty._id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Teacher account created successfully.",
        data: {
          id: account._id,
          fullName: account.fullName,
          employeeId: account.employeeId,
          username: account.username,
          facultyId: account.facultyId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Teacher Register API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}