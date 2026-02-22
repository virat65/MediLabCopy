import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    isOldPatient: {
      type: Boolean,
      default: false,
    },

    docType: {
      type: String,
      default: "OPD Registration",
    },

    uhidNo: {
      type: Number,
      unique: true,
    },

    opdNo: String,
    date: String,
    time: String,
    casualty: {
      type: String,
      default: "No",
    },

    patientName: {
      type: String,
      required: true,
    },

    guardianName: String,

    houseNo: String,
    street: String,
    village: String,
    district: String,

    gender: String,
    maritalStatus: String,

    aadharNo: String,
    bloodGroup: String,

    mobile: {
      type: String,
      required: true,
    },

    email: String,

    dob: String,
    age: Number,

    profileImage: String,
  },
  { timestamps: true },
);

const patientModel = mongoose.model("Patient", patientSchema);

export default patientModel;
