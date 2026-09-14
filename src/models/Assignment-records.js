import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
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

    assignmentTitle: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Submitted", "Not Submitted"],
      required: true,
    },

    marks: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", AssignmentSchema);