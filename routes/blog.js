const express = require("express")
const {createBlog,editBlog,deleteBlog,getBlog,getBlogs} = require("../controller/blogController")
const {verifyToken,verifyTokenAndAdmin} = require("../middlewares/auth")
const router = new express.Router()


router.get("/", getBlogs)
router.get("/:id", getBlog)
router.post("/",verifyTokenAndAdmin, createBlog)
router.put("/:id",verifyTokenAndAdmin,editBlog)
router.delete("/:id",verifyTokenAndAdmin,deleteBlog)

module.exports = router
