const mongoose = require("mongoose")


const couponSchema = new mongoose.Schema({
    users: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        collectedAt: {
            type:Date,
            required:true
        },
        isUsed:{
            type: Boolean,
            required:true
        }
    }],
    code: {
            type: String,
            required: true,
        },
    value: {
            type: Number,
            default: 0
    },
    isPercentage: {
        type:Boolean,
        default: null
    },
    description: {
            type: String,
            required: true
    },
    startDate: {
            type: Date,
            required: true
    },
    endDate:{
        type:Date,
        required:true
    },
    validity:{
        type: Number,
        required:true
    }
    
    
}, {timestamps: true})

const Coupon = mongoose.model("Coupon", couponSchema )
module.exports.Coupon = Coupon
