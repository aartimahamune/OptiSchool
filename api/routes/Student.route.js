import express from "express";
import { addStudent, deleteStudent, getStudentByPrnNo } from "../controllers/Student.controller.js";
import { verifyAdminToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add", verifyAdminToken, addStudent);
router.delete("/delete/:id", verifyAdminToken, deleteStudent);
router.get("/:prnNo", getStudentByPrnNo);

export default router;
