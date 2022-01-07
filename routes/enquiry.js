const express = require("express")
const router =  new express.Router()
const {addEnquiry, getEnquiries, editEnquiry} = require("../controller/enquiryController")
const { verifyToken } = require("../middlewares/auth")


router.post("/",verifyToken,addEnquiry)
router.put("/:id",verifyToken,editEnquiry)
router.get("/:id",verifyToken,getEnquiries)


module.exports = router