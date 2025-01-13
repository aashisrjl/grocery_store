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
