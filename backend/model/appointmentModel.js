import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    date: String,
    message: String,
    status: { type: String, default: "pending" },
    rejectionReason: { type: String, default: "" },
    rescheduleDate: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("appointment", appointmentSchema);
