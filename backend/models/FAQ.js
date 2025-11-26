// models/FAQ.js
import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FAQ", FAQSchema);
