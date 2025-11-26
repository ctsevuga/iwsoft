// productSeeder.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyProduct from "./models/Product.js";
dotenv.config();

async function seedProduct() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected!");

    const productData = {
      name: "Nutritionist",
      slug: "nutritionist-appointment-system",
      category: "web app",

      shortDescription:
        "A complete nutritionist-client management system with appointment scheduling, nutrition planning, progress tracking, and secure messaging.",

      longDescription: `
1. Nutritionist Sets Weekly Availability  
Each nutritionist begins by entering their working schedule into the system.  
They can set available time slots for every day of the week—for example, Monday to Sunday.  
These time slots represent the times when clients can book appointments.

2. Managing and Updating Availability  
If a nutritionist becomes unavailable for a particular day or time, they can easily update their schedule.  
They can remove specific time slots or mark them as unavailable.  
This ensures that clients only see accurate, up-to-date availability.

3. Client Registration and Appointment Booking  
When a client registers or logs in to book an appointment, the system automatically checks the nutritionist’s availability for the chosen day.  
A dropdown list appears, showing only the slots that are currently open.  
If a time slot has already been booked by another client, it will not be shown in the list, preventing scheduling conflicts.

4. Appointment Confirmation  
After the client selects an available time, the appointment is confirmed and recorded in the system.  
Both the client and the nutritionist can view their scheduled appointments.

5. Nutritionist Creates a Personalized Nutrition Plan  
Following the appointment, the nutritionist can create a customized nutrition plan containing guidelines, meal recommendations, goals, and timelines.

6. Tracking Client Progress  
Nutritionists can monitor each client’s progress regularly, update goals, and review feedback to ensure steady improvement.

7. Built-In Messaging System  
The platform includes a secure messaging feature enabling quick and easy communication between nutritionists and clients.

8. Seamless, User-Friendly Experience  
By automating availability, preventing booking conflicts, and enabling nutrition tracking, the application provides an efficient and intuitive workflow for both nutritionists and clients.
      `,

      features: [
        {
          title: "Weekly Availability Setup",
          description:
            "Nutritionists can easily set and manage their availability for all days of the week.",
          iconUrl: "",
        },
        {
          title: "Smart Appointment Booking",
          description:
            "Clients can book appointments only in available slots, preventing overlaps.",
          iconUrl: "",
        },
        {
          title: "Dynamic Nutrition Plans",
          description:
            "Customized nutrition plans with meals, attachments, and timelines.",
          iconUrl: "",
        },
        {
          title: "Progress Tracking",
          description:
            "Track weight, BMI, body fat, and other metrics over time.",
          iconUrl: "",
        },
        {
          title: "Secure Messaging",
          description:
            "Real-time communication system between clients and nutritionists.",
          iconUrl: "",
        },
      ],

      screenshots: [
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904209/Screen_-_01_es3wlt.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904240/Screen_-_02_no9iif.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904272/Screen_-_03_kzhebo.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904312/Screen_-_04_qflajg.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904344/Screen_-_05_jtyjgr.png",
      ],

      bannerImage:
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763974091/Nutrition_e3xuev.png",

      platformDetails: {
        webUrl: "https://nutritiontrack.shop/",
        playStoreUrl: "",
        iosAppUrl: "",
      },

      isActive: true,
      updatedAt: new Date(),
    };

    // 🔄 Insert new or replace existing document
    const updatedProduct = await CompanyProduct.findOneAndUpdate(
      { slug: productData.slug },
      { $set: productData },
      { upsert: true, new: true }
    );

    console.log("Nutritionist product inserted/updated successfully!");
    console.log("Product ID:", updatedProduct._id);

    process.exit();
  } catch (err) {
    console.error("Seeder Error:", err);
    process.exit(1);
  }
}

seedProduct();
