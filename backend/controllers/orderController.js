
const { orderDetails, payment, order, users, product, category } = require("../models");
const axios = require('axios');

exports.createOrder = async(req, res) => {
    const userId = req?.userId;
    const { phoneNumber, shippingAddress, totalAmount, paymentMethod, items } = req.body;

    if (!phoneNumber || !shippingAddress || !totalAmount || !paymentMethod || !items) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const userData = await users.findByPk(userId);

    const paymentData = await payment.create({
        paymentMethod
    });

    const OrderData = await order.create({
        userId,
        phoneNumber,
        shippingAddress,
        totalAmount,
        paymentId: paymentData.id,
    });

    let responseOrderData;
    for (var i = 0; i < items.length; i++) {
        responseOrderData = await orderDetails.create({
            quantity: items[i].quantity,
            productId: items[i].productId,
            orderId: OrderData.id
        });
    }

    if (!responseOrderData) {
        return res.status(400).json({
            message: "Order creation unsuccessful"
        });
    }

    if (paymentMethod === 'khalti') {
        const data = {
            return_url: "http://localhost:3000/success-khalti",
            cancel_url: "http://localhost:3000/cancel-khalti",
            purchase_order_id: OrderData.id,
            amount: totalAmount * 100,
            website_url: "http://localhost:3000",
            purchase_order_name: "orderName_" + OrderData.id,
            customer_info: {
                name: userData.username,
                email: userData.email,
                phone: userData?.phone
            }
        };

        const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
            headers: {
                "Authorization": "key dbae3da99710442a83d9068ff967b2ed",
                "Content-Type": "application/json"
            }
        });
        const khaltiResponse = response.data;
        paymentData.pidx = khaltiResponse.pidx;
        paymentData.save();
        return res.status(200).json({
            message: "Order placed successfully with Khalti",
            url: khaltiResponse.payment_url,
        });
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
            cusid: userData.id,
            cusname: userData.username,
            cusemail: userData.email,
            cusphone: userData?.phone
        };

        const esewaUrl = "https://uat.esewa.com.np/epay/main";

        const queryString = Object.keys(data)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join("&");

        const paymentUrl = `${esewaUrl}?${queryString}`;

        return res.status(200).json({
            message: "Order placed successfully with eSewa",
            url: paymentUrl
        });
    }

    res.status(200).json({
        message: "Order created with COD"
    });
};

