const express = require("express")
const router =  new express.Router()
const {createCategory,getCategories, getCategory,editCategory,deleteCategory} = require("../controller/categoryController")
const { verifyTokenAndAdmin} = require("../middlewares/auth")


router.post("/",verifyTokenAndAdmin,createCategory)
router.put("/:id",verifyTokenAndAdmin,editCategory)
router.get("/",getCategories)
router.get("/:id",getCategory)
router.delete("/:id",verifyTokenAndAdmin,deleteCategory)

module.exports = router