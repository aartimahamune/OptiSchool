import express from "express";
import { studentSignin , getStudentProfile, studentSignout} from "../controllers/studentAuth.controller.js";

const router = express.Router();

router.post('/student-signin', studentSignin);
router.get('/student-profile', getStudentProfile);
router.post('/student-signout', studentSignout);

export default router;
