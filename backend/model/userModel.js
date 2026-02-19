import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: Number, default: 0 },
    image: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    }, // 0-admin, 1-user, 2-doctor
    password: { type: String, default: "" },
    token: { type: String, default: "" },
    loginTime: { type: Number, default: 0 },
    uid: {
      type: String,
      default: function () {
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${this.role[0].toUpperCase()}${Date.now()}${random}`;
      },
      unique: true,
    },
  },
  { timestamps: true },
);

const userSchema = mongoose.model("user", userModel);

export default userSchema;
