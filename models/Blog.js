const mongoose = require("mongoose")

const blogSchema = new  mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required: "Title is required"
    },
    content:{
        type: String,
        required: "Content is required"
    },
    frontImage:{
        type:String,
        default: "FrontImage is Image"
    },
    tags:{
        type:[String],
        required:"Tags are required"
    }
},{timestamps:true})

module.exports.Blog = mongoose.model("Blog", blogSchema) 