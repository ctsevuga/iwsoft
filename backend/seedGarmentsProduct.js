// garmentsProductSeeder.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ⭐ IMPORTANT: this is NOT eCommerce productSchema
//     This is the company profile product model
import CompanyProduct from "./models/Product.js"; 

async function seedGarmentsProduct() {
  try {
    console.log("🌱 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);

    // Avoid duplicates
    await CompanyProduct.deleteOne({ slug: "garments-and-textiles-management-system" });

    const productData = {
      name: "Garments & Textiles",
      slug: "garments-and-textiles-management-system",
      category: "web app",

      shortDescription:
        "A complete garments and textile production management system with unit handling, inventory control, order workflow, production tracking, user roles, and real-time operational monitoring.",

      longDescription: `
The Garments & Textiles Management System is an end-to-end digital solution designed for garment factories, textile units, apparel production houses, and tailoring hubs. It centralizes unit operations, inventory management, production stages, role-based access, and order workflow tracking—creating a streamlined environment for managing complex manufacturing processes.

1. Role-Based User Management  
The platform supports three primary user roles—Admin, Client (Owner), and Unit Manager—each with clearly defined privileges.  
• Admin: Acts as a system superuser with full access to users, units, inventory, and orders. Admin oversees the entire application and handles creation, activation, and assignment of units and users.  
• Client (Owner): Typically represents a business, buyer, or factory owner. Owners can create production units, assign managers, track production performance, monitor inventory, and follow order progress.  
• Unit Manager: Oversees daily operations inside a specific production unit. Managers update production stages, maintain inventory usage, track output, and report status to the owner.  

This structure mirrors the real-world hierarchy in the garment manufacturing industry:  
Admin (Head Office) → Client/Owner (Factory Owner or Brand) → Unit Manager (Factory Supervisor).

2. Unit Management  
Each production unit is linked to a specific owner and can have multiple managers. Units maintain information such as address, capacity, contact details, and operational status. Owners may manage multiple units, and managers only see the units assigned to them, ensuring clean data segmentation.

3. Product Catalog Management  
Products are defined with SKUs, size ranges, color variations, descriptions, and unit costs. This ensures a unified product database for order creation and production planning across various units.

4. Inventory Management  
Units maintain independent inventories of fabrics, trims, accessories, and other materials. Each inventory record stores category, supplier information, quantities, and reorder thresholds. Managers can log material usage, ensuring accurate tracking of stock levels and production readiness.

5. Order Management  
Orders track clients, assigned units, ordered products, total quantities, and due dates. Each order reflects real-world communication between buyers (clients) and manufacturing units, enabling clear visibility from planning to delivery.

6. Order Status Workflow  
Each order follows a structured production lifecycle that reflects actual garment industry processes:

• Created – The order is newly placed, recorded, and awaits production approval. Items, sizes, colors, and due dates are validated before moving forward.

• In Production – The order enters the manufacturing phase. Activities like fabric cutting, stitching, embroidery, dyeing, and finishing are performed based on the item specifications.

• Quality Check – Completed garments undergo rigorous inspection. Items are tested for sizing accuracy, stitching quality, defects, finishing standards, and overall compliance.

• Shipped – Once QC is passed, goods are packaged and handed over to logistics. Shipping details and tracking information are updated for client visibility.

• Delivered – The client receives the completed order. Delivery confirmation closes the production cycle, with options for returns or post-delivery feedback.

• Cancelled – The order is terminated due to client request, stock issues, production challenges, or business decisions. Items may be reworked, returned to inventory, or removed entirely.

This workflow ensures transparency, accountability, and accurate real-time tracking for every stakeholder.

7. Production Stage Tracking  
The system provides granular tracking of each production stage—Cutting, Stitching, Finishing, Packaging, and Completed. Managers update progress, timestamps, and remarks. Owners and admins can monitor factory output, workload distribution, and unit efficiency through the dashboard.

8. Unified Operations Monitoring  
Owners can view performance across all units they manage. Managers can update only their assigned units. Admins oversee the entire ecosystem. This role-based monitoring mirrors actual industry practices where production floors, owners, and head offices operate collaboratively.

9. Clean, User-Centric Interface  
The web app provides structured dashboards, modern UI components, and an intuitive workflow. Whether updating inventory, reviewing order progress, or supervising factory operations, users can perform tasks efficiently without relying on manual paperwork.

With its structured roles, clear workflow, and real-time visibility, this system transforms garment manufacturing operations into an organized, traceable, and scalable digital ecosystem—ideal for production units, textile businesses, and apparel brands.
      `,

      features: [
        {
          title: "Role-Based System",
          description:
            "Clear separation of Admin, Owner, and Unit Manager responsibilities for secure and efficient operations.",
          iconUrl: "",
        },
        {
          title: "Multi-Unit Management",
          description:
            "Owners can create and manage multiple production units with assigned managers.",
          iconUrl: "",
        },
        {
          title: "Inventory Tracking",
          description:
            "Monitor fabrics, trims, accessories, reorder levels, and consumption across units.",
          iconUrl: "",
        },
        {
          title: "Complete Order Workflow",
          description:
            "Follow orders from creation through production, quality check, shipping, and delivery.",
          iconUrl: "",
        },
        {
          title: "Production Stage Monitoring",
          description:
            "Track cutting, stitching, finishing, packaging, and completion stages with progress updates.",
          iconUrl: "",
        },
      ],

      screenshots: [
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904021/Screen_-_01_r8eixz.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904051/Screen_-_02_whumzu.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904078/Screen_-_03_v769ph.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904112/Screen_-_04_dmuq1a.png",
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763904143/Screen_-_05_jskbiw.png",
      ],

      bannerImage:
        "https://res.cloudinary.com/dsoi84tie/image/upload/v1763974468/Garments_ivtpo8.png",

      platformDetails: {
        webUrl: "https://iwsoftgarments.shop/",
        playStoreUrl: "",
        iosAppUrl: "",
      },

      isActive: true,
    };

    await CompanyProduct.create(productData);

    console.log("Garments & Textiles product seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeder Error:", err);
    process.exit(1);
  }
}

seedGarmentsProduct();
