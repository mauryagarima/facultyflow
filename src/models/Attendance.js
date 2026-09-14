import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    studentId: {
      type: String,
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    enrollmentNumber: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
    latitude: {
  type: Number,
  required: true,
},

longitude: {
  type: Number,
  required: true,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);