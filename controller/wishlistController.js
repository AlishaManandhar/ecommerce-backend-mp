const { Wishlist } = require("../models/Wishlist")

module.exports.addProduct = async (req, res) => {
    try {
        const { productId, quantity, color, size, userId } = req.body
        let wishlist = await Wishlist.findOne({ userId: req.body.userId, productId, color,size})
        if (wishlist)
        {
            wishlist.quantity = quantity
        }
        else
        {
            wishlist = new Wishlist({
                productId,
                quantity,
                color,
                size,
                userId
            })
        }

        await wishlist.save()

        res.status(200).send({
            message:"Product added to wishlist"
        })



    } catch (error) {
        res.status(400).send(error)
    }


}


module.exports.getWishlist = async (req, res) => {
    try {

        let wishlist = await Wishlist.find({ userId: req.body.userId }).populate("productId",["name", "dimensions"])

        res.status(200).send({data: wishlist})

    } catch (error) {
        res.status(400).send(error)
    }

}


module.exports.editWishlist = async (req, res) => {
    try {

        const { productId, quantity, color, size, userId } = req.body
        let wishlist = await Wishlist.findOne({ userId, productId, color,size})
        
        
        wishlist.quantity = quantity
        await wishlist.save()
        res.status(200).send({ message: "Wishlist Updated" })

    } catch (error) {
        res.status(400).send(error)
    }

}


module.exports.deleteProduct = async (req, res) => {
    try {

        await Wishlist.findByIdAndDelete(req.params.id)

        res.status(200).send({ message: "Deleted Successfully" })

    } catch (error) {
        res.status(400).send(error)
    }

    


}