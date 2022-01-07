const { Order } = require("../models/Order")
const { OrderProduct } = require("../models/OrderedProduct")
const {Cart} = require("../models/Cart")
const {Product } = require("../models/Product")
const e = require("express")
const { restart } = require("nodemon")


const getIndex = (array,color,size) => 
{
    for (let i = 0; i < array.length; i++)
    {
        if (array[i]["size"] === size)
        {
           for(let j = 0; j < array[i]["variations"].length; j++)
           {
               if (array[i]["variations"][j]["color"] ===  color)
               {
                   
                   return {
                       index: i,
                       colorIndex: j
                   }
               }
           }
        }
    }

}
module.exports.createOrder = async (req, res) => {
    try {

        const { userId,province,district, firstname, lastname,region,area } = req.body
        
        const products = await Cart.find({userId,status:"active"})
        
        let product = {}, cost = 0, price = [], data = []
        let temp = 0
        
        for(let i = 0; i < products.length; i++)
        {
            product = await Product.findOne({_id: products[i].productId})
            let {index, colorIndex} = getIndex(product.dimensions,products[i].color, products[i].size)
            
            if(product["dimensions"][index].variations[colorIndex]["color"] === products[i].color && product["dimensions"][index].variations[colorIndex]["quantity"] >= products[i].quantity)
            {
                
                data.push(product)
                temp = (product.regularPrice * products[i].quantity) - Math.floor((product.discountPercentage * product.regularPrice) / 100)
                price.push(temp)
                
                cost += temp
                data[i]["dimensions"][index].variations[colorIndex]["quantity"]-= products[i].quantity
                
            }
            else
            {
                res.status(404).send({error: `Product ${product.name} is not in sufficient quantity`})
            }
        } 
        

        if (data.length === products.length)
        {
            const shippingPrice = cost >= 1500 ? 0 : 100

            let order = new Order({
                userId,province,district, region,area, shippingPrice, total:cost, orderStatus: "Pending",firstname, lastname
            })

            order = await order.save()
       

            for(i = 0; i < data.length; i++)
            {
                let orderedProduct = new OrderProduct({
                    productName: data[i].name,
                    productId: data[i]["_id"],
                    price: price[i],
                    color: products[i].color,
                    size: products[i].size,
                    quantity: products[i].quantity,
                    orderId:order._id,
                })

                await orderedProduct.save()

            
                await data[i].save();
                products[i].status = "checkout",
                await products[i].save()
            }
            res.status(200).send("Order Saved");

            
        }
        else
        {
            res.status(401).send("jkhjkhk")
        }
    }
    catch(err)
    {
        res.status(400).send(err)
    }

        


}


module.exports.getOrder = async (req, res) => {
    try {

        let order = await Order.find({ userId: req.body.userId }).sort({createdAt:'asc'})
        res.status(200).send({data: order})

    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports.getOrderProducts = async (req, res) => {
    try {

        let orderProducts = await OrderProduct.find({orderId:req.params.id} )
        res.status(200).send({data: orderProducts})

    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports.processOrder = async (req, res) => {
    try {

        let order = await Order.findById(req.params.id)
        order.orderStatus = "Processing"
        await order.save()

        res.status(200).send({message:"Order modified", order})

    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports.deliverOrder = async (req, res) => {
    try {

        let order = await Order.findById(req.params.id)
        order.orderStatus = "Shipped"
        await order.save()

        res.status(200).send({message:"Order Delivered", order})

    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports.editCart = async (req, res) => {
    try {

        const { productId, quantity, color, size, userId } = req.body
        let cart = await Cart.findOne({ userId, productId, color,size})
        
        cart.quantity = quantity
        await cart.save()
        res.status(200).send({ message: "Cart Updated" })

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
            res.status(200).send({ message: "Product removed from cart" })
        }
        else
        {
            res.status(400).send({ message: "Cart doesnt exist" })
        }
        

    } catch (error) {
        res.status(400).send(error)
    }



}

module.exports.cancelOrder = async (req, res) => {
    try {

       
        const order = await Order.findOne({_id:req.params.id, userId: req.body.userId}) 
     

        const products = await OrderProduct.find({orderId: order._id})
        
        let product = {},data = []
        
        for(let i = 0; i < products.length; i++)
        {
            product = await Product.findOne({_id: products[i].productId})
            let {index, colorIndex} = getIndex(product.dimensions,products[i].color, products[i].size)
            
            if(product["dimensions"][index].variations[colorIndex]["color"] === products[i].color && product["dimensions"][index].variations[colorIndex]["quantity"] >= products[i].quantity)
            {
                
                data.push(product)
                data[i]["dimensions"][index].variations[colorIndex]["quantity"] += products[i].quantity
                
            }
            else
            {
                res.status(404).send({error: `System error`})
            }
        } 
        

        if (data.length === products.length)
        {
            order.orderStatus = "Cancelled"
 
            await order.save()
       

            for(i = 0; i < data.length; i++)
            {
                await data[i].save();
            }
            res.status(200).send({order});

            
        }
        else
        {
            res.status(401).send("Error")
        }
    }
    catch(err)
    {
        res.status(400).send("Hi")
    }

        


}
