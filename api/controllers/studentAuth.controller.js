import Student from "../models/student.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const studentSignin = async (req, res, next) => {
    const { prnNo, email } = req.body;
    try {
      // Clear admin cookie before processing student login
      res.clearCookie("admin_access_token");  // Clears admin token if any
      
      const validStudent = await Student.findOne({ prnNo });
      if (!validStudent) return next(errorHandler(404, "Student not found!"));
      const validEmail = await Student.findOne({ email });
      if (!validEmail) return next(errorHandler(401, "Wrong email!"));
      const studentToken = jwt.sign(
        { id: validStudent._id },
        process.env.STUDENT_JWT_SECRET
      );
      res
        .cookie("student_access_token", studentToken, { httpOnly: true })
        .status(200)
        .json(validStudent);
    } catch (error) {
      next(error);
    }
};

export const getStudentProfile = async (req, res, next) => {
  try {
    const token = req.cookies.student_access_token;
    if (!token) return next(errorHandler(401, "Unauthorized!"));

    const decoded = jwt.verify(token, process.env.STUDENT_JWT_SECRET);
    const student = await Student.findById(decoded.id);
    if (!student) return next(errorHandler(404, "Student not found!"));

    res.status(200).json({ success: true, student });
  } catch (err) {
    next(err);
  }
};

export const studentSignout = async (req, res, next) => {
  try {
    res.clearCookie('student_access_token');
    res.status(200).json({ success: true, message: "Student has been logged out!" });
  } catch (error) {
    console.error("Error in studentSignout:", error); // Add logging
    next(error);
  }
};
