const Product = require("../models/Product");

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateStock = async (
  req,
  res
) => {
  try {
    const {
      productId,
      quantity,
    } = req.body;

    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      return res
        .status(404)
        .json({
          message:
            "Product not found",
        });
    }

    product.stock =
      product.stock -
      quantity;

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// Add Product
const addProduct = async (req, res) => {
  try {
    const product =
      await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Delete Product
const deleteProduct =
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};