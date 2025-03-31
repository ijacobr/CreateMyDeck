// src/pages/Contact.jsx
import React from 'react';
import './css/Contact.css'; // Adjust the path based on your folder structure

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <div className="contact-container">
        {/* Contact Form */}
        <div className="form-container">
          <form id="contactForm">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit">Send Message</button>
            <span id="form-status"></span>
          </form>
        </div>
        {/* IFrame Embed (Google Map Example) */}
        <div className="iframe-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509959!2d-122.42067968468159!3d37.77902697975706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b8b62e3%3A0x8c9e1b0a63a927a2!2sCity%20Hall!5e0!3m2!1sen!2sus!4v1592915319534!5m2!1sen!2sus"
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
