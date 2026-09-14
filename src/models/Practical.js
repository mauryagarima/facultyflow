import mongoose from "mongoose";

const PracticalSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    practicalName: {
      type: String,
      required: true,
    },

    maxMarks: {
      type: Number,
      required: true,
      default: 10,
    },

    obtainedMarks: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Complete", "Pending"],
      default: "Complete",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Practical ||
  mongoose.model("Practical", PracticalSchema);