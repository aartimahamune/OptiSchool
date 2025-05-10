import React, { useState } from "react";
import "../styles/MaterialDetails.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MaterialDetails() {
  const [selectedClass, setSelectedClass] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchClicked, setFetchClicked] = useState(false); // Track if fetch button is clicked

  // Sample class options
  const classOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Handle class selection
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setFetchClicked(false); // Reset fetchClicked when class changes
  };

  // Fetch data based on the selected class
  const handleFetchData = async () => {
    if (!selectedClass) {
      setError(""); // No error message when no class is selected
      return;
    }

    setFetchClicked(true); // Set fetchClicked to true when button is clicked
    setLoading(true);
    setError(""); // Clear any previous error

    try {
      const encodedClass = encodeURIComponent(selectedClass);

      const response = await axios.get(
        `http://localhost:3000/api/materials/${encodedClass}`
      );
      setData(response.data); // Set the fetched data to state
    } catch (err) {
      setError(`Error fetching data: ${err.response ? err.response.data.message : err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="study-material-filter-container">
      <h2 className="study-material-filter-container__filter-heading">Study Materials</h2>

      {/* Class selection filter */}
      <div className="study-material-filter-container__filter-section">
        <label htmlFor="class">Class:</label>
        <select
          id="class"
          value={selectedClass}
          onChange={handleClassChange}
          className="study-material-filter-container__class-select"
        >
          <option value="">Select Class</option>
          {classOptions.map((classOption, index) => (
            <option key={index} value={classOption}>
              {classOption}
            </option>
          ))}
        </select>
      </div>

      {/* Fetch data button */}
      <div className="study-material-filter-container__button-section">
        <button
          className="study-material-filter-container__fetch-button"
          onClick={handleFetchData}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>

      {/* Upload button */}
      <div className="study-material-filter-container__upload-button-section">
        <Link to='/study-material'>
          <button className="study-material-filter-container__upload-button">
            Upload Study Material
          </button>
        </Link>
      </div>

      {/* Display error message if any */}
      {error && <div className="study-material-filter-container__error-message">{error}</div>}

      {/* Display data in a table */}
      {data.length > 0 && (
        <div className="study-material-filter-container__data-display">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Uploaded By</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.class}</td>
                  <td>{item.subject}</td>
                  <td>{item.topic}</td>
                  <td>{item.uploadedBy}</td>
                  <td>
                    {/* View button to open the PDF in a new tab */}
                    <button
                      className="study-material-filter-container__view-button"
                      onClick={() => window.open(item.fileUrl, "_blank")}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No data message (only after clicking fetch and if no data is found) */}
      {fetchClicked && data.length === 0 && !loading && !error && (
        <p className="study-material-filter-container__no-data-message">
          No study materials available for the selected class.
        </p>
      )}
    </div>
  );
}
