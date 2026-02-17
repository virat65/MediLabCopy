import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
router.get("/doctors", userController.getAllDoctors);
router.get(
  "/doctors-by-specialization",
  userController.getDoctorsBySpecialization
);
router.get("/users", userController.getAllUsers);
export default router;
