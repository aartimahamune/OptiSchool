import { uploadMaterial, getMaterialsByClass, deleteMaterial } from "../controllers/materials.controller.js"
import express from 'express';
import { verifyAdminToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/upload-material',verifyAdminToken, uploadMaterial);
router.get('/:className', getMaterialsByClass);
router.delete('/delete/:id', verifyAdminToken, deleteMaterial);


export default router