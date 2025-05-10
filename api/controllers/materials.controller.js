import StudyMaterial from "../models/studyMaterial.model.js";
import { errorHandler } from "../utils/error.js";

// Function to upload the study material
export const uploadMaterial = async (req, res, next) => {
    try {
    const material = StudyMaterial.create(req.body)
    return res.status(201).json(material);
        }
    catch (error) {
        next(error);
    }
};

// In material.controller.js
export const getMaterialsByClass = async (req, res, next) => {
    try {
      const { className } = req.params;
      const materials = await StudyMaterial.find({ class: className });
  
      if (materials.length === 0) {
        return res.status(404).json({ message: "No materials found for this class." });
      }
  
      res.status(200).json(materials);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteMaterial = async (req, res, next) =>{
    const material = await StudyMaterial.findById(req.params.id);
    if(!material) return next(errorHandler(404, 'Study material not found!'))
    try {
            await StudyMaterial.findByIdAndDelete(req.params.id)
            res.status(200).json("Study material has been deleted!")
    } catch (error) {
            next(error)
    }
  }