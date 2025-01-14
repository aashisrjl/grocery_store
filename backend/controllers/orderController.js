const { default: axios } = require("axios");
const { orderDetails, payment, order } = require("../models");

exports.createOrder = async(req,res)=>{
    const userId = req?.userId
     const {phoneNumber,shippingAddress,totalAmount,paymentMethod,items} = req.body

   if(!phoneNumber || !shippingAddress || !totalAmount || !paymentMethod || !items){
    return res.status(400).json({
        message: "all fields are required"
    })
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
        const data ={
            return_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            purchase_order_id: OrderData.id,
            amount: totalAmount *100,
            website_url: "http://localhost:3000",
            purchase_order_name: "orderName_"+ OrderData.id,
            customer_info:{
                name: "Aashish Rijal",
                email: "aashisrijal252@gmail.com",
                phone: "9841824710"
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
            pidx: khaltiResponse.pidx
        })

    }

    if (paymentMethod === 'esewa') {
        const data = {
            amt: totalAmount, // The total amount for the order
            psc: 0, // Additional charge, if applicable
            pdc: 0, // Delivery charge, if applicable
            txAmt: 0, // Tax amount
            tAmt: totalAmount, // Total transaction amount (should equal `amt + psc + pdc + txAmt`)
            pid: "order_" + OrderData.id, // Unique product/order ID
            scd: "EPAYTEST", // Merchant Code provided by eSewa (use "EPAYTEST" for testing)
            su: "http://localhost:3000/success", // Success URL
            fu: "http://localhost:3000/failure" // Failure URL
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

exports.verifyPayment = async(req,res)=>{
    const {pidx} = req.body
    const userId = req?.userId
    if(!pidx){
        return res.status(400).json({
            message:"Payment id is required"
        })
    }
    const response = axios.post('https://dev.khalti.com/api/v2/epayment/lookup/',{pidx},{
        headers:{
            "Authorization": "key dbae3da99710442a83d9068ff967b2ed",
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

