import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import connectionDb from "./connection/db.connect.js";
import router from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import appointmentRouter from "./routes/appointmentRouter.js";
import prescriptionRouter from "./routes/prescriptionRouter.js";
import staffRouter from "./routes/staffRouter.js";
import deparmentRouter from "./routes/derparmentRouter.js";
import patientRouter from "./routes/patientRouter.js";
// Set up __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 3333;

// Middleware setup
app.use(cors());
connectionDb();
app.use(express.json());
app.use(fileUpload());

// Set up static file serving
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/", router);
app.use("/", appointmentRouter);
app.use("/", prescriptionRouter);
app.use("/",deparmentRouter)
app.use("/",staffRouter)
app.use("/",patientRouter)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
