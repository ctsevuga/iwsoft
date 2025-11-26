/**
 * Seeder for Company Profile Product
 * Model: ProductSchema (Company Product, NOT eCommerce Product)
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ⭐ IMPORTANT: this is NOT eCommerce productSchema
// This is the company profile product model
import CompanyProduct from "./models/Product.js"; // <-- update path as required

const seedCompanyProduct = async () => {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    const longDescription = `
Karaikudi E-Market – Local Shopping Made Easy

Karaikudi E-Market is a comprehensive local eCommerce platform designed to connect vendors and customers in a seamless shopping experience. Whether you're buying groceries, clothing, electronics, or local products — Karaikudi E-Market brings it all to your fingertips.

🛍️ For Customers:
• Browse products by category and subcategory  
• View product details, pricing, and availability  
• Add items to cart and place orders with ease  
• Provide your delivery address, phone, and email for smooth doorstep delivery  
• Secure login and profile management  

🛒 For Vendors:
• Create and manage product listings  
• Organize products by categories and subcategories  
• Track orders and manage inventory  
• Handle customer interactions and updates  

🧑‍💼 For Admins:
• Manage vendor accounts and monitor activity  
• Approve or reject product listings  
• Access reporting and analytics  
• Maintain platform integrity and quality control  

🚚 For Delivery Partners:
• View assigned orders and customer details  
• Update delivery status in real-time  
• Ensure timely and accurate deliveries  

Why Karaikudi Market Chettinadu?
• Built for local businesses and customers  
• Simple, intuitive, and fast  
• Secure login for all user roles  
• Supports multi-role access: customers, vendors, admins, and delivery staff  
• Designed for scalability and community-driven commerce  

Start using Karaikudi E-Market today — your trusted local online marketplace.

🔒 Privacy & Security  
We value your privacy. Personal data like phone number, email, and address is used only for login and delivery purposes and is never shared without consent.
    `;

    const productData = {
      name: "Karaikudi Market Chettinadu",
      slug: "karaikudi-market-chettinadu",
      category: "mobile app, web app",

      shortDescription:
        "A powerful local eCommerce platform for customers, vendors, admins, and delivery partners.",

      longDescription,

      features: [
        {
          title: "Vendor Management",
          description:
            "Vendors can add products, manage stock, pricing, and track orders in real-time.",
          iconUrl: ""
        },
        {
          title: "GST Enabled Billing",
          description:
            "Fully GST compliant system with HSN codes and automatic tax calculations.",
          iconUrl: ""
        },
        {
          title: "Customer App",
          description:
            "Smooth shopping experience with order tracking, offers, wallet, and delivery updates.",
          iconUrl: ""
        },
        {
          title: "Delivery App",
          description:
            "Delivery agents get real-time delivery routes, confirmation and earnings view.",
          iconUrl: ""
        }
      ],

      screenshots: [
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903599/Screen_-_01_prlnif.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903639/Screen_-_02_xu89ow.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903669/Screen_-_03_xoff42.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903699/Screen_-_04_ge6n89.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763903730/Screen_-_05_s4gilr.png"
      ],

      bannerImage:
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763971513/logo_dpuutg.png",

      platformDetails: {
        webUrl: "https://infowisdomqa.in",
        playStoreUrl:
          "https://play.google.com/store/apps/details?id=com.rwithpower.karaikudiEMarket",
        iosAppUrl: ""
      },

      isActive: true,
      updatedAt: new Date()
    };

    // Replace (update) if exists, otherwise insert
    const updatedProduct = await CompanyProduct.findOneAndUpdate(
      { slug: productData.slug }, // match by slug
      { $set: productData },      // replace with new data
      { upsert: true, new: true } // create if not exists
    );

    console.log("✅ Product inserted/updated successfully.");
    console.log("➡️ Updated Product ID:", updatedProduct._id);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
};

seedCompanyProduct();
