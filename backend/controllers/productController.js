import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";


// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

const getProductsSummary = async (req, res) => {
  try {
    const products = await Product.find(
      { isActive: true },
      "name  slug shortDescription bannerImage" // only select these fields
    ).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// @desc    Create a product
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      shortDescription,
      longDescription,
      features,
      screenshots,
      bannerImage,
      platformDetails,
      isActive
    } = req.body;

    const newProduct = new Product({
      name,
      slug,
      category,
      shortDescription,
      longDescription,
      features,
      screenshots,
      bannerImage,
      platformDetails,
      isActive
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error while creating product." });
  }
});


// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error("Invalid product ID format");
  }

  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


// @desc    Update product (all fields)
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const {
      name,
      slug,
      category,
      shortDescription,
      longDescription,
      features,
      screenshots,
      bannerImage,
      platformDetails,
      isActive
    } = req.body;

    product.name = name || product.name;
    product.slug = slug || product.slug;
    product.category = category || product.category;
    product.shortDescription = shortDescription || product.shortDescription;
    product.longDescription = longDescription || product.longDescription;
    product.features = features || product.features;
    product.screenshots = screenshots || product.screenshots;
    product.bannerImage = bannerImage || product.bannerImage;
    product.platformDetails = platformDetails || product.platformDetails;
    product.isActive = isActive ?? product.isActive;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Server error while updating product." });
  }
});
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);

    if (!slug) {
      return res.status(400).json({ message: "Product slug is required" });
    }

    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);

  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error("Invalid product ID format");
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error while deleting product." });
  }
});


export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  getProductsSummary,
  getProductBySlug,
  deleteProduct
};
