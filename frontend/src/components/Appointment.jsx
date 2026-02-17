import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../Backendroutes";

function Appointment() {
  const [doctors, setDoctors] = useState([]); // all doctors
  const [loading, setLoading] = useState(true); // loading state
  const [form, setForm] = useState({
    doctorId: "",
    doctorname: "",
    specialization: "",
    date: "",
    message: "",
  });

  // Load all doctors
  useEffect(() => {
    axios
      .get(api.getDoctors.url)
      .then((res) => {
        const docs = Array.isArray(res.data.body) ? res.data.body : [];
        setDoctors(docs);
      })
      .catch(() => toast.error("Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  // input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // when user selects a doctor
  const handleDoctorSelect = (e) => {
    const id = e.target.value;
    const selected = doctors.find((d) => d._id === id);

    setForm({
      ...form,
      doctorId: id,
      doctorname: selected?.name || "",
      specialization: selected?.specialization || "",
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("userInfo"));

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    try {
      await axios.post(api.createAppointment.url, {
        doctorId: form.doctorId,
        doctorname: form.doctorname,
        specialization: form.specialization,
        userId: user._id,
        date: form.date,
        message: form.message,
      });

      toast.success("Appointment requested!");

      setForm({
        doctorId: "",
        doctorname: "",
        specialization: "",
        date: "",
        message: "",
      });
    } catch (err) {
      toast.error("Failed to request appointment");
    }
  };

  return (
    <section id="appointment" className="appointment section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Appointment</h2>
        <p>Book appointment with a doctor</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Doctor Dropdown */}
            <div className="col-md-6 form-group mt-2">
              <select
                className="form-control"
                name="doctorId"
                value={form.doctorId}
                onChange={handleDoctorSelect}
                required
                disabled={loading}
              >
                <option value="">
                  {loading ? "Loading doctors..." : "Select Doctor"}
                </option>
                {Array.isArray(doctors) &&
                  doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} — {doc.specialization}
                    </option>
                  ))}
              </select>
            </div>

            {/* Specialization auto-filled */}
            <div className="col-md-6 form-group mt-2">
              <input
                type="text"
                className="form-control"
                value={form.specialization}
                disabled
                placeholder="Specialization"
              />
            </div>

            {/* Date */}
            <div className="col-md-6 form-group mt-3">
              <input
                type="datetime-local"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div className="col-md-6 form-group mt-3">
              <input
                type="text"
                name="message"
                className="form-control"
                placeholder="Message (Optional)"
                value={form.message}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3 text-center">
            <button type="submit" className="btn btn-primary">
              Make an Appointment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Appointment;
