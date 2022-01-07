const mongoose = require("mongoose")


const subCategorySchema = new mongoose.Schema({
    subCategoryName: {
        type: String,
        required: "Category name required",
        unique: true,
        trim: true
    },
    parentCategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",

        required: "Object d required"
    }
}, {timestamps: true})

const SubCategory = mongoose.model("SubCategory", subCategorySchema)
module.exports.SubCategory = SubCategory
