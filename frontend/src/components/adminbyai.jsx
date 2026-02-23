import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../Backendroutes";
import { toast } from "react-toastify";

function AddPatient() {
  // ------------------ DATE & TIME ------------------
  const date_time = new Date();
  const current_date = `${("0" + date_time.getDate()).slice(-2)}-${(
    "0" +
    (date_time.getMonth() + 1)
  ).slice(-2)}-${date_time.getFullYear()}`;
  const current_time = `${date_time.getHours()}:${date_time.getMinutes()}`;

  // ------------------ STATES ------------------
  const [generatedUhid, setGeneratedUhid] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [opdno, setOpdno] = useState(0);

  const [form, setForm] = useState({
    isOldPatient: false,
    opdNo: opdno,
    date: current_date,
    time: current_time,
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

  // ------------------ GET OPD NUMBER ------------------
  const allopdappointments = async () => {
    try {
      const res = await axios.get(api.allappointments.url);
      const allappointments = res.data.body;

      const opdappointments = allappointments.filter(
        (appointment) => appointment.appointmentType === "OPD",
      );
      console.log(opdappointments, "opdappointment");
      const opdlength = opdappointments.length + 1;

      setOpdno(opdlength);
      setForm((prev) => ({
        ...prev,
        opdNo: opdlength,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ GET TOTAL PATIENTS (UHID) ------------------
  const totalPatients = async () => {
    try {
      const res = await axios.get(api.allpatient.url);
      setGeneratedUhid(res.data.body.length + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allopdappointments();
    totalPatients();
  }, []);

  // ------------------ HANDLE CHANGE ------------------
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Search old patient
    if (name === "patientName" && value.length > 1 && form.isOldPatient) {
      try {
        const res = await axios.get(`${api.allpatient.url}?name=${value}`);

        if (res.data.success) {
          setSuggestions(res.data.body);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // ------------------ SELECT OLD PATIENT ------------------
  const selectPatient = (patient) => {
    setForm((prev) => ({
      ...prev,
      patientName: patient.patientName || "",
      guardianName: patient.guardianName || "",
      gender: patient.gender || "",
      maritalStatus: patient.maritalStatus || "",
      bloodGroup: patient.bloodGroup || "",
      aadharNo: patient.aadharNo || "",
      mobile: patient.mobile || "",
      email: patient.email || "",
      dob: patient.dob ? patient.dob.split("T")[0] : "",
      age: patient.age || "",
      houseNo: patient.houseNo || "",
      street: patient.street || "",
      village: patient.village || "",
      district: patient.district || "",
    }));

    setGeneratedUhid(patient.uhidNo);
    setSuggestions([]);
  };

  // ------------------ DOB CHANGE ------------------
  const handleDobChange = (e) => {
    const dob = e.target.value;
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setForm((prev) => ({
      ...prev,
      dob,
      age,
    }));
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(api.addpatient.url, form);

      if (res.data.success) {
        toast.success("Patient Registered Successfully");

        // setForm({
        //   isOldPatient: false,
        //   opdNo: "",
        //   date: current_date,
        //   time: current_time,
        //   patientName: "",
        //   guardianName: "",
        //   gender: "",
        //   maritalStatus: "",
        //   bloodGroup: "",
        //   aadharNo: "",
        //   mobile: "",
        //   email: "",
        //   dob: "",
        //   age: "",
        //   houseNo: "",
        //   street: "",
        //   village: "",
        //   district: "",
        // });

        setSuggestions([]);
        allopdappointments();
        totalPatients();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  // ------------------ UI ------------------
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
                setForm((prev) => ({
                  ...prev,
                  isOldPatient: e.target.value === "Yes",
                }))
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
              value={generatedUhid}
              readOnly
            />
          </div>

          {/* OPD */}
          <div className="col-md-3 mb-3">
            <label>OPD No</label>
            <input
              type="text"
              name="opdNo"
              value={form.opdNo}
              className="form-control"
              readOnly
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
