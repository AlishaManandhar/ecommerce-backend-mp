const { Product } = require("../models/Product")
const path = require("path")
const fs = require("fs")
// const validKeys = (arr) => {
//     const allowedKeys = ["name", "description", "highlights", "regularPrice", "categoryId", "discountPrice", "gender", "warranty", "material", "tags", "images", "dimensions", "status", "role","userId"]
//     const isMatch = arr.filter(key => allowedKeys.includes(key));
//     if (isMatch.length == arr.length)
//         return true
//     return false

// }
module.exports.addProduct = async (req, res) => {
    try {
   
        if (req.files) {
            let frontImage = req.files.frontImage
            let frontImageName = Date.now() + frontImage.name
            
            frontImage.mv( path.join(__dirname, "../uploads/" + frontImageName))

            let images = req.files.images
            let imageNames = []
            let filename = ""
            for(let i = 0; i < images.length; i++)
            {
                filename = Date.now()   +  images[i].name
                imageNames.push(filename)
                images[i].mv(path.join(__dirname, "../uploads/" + filename))
            }
            
            const { name, description,  isSale, regularPrice, categoryId, discountPercentage, gender, warranty, material} = req.body
            const dimensions = JSON.parse(req.body.dimensions)
      
            const product = new Product({ name, description,  isSale,regularPrice, categoryId, discountPercentage, gender, warranty, material, dimensions})
            product.images = imageNames
            product.frontImage = frontImageName
           
            await product.save()
             res.status(200).send({
                message: "Product Added",
                product
            })
        

            
        }
        else{
            res.status(400).send({error: "Please upload images"})
        }
            
        
       

    
    } catch (error) {
        res.status(400).send({data: "Hiii"})
    }


}

module.exports.getProducts = async (req, res) => {
    try {
        let products;
        if (req.query.category || req.query.sale)
        {
            
            if(req.query.category)
            {
                products = await Product.find({categoryId:req.query.category, status: "Available"})

            }
            else if (req.query.sale)
            {
                products = await Product.find({isSale:req.query.sale, status: "Available"})
            }
        }
        else
        {
            products = await Product.find({status: "Available"}).sort({name: 'asc', discountPercentage: 'asc', regularPrice:'desc'})
        }
 
        res.status(200).send({
            data: products
        })



    } catch (error) {
        res.status(400).send(error)
    }


}

module.exports.getProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id).populate("categoryId","subCategoryName")
        if (!product) res.status(400).send({error: "No Product found"})
        else
        res.status(200).send({
            data: product
        })
        
    } catch (error) {
        res.status(400).send(error)
    }


}



module.exports.editProduct = async (req, res) => {
    try {
        delete req.body.userId
        delete req.body.role
        
        const dimensions = JSON.parse(req.body.dimensions)
        delete req.body.dimensions
        let product = await Product.findById(req.params.id)
        if (!product)  return res.status(400).send({error: "No Product found"})
        else
        {
            // const updatedProduct = await Product.findByIdAndUpdate(
            //     req.params.id,
            //     {
            //       $set: req.body,
            //     },
            //     { new: true }
            //   );
            
            for (let key in req.body) {
                product[key] = req.body[key]
              }
              product["dimensions"] = dimensions
            await product.save()
            res.status(200).send({message: "Product Updated"})
        }



    } catch (error) {
        return res.status(400).send(error)
    }


}

module.exports.editProductFrontImage = async (req, res) => {
    try {
        delete req.body.userId
        delete req.body.role
        if (req.files.frontImage)
        {
            let product = await Product.findById(req.params.id)
            if (!product)  
                return res.status(400).send({error: "No Product found"})

            let frontImage = req.files.frontImage
            let frontImageName = Date.now() + frontImage.name
            frontImage.mv( path.join(__dirname, "../uploads/" + frontImageName))

            fs.unlinkSync(path.join(__dirname, "../uploads/" + product.frontImage))

            product.frontImage = frontImageName
            await product.save()
            res.status(200).send({message: "Product Image Updated"})

        }
        
        else
        {
            
           
            res.status(404).send({message: "Please Upload Images"})
        }



    } catch (error) {
        return res.status(400).send(error)
    }


}

module.exports.editProductImages = async (req, res) => {
    try {
        delete req.body.userId
        delete req.body.role
        if (req.files.images)
        {
            let product = await Product.findById(req.params.id)
            if (!product)  
                return res.status(400).send({error: "No Product found"})

                let images = req.files.images
                    let imageNames = []
                    let filename = ""
                    for(let i = 0; i < images.length; i++)
                    {
                        filename = Date.now()   +  images[i].name
                        imageNames.push(filename)
                        images[i].mv(path.join(__dirname, "../uploads/" + filename))
                    }
            for(let i = 0; i < products.images.length; i++)
            {
                fs.unlinkSync(path.join(__dirname, "../uploads/" + product.images[i]))
            }
            

            product.images = imageNames
            await product.save()
            res.status(200).send({message: "Product Image Updated"})


        }
        
        else
        {
            res.status(404).send({message: "Please Upload Images"})

        }



    } catch (error) {
        return res.status(400).send(error)
    }


}

module.exports.deleteProduct = async (req, res) => {
    try {
       
        let product = await Product.findById(req.params.id)
        if (!product)  return res.status(400).send({error: "No Product found"})
        else
        {
            product.status = "UnAvailable"
            await product.save()
            res.status(200).send({message: "Product Deleted"})
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

