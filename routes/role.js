const express = require("express")
const {getRoles,createRole,editRole,deleteRole}  = require("../controller/roleController")


const router =  new express.Router()

router.get("/",getRoles)
router.post("/",createRole)
router.put("/:id",editRole)
router.delete("/:id", deleteRole)

module.exports = router