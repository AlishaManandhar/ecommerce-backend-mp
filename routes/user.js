const express = require("express")
const router =  new express.Router()
const {changeName,changeContact,changeEmail, changePassword} = require("../controller/userController")
const {verifyToken} = require("../middlewares/auth")


router.put("/changename",verifyToken,changeName)
router.put("/changecontact",verifyToken,changeContact)
router.put("/changeemail",verifyToken,changeEmail)
router.put("/changepassword",verifyToken,changePassword)


module.exports = router