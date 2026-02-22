import Staff from "../model/staffModel.js";

// ✅ Add Staff
export const addStaff = async (req, res) => {
  try {
    const { name, role, email, mobile, department } = req.body;

    if (!name || !role || !email || !mobile || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const staff = await Staff.create({
      name,
      role,
      email,
      mobile,
      department,
    });

    res.status(201).json({
      success: true,
      message: "Staff added successfully",
      body: staff,
    });
  } catch (error) {
    console.error("Add Staff Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ Get All Staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      body: staff,
    });
  } catch (error) {
    console.error("Get Staff Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
