// models/Company.js
import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: String,
  description: String,
  logoUrl: String,
  heroImageUrl: String,

  contact: {
    email: String,
    phone: String,
    address: String,
    googleMapEmbedUrl: String,
  },

  socialLinks: {
    linkedin: String,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Company", CompanySchema);
