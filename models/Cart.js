const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
      // enum: ["0-3m", "3-6m","6-9m","9-12m","12-15m", "15-18m","18-21m","21-24m", "New Born", "2 years","3 years"]
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "deleted", "checkout"]
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports.Cart = Cart;
