import "../styles/header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const { currentAdmin } = useSelector((state) => state.admin); // Admin state
  const { currentStudent } = useSelector((state) => state.student); // Student state
  const [menuOpen, setMenuOpen] = useState(false); // State to control the menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  return (
    <header className="header">
      <div className="school-name-container">
        <div className="logo">
          <img src="logo.jpg" alt="logo" />
        </div>
        <h1 className="school-name">
          Dr. Baba Saheb Ambedkar Higher Primary School & Siddharth English Medium Pre-Primary School
        </h1>
      </div>

      {/* Hamburger icon */}
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation links */}
      <nav>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
          <li className="login-menu">
            {currentAdmin ? (
              // Show admin profile
              <Link to="/admin-profile">
                <img
                  src="Profile_Picture.jpg" // Replace with admin avatar source
                  alt="Admin Profile"
                  className="profile_img"
                />
              </Link>
            ) : currentStudent ? (
              // Show student profile
              <Link to="/student-profile">
                <img
                  src={currentStudent.photo} // Fetch student photo from MongoDB
                  alt="Student Profile"
                  className="profile_img"
                />
              </Link>
            ) : (
              // Show login options
              <>
                <span className="login-menu">Login</span>
                <ul className="dropdown">
                  <li><Link to="/admin-signin">Admin</Link></li>
                  <li><Link to="/student-signin">Student</Link></li>
                </ul>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
