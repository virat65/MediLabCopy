import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
router.get("/doctors", userController.getAllDoctors);
router.get(
  "/doctors-by-specialization",
  userController.getDoctorsBySpecialization,
);
router.post("/adddoctor",userController.addDoctor)
router.get("/users", userController.getAllUsers);
router.get("/getprofile", userController.getProfile);
export default router;
