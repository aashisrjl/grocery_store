const { default: axios } = require("axios");
const { orderDetails, payment, order } = require("../models");

exports.createOrder = async(req,res)=>{
    const userId = req?.userId
     const {phoneNumber,shippingAddress,totalAmount,orderStatus,paymentMethod,items} = req.body

    const products = await product.findOne({
        where:{
            id:productId
        }
    });

    if(!products){
        return res.status(404).json({message:"Product not found"})
    }

    const paymentData = await payment.create({
        paymentMethod
    })

    const OrderData = await order.create({
        userId,
        phoneNumber,
        shippingAddress,
        totalAmount,
        paymentId:paymentData.id,
    })

    let responseOrderData;
    for(var i=0;i<items.length; i++){
        responseOrderData = await orderDetails.create({
            quantity: items[i].quantity,
            productId: items[i].productId,
            orderId: OrderData.id
        })

    }

    if(!responseOrderData){
        return res.status(400).json({
            message:"Order create unsuccessfull"
        })
    }


    if(paymentMethod === 'khalti'){

    }

    if(paymentMethod === 'esewa'){

    }
}

exports.verifyPayment = async(req,res)=>{

    const {pidx} = req.body
    const userId = req?.userId
    if(!pidx){
        return res.status(400).json({
            message:"Payment id is required"
        })
    }
    const response = axios.post('khalti url',{pidx},{
        headers:{
            "Authorization": "key yourkhaltikey"
        }
    })

    const data = response.data
    if(data.status === 'complete'){
        await payment.update({
            paymentStatus: "paid"
        },{
            where:{
                pidx
            }
        })
        res.status(200).json({
            message: "payment verified"
        })
    }else{
        res.status(400).json({
            message: "payment not verified"
        })
    }
}