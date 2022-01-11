const express = require("express")
const router =  new express.Router()
const {deleteProduct,addProduct,editWishlist,getWishlist} = require("../controller/wishlistController")
const {verifyToken} = require("../middlewares/auth")


router.post("/",verifyToken,addProduct)
router.put("/:id",verifyToken,editWishlist)
router.delete("/:id", verifyToken,deleteProduct)
router.get("/",verifyToken,getWishlist)

module.exports = router