import Student from "../models/student.model.js";
import crypto from "crypto";

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return new Date(`${year}-${month}-${day}`);
};

export const addStudent = async (req, res, next) => {
  try {
    const prnNo = `${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = formatDate(req.body.dateOfBirth);
    }

    const studentData = { ...req.body, prnNo };
    const student = await Student.create(studentData);

    return res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next)=>{
  try {
    await Student.findByIdAndDelete(req.params.id)
    res.clearCookie('student_access_token');
    res.status(200).json("Student has been deleted successfully!");
} catch (error) {
    next(error);
}
}

export const getStudentByPrnNo = async (req, res) => {
  const { prnNo } = req.params;

  try {
    const student = await Student.findOne({ prnNo });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
