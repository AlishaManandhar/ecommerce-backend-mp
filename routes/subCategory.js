const express = require("express")
const router =  new express.Router()
const {createSubCategory, editCategory, getSubCategories, deleteCategory, getSubCategoryByParent, getSubCategory} = require("../controller/subCategoryController")
const { verifyTokenAndAdmin} = require("../middlewares/auth")


router.post("/",verifyTokenAndAdmin,createSubCategory)
router.put("/:id",verifyTokenAndAdmin,editCategory)
router.get("/",verifyToken,getSubCategories)
router.get("/:id",verifyToken,getSubCategory)

router.get("/parent/:id",verifyToken,getSubCategoryByParent)
router.delete("/:id",verifyTokenAndAdmin,deleteCategory)

module.exports = router