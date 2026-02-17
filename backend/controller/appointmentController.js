import appointmentModel from "../model/appointmentModel.js";
import userModel from "../model/userModel.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, userId, date, message } = req.body;
    const appointment = await appointmentModel.create({
      doctorId,
      userId,
      date,
      message,
    });
    res.json({
      success: true, 
      status: 200,
      message: "Appointment requested",
      body: appointment,
    });
  } catch (err) {
    res.json({ success: false, status: 400, message: err.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const appointments = await appointmentModel
      .find({ doctorId })
      .populate("userId");
    res.json({ success: true, status: 200, body: appointments });
  } catch (err) {
    res.json({ success: false, status: 400, message: err.message });
  }
};
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status, rejectionReason, rescheduleDate } = req.body;
    const update = { status };
    if (rejectionReason) update.rejectionReason = rejectionReason;
    if (rescheduleDate) update.rescheduleDate = rescheduleDate;
    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      update,
      { new: true }
    );
    res.json({ success: true, status: 200, body: updated });
  } catch (err) {
    res.json({ success: false, status: 400, message: err.message });
  }
};
export const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.query;
    const appointments = await appointmentModel
      .find({ userId })
      .populate("doctorId");
    res.json({ success: true, status: 200, body: appointments });
  } catch (err) {
    res.json({ success: false, status: 400, message: err.message });
  }
};
