import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/studentStudyMaterial.css"; // Ensure you have styles for the card

export default function StudentStudyMaterial() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentClass, setStudentClass] = useState(""); // Store the class value here

  // Fetch the student's class from login or session data
  useEffect(() => {
    const fetchStudentData = () => {
      // Assuming this comes from the login data or session storage
      const classFromLoggedInStudent = "7"; // Replace with actual logic to get logged-in student's class
      setStudentClass(classFromLoggedInStudent);
    };

    fetchStudentData();
  }, []); // Runs once when the component mounts

  // Fetch study materials based on the student's class
  useEffect(() => {
    const fetchStudyMaterials = async () => {
      if (!studentClass) return; // Do nothing if studentClass is not provided
      setLoading(true);
      setError("");

      try {
        const encodedClass = encodeURIComponent(studentClass);
        const response = await axios.get(
          `http://localhost:3000/api/materials/${encodedClass}`
        );
        setData(response.data); // Store the data in state
      } catch (err) {
        setError(`Error fetching data: ${err.response ? err.response.data.message : err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (studentClass) {
      fetchStudyMaterials();
    }
  }, [studentClass]); // Runs whenever studentClass changes

  return (
    <div className="study-materials-container">
      <h2 className='study-materials-title'>Study Materials for Class {studentClass}</h2>

      {/* Error message */}
      {error && <div className="study-materials-error-message">{error}</div>}

      {/* Loading message */}
      {loading && <div className="study-materials-loading-message">Loading...</div>}

      {/* Display materials if any */}
      {data.length > 0 && !loading && !error ? (
        <div className="study-materials-card-container">
          {data.map((item, index) => (
            <div key={index} className="study-materials-card">
              <h3>{item.title}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Subject:</strong> {item.subject}</p>
              <p><strong>Topic:</strong> {item.topic}</p>
              <p><strong>Uploaded By:</strong> {item.uploadedBy}</p>

              {/* Download button */}
              <button
                className="study-materials-download-button"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = item.fileUrl;
                  link.download = item.title || 'download.pdf'; // Set the file name
                  link.click();
                }}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No study materials available for this class.</p>
      )}
    </div>
  );
}
