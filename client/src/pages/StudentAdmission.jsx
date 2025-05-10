import React, { useState } from "react";
import "../styles/StudentAdmission.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function StudentAdmission() {
  const [files, setFiles] = useState({
    aadhaarCard: null,
    leavingCertificate: null,
    marksheet: null,
    photo: null,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    nationality: "",
    phoneNo: "",
    email: "",
    permanentAddress: "",
    localAddress: "",
    parentName: "",
    parentPhoneNo: "",
    prevSchoolName: "",
    appliedClass: "",
    prevGrade: "",
    emergencyContactName: "",
    emergencyPhoneNo: "",
    relationshipWithStudent: "",
    aadhaarCard: "",
    leavingCertificate: "",
    marksheet: "",
    photo: "",
  });
  
  const [uploadedUrls, setUploadedUrls] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFiles((prevState) => ({
      ...prevState,
      [field]: file,
    }));
  };
  
  const handleImageSubmit = async (e, field) => {
    e.preventDefault();
  
    const file = files[field];
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
  
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const sizeLimit = 2 * 1024 * 1024; // 2 MB in bytes
  
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only JPG, JPEG, and PNG formats are allowed.");
      return;
    }
    if (file.size > sizeLimit) {
      alert("File size exceeds the 2 MB limit. Please upload a smaller file.");
      return;
    }
  
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    uploadData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        uploadData
      );
      const imageUrl = response.data.secure_url;
  
      // Update both uploadedUrls and formData states
      setUploadedUrls((prevState) => ({
        ...prevState,
        [field]: imageUrl,
      }));
  
      setFormData((prevState) => ({
        ...prevState,
        [field]: imageUrl,
      }));
  
      setSuccessMessage(`Image for ${field} uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error);
      alert("Error uploading image. Please check the file type and try again.");
    }
  };
  
  const handleViewImage = (field) => {
    const imageUrl = uploadedUrls[field];
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    } else {
      alert("No image uploaded for this document.");
    }
  };
  
  const handleReset = () => {
    setFiles({
      aadhaarCard: null,
      leavingCertificate: null,
      marksheet: null,
      photo: null,
    });
    setUploadedUrls({});
    setSuccessMessage("");
  };
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    if (
      type === "text" ||
      type === "date" ||
      type === "email" ||
      type === "tel"
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false); // Reset error state before validation
    const adminToken = Cookies.get("admin_access_token");
  
    // Phone number validation
    if (!/^\d{10}$/.test(formData.phoneNo)) {
      setError("Invalid phone number. Must be 10 digits.");
      return;
    }
    if (!/^\d{10}$/.test(formData.parentPhoneNo)) {
      setError("Invalid parent phone number. Must be 10 digits.");
      return;
    }
    if (!/^\d{10}$/.test(formData.emergencyPhoneNo)) {
      setError("Invalid emergency phone number. Must be 10 digits.");
      return;
    }
  
    try {
      setLoading(true);
  
      const formDataWithUrls = {
        ...formData,
        aadhaarCard: uploadedUrls.aadhaarCard || formData.aadhaarCard,
        leavingCertificate: uploadedUrls.leavingCertificate || formData.leavingCertificate,
        marksheet: uploadedUrls.marksheet || formData.marksheet,
        photo: uploadedUrls.photo || formData.photo,
      };
  
      // Ensure all file fields are uploaded
      if (!formDataWithUrls.aadhaarCard || !formDataWithUrls.leavingCertificate || !formDataWithUrls.marksheet || !formDataWithUrls.photo) {
        setError("All required files must be uploaded before submission.");
        setLoading(false);
        return;
      }
  
      const res = await fetch("api/student/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formDataWithUrls),
      });
  
      const data = await res.json();
      setLoading(false);
  
      if (!data.success) {
        setError(data.message);
      } else {
        setSuccessMessage("Student admission form submitted successfully!");
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          nationality: "",
          phoneNo: "",
          email: "",
          permanentAddress: "",
          localAddress: "",
          parentName: "",
          parentPhoneNo: "",
          prevSchoolName: "",
          appliedClass: "",
          prevGrade: "",
          emergencyContactName: "",
          emergencyPhoneNo: "",
          relationshipWithStudent: "",
          aadhaarCard: "",
          leavingCertificate: "",
          marksheet: "",
          photo: "",
        });
        
      }
      navigate("/student-details");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error(error.message);
    }
  };
  
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <fieldset>
          <h2 className="section-title">1. Personal Information</h2>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={handleChange}
            value={formData.firstName}
          />

          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            required
            onChange={handleChange}
            value={formData.middleName}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={handleChange}
            value={formData.lastName}
          />

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            required
            onChange={handleChange}
            value={formData.gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            required
            onChange={handleChange}
            value={formData.nationality}
          />

          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            required
            onChange={handleChange}
            value={formData.phoneNo}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            value={formData.email}
          />

          <label htmlFor="permanentAddress">Permanent Address</label>
          <input
            type="text"
            id="permanentAddress"
            name="permanentAddress"
            required
            onChange={handleChange}
            value={formData.permanentAddress}
          />

          <label htmlFor="localAddress">Local Address</label>
          <input
            type="text"
            id="localAddress"
            name="localAddress"
            required
            onChange={handleChange}
            value={formData.localAddress}
          />
        </fieldset>

        <div className="section-divider"></div>

        {/* Parent/Guardian Information Section */}
        <fieldset>
          <h2 className="section-title">2. Parent/Guardian Information</h2>
          <label htmlFor="parentName">Parent/Guardian Name</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            required
            onChange={handleChange}
            value={formData.parentName}
          />

          <label htmlFor="parentPhoneNo">Parent/Guardian Contact</label>
          <input
            type="text"
            id="parentPhoneNo"
            name="parentPhoneNo"
            required
            onChange={handleChange}
            value={formData.parentPhoneNo}
          />
        </fieldset>

        <div className="section-divider"></div>

        {/* Educational Information Section */}
        <fieldset>
          <h2 className="section-title">3. Educational Information</h2>
          <label htmlFor="prevSchoolName">Previous School Name</label>
          <input
            type="text"
            id="prevSchoolName"
            name="prevSchoolName"
            required
            onChange={handleChange}
            value={formData.prevSchoolName}
          />

          <label htmlFor="appliedClass">Class Applied For</label>
          <input
            type="text"
            id="appliedClass"
            name="appliedClass"
            required
            onChange={handleChange}
            value={formData.appliedClass}
          />

          <label htmlFor="prevGrade">Previous Grades/Results</label>
          <input
            type="text"
            id="prevGrade"
            name="prevGrade"
            required
            onChange={handleChange}
            value={formData.prevGrade}
          />
        </fieldset>

        <div className="section-divider"></div>

        {/* Emergency Contact Information Section */}
        <fieldset>
          <h2 className="section-title">4. Emergency Contact Information</h2>
          <label htmlFor="emergencyContactName">Emergency Contact Name</label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            required
            onChange={handleChange}
            value={formData.emergencyContactName}
          />

          <label htmlFor="emergencyPhoneNo">Emergency Contact Number</label>
          <input
            type="text"
            id="emergencyPhoneNo"
            name="emergencyPhoneNo"
            required
            onChange={handleChange}
            value={formData.emergencyPhoneNo}
          />

          <label htmlFor="relationshipWithStudent">
            Relationship to Student
          </label>
          <input
            type="text"
            id="relationshipWithStudent"
            name="relationshipWithStudent"
            required
            onChange={handleChange}
            value={formData.relationshipWithStudent}
          />
        </fieldset>
        {/* Document section */}
        <div className="section-divider"></div>
        <fieldset>
          <h2 className="section-title">5. Required Documents</h2>

          <label htmlFor="aadhaarCard">Aadhaar Card</label>
          <input
            onChange={(e) => handleFileChange(e, "aadhaarCard")}
            type="file"
            id="aadhaarCard"
            name="aadhaarCard"
            required
          />
          <button
            onClick={(e) => handleImageSubmit(e, "aadhaarCard")}
            type="button"
            className="upload-button"
          >
            Upload
          </button>
          <button
            onClick={() => handleViewImage("aadhaarCard")}
            type="button"
            className="view-button"
          >
            View
          </button>

          <label htmlFor="leavingCertificate">Leaving Certificate</label>
          <input
            onChange={(e) => handleFileChange(e, "leavingCertificate")}
            type="file"
            id="leavingCertificate"
            name="leavingCertificate"
            required
          />
          <button
            onClick={(e) => handleImageSubmit(e, "leavingCertificate")}
            type="button"
            className="upload-button"
          >
            Upload
          </button>
          <button
            onClick={() => handleViewImage("leavingCertificate")}
            type="button"
            className="view-button"
          >
            View
          </button>

          <label htmlFor="marksheet">Previous School Marksheet</label>
          <input
            onChange={(e) => handleFileChange(e, "marksheet")}
            type="file"
            id="marksheet"
            name="marksheet"
            required
          />
          <button
            onClick={(e) => handleImageSubmit(e, "marksheet")}
            type="button"
            className="upload-button"
          >
            Upload
          </button>
          <button
            onClick={() => handleViewImage("marksheet")}
            type="button"
            className="view-button"
          >
            View
          </button>

          <label htmlFor="photo">Student Photograph</label>
          <input
            onChange={(e) => handleFileChange(e, "photo")}
            type="file"
            id="photo"
            name="photo"
            required
          />
          <button
            onClick={(e) => handleImageSubmit(e, "photo")}
            type="button"
            className="upload-button"
          >
            Upload
          </button>
          <button
            onClick={() => handleViewImage("photo")}
            type="button"
            className="view-button"
          >
            View
          </button>
        </fieldset>

        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Submit and Reset Buttons */}
        <div className="form-actions">
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>

          <button type="submit" className="submit-button">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
