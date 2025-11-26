import express from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  getProductsSummary,
  getProductBySlug,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();
router.get("/summary", getProductsSummary);
router.get('/:slug', getProductBySlug);
// Public product APIs

router.get("/", getProducts);


router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
