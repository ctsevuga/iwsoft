// models/ContactMessage.js
import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,

  productInterest: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ContactMessage", ContactMessageSchema);
