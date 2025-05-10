import express from "express";
import { adminSignin, adminSignout, adminSignup } from "../controllers/adminAuth.controller.js";

const router = express.Router();

router.post('/admin-signup', adminSignup)
router.post('/admin-signin', adminSignin)
router.get('/admin-signout', adminSignout)


export default router;