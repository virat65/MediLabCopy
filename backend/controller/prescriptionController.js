import prescriptionModel from "../model/prescriptionModel.js";

export const addPrescription = async (req, res) => {
  try {
    const { appointmentId, doctorId, userId, message, sender } = req.body;
    const prescription = await prescriptionModel.create({
      appointmentId,
      doctorId,
      userId,
      message,
      sender,
    });
    res.json({ success: true, status: 200, body: prescription });
  } catch (err) {
    res.json({ success: false, status: 400, message: err.message });
  }
};

export const getPrescriptions = async (req, res) => {
  try {
    const { appointmentId } = req.query;
    const prescriptions = await prescriptionModel
      .find({ appointmentId })
      .sort({ createdAt: 1 });
    res.json({ success: true, status: 200, body: prescriptions });
  } catch (err) {
    res.json({ success: false, status: 400, message: err.message });
  }
};
