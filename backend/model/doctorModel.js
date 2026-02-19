import mongoose from "mongoose";

const doctorModel = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: Number, default: 0 },
    image: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "doctor",
    },
    password: { type: String, default: "" },
    token: { type: String, default: "" },
    loginTime: { type: Number, default: 0 },
    specialization: { type: String, default: "" },
    experience: { type: String, default: "" },
    uid: {
      type: String,
      default: function () {
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${this.role[0].toUpperCase()}${Date.now()}${random}`;
      },
    },
    qualification: { type: String, default: "" },

    // Add more doctor-specific fields as needed
  },
  { timestamps: true },
);

const doctorSchema = mongoose.model("doctor", doctorModel);

export default doctorSchema;
