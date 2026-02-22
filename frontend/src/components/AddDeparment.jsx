import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../Backendroutes.js";

function AddDepartment() {
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(api.adddeparment.url, {
        name: department,
      });

      if (res.data.success) {
        toast.success("Department added successfully!");
        setDepartment("");
      }
    } catch (error) {
      toast.error("Failed to add department");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Department</h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Department Name"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <button className="btn btn-primary">Add Department</button>
        </div>
      </form>
    </div>
  );
}

export default AddDepartment;
