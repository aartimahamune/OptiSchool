import { useState } from "react";
import "../styles/StudentDetails.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { deleteStudentFailure, deleteStudentStart, deleteStudentSuccess } from "../redux/student/studentSlice";

export default function StudentDetails() {
  const [studentData, setStudentData] = useState([]); // To store fetched student data
  const [selectedClass, setSelectedClass] = useState(""); // To store selected class
  const [totalCount, setTotalCount] = useState(0); // To store total count of students
  const [loading, setLoading] = useState(false); // To manage loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleFetchData = async () => {
    const adminToken = Cookies.get("admin_access_token");
    if (!selectedClass) {
      alert("Please select a class.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/students${selectedClass ? `?class=${selectedClass}` : ""}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`, // Ensure token is passed
        },
      });

      const data = await response.json();
      if (data.success) {
        setStudentData(data.students);
        setTotalCount(data.total);
      } else {
        alert(data.message || "Failed to fetch students.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudent = (prnNo) => {
    navigate(`/view-student/${prnNo}`);
  };

  const handleDeleteStudent = async (id) => {
    const adminToken = Cookies.get("admin_access_token");

    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        dispatch(deleteStudentStart());
        const res = await fetch(`/api/student/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const data = await res.json();
        console.log("Delete response:", data);  // Log the response data

        if (data.success === false) {
          dispatch(deleteStudentFailure(data.message || "Failed to delete student."));
          alert(data.message || "Failed to delete student.");
        } else {
          setStudentData((prevData) => prevData.filter((student) => student._id !== id));
          dispatch(deleteStudentSuccess());
          alert("Student deleted successfully.");
        }
      } catch (error) {
        console.error("Error during delete:", error.message);
        dispatch(deleteStudentFailure(error.message));
        alert("An error occurred while deleting the student.");
      }
    }
  };

  return (
    <div className="student-details-container">
      <h1 className="title">Student Details</h1>

      <div className="filter-section">
        <div className="filter-item">
          <label htmlFor="sort_class">Class:</label>
          <select
            onChange={handleChange}
            id="sort_class"
            className="dropdown"
            value={selectedClass}
          >
            <option value="">Select Class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div className="buttons-container">
          <button
            className="button fetch-button"
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
          <Link to="/add-student">
            <button className="button add-button">Add Student</button>
          </Link>
        </div>
      </div>

      {studentData.length > 0 && (
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>PRN No</th>
                <th>Full Name</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Emergency Contact</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr key={student.prnNo}>
                  <td>{student.prnNo}</td>
                  <td>
                    {student.firstName} {student.middleName} {student.lastName}
                  </td>
                  <td>{student.phoneNo}</td>
                  <td>{student.email}</td>
                  <td>{student.emergencyPhoneNo}</td>
                  <td>
                    <button
                      className="button view-button"
                      onClick={() => handleViewStudent(student.prnNo)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="button delete-button"
                      onClick={() => handleDeleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-count">Total Students: {totalCount}</div>
        </div>
      )}
    </div>
  );
}
