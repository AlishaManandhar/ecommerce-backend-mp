const express = require("express")
const router =  new express.Router()
const {createOrder, getOrder, getOrderProducts, processOrder, deliverOrder, cancelOrder, getOrders, getMyOrderProducts} = require("../controller/orderController")
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/auth")


router.post("/",verifyToken,createOrder)
router.put("/process/:id",verifyTokenAndAdmin,processOrder)
router.put("/deliver/:id",verifyTokenAndAdmin,deliverOrder)
router.put("/cancel/:id",verifyToken,cancelOrder)
router.get("/my-order",verifyToken,getOrder)
router.get("/",verifyToken,getOrders)
router.get("/order-products/:id",verifyToken,getOrderProducts)
router.get("/myorder-products/:id",verifyToken,getMyOrderProducts)


module.exports = router