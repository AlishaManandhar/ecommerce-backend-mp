const express = require("express")
const router =  new express.Router()
const {createSubCategory, editCategory, getSubCategories, deleteCategory, getSubCategoryByParent, getSubCategory} = require("../controller/subCategoryController")
const { verifyTokenAndAdmin} = require("../middlewares/auth")


router.post("/",verifyTokenAndAdmin,createSubCategory)
router.put("/:id",verifyTokenAndAdmin,editCategory)
router.get("/",getSubCategories)
router.get("/:id",getSubCategory)

router.get("/parent/:id",getSubCategoryByParent)
router.delete("/:id",verifyTokenAndAdmin,deleteCategory)

module.exports = router