import express from "express";
import { verifyAdminToken } from "../utils/verifyUser.js";
import { deleteAdmin, getStudents } from "../controllers/admin.controller.js";

const router = express.Router();

// router.get('/test', test);
router.delete('/delete/:id', verifyAdminToken, deleteAdmin);
router.get("/students", verifyAdminToken, getStudents);

export default router;