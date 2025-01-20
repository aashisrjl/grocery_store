const { default: axios } = require("axios");
const { orderDetails, payment, order, users } = require("../models");

exports.createOrder = async(req,res)=>{
    const userId = req?.userId
     const {phoneNumber,shippingAddress,totalAmount,paymentMethod,items} = req.body

   if(!phoneNumber || !shippingAddress || !totalAmount || !paymentMethod || !items){
    return res.status(400).json({
        message: "all fields are required"
    })
   }
   const userData = await users.findByPk(userId);

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
    res.status(200).json({
        message: "order created with cod"
    })


    if(paymentMethod === 'khalti'){
        const data ={
            return_url: "http://localhost:3000/success-khalti",
            cancel_url: "http://localhost:3000/cancel-khalti",
            purchase_order_id: OrderData.id,
            amount: totalAmount *100,
            website_url: "http://localhost:3000",
            purchase_order_name: "orderName_"+ OrderData.id,
            customer_info:{
                name: userData.username,
                email: userData.email,
                phone: userData?.phone 
            }
        }

        const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
            headers:{
                "Authorization": "key dbae3da99710442a83d9068ff967b2ed",
                "Content-Type": "application/json"
            }
        })
        const khaltiResponse = response.data
        paymentData.pidx = khaltiResponse.pidx
        paymentData.save();
        res.status(200).json({
            message: "order placed successs by khalti",
            url: khaltiResponse.payment_url,
            
        })

    }

    if (paymentMethod === 'esewa') {
        const data = {
            amt: totalAmount, 
            psc: 0, 
            pdc: 0, 
            txAmt: 0, 
            tAmt: totalAmount, 
            pid: "order_" + OrderData.id, 
            scd: "EPAYTEST", 
            su: "http://localhost:3000/success-esewa", 
            fu: "http://localhost:3000/failure-esewa",
            //userinfo
            cusid: userData.id,
            cusname: userData.username,
            cusemail: userData.email,
            cusphone: userData?.phone
        };
    
        const esewaUrl = "https://uat.esewa.com.np/epay/main";
    
        // Constructing a query string from the data object
        const queryString = Object.keys(data)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join("&");
    
        const paymentUrl = `${esewaUrl}?${queryString}`;
    
        res.status(200).json({
            message: "Order placed successfully with eSewa",
            url: paymentUrl
        });
    }
    
}

// verify esewa using refid

exports.verifyEsewaPayment = async (req, res) => {
        const { refId, oid, amt } = req.query;

        if (!refId || !oid || !amt) {
            return res.status(400).json({
                message: "Invalid request. Missing required parameters."
            });
        }

        // Verification data for eSewa
        const verificationData = {
            amt: amt,
            rid: refId, 
            pid: oid,  
            scd: "EPAYTEST"
        };

        // Send verification request to eSewa
        const response = await axios.post(
            "https://uat.esewa.com.np/epay/transrec",
            null,
            {
                params: verificationData,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        );

        const esewaResponse = response.data;
        console.log(response.data)

        if (esewaResponse.includes("<response_code>Success</response_code>")) {
            // Update the payment status and store the refId as pidx in the database
            const updateResult = await payment.update(
                { paymentStatus: "paid", pidx: refId }, 
                { where: { id: oid } } 
            );

            if (updateResult[0] === 0) {
                return res.status(404).json({
                    message: "Order not found or already updated."
                });
            }

            return res.status(200).json({
                message: "Payment verified successfully",
                status: "paid",
                refId: refId
            });
        } else {
            return res.status(400).json({
                message: "Payment verification failed",
                response: esewaResponse
            });
        }
};


////////////////////////////////////verify khalti payment
exports.verifyKhaltiPayment = async(req,res)=>{
    const { pidx } = req.query
    const userId = req?.userId
    if(!pidx){
        return res.status(400).json({
            message:"Payment id is required"
        })
    }
    const response = axios.post('https://dev.khalti.com/api/v2/epayment/lookup/',{pidx},{
        headers:{
            "Authorization": "key ",
            "Content-Type": "application/json"
        }
    })

    const data = response.data
    if(data.status === 'completed'){
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


//get order of a user 
exports.getOrder = async(req,res)=>{
    const userId = req?.userId
    const orders = await order.findAll({
        where:{
            userId
        },
        include:[
            {
                model: users,
                attributes: ["username","email","role"]
            },
            {
             model: payment,
             attributes:["paymentMethod","paymentStatus"]   
            }
        ]
    })
    if(orders.length == 0){
        return res.status(404).json({
            message: "No orders found"
            })
    }

    res.status(200).json({
        message: "orders found",
        orders
    })
}


//cancel order by user
exports.cancelOrder = async(req,res)=>{
    const userId = req?.userId
    const orderId = req.params.id
    const orderData = await order.findAll({
        where:{
            id: orderId,
            userId
        }
    })
    if(orderData?.orderStatus === 'ontheway'  || orderData?.orderStatus === 'preparation' ){
        return res.status(400).json({
            message: "Order is already in progress, cannot cancel"
            })
    }
    await order.update({
        orderStatus: 'cancelled'
    },{
        where:{
            id: orderId
        }
    })
    res.status(200).json({
        message: "order canceled successfully"
    })
}

/////////////////////admin side order controls/////////////////////////////////////////////////////////////////

//change order status
exports.changeOrderStatus = async(req,res)=>{
    const userId = req.userId
    const orderId = req.params.id
    const {orderStatus} = req.body

    if(!orderStatus){
        res.status(400).json({
            message: "orderStatus can't be empty"
        })
    }

    const orderData = await order.update({
        orderStatus
    },{
        where:{
            id: orderId
        }
    })

    res.status(200).json({
        message: "orderStatus updated",
        orderData
    })
}

// change payment status
exports.changePaymentStatus = async(req,res)=>{
    const userId = req.userId
    const orderId = req.params.id
    const {paymentStatus} = req.body

    const orderData = await order.findOne({
        where:{
            id: orderId
        }
    })

    if(!paymentStatus){
        return res.status(400).json({
            message: "paymentStatus is required"
        })
    }
    const paymentData = await payment.update({
        paymentStatus
    },{
        where:{
            id: orderData.paymentId
        }
    })
    res.status(200).json({
        message:"paymentStatus updated success",
        paymentData
    })
} 

//delete order
exports.deleteOrder = async(req,res)=>{
    const orderId = req.params.id
     const orderData = await order.findOne({
        where:{
            id: orderId
        }
     })
     if(!orderData){
        return res.status(200).json({
            message: "can't find the order with that id"
        })
     }
     await orderDetails.destroy({
        where:{
            orderId: orderData.id
        }
     })

     await order.destroy({
        where:{
            id: orderData.id
        }
     })

     await payment.destroy({
        where:{
            id: orderData.paymentId
        }
     })

     

     res.status(200).json({
        message: "order deleted successfully"
     })
}

