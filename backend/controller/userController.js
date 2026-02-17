import userModel from "../model/userModel.js";
import doctorModel from "../model/doctorModel.js";
import { imageUpload } from "../utilis/helperFile.js";
import jwtTokenSign from "../utilis/jwtToken.js";
import bcrypt from "bcryptjs";
const saltRound = 10;

const signUp = async (req, res) => {
  try {
    const { role } = req.body; // role = user | doctor | admin
    let Model = userModel;

    // agar doctor signup kar raha hai toh doctorModel use karo
    if (role === "doctor") Model = doctorModel;

    const validationU = await Model.findOne({ email: req.body.email });
    if (validationU !== null) {
      return res.json({
        success: false,
        status: 400,
        message: "Email already exist",
        body: {},
      });
    } else {
      if (req.files && req.files.image && req.files.image.name) {
        const image = req.files.image;
        if (image) req.body.image = imageUpload(image, "userImage");
      }

      const passwordEncrypt = await bcrypt.hash(req.body.password, saltRound);

      const data = await Model.create({
        ...req.body,
        password: passwordEncrypt,
        image: req.body.image,
      });

      const tokenData = await jwtTokenSign({ _id: data._id });
      data.token = tokenData.token;
      data.loginTime = tokenData.decoded.iat;

      res.json({
        success: true,
        status: 200,
        message: `${role} created successfully`,
        body: data,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
      body: {},
    });
  }
};



const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // role: "admin", "user", "doctor"

    let Model = userModel;

    // agar doctor hai to doctorModel
    if (role === "doctor") {
      Model = doctorModel;
    }

    // email + role ke sath user find karo
    const findUser = await Model.findOne({ email, role });

    if (!findUser) {
      return res.json({
        success: false,
        status: 400,
        message: "Email or role is not valid",
        body: {},
      });
    }

    // password verify
    const passwordVerify = await bcrypt.compare(password, findUser.password);
    if (!passwordVerify) {
      return res.json({
        success: false,
        status: 400,
        message: "Password is not correct",
        body: {},
      });
    }

    // token generate
    const tokenUpdate = await jwtTokenSign({ _id: findUser._id });
    findUser.token = tokenUpdate.token;
    findUser.loginTime = tokenUpdate.decoded.iat;

    return res.json({
      success: true,
      status: 200,
      message: "Login successfully",
      body: {
        ...findUser.toObject(),
        image: `${findUser?.image}`,
        prevImg: `http://localhost:${process.env.PORT}/images/userImage/${findUser?.image}`,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
      body: {},
    });
  }
};



const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.json({
      success: true,
      status: 200,
      message: "Doctors fetched successfully",
      body: doctors,
    });
  } catch (error) {
    res.json({
      success: false,
      status: 400,
      message: error.message,
      body: [],
    });
  }
};


const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.query;
    const doctors = await doctorModel.find({ specialization: specialization });
    res.json({
      success: true,
      status: 200,
      message: "Doctors fetched successfully",
      body: doctors,
    });
  } catch (error) {
    res.json({
      success: false,
      status: 400,
      message: error.message,
      body: [],
    });
  }
};

// ...existing code...

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({role:"user"});
    res.json({
      success: true,
      status: 200,
      message: "Users fetched successfully",
      body: users,
    });
  } catch (error) {
    res.json({
      success: false,
      status: 400,
      message: error.message,
      body: [],
    });
  }
};

export default { signUp, login, getAllDoctors, getDoctorsBySpecialization, getAllUsers };
