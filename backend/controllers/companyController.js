import asyncHandler from "../middleware/asyncHandler.js";
import Company from "../models/Company.js";


// @desc    Get company information (usually only 1 document)
// @route   GET /api/company
// @access  Public
const getCompany = asyncHandler(async (req, res) => {
  try {
    const company = await Company.findOne({});

    res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company:", error.message);
    res.status(500).json({ message: "Server error while fetching company" });
  }
});


// @desc    Create company details
// @route   POST /api/company
// @access  Public (you can later restrict if needed)
const createCompany = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      tagline,
      description,
      logoUrl,
      heroImageUrl,
      contact,
      socialLinks,
    } = req.body;

    const newCompany = new Company({
      name,
      tagline,
      description,
      logoUrl,
      heroImageUrl,
      contact,
      socialLinks,
    });

    const createdCompany = await newCompany.save();
    res.status(201).json(createdCompany);
  } catch (error) {
    console.error("Error creating company:", error.message);
    res.status(500).json({ message: "Server error while creating company." });
  }
});


// @desc    Get company by ID
// @route   GET /api/company/:id
// @access  Public
const getCompanyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error("Invalid company ID format");
  }

  const company = await Company.findById(id);

  if (company) {
    res.status(200).json(company);
  } else {
    res.status(404);
    throw new Error("Company not found");
  }
});


// @desc    Update company details
// @route   PUT /api/company/:id
// @access  Public
const updateCompany = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const {
      name,
      tagline,
      description,
      logoUrl,
      heroImageUrl,
      contact,
      socialLinks,
    } = req.body;

    company.name = name || company.name;
    company.tagline = tagline || company.tagline;
    company.description = description || company.description;
    company.logoUrl = logoUrl || company.logoUrl;
    company.heroImageUrl = heroImageUrl || company.heroImageUrl;
    company.contact = contact || company.contact;
    company.socialLinks = socialLinks || company.socialLinks;

    const updatedCompany = await company.save();

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error.message);
    res.status(500).json({ message: "Server error while updating company." });
  }
});


// @desc    Delete company
// @route   DELETE /api/company/:id
// @access  Public
const deleteCompany = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error("Invalid company ID format");
    }

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.deleteOne();

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error.message);
    res.status(500).json({ message: "Server error while deleting company." });
  }
});


export {
  getCompany,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
};
