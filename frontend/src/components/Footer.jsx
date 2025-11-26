import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import "../css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">

      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Brand Name */}
        <div className="footer-brand">
          <h2 className="brand-text">IwSoft</h2>
          <p className="brand-subtitle">Innovating with Wisdom</p>
        </div>

        {/* Contact Info */}
        {/* <div className="footer-contact">
          <p><FaPhone /> +91-9876543210</p>
          <p><FaEnvelope /> support@iwsoft.com</p>
        </div> */}

        {/* Social Icons */}
        <div className="footer-socials">
          <motion.a whileHover={{ scale: 1.2 }} href="#">
            <FaFacebookF />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#">
            <FaInstagram />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#">
            <FaTwitter />
          </motion.a>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <p>© {currentYear} IwSoft. All rights reserved.</p>
        </div>
      </motion.div>

    </footer>
  );
};

export default Footer;