exports.verifyEsewaPayment = async (req, res) => {
    const { refId, oid, amt } = req.query;

    if (!refId || !oid || !amt) {
        return res.status(400).json({
            message: "Invalid request. Missing required parameters."
        });
    }

    const verificationData = {
        amt: amt,
        rid: refId,
        pid: oid,
        scd: "EPAYTEST"
    };

    const response = await axios.post(
        "https://uat.esewa.com.np/epay/transrec",
        null,
        {
            params: verificationData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    );

    const esewaResponse = response.data;
    console.log(response.data);

    if (esewaResponse.includes("<response_code>Success</response_code>")) {
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

exports.verifyKhaltiPayment = async (req, res) => {
    try {
        const { pidx } = req.query;

        if (!pidx) {
            return res.status(400).json({
                message: "Payment ID (pidx) is required",
            });
        }

        const response = await axios.post(
            'https://dev.khalti.com/api/v2/epayment/lookup/',
            { pidx },
            {
                headers: {
                    Authorization: `Key dbae3da99710442a83d9068ff967b2ed`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = response.data;
        console.log("Khalti Response: ", data);

        if (data && data.status === 'Completed') {
            await payment.update(
                { paymentStatus: "Paid" },
                { where: { pidx } }
            );

            return res.status(200).json({
                message: "Payment verified successfully",
            });
        } else {
            return res.status(400).json({
                message: "Payment not verified",
                details: data,
            });
        }
    } catch (error) {
        console.error("Error verifying payment: ", error);

        return res.status(500).json({
            message: "An error occurred while verifying the payment",
            error: error.message,
        });
    }
};

exports.getOrder = async (req, res) => {
    const userId = req?.userId;
    const orders = await order.findAll({
        where: {
            userId
        },
        include: [
            {
                model: users,
                attributes: ["username", "email", "role"]
            },
            {
                model: payment,
                attributes: ["paymentMethod", "paymentStatus"]
            }
        ]
    });
    if (orders.length == 0) {
        return res.status(404).json({
            message: "No orders found"
        });
    }

    res.status(200).json({
        message: "Orders found",
        orders
    });
};

exports.cancelOrder = async (req, res) => {
    const userId = req?.userId;
    const orderId = req.params.id;
    const orderData = await order.findOne({
        where: {
            id: orderId,
            userId
        }
    });
    if (orderData?.orderStatus === 'ontheway' || orderData?.orderStatus === 'preparation') {
        return res.status(400).json({
            message: "Order is already in progress, cannot cancel"
        });
    }
    await order.update({
        orderStatus: 'cancelled'
    }, {
        where: {
            id: orderId
        }
    });
    res.status(200).json({
        message: "Order canceled successfully"
    });
};

exports.changeOrderStatus = async (req, res) => {
    const userId = req.userId;
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    if (!orderStatus) {
        return res.status(400).json({
            message: "Order status can't be empty"
        });
    }

    const orderData = await order.update({
        orderStatus
    }, {
        where: {
            id: orderId
        }
    });

    res.status(200).json({
        message: "Order status updated",
        orderData
    });
};

exports.changePaymentStatus = async (req, res) => {
    const userId = req.userId;
    const orderId = req.params.id;
    const { paymentStatus } = req.body;

    const orderData = await order.findOne({
        where: {
            id: orderId
        }
    });

    if (!paymentStatus) {
        return res.status(400).json({
            message: "Payment status is required"
        });
    }
    const paymentData = await payment.update({
        paymentStatus
    }, {
        where: {
            id: orderData.paymentId
        }
    });
    res.status(200).json({
        message: "Payment status updated successfully",
        paymentData
    });
};

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    const orderData = await order.findOne({
        where: {
            id: orderId
        }
    });
    if (!orderData) {
        return res.status(404).json({
            message: "Can't find the order with that ID"
        });
    }
    await orderDetails.destroy({
        where: {
            orderId: orderData.id
        }
    });

    await order.destroy({
        where: {
            id: orderData.id
        }
    });

    await payment.destroy({
        where: {
            id: orderData.paymentId
        }
    });

    res.status(200).json({
        message: "Order deleted successfully"
    });
};

exports.getOrderDetailById = async (req, res) => {
    const orderId  = req.params.id;
    const orderDetailsData = await orderDetails.findAll({
        where: {
            orderId
        },
        include: [
            {
                model: order,
                include: [
                    {
                        model: payment
                    },
                    {
                        model: users,
                        attributes: ['username', 'email', 'role', 'imgurl']
                    }
                ]
            },
            {
                model: product,
                include: [
                    {
                        model: category,
                        as: 'CategoryDetails'
                    }
                ]
            }
        ]
    });

    if (orderDetailsData.length ==0) {
        return res.status(404).json({
            message: "Order details not found"
        });
    }

    res.status(200).json({
        message: "Order details found",
        orderDetailsData
    });
};

exports.countOrder = async(req,res)=>{
    const userId = req.userId;
    const orders = await order.findAll();
   if(!userId){
    return res.status(400).json({
        message: "userId not found"
    })
   }
   res.status(200).json({
    message: "order count",
    orders: orders.length
   })
}

exports.countPayment = async(req,res)=>{
    const userId = req.userId;
    const payments = await payment.findAll();
   if(!userId){
    return res.status(400).json({
        message: "userId not found"
    })
   }
   res.status(200).json({
    message: "payment count",
    payment: payments.length
   })
}

exports.getPaginationOrder = async (req, res) => {
    const userId = req?.userId;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const perPage = parseInt(req.query.perPage) || 5; // Default to 5 orders per page
    const offset = (page - 1) * perPage; // Calculate offset

        const { count, rows } = await order.findAndCountAll({
            
            include: [
                {
                    model: users,
                    attributes: ["username", "email", "role"]
                },
                {
                    model: payment,
                    attributes: ["paymentMethod", "paymentStatus"]
                }
            ],
            limit: perPage,
            offset: offset
        });

        if (count === 0) {
            return res.status(404).json({
                message: "No orders found"
            });
        }

        const totalPages = Math.ceil(count / perPage);

        res.status(200).json({
            message: "Orders found",
            orders: rows,
            pagination: {
                currentPage: page,
                perPage: perPage,
                totalOrders: count,
                totalPages: totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
};

exports.getAllOrders = async (req, res) => {
    const orders = await order.findAll({
        include: [
            {
                model: users,
                attributes: ["username", "email", "role"]
            },
            {
                model: payment,
                attributes: ["paymentMethod", "paymentStatus"]
            }
        ]
    });
    if (orders.length == 0) {
        return res.status(404).json({
            message: "No orders found"
        });
    }

    res.status(200).json({
        message: "Orders found",
        orders
    });
}