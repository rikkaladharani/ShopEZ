const Order =
  require("../models/Order");

const Product =
  require("../models/Product");

const createOrder =
  async (req, res) => {
    try {
      const {
        items,
      } = req.body;

      // Check stock
      for (const item of items) {
        const product =
          await Product.findById(
            item._id
          );

        if (!product) {
          return res
            .status(404)
            .json({
              message:
                `${item.name} not found`,
            });
        }

        if (
          product.stock <
          item.quantity
        ) {
          return res
            .status(400)
            .json({
              message: `Only ${product.stock} units available for ${product.name}`,
            });
        }
      }

      // Deduct stock
      for (const item of items) {
        await Product.findByIdAndUpdate(
          item._id,
          {
            $inc: {
              stock:
                -item.quantity,
            },
          }
        );
      }

      // Save order
      const order =
        await Order.create(
          req.body
        );

      res.status(201).json(
        order
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getOrders =
  async (req, res) => {
    try {
      const orders =
        await Order.find();

      res.json(orders);
    } catch (error) {
  console.log("ORDER ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
  };

module.exports = {
  createOrder,
  getOrders,
};