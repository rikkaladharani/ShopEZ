const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
    },

    paymentMethod: {
      type: String,
    },

    shipping: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },

    shippingFee: Number,

    tax: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);