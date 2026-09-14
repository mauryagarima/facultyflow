import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Faculty =
  mongoose.models.Faculty ||
  mongoose.model("Faculty", FacultySchema);

export default Faculty;