import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js"
import Student from "../models/student.model.js";

export const test = (req,res)=>{
    res.json({
        message:"Hello World"
    })
}

export const deleteAdmin  = async (req, res, next) =>{
    if(req.admin.id != req.params.id) return next(errorHandler(401, "You can only delete your own account!"));
    try {
        await Admin.findByIdAndDelete(req.params.id)
        res.clearCookie('admin_access_token');
        res.status(200).json("Admin has been deleted successfully!");
    } catch (error) {
        next(error);
    }
} 


// Fetch students or filter by class
export const getStudents = async (req, res, next) => {
  try {
    const { class: studentClass } = req.query;

    let students;

    // If `class` query parameter exists, filter by class; otherwise, fetch all students
    if (studentClass) {
      students = await Student.find({ appliedClass: studentClass });
    } else {
      students = await Student.find();
    }

    if (!students.length) {
      return res.status(404).json({
        success: false,
        message: "No students found.",
      });
    }

    return res.status(200).json({
      success: true,
      total: students.length,
      students,
    });
  } catch (error) {
    next(error);
  }
};
