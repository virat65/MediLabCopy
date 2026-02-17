import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "appointment" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  message: { type: String, default: "" }, // prescription or chat message
  sender: { type: String, enum: ["doctor", "user"], required: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("prescription", prescriptionSchema);
