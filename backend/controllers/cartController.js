const { product, users, cart } = require("../models")


//add to cart by user
exports.addToCart = async(req,res)=>{
    const userId = req?.userId
    const {quantity ,productId} = req.body

    if(!quantity || !productId){
        return res.status(400).json({message:"Please provide all the details"})
    }

   let cartItem = await cart.findOne({
    where: {
        userId,
        productId
   }})
   if(!cartItem){
    cartItem = await cart.create({
        userId,
        productId,
        quantity
    })
    res.status(200).json({
        message:"Item added to cart",
    data: cartItem
    })
   }else{
    cartItem.quantity = cartItem.quantity + quantity
    await cartItem.save();

    res.status(200).json({
        message:"add/updated the cart",
        data: cartItem
    })
   }

}


//get cart od that user
exports.getCartItem = async(req,res)=>{
    const userId = req?.userId
    const cartItem = await cart.findAll({
        where:{
            userId
        },
        include:[{
            model:product,
            as:"productDetails"
        },
        {
            model:users,
            as:"userDetails"
        },
    {
        model: category,
        as:"categoryDetails",
        attributes:["categoryName"]
    }]
    })
    res.status(200).json({
        data:cartItem
    })

    if(!cartItem){
        return res.status(400).json({
            message:"No items in the cart for this user"
        })
    }
}

//delete cart item
exports.deleteCart = async(req,res)=>{
    const userId = req?.userId
    const productId = req.params.productId
    const product = await product.findByPk(productId);
    if(!product){
        return res.status(400).json({
            message:"No product found"
        })
    }
    await cart.destroy({
        where:{
            userId,
            productId
        }
    })
    res.status(200).json({
        message:"Product removed from cart"
    })  
}

//update a cart item

exports.updateCart = async(req,res)=>{
    const userId = req?.userId
    const productId = req.params.productId
    const {quantity} = req.body
    const product = await product.findByPk(productId);

    if(!product){
        return res.status(400).json({
            message:"No product found"
        })
    }
    const cartItem = await cart.findOne({
        where:{
            userId,
            productId
        }
    })

    if(!cartItem){
        return res.status(400).json({
            message:"No product found in the cart"
        })
    }
    cartItem.quantity = quantity
    await cartItem?.save();
    res.status(200).json({
        message:"Cart updated",
        data:cartItem
    })
}
