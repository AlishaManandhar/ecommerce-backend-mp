const express = require("express")
const router =  new express.Router()
const {addProduct,getCart,editCart,deleteProduct} = require("../controller/cartController")
const {verifyToken} = require("../middlewares/auth")


router.post("/",verifyToken,addProduct)
router.put("/:id",verifyToken,editCart)
router.put("/delete/:id", verifyToken,deleteProduct)
router.get("/",verifyToken,getCart)

module.exports = router