import React from "react";
import "../styles/AdminProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  adminSignoutFailure,
  adminSignoutStart,
  adminSignoutSuccess,
  deleteAdminFailure,
  deleteAdminStart,
  deleteAdminSuccess,
} from "../redux/admin/adminSlice";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => state.admin); // Access currentAdmin

  const handleAdminSignout = async () => {
    try {
      dispatch(adminSignoutStart());
      const res = await fetch(`/api/adminAuth/admin-signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteAdminFailure(data.message))
        return;
      }
      dispatch(deleteAdminSuccess(data));
    } catch (error) {
      dispatch(deleteAdminFailure(data.message));
    }
  };

  const handleDeleteAdmin = async () => {
    if (!currentAdmin) {
      dispatch(deleteAdminFailure("No admin is currently logged in."));
      return;
    }

    try {
      dispatch(deleteAdminStart());
      const res = await fetch(`/api/admin/delete/${currentAdmin._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteAdminFailure(data.message));
        return;
      }
      dispatch(deleteAdminSuccess());
      navigate("/admin-signin"); // Redirect after deletion
    } catch (error) {
      dispatch(deleteAdminFailure("Failed to delete admin. Please try again."));
    }
  };

  return (
    <div className="Admin-container">
        <div className="admin-pic">
          <img src="admin.png" alt="admin" />
        </div>
      <h2 className="admin-name">{currentAdmin?.adminUsername || "Admin"}</h2>
      
      <div className="admin-buttons"> 
        <Link to='/student-details'>
          <button className="admin-button">
            Student Details
          </button>
        </Link>
        <Link to='/study-material-details'>
          <button className="admin-button">
            Study Material details
          </button>
        </Link>
      </div>

      <div className="admin-actions"> 
        <button onClick={handleAdminSignout} className="admin-action-button">
          Sign Out
        </button> 
        <button onClick={handleDeleteAdmin} className="admin-action-button">
          Delete Admin
        </button> 
      </div>
    </div>
  );
}
