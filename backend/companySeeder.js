import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "./models/Company.js";
dotenv.config();

async function seedCompany() {
  try {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🌱 Connected to MongoDB");

    // Clear existing company (optional)
    await Company.deleteMany({});
    console.log("🗑️ Existing company records cleared");

    const fullDescription = `
Transforming Ideas Into Powerful Digital Solutions

We specialize in building high-quality software products that empower businesses across industries. From eCommerce and garment management to metal scrapping operations and nutritionist platforms, our portfolio continues to grow as we develop innovative solutions tailored to real-world needs.

With deep expertise in React Native, we deliver robust, scalable, and user-friendly mobile applications designed to streamline operations and enhance business efficiency.

Custom Software That Fits Your Business Perfectly

Every business is unique—and so are its challenges. We offer end-to-end custom software development services, turning your ideas and requirements into fully functional applications with exceptional user acceptance. Whether you need to transform complex Excel-based workflows into intuitive digital applications or build a complete system from scratch, we ensure a seamless experience that boosts productivity and accuracy.

Industries We Serve

We develop applications across diverse domains, including:

Financial Services
Marketing & Sales
Hospitality
Manufacturing & Operations
And many more…

Our extensive experience allows us to help you clearly define your scope, streamline requirements, and bring your vision to life with confidence.

Launch Your Product Faster

Speed without compromise—that’s our promise. Our specialized expertise enables us to bring your product to market in a remarkably short time, without sacrificing quality or scalability.
`;

    const company = await Company.create({
      name: "Infowisdom Software - IwSoft",
      tagline: "Build Better. Launch Faster.",
      description: fullDescription,
      logoUrl: "https://via.placeholder.com/150?text=Your+Logo",
      heroImageUrl: "https://unsplash.com/photos/UyRTM8Ofdr0",

      contact: {
        email: "rwithpower.gmail.com",
        phone: "",
        address:
          "Nachiyar 7th Cross Street, Parinagar, Karaikudi, Sivaganga District, Karaikudi, Tamilnadu, India.",
        googleMapEmbedUrl: "",
      },

      socialLinks: {
        linkedin: "",
      },
    });

    console.log("✅ Company seeded successfully:");
    console.log(company);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding company:", error);
    process.exit(1);
  }
}

seedCompany();
