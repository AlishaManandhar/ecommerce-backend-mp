const mongoose = require("mongoose")


const orderProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Product"
    },
    quantity: {
        type: Number,
        required: true
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Order"
    },
    color: {
        type: String,
        required:  true
    },
    size:{
        type: String,
        required: true
    }
    
}, {timestamps: true})

const OrderProduct = mongoose.model("OrderProduct", orderProductSchema)
module.exports. OrderProduct =  OrderProduct
