const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orders: [
    {
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
        },
      ],
      price: { type: Number, min: 0 },
      createdAt: { type: Date, default: Date.now},
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
