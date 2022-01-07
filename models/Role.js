const mongoose = require("mongoose")


const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["client", "admin", "product-adder", "delivery-worker"],
        unique: true,
        required: "Role is required",
        lowerCase: true,
        trim:true
    }
    
}, {timestamps: true})

const Role = mongoose.model("Role", roleSchema)
module.exports.Role = Role
