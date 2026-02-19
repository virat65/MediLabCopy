import React, { useState } from "react";
import axios from "axios";
import api from "../Backendroutes";
import { useNavigate } from "react-router-dom";

function AddDoctor() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    mobile: "",
    specialization: "",
    experience: "",
    qualification: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(doctor).forEach((key) => {
        formData.append(key, doctor[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(api.addDoctor.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Doctor added successfully");

        setDoctor({
          name: "",
          email: "",
          mobile: "",
          specialization: "",
          experience: "",
          qualification: "",
          password: "",
        });

        setImage(null);
        navigate("/admin-dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error adding doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Doctor</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Mobile</label>
            <input
              type="number"
              name="mobile"
              value={doctor.mobile}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Specialization</label>
            <select
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Specialization</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Hepatology">Hepatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Eye Care">Eye Care</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={doctor.qualification}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Doctor Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;
