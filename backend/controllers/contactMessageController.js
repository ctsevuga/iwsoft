import asyncHandler from "../middleware/asyncHandler.js";
import ContactMessage from "../models/ContactMessage.js";

// @desc    Get all contact messages
// @route   GET /api/contact-messages
// @access  Public
const getContactMessages = asyncHandler(async (req, res) => {
  try {
    const { code } = req.body;

    // The correct security code
    const correctCode = "2808";

    // Validate existence
    if (!code) {
      return res.status(400).json({ message: "Security code is required." });
    }

    // Validate correctness
    if (code !== correctCode) {
      return res.status(401).json({ message: "Invalid security code. Access denied." });
    }

    // If code matches → fetch messages
    const messages = await ContactMessage.find({})
      .populate("productInterest", "name category slug")
      .sort({ createdAt: -1 });

    res.status(200).json(messages);

  } catch (error) {
    console.error("Error fetching contact messages:", error.message);
    res.status(500).json({
      message: "Server error while fetching contact messages."
    });
  }
});



// @desc    Create a new contact message
// @route   POST /api/contact-messages
// @access  Public
const createContactMessage = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, message, productInterest } = req.body;

    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
      productInterest
    });

    const createdMessage = await contactMessage.save();

    res.status(201).json(createdMessage);
  } catch (error) {
    console.error("Error creating contact message:", error.message);
    res.status(500).json({ message: "Server error while creating contact message." });
  }
});


// @desc    Get contact message by ID
// @route   GET /api/contact-messages/:id
// @access  Public
const getContactMessageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error("Invalid message ID format");
  }

  const message = await ContactMessage.findById(id).populate(
    "productInterest",
    "name category slug"
  );

  if (message) {
    res.json(message);
  } else {
    res.status(404);
    throw new Error("Contact message not found");
  }
});


// @desc    Delete a contact message
// @route   DELETE /api/contact-messages/:id
// @access  Public
const deleteContactMessage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error("Invalid message ID format");
    }

    const message = await ContactMessage.findById(id);

    if (!message) {
      res.status(404);
      throw new Error("Contact message not found");
    }

    await message.deleteOne();

    res.status(200).json({ message: "Contact message deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact message:", error.message);
    res.status(500).json({ message: "Server error while deleting contact message." });
  }
});

export {
  getContactMessages,
  createContactMessage,
  getContactMessageById,
  deleteContactMessage,
};
