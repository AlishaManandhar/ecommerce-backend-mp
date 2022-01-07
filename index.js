require("./databaseConnection")
const express = require("express")
const cors = require("cors")
const roleRoute = require("./routes/role");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const categoryRoute = require("./routes/category");
const subCategoryRoute = require("./routes/subCategory");
const blogRoute = require("./routes/blog");

// const enquiryRoute = require("./routes/enquiry");
const productRoute = require("./routes/product");
const wishlistRoute = require("./routes/wishlist");
const cartRoute = require("./routes/cart");
const app = express()
const fileUpload = require("express-fileupload")
app.use(
    fileUpload({
        createParentPath:true,
        preserveExtension:true
    })
  );

app.use(express.json())
app.use(cors())
app.use(express.static('uploads/'))

app.use("/api/role",roleRoute)
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/sub-category",subCategoryRoute)
app.use("/api/blog",blogRoute)

// app.use("/api/enquiry",enquiryRoute)
app.use("/api/product",productRoute)
app.use("/api/wishlist",wishlistRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)




app.listen(5000, () =>{
    console.log("Server is up on port 5000")
})