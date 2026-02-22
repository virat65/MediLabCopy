import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../Backendroutes.js";

function AddStaff() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    mobile: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(api.addstaff.url, form);

      if (res.data.success) {
        toast.success("Staff added successfully!");
        setForm({
          name: "",
          role: "",
          email: "",
          mobile: "",
          department: "",
        });
      }
    } catch (error) {
      toast.error("Failed to add staff");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Staff</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mt-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Staff Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mt-3">
            <input
              type="text"
              name="role"
              className="form-control"
              placeholder="Role (Nurse, Receptionist...)"
              value={form.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mt-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mt-3">
            <input
              type="text"
              name="mobile"
              className="form-control"
              placeholder="Mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mt-3">
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="btn btn-primary">Add Staff</button>
        </div>
      </form>
    </div>
  );
}

export default AddStaff;
