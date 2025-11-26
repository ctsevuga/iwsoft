import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaLock,
  FaEnvelope,
  FaUser,
  FaPhone,
  FaCube,
  FaClock,
  FaEye
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "../css/AdminMessages.css";

const AdminMessages = () => {
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  const handleVerify = async () => {
    if (!code) {
      toast.error("Please enter the security code.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/contacts/list", { code });

      setMessages(res.data);
      setVerified(true);
      toast.success("Access granted! Messages loaded. 🎉");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid code. Access denied."
      );
    }

    setLoading(false);
  };

  const goToDetail = (id) => {
    navigate(`/admin/messages/${id}`);
  };

  return (
    <div className="admin-wrapper">
      <ToastContainer />

      {!verified && (
        <motion.div className="code-box" data-aos="zoom-in">
          <FaLock className="lock-icon" />

          <h2 className="code-title">Admin Access Required 🔐</h2>
          <p className="code-subtitle">Enter the 4-digit security code</p>

          <input
            type="password"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-input"
            placeholder="••••"
          />

          <motion.button
            className="verify-btn"
            onClick={handleVerify}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </motion.button>
        </motion.div>
      )}

      {verified && (
        <div className="messages-container">
          <h2 className="messages-title" data-aos="fade-up">
            Contact Messages 📩
          </h2>

          <div className="messages-grid">
            {messages.map((msg) => (
              <motion.div
                className="message-card"
                key={msg._id}
                data-aos="fade-up"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="message-name">
                  <FaUser /> {msg.name}
                </h3>

                <p className="message-item">
                  <FaEnvelope /> {msg.email}
                </p>

                {msg.phone && (
                  <p className="message-item">
                    <FaPhone /> {msg.phone}
                  </p>
                )}

                <p className="message-item">
                  <FaCube /> Product:{" "}
                  {msg.productInterest ? msg.productInterest.name : "N/A"}
                </p>

                <p className="message-date">
                  <FaClock /> {new Date(msg.createdAt).toLocaleString()}
                </p>

                {/* View Button */}
                <motion.button
                  className="view-btn"
                  onClick={() => goToDetail(msg._id)}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> View Details
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
