const { Cart } = require("../models/Cart")

module.exports.addProduct = async (req, res) => {
    try {
        const { productId, quantity, color, size, userId } = req.body
        console.log(req.body)
        let cart = await Cart.findOne({ userId, productId, color, size})
        if (cart)
        {
            cart.quantity = quantity
            cart.status = "active"

        }
        else
        {
            cart = new Cart({
                productId,
                quantity,
                color,
                size,
                userId,
                status:"active"
            })
        }

        await cart.save()

        res.status(200).send({
            message:"Product added to cart"
        })



    } catch (error) {
        res.status(400).send(error)
    }


}


module.exports.getCart = async (req, res) => {
    try {

        let cart = await Cart.find({ userId: req.body.userId, status:"active" }).populate("productId",["name", "dimensions", "regularPrice","discountPercentage","frontImage"]).sort({createdAt:'desc'})

        res.status(200).send({data: cart})

    } catch (error) {
        res.status(400).send(error)
    }

}


module.exports.editCart = async (req, res) => {
    try {

        const { productId, quantity,  userId } = req.body
        let cart = await Cart.findOne({ userId,_id: req.params.id})
        console.log(req.body)
        cart.quantity = quantity
        await cart.save()
        
        res.status(201).send({ msg: "Cart Quantity Updated" })

    } catch (error) {
        res.status(400).send(error)
    }

}


module.exports.deleteProduct = async (req, res) => {
    try {

        
        let cart = await Cart.findOne({userId:req.body.userId, _id: req.params.id })
        if(cart)
        {
            cart.status="deleted"
            await cart.save()
            res.status(200).send({ msg: "Product removed from cart" })
        }
        else
        {
            res.status(400).send({ message: "Cart doesnt exist" })
        }
        

    } catch (error) {
        res.status(400).send(error)
    }



}