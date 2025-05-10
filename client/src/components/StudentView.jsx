import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/StudentView.css";

export default function StudentView() {
  const { prnNo } = useParams(); // Extract prnNo from the URL
  const [student, setStudent] = useState(null); // Store student data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const adminToken = Cookies.get("admin_access_token");

      try {
        const response = await fetch(`/api/student/${prnNo}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setStudent(data.student);
        } else {
          setError(data.message || "Failed to fetch student data.");
        }
      } catch (error) {
        setError("Error fetching student data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [prnNo]); // Re-fetch if prnNo changes

  if (loading) return <div className="student-view-container__loading">Loading student details...</div>;
  if (error) return <div className="student-view-container__error">{error}</div>;

  return (
    <div className="student-view-container__student">
      <h1 className="student-view-container__header">Student Profile</h1>
      {student && (
        <div className="student-view-container__details">
          <div className="student-view-container__photo">
            <img
              src={student.photo}
              alt="Student"
              className="profile-image"
            />
          </div>
          <div className="student-view-container__info">
            <p><strong>Full Name:</strong> {student.firstName} {student.middleName} {student.lastName}</p>
            <p><strong>PRN No:</strong> {student.prnNo}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone No:</strong> {student.phoneNo}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Nationality:</strong> {student.nationality}</p>
            <p><strong>Permanent Address:</strong> {student.permanentAddress}</p>
            <p><strong>Local Address:</strong> {student.localAddress}</p>
            <p><strong>Parent Name:</strong> {student.parentName}</p>
            <p><strong>Parent Phone No:</strong> {student.parentPhoneNo}</p>
            <p><strong>Previous School:</strong> {student.prevSchoolName}</p>
            <p><strong>Applied Class:</strong> {student.appliedClass}</p>
            <p><strong>Previous Grade:</strong> {student.prevGrade}</p>
            <p><strong>Emergency Contact:</strong> {student.emergencyContactName} ({student.emergencyPhoneNo})</p>
            <p><strong>Relationship with Student:</strong> {student.relationshipWithStudent}</p>
          </div>

          <div className="student-view-container__documents">
            <h3>Documents</h3>
            <ul>
              <li>
                <strong>Aadhaar Card: </strong>
                <a href={student.aadhaarCard} target="_blank" rel="noopener noreferrer">View</a>
              </li>
              <li>
                <strong>Leaving Certificate: </strong>
                <a href={student.leavingCertificate} target="_blank" rel="noopener noreferrer">View</a>
              </li>
              <li>
                <strong>Marksheets: </strong>
                <a href={student.marksheet} target="_blank" rel="noopener noreferrer">View</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
