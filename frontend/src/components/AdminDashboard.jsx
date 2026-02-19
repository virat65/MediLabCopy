import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../Backendroutes";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(api.getUsers.url);
        const doctorsRes = await axios.get(api.getDoctors.url);
        const appointRes = await axios.get(api.allappointments.url);

        if (usersRes.data.success) setUsers(usersRes.data.body);
        if (doctorsRes.data.success) setDoctors(doctorsRes.data.body);
        if (appointRes.data.success) setAppointments(appointRes.data.body);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* USERS SECTION */}
      <div className="row">
        <div className="col-md-6">
          <h4>Active Users : {users.length}</h4>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.mobile}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* DOCTORS SECTION */}
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Available Doctors : {doctors.length}</h4>
            <Link to="/add-doctor" className="btn btn-primary">
              Add Doctor
            </Link>
          </div>

          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.specialization}</td>
                    <td>{d.email}</td>
                    <td>{d.mobile}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPOINTMENTS SECTION */}
      <div className="row mt-5">
        <div className="col-12">
          <h4>All Appointments : {appointments.length}</h4>

          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>User</th>
                <th>Doctor</th>
                <th>Date & Time </th>
                <th>Appointment Type </th>

                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((a) => (
                  <tr key={a._id}>
                    {console.log(a, "A")}
                    <td>{a.userId?.name}</td>
                    <td>{a.doctorId?.name}</td>
                    <td>{new Date(a.date).toLocaleString()}</td>
                    <td>{a.appointmentType}</td>

                    <td>{a.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No appointments found
                  </td>
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
