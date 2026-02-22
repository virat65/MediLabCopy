import express from "express";
import { addStaff,getStaff} from "../controller/staffController.js";

const router = express.Router();

router.post("/add-staff", addStaff);
router.get("/all-staff", getStaff);

export default router;
