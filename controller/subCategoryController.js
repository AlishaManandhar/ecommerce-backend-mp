const { SubCategory } = require("../models/SubCategory")
const {Product} = require("../models/Product")
module.exports.createSubCategory = async (req, res) => {

    try {
        let  category = await SubCategory.findOne({subCategoryName: req.body.subCategoryName.trim()});
        if (category)
        {
          res.status(400).send({message: `${ req.body.subCategoryName.trim()} already exists`})
        }
        else{
            const subCategoryName = req.body.subCategoryName.trim()
            const parentCategoryId = req.body.parentCategoryId
            const subCategory = new SubCategory({subCategoryName, parentCategoryId})    
            await subCategory.save()
            res.status(200).send({ message: "SubCategory Added" })
        }
        

    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.getSubCategories = async (req, res) => {
    try {

        const categories = await SubCategory.find({status:true}).lean().populate("parentCategoryId","categoryName")
        res.status(200).send({data: categories})

    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.getSubCategory = async (req, res) => {
    try {

        const categories = await SubCategory.findById(req.params.id).lean().populate("parentCategoryId","categoryName")
        res.status(200).send({data: categories})

    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.getSubCategoryByParent = async (req, res) => {
    try {

        const categories = await SubCategory.find({parentCategoryId:req.params.id, status:true})
        res.status(200).send({data: categories})

    }
    catch (err) {
        res.status(400).send(err)
    }

}



module.exports.editCategory = async (req, res) => {


    try {
        const category = await SubCategory.findById(req.params.id)
        if (!category)
        {
            res.status(400).send({error: "Invalid category"})
        }

        let duplicate = await SubCategory.findOne({subCategoryName: req.body.subCategoryName.trim()});
        if (duplicate && (duplicate.subCategoryName !== category.subCategoryName) )
        {
        res.status(400).send({error: "SubCategory Already Exists"})
        }
        const subCategoryName = req.body.subCategoryName.trim()
        category.subCategoryName = subCategoryName
        category.parentCategoryId = req.body.parentCategoryId
        
        await category.save()

        res.status(200).send({message: "SubCategory Edited" })

    }
    catch (err) {
        res.status(400).send(err)
    }

}


module.exports.deleteCategory = async (req, res) => {


    try {
        const category = await SubCategory.findById(req.params.id);
        let message;
        if (!category) {
        res.status(400).send({ error: "Invalid category" });
        }
        const products = await Product.find({categoryId: req.params.id})
        if (products.length === 0)
        {
            await SubCategory.findByIdAndDelete(req.params.id)
            message= `${category.subCategoryName} deleted`
            res.status(200).send({  message });
        }
        else
        {
            message = `Product already exists for ${category.subCategoryName}`
            res.status(400).send({error: message})
        }
    
    }
    catch (err) {
        res.status(400).send(err)
    }

}


