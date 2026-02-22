import Department from "../model/deparmentModel.js";

// ✅ Add Department
export const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Department name is required",
      });
    }

    // Check if department already exists
    const existing = await Department.findOne({ name });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Department already exists",
      });
    }

    const department = await Department.create({ name });

    res.status(201).json({
      success: true,
      message: "Department added successfully",
      body: department,
    });
  } catch (error) {
    console.error("Add Department Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ Get All Departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      body: departments,
    });
  } catch (error) {
    console.error("Get Departments Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
