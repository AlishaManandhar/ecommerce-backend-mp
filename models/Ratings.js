const mongoose = require("mongoose")


const ratingSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ratings: {
        type: Number,
        required: true,
        enum:[1,2,3,4,5]
    },
    description: {
        type: String
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order"
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ratings"
    }

   
    
}, {timestamps: true})

const Rating = mongoose.model("Rating", ratingSchema )
module.exports.Rating = Rating
