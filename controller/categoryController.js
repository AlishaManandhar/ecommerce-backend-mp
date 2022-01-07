const { Category } = require("../models/Category");
const {SubCategory} = require("../models/SubCategory")
module.exports.createCategory = async (req, res) => {
  try {
    let  category = await Category.findOne({categoryName: req.body.categoryName.trim()});
    if (category)
    {
      res.status(400).send({message: "Duplicate category"})
    }
    else
    {
      const categoryName = req.body.categoryName.trim();
      const category = new Category({ categoryName });
      await category.save();
      res.status(200).send({ message: "Category Added" });
    }
    

    
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: true }).lean();
    res.status(200).send({ data: categories });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id)
    res.status(200).send({ data: categories });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.editCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400).send({ error: "Invalid category" });
    }

    let duplicate = await Category.findOne({categoryName: req.body.categoryName.trim()});
    if (duplicate && (duplicate.categoryName !== category.categoryName) )
    {
       res.status(400).send({error: "Category Already Exists"})
    }

    const categoryName = req.body.categoryName.trim();
    category.categoryName = categoryName;

    await category.save();

    res.status(200).send({ message: "Category Edited" });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    
    const category = await Category.findById(req.params.id);
    let message;
    if (!category) {
      res.status(400).send({ error: "Invalid category" });
    }
    const subCategories = await SubCategory.find({parentCategoryId: req.params.id})
    if (subCategories.length === 0)
    {
      await Category.findByIdAndDelete(req.params.id)
      message= `${category.categoryName} deleted`
      res.status(200).send({  message });
    }
    else
    {
      message = `SubCategory already exists for ${category.categoryName}`
      res.status(403).send({error: message})
    }
    

    
  } catch (err) {
    res.status(400).send(err);
  }
};
