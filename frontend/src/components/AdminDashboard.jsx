import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../Backendroutes";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get(api.getUsers.url).then((res) => {
      if (res.data.success) setUsers(res.data.body);
      console.log(setUsers, "setusers");
    });
    axios.get(api.getDoctors.url).then((res) => {
      if (res.data.success) setDoctors(res.data.body);
      console.log(setDoctors, "setdoctors");
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Active Users</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <div className="doctor-header-div d-flex justify-content-between">
            <h4>Available Doctors</h4>
            <button >
              <a href="/add-doctor">Add a Doctor</a>
            </button>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.specialization}</td>
                  <td>{d.email}</td>
                  <td>{d.mobile}</td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan={4}>No doctors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
