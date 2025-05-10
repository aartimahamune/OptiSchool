import mongoose from "mongoose";

const StudyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    class: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true, // URL to the uploaded file (stored in cloud storage or server)
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const StudyMaterial = mongoose.model("StudyMaterial", StudyMaterialSchema);

export default StudyMaterial;
