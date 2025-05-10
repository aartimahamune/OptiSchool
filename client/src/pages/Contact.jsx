import React from 'react';
import '../styles/Contact.css'

export default function Contact() {
  return (
    <section className="contact-form-section">
      <div className="contact-form">
        <h2 className="contact-form__title">Get In Touch</h2>
        <form className="form" action="https://formspree.io/f/xbllpoel"
  method="POST">
          <div className="form__group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="phone">Phone No.</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your phone number"
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <button type="submit" className="form__submit">
            Send Message
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.9963047447864!2d76.6577877749671!3d16.609408084151163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc86f006ae4d967%3A0x77772d18f50d0cdb!2sSiddartha%20school%20%26%20college!5e1!3m2!1sen!2sin!4v1735614579112!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    </section>
  );
};