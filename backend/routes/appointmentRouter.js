import express from "express";
import {
  allAppointments,
  createAppointment,
  getDoctorAppointments,
  getUserAppointments,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";
const router = express.Router();
router.post("/appointment", createAppointment);
router.get("/doctor-appointments", getDoctorAppointments);
router.post("/update-appointment-status", updateAppointmentStatus);
router.get("/user-appointments", getUserAppointments);
router.get("/allappointments", allAppointments);
export default router;
