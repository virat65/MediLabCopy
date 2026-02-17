import express from "express";
import { addPrescription, getPrescriptions } from "../controller/prescriptionController.js";
const router = express.Router();

router.post("/prescription", addPrescription);
router.get("/prescriptions", getPrescriptions);

export default router;