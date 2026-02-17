// src/api/backendApi.js

const server = process.env.REACT_APP_BACKEND_ROUTING || "http://localhost:3333";
// const server ="https://medilab-project-backend.onrender.com";
const api = {
  // 🔹 AUTH
  signup: {
    method: "post",
    url: `${server}/signUp`,
  },
  login: {
    method: "post",
    url: `${server}/login`,
  },

  // 🔹 USERS
  getUsers: {
    method: "get",
    url: `${server}/users`,
  },

  // 🔹 DOCTORS
  getDoctors: {
    method: "get",
    url: `${server}/doctors`,
  },
  getDoctorsBySpecialization: {
    method: "get",
    url: `${server}/doctors-by-specialization`,
  },

  // 🔹 APPOINTMENTS
  createAppointment: {
    method: "post",
    url: `${server}/appointment`,
  },
  getDoctorAppointments: {
    method: "get",
    url: `${server}/doctor-appointments`,
  },
  getUserAppointments: {
    method: "get",
    url: `${server}/user-appointments`,
  },
  updateAppointmentStatus: {
    method: "post",
    url: `${server}/update-appointment-status`,
  },

  // 🔹 PRESCRIPTIONS
  addPrescription: {
    method: "post",
    url: `${server}/prescription`,
  },
  getPrescriptions: {
    method: "get",
    url: `${server}/prescriptions`,
  },
};

export default api;
