const mongoose = require("mongoose")



const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
   
    // locationType: {
    //         type: String,
    //         required: true,
    //         enum: ["Home", "Office"]
    //     },
    firstname: {
        type:String,
        required: "Firstname is required"
    },
    lastname: {
        type: String,
        required: "Lastname is required"
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    province: {
            type: Number,
            required: true,
        //     enum: [1,2,3,4,5,6,7]
    },
    city: {
            type: String,
            required: true
    },
    address: {
            type: String,
            required: true
    },
    area: {
            type: String,
            required: true
    },
   
    orderStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Shipped", "Processing", "Cancelled"]
    },
    total: {
        type: Number,
        required: true
    },
    coupon:{
            type:mongoose.Schema.Types.ObjectId,
            default: null,
            ref: "Coupon"
    },
    shippingPrice: {
            type: Number,
            required: true
    }
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema )
module.exports.Order = Order
