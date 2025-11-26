import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCube,
  FaClock,
  FaCommentDots
} from "react-icons/fa";

import "../css/MessageDetail.css";

const MessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 900 });

    const fetchMessage = async () => {
      try {
        const res = await axios.get(`/api/contacts/${id}`);
        setMessage(res.data);
      } catch (error) {
        console.error("Error loading message:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  return (
    <div className="detail-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      {loading ? (
        <motion.div
          className="loading-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading message details...
        </motion.div>
      ) : (
        message && (
          <motion.div
            className="detail-card"
            data-aos="fade-up"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="detail-title">
              <FaUser /> {message.name}
            </h2>

            <div className="detail-section">
              <p className="detail-item">
                <FaEnvelope /> <strong>Email:</strong> {message.email}
              </p>

              {message.phone && (
                <p className="detail-item">
                  <FaPhone /> <strong>Phone:</strong> {message.phone}
                </p>
              )}

              {message.productInterest && (
                <p className="detail-item">
                  <FaCube /> <strong>Product:</strong>{" "}
                  {message.productInterest.name}
                </p>
              )}

              <p className="detail-item">
                <FaClock /> <strong>Received At:</strong>{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>

              <h3 className="message-heading">
                <FaCommentDots /> Message
              </h3>

              <p className="detail-message">{message.message}</p>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};

export default MessageDetail;
