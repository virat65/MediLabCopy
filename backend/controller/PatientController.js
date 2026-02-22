import patientModel from "../model/patientModel.js";

export const addPatient = async (req, res) => {
  try {
    // Get highest UHID
    const lastPatient = await patientModel.findOne().sort({ uhidNo: -1 });

    let nextUhid = 1;

    if (lastPatient) {
      nextUhid = lastPatient.uhidNo + 1;
    }

    const patient = new patientModel({
      ...req.body,
      uhidNo: nextUhid,
    });

    await patient.save();

    res.json({
      success: true,
      message: "Patient registered successfully",
      body: patient,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error registering patient",
    });
  }
};

export const allpatient = async (req, res) => {
  try {
    const patients = await patientModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      body: patients,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error fetching patients",
    });
  }
};

export const deleteAllpatient = async (req, res) => {
  try {
    const patients = await patientModel.deleteMany();
    return res.json({
      message: "patient deleted successfully",
      status: 200,
      success: true,
      body: patients,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error deleting all patients",
    });
  }
};


export const searchPatient = async (req, res) => {
  try {
    const { name } = req.query;

    const patients = await patientModel
      .find({
        patientName: { $regex: name, $options: "i" },
      })
      .limit(5);

    res.json({
      success: true,
      body: patients,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Search error",
    });
  }
};
