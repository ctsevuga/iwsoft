// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },     // for SEO friendly URLs
  category: { type: String, required: true },               // e.g. SaaS, mobile app, web app

  shortDescription: { type: String, required: true },
  longDescription: String,

  features: [
    {
      title: String,
      description: String,
      iconUrl: String     // optional if you show feature icons
    }
  ],

  screenshots: [String], // carousel UI
  bannerImage: String,

  platformDetails: {
    webUrl: String,
    playStoreUrl: String,       // eCommerce has this
    iosAppUrl: String
  },

  

  isActive: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", ProductSchema);
