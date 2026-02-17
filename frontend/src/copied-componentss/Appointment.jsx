import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Appointment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const doctorId = params.get("doctorId");
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({
    date: "",
    message: "",
  });

  useEffect(() => {
    if (doctorId) {
      axios.get(`http://localhost:3333/doctors`).then((res) => {
        const doc = res.data.body.find((d) => d._id === doctorId);
        setDoctor(doc);
      });
    }
  }, [doctorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!user) {
      toast.error("Please login first!");
      return;
    }
    try {
      await axios.post("http://localhost:3333/appointment", {
        doctorId,
        userId: user._id,
        date: form.date,
        message: form.message,
      });
      toast.success("Appointment requested!");
      setForm({ date: "", message: "" });
    } catch (err) {
      toast.error("Failed to request appointment");
    }
  };

  return (
    <section id="appointment" className="appointment section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Appointment</h2>
        <p>Book appointment with {doctor ? doctor.name : "Doctor"}</p>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 form-group">
              <input
                type="datetime-local"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 form-group">
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
