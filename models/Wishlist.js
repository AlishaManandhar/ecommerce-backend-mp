const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserId is required",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Product is required",
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true,
      // enum: ["0-3m", "3-6m","6-9m","9-12m","12-15m", "15-18m","18-21m","21-24m", "New Born", "2 years","3 years"]
    }
    
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports.Wishlist = Wishlist;
