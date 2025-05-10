import React, { useEffect, useState } from 'react';
import '../styles/StudentProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudentFailure, deleteStudentSuccess, studentSignoutStart } from '../redux/student/studentSlice';
import { Link, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const { currentStudent } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`/api/studentAuth/student-profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
          setStudentData(data.student);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  if (!studentData) {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    try {
      dispatch(studentSignoutStart());
      const res = await fetch(`/api/studentAuth/student-signout`, { method: 'POST', credentials: 'include' });
      const data = await res.json();

      if (!data.success) {
        dispatch(deleteStudentFailure(data.message));
        alert(data.message || 'Failed to sign out.');
        return;
      }

      dispatch(deleteStudentSuccess());
      navigate('/student-signin');
    } catch (error) {
      dispatch(deleteStudentFailure(error.message));
      alert('An error occurred while signing out.');
    }
  };

  return (
    <div className="student-profile-container-aa">
      <div className="student-profile-header-aa">
        <img
          src={studentData.photo}
          alt={`${studentData.firstName} ${studentData.lastName}'s Profile`}
          className="student-profile-photo-aa"
        />
        <h1>
          {studentData.firstName} {studentData.middleName} {studentData.lastName}
        </h1>
        <p>PRN No: {studentData.prnNo}</p>
      </div>
      <div className="student-profile-details-aa">
        <h2>Personal Information</h2>
        <p><strong>Gender:</strong> {studentData.gender}</p>
        <p><strong>Nationality:</strong> {studentData.nationality}</p>
        <p><strong>Email:</strong> {studentData.email}</p>
        <p><strong>Phone Number:</strong> {studentData.phoneNo}</p>
        <p><strong>Permanent Address:</strong> {studentData.permanentAddress}</p>
        <p><strong>Local Address:</strong> {studentData.localAddress}</p>

        <h2>Family Information</h2>
        <p><strong>Parent's Name:</strong> {studentData.parentName}</p>
        <p><strong>Parent's Phone Number:</strong> {studentData.parentPhoneNo}</p>

        <h2>Emergency Contact</h2>
        <p><strong>Contact Name:</strong> {studentData.emergencyContactName}</p>
        <p><strong>Contact Phone Number:</strong> {studentData.emergencyPhoneNo}</p>
        <p><strong>Relationship:</strong> {studentData.relationshipWithStudent}</p>

        <h2>Academic Information</h2>
        <p><strong>Previous School:</strong> {studentData.prevSchoolName}</p>
        <p><strong>Previous Grade:</strong> {studentData.prevGrade}</p>
        <p><strong>Applied Class:</strong> {studentData.appliedClass}</p>

        <h2>Documents</h2>
        <p>
          <strong>Aadhaar Card:</strong>{' '}
          <a
            href={studentData.aadhaarCard}
            target="_blank"
            rel="noopener noreferrer"
            className="view-button-aa"
          >
            View
          </a>
        </p>
        <p>
          <strong>Leaving Certificate:</strong>{' '}
          <a
            href={studentData.leavingCertificate}
            target="_blank"
            rel="noopener noreferrer"
            className="view-button-aa"
          >
            View
          </a>
        </p>
        <p>
          <strong>Marksheet:</strong>{' '}
          <a
            href={studentData.marksheet}
            target="_blank"
            rel="noopener noreferrer"
            className="view-button-aa"
          >
            View
          </a>
        </p>
        <div className="student-actions-aa">
          <button onClick={handleSignOut} className="student-action-button-aa">Sign Out</button>
          <Link to='/student-study-material'><button className="student-action-button-aa">Study Material</button></Link>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
