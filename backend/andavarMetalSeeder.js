/**
 * Seeder for Company Profile Product: Andavar Metal
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ⚠️ Company Profile product schema (NOT scrap product schema)
import CompanyProduct from "./models/Product.js";  
// <-- Adjust the path as needed

const seedAndavarMetal = async () => {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    const longDescription = `
Here is a clean, step-by-step, easy-to-understand description of your Metal Scrap Application.
This version is suitable for documentation, product pages, onboarding screens, or seeding a longDescription field.

---

✅ Metal Scrap Application – Step-by-Step Description
...
(keeping your description unchanged)
    `;

    const productData = {
      name: "Andavar Metal",
      slug: "andavar-metal",
      category: "mobile app, web app",

      shortDescription:
        "A complete metal scrap cost management system for input, output, and furnace processing.",

      longDescription,

      features: [
        {
          title: "Scrap Product Pricing",
          description:
            "Create and update metal scrap products with real-time price adjustments.",
          iconUrl: ""
        },
        {
          title: "Input Furnace Calculation",
          description:
            "Add materials with weight and auto-calculate cost and total input cost.",
          iconUrl: ""
        },
        {
          title: "Overhead Cost Management",
          description:
            "Easily include labor, electricity, gas, water, maintenance, and other overheads.",
          iconUrl: ""
        },
        {
          title: "Output Furnace Costing",
          description:
            "Enter final output and auto-calculate cost per kg for accurate production costing.",
          iconUrl: ""
        }
      ],

      screenshots: [
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903837/Screen_-_01_tg0zv5.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903870/Screen_-_02_moghqh.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903898/Screen_-_03_hfouv3.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903929/Screen_-_04_jjlbct.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903955/Screen_-_05_lxlhyz.png"
      ],

      bannerImage:
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763970145/furnace_ecavg2.png",

      platformDetails: {
        webUrl: "https://wishrms.in",
        playStoreUrl: "",
        iosAppUrl: ""
      },

      isActive: true,
      updatedAt: new Date()
    };

    // 🔄 Insert if not exists, Update if exists
    const updatedProduct = await CompanyProduct.findOneAndUpdate(
      { slug: productData.slug },     // match by slug
      { $set: productData },          // replace with new data
      { upsert: true, new: true }      // create or update
    );

    console.log("✅ Andavar Metal inserted/updated successfully.");
    console.log("🆔 Product ID:", updatedProduct._id);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
};

seedAndavarMetal();
