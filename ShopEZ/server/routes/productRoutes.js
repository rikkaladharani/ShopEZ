const express = require("express");

const router = express.Router();

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");

router.get("/", getProducts);

router.put(
  "/stock",
  updateStock
);

module.exports = router;

router.post("/", addProduct);

router.put(
  "/:id",
  updateProduct
);

router.delete(
  "/:id",
  deleteProduct
);

router.get(
  "/",
  getProducts
);

router.put(
  "/stock",
  updateStock
);

module.exports = router;