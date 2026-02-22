import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    email: String,
    mobile: String,
    department: String,
  },
  { timestamps: true },
);

export default mongoose.model("staff", staffSchema);
