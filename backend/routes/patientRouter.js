import express from "express";

import { addPatient, allpatient, deleteAllpatient, searchPatient } from "../controller/PatientController.js";

const router = express.Router();

router.post("/add-patient", addPatient);
router.get("/all-patient", allpatient);
router.delete("/deleteAllpatients", deleteAllpatient);

router.get("/search-patient", searchPatient);
export default router;
