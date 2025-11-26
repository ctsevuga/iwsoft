import express from "express";
import {
  getContactMessages,
  createContactMessage,
  getContactMessageById,
  deleteContactMessage
} from "../controllers/contactMessageController.js";

const router = express.Router();

// List all messages
router.post("/list", getContactMessages);

// Create a new message
router.post("/", createContactMessage);

// Get one message by ID
router.get("/:id", getContactMessageById);

// Delete message
router.delete("/:id", deleteContactMessage);

export default router;
