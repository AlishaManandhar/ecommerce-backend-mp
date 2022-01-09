const express = require("express")
const router =  new express.Router()
const {addProduct, getProducts, getProduct, editProduct,editProductFrontImage, deleteProduct} = require("../controller/productController")
const { verifyTokenAndAdmin} = require("../middlewares/auth")


router.post("/",verifyTokenAndAdmin,addProduct)
router.get("/",getProducts)
router.get("/:id",getProduct)
router.put("/:id",verifyTokenAndAdmin,editProduct)
router.put("/delete/:id",verifyTokenAndAdmin,deleteProduct)
router.put("/image/:id",verifyTokenAndAdmin,editProductFrontImage)



module.exports = router