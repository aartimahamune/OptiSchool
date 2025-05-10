import React from 'react';
import '../Styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Column */}
        <div className="footer-column logo-column">
          <img src="logo.jpg" alt="School Logo" />
        </div>

        {/* Contact Column */}
        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>Email: siddhartheducationtrust401@gmail.com</p>
          <p>Phone: +91 9890246811</p>
          <p>Address: JM56+Q4, Malagathi, Karnataka 585216</p>
        </div>

        {/* Important Links Column */}
        <div className="footer-column">
          <h4>Important Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Admissions</a></li>
            <li><a href="/gallery">Academics</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Column */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul className="social-media">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="Facebook.png" alt="Facebook" className="social-icon" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="twitter.png" alt="twitter" className="social-icon" />
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="instagram.png" alt="instagram" className="social-icon" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="footer-bottom">
        &copy; Siddharth Education Trust. All Rights Reserved.
      </p>
    </footer>
  );
}
