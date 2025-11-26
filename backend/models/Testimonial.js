// models/Testimonial.js
import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  clientName: String,
  clientCompany: String,
  message: { type: String, required: true },
  photoUrl: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Testimonial", TestimonialSchema);
