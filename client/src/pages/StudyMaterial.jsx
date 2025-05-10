import React, { useState } from "react";
import "../styles/studyMaterial.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudyMaterial() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class: "",
    subject: "",
    topic: "",
    uploadedBy: "",
    fileUrl: ""
  });
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error message
const navigate = useNavigate()
  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file."); // Set error message for invalid file type
      return;
    }
    setFile(selectedFile);
    setErrorMessage(""); // Clear error message when a valid file is selected
  };

  // Handle file upload to Cloudinary
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file to upload!"); // Set error message for no file selected
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload?resource_type=raw`,
        formData
      );
      const uploadedFileUrl = response.data.secure_url;
      setFileUrl(uploadedFileUrl);

      // Update formData with fileUrl after successful upload
      setFormData((prevData) => ({
        ...prevData,
        fileUrl: uploadedFileUrl // Set fileUrl in formData
      }));

      setSuccessMessage("File uploaded successfully!"); // Show success message
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload file. Please try again."); // Set error message for upload failure
    } finally {
      setUploading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure the fileUrl is available before submission
    if (!formData.fileUrl) {
      setErrorMessage("Please upload the file before submitting."); // Set error message if fileUrl is missing
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/materials/upload-material",
        formData,
        { withCredentials: true } // Include credentials (cookies) if necessary
      );

      if (response.status === 201) {
        navigate('/study-material-details')
        setFormData({
          title: "",
          description: "",
          class: "",
          subject: "",
          topic: "",
          uploadedBy: "",
          fileUrl: ""
        });
        setErrorMessage(""); // Clear error message
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSuccessMessage(""); // Clear success message in case of error
      setErrorMessage("Failed to submit the form. Please try again."); // Set error message for submission failure
    }
  };

  return (
    <div className="study-material-container">
      <h2 className="form-heading">Upload Study Material</h2>
      <form className="study-material-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter the description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="class">Class:</label>
          <input
            type="text"
            id="class"
            name="class"
            placeholder="Enter the class"
            onChange={handleChange}
            value={formData.class}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter the subject"
            onChange={handleChange}
            value={formData.subject}
          />
        </div>
        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            placeholder="Enter the topic"
            onChange={handleChange}
            value={formData.topic}
          />
        </div>
        <div className="form-group">
          <label htmlFor="uploadedBy">Uploaded By:</label>
          <input
            type="text"
            id="uploadedBy"
            name="uploadedBy"
            placeholder="Enter uploader's name"
            onChange={handleChange}
            value={formData.uploadedBy}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
          />
          <button
            type="button"
            className="upload-button"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <button
          type="button"
          className="view-button"
          onClick={() => window.open(fileUrl, "_blank")}
        >
          View PDF
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {/* Display success message below the submit button */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      {/* Display error message below the submit button */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
