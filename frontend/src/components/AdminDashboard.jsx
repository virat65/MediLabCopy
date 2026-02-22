import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../Backendroutes";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("users");

  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(api.getUsers.url);
        const doctorsRes = await axios.get(api.getDoctors.url);
        const appointRes = await axios.get(api.allappointments.url);
        const staffRes = await axios.get(api.allstaff.url);
        const deptRes = await axios.get(api.alldeparment.url);
        const patientRes = await axios.get(api.allpatient.url);

        if (usersRes.data.success)
          setUsers(usersRes.data.body || usersRes.data.data);
        if (doctorsRes.data.success)
          setDoctors(doctorsRes.data.body || doctorsRes.data.data);
        if (appointRes.data.success)
          setAppointments(appointRes.data.body || appointRes.data.data);
        if (staffRes.data.success)
          setStaff(staffRes.data.body || staffRes.data.data);
        if (deptRes.data.success)
          setDepartments(deptRes.data.body || deptRes.data.data);
        if (patientRes.data.success)
          setPatients(patientRes.data.body || patientRes.data.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Navigation */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setActiveSection("users")}
        >
          Users
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setActiveSection("doctors")}
        >
          Doctors
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => setActiveSection("patients")}
        >
          Patients
        </button>
        <button
          className="btn btn-outline-warning"
          onClick={() => setActiveSection("departments")}
        >
          Departments
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setActiveSection("staff")}
        >
          Staff
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => setActiveSection("appointments")}
        >
          Appointments
        </button>
      </div>

      {/* USERS */}
      {activeSection === "users" && (
        <div>
          <h4>Total Users: {users.length}</h4>
          <table className="table table-bordered">
            <thead className="table-dark">
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
                  <td colSpan="3" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* DOCTORS */}
      {activeSection === "doctors" && (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <h4>Total Doctors: {doctors.length}</h4>
            <div>
              <Link to="/add-doctor" className="btn btn-primary me-2">
                Add Doctor
              </Link>
              <Link to="/add-department" className="btn btn-warning me-2">
                Add Department
              </Link>
              <Link to="/add-staff" className="btn btn-success">
                Add Staff
              </Link>
            </div>
          </div>

          <table className="table table-bordered">
            <thead className="table-dark">
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
                  <td colSpan="4" className="text-center">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* PATIENTS */}
      {activeSection === "patients" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Total Patients: {patients.length}</h4>
            <Link to="/add-patient" className="btn btn-info">
              Add Patient
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>UHID</th>
                  <th>Name</th>
                  <th>Guardian</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Blood Group</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Registered Date</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((p) => (
                    <tr key={p._id}>
                      <td>{p.uhidNo || p.uhid}</td>
                      <td>{p.patientName}</td>
                      <td>{p.guardianName || "-"}</td>
                      <td>{p.gender || "-"}</td>
                      <td>{p.age || "-"}</td>
                      <td>{p.bloodGroup || "-"}</td>
                      <td>{p.mobile || "-"}</td>
                      <td>{p.email || "-"}</td>
                      <td>
                        {p.houseNo || ""} {p.street || ""} {p.village || ""}{" "}
                        {p.district || ""}
                      </td>
                      <td>
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No patients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DEPARTMENTS */}
      {activeSection === "departments" && (
        <div>
          <h4>Total Departments: {departments.length}</h4>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* STAFF */}
      {activeSection === "staff" && (
        <div>
          <h4>Total Staff: {staff.length}</h4>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? (
                staff.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.role}</td>
                    <td>{s.email}</td>
                    <td>{s.mobile}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No staff found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* APPOINTMENTS */}
      {activeSection === "appointments" && (
        <div>
          <h4>Total Appointments: {appointments.length}</h4>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.userId?.name}</td>
                    <td>{a.doctorId?.name}</td>
                    <td>{new Date(a.date).toLocaleString()}</td>
                    <td>{a.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
