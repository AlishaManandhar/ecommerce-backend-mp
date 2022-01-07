const mongoose = require("mongoose")


const enquirySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "ProductId is required",
        ref: "Product"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "UserId is required",
        ref: "User"
    },
    
    content: {
        type: String,
        required:"Message is required"
    },

    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enquiry",
        default:null
    }

}, {timestamps: true})

const Enquiry = mongoose.model("Enquiry", enquirySchema )
module.exports.Enquiry = Enquiry
