const mongoose = require("mongoose")

// const productImageScheme = new mongoose.Schema({
//     color:{
//         type: String,
//         required: "Color name is required",
//         trim:true
//     },
//     image:{
//         type: [String],
//         required: "Image is required",
//         trim: true
//     }
// }, {_id:false})

const productColorScheme = new mongoose.Schema({
    color:{
        type: String,
        required: true
    }, 
    quantity: {
        type: Number,
        required: true
    }
    
}, {_id:false})


const productDetailSchema = new mongoose.Schema({
        size: {
            type: String,
            required: "Size is required"
        },
        variations: 
        {
            type: [productColorScheme],
            required: true
        }
    }, {_id:false}
)

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Product name is required",
    },
    description: {
        type: String,
        required: "Description is required"
    },
    regularPrice: {
        type: Number,
        required: "Price is required",
        min: 0
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    material: {
        type: String,
        required: "Material Type is required",
    },
    warranty: {
        type: String,
        // enum: ["7 days", "14 days","1 month", "3 month",  "6 month","1 year", "2 year", "No warranty"],
        // default: "7 days"
        required: true
    },
    isSale :{
        type:Boolean,
        required:true
    },
    // highlights: {
    //     type: [String],
    //     default: []
    // },
    status: {
        type: String,
        default: "Available",
        enum: ["Available", "Out Of Stock", "UnAvailable"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Category Type is required",
        ref: "SubCategory"
    },
    
    tags:{
        type: [String],
        required: "Tags are required",
    },
    gender: {
        type: String,
        // enum: ["Boys", "Girls", "Unisex"],
        required: "Gender Type is required"
    },
    images: {
        type: [String],
        required: true
    },
    frontImage: {
        type: String,
        required: true
    },
    dimensions: {
        type: [productDetailSchema],
        required: true
    }
   
}, {timestamps: true})

productSchema.methods.toJSON = function () {
    const product = this
    const productObject = product.toObject()

    return productObject

}
const Product = mongoose.model("Product", productSchema)
module.exports.Product = Product
