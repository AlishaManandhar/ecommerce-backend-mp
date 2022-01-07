const express = require("express")
const router =  new express.Router()
const {createOrder, getOrder, getOrderProducts, processOrder, deliverOrder, cancelOrder} = require("../controller/orderController")
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/auth")


router.post("/",verifyToken,createOrder)
router.put("/process/:id",verifyTokenAndAdmin,processOrder)
router.put("/deliver/:id",verifyTokenAndAdmin,deliverOrder)
router.put("/cancel/:id",verifyToken,cancelOrder)
router.get("/",verifyToken,getOrder)
router.get("/order-products/:id",verifyToken,getOrderProducts)


module.exports = router