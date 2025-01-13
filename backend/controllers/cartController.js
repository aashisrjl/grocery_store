
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
