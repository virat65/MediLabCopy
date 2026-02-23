import React, { useState } from "react";
import axios from "axios";
import api from "../Backendroutes";
import { toast } from "react-toastify";

function AddPatient() {
  const [form, setForm] = useState({
    isOldPatient: false,
    opdNo: "",
    date: "",
    time: "",
    patientName: "",
    guardianName: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    aadharNo: "",
    mobile: "",
    email: "",
    dob: "",
    age: "",
    houseNo: "",
    street: "",
    village: "",
    district: "",
  });

  const [generatedUhid, setGeneratedUhid] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔹 Handle Input Change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Old patient search
    if (name === "patientName" && value.length > 1 && form.isOldPatient) {
      try {
        const res = await axios.get(`${api.allpatient.url}?name=${value}`);

        if (res.data.success) {
          setSuggestions(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // 🔹 Select Old Patient
  const selectPatient = (patient) => {
    setForm({
      ...form,
      patientName: patient.patientName || "",
      guardianName: patient.guardianName || "",
      gender: patient.gender || "",
      maritalStatus: patient.maritalStatus || "",
      bloodGroup: patient.bloodGroup || "",
      aadharNo: patient.aadharNo || "",
      mobile: patient.mobile || "",
      email: patient.email || "",
      dob: patient.dob || "",
      age: patient.age || "",
      houseNo: patient.houseNo || "",
      street: patient.street || "",
      village: patient.village || "",
      district: patient.district || "",
    });

    setGeneratedUhid(patient.uhidNo);
    setSuggestions([]);
  };

  // 🔹 Calculate Age from DOB
  const handleDobChange = (e) => {
    const dob = e.target.value;
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setForm({ ...form, dob, age });
  };

  // 🔹 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(api.addpatient.url, form);

      if (res.data.success) {
        toast.success("Patient Registered Successfully");

        setGeneratedUhid(res.data.data.uhid);

        setForm({
          isOldPatient: false,
          opdNo: "",
          date: "",
          time: "",
          patientName: "",
          guardianName: "",
          gender: "",
          maritalStatus: "",
          bloodGroup: "",
          aadharNo: "",
          mobile: "",
          email: "",
          dob: "",
          age: "",
          houseNo: "",
          street: "",
          village: "",
          district: "",
        });

        setSuggestions([]);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Patient Registration</h3>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Old Patient */}
          <div className="col-md-3 mb-3">
            <label>Old Patient?</label>
            <select
              className="form-control"
              value={form.isOldPatient ? "Yes" : "No"}
              onChange={(e) =>
                setForm({ ...form, isOldPatient: e.target.value === "Yes" })
              }
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          {/* UHID */}
          <div className="col-md-3 mb-3">
            <label>UHID No</label>
            <input
              type="text"
              className="form-control"
              value={generatedUhid || "Auto Generated"}
              readOnly
            />
          </div>

          {/* OPD No */}
          <div className="col-md-3 mb-3">
            <label>OPD No</label>
            <input
              type="text"
              name="opdNo"
              value={form.opdNo}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Date */}
          <div className="col-md-3 mb-3">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Time */}
          <div className="col-md-3 mb-3">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Patient Name */}
          <div className="col-md-6 mb-3 position-relative">
            <label>Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              className="form-control"
              required
            />

            {form.isOldPatient && suggestions.length > 0 && (
              <div
                className="list-group position-absolute w-100"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((item) => (
                  <button
                    type="button"
                    key={item._id}
                    className="list-group-item list-group-item-action"
                    onClick={() => selectPatient(item)}
                  >
                    {item.patientName} - {item.mobile}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guardian */}
          <div className="col-md-6 mb-3">
            <label>Guardian Name</label>
            <input
              type="text"
              name="guardianName"
              value={form.guardianName}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* DOB */}
          <div className="col-md-3 mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleDobChange}
              className="form-control"
            />
          </div>

          {/* Age */}
          <div className="col-md-3 mb-3">
            <label>Age</label>
            <input
              type="number"
              value={form.age}
              readOnly
              className="form-control"
            />
          </div>

          {/* Gender */}
          <div className="col-md-3 mb-3">
            <label>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="col-md-3 mb-3">
            <label>Marital Status</label>
            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
            </select>
          </div>

          {/* Blood Group */}
          <div className="col-md-3 mb-3">
            <label>Blood Group</label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option>A+</option>
              <option>B+</option>
              <option>O+</option>
              <option>AB+</option>
            </select>
          </div>

          {/* Mobile */}
          <div className="col-md-3 mb-3">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Register Patient
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
