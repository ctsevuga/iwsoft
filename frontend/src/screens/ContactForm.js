import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";
import "../css/ContactForm.css";

const ContactForm = ({ products = [] }) => {

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/contacts", data);
      toast.success("Message sent successfully! 🎉");
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message ❌");
    }
  };

  return (
    <motion.div
      className="contact-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ToastContainer />
      <div className="contact-container" data-aos="fade-up">
        
        <motion.h2
          className="contact-title"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch 💬
        </motion.h2>

        <p className="contact-subtitle">We’d love to hear from you!</p>

        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">

          {/* Name */}
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && <p className="error-message">{errors.name.message}</p>}

          {/* Email */}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          {/* Phone */}
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="text"
              placeholder="Your Phone"
              {...register("phone")}
            />
          </div>

          {/* Product Interest */}
          <label className="form-label">Product of Interest</label>
          <select {...register("productInterest")} className="select-product">
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>

          {/* Message */}
          <div className="input-group textarea-group">
            <FaCommentDots className="input-icon" />
            <textarea
              placeholder="Your Message"
              {...register("message", { required: "Message is required" })}
            ></textarea>
          </div>
          {errors.message && (
            <p className="error-message">{errors.message.message}</p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message 🚀"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
