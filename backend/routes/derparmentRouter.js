import express from "express";
import { addDepartment,getDepartments } from "../controller/deparmentController.js";

const router = express.Router();

router.post("/add-department", addDepartment);
router.get("/all-department", getDepartments);

export default router;
