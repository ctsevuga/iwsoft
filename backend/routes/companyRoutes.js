import express from "express";
import {
  getCompany,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
} from "../controllers/companyController.js";

const router = express.Router();

// Public endpoints (no auth)
router.get("/", getCompany);                // Get first company
router.post("/", createCompany);            // Create new company
router.get("/:id", getCompanyById);         // Get by ID
router.put("/:id", updateCompany);          // Update company
router.delete("/:id", deleteCompany);       // Delete company

export default router;
