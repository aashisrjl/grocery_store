// const { raw } = require("express");
const { credit, users, product, category } = require("../models");
const sendMail = require("../services/sendMail");

exports.addCredit = async(req,res)=>{
    const {productName,username,email,phone,address,price} = req.body

    let creditData = {
            username,
            email,
            phone,
            address,
            productName,
            price,
            status: "approved"
        }
    const newCredit = await credit.create(creditData)
    res.status(200).json({
        message: "credit add/ apply",
        newCredit
    })

}

//get all credits
exports.getAllCredit = async(req,res)=>{
    const allCredit = await credit.findAll({
        include: [
            {
                model: users,
                attributes: ["username", "email", "role"],
                required: false,
            },
            {
                model: product,
                attributes: ["id","name","price","description","unit","stock"],
                include:[
                    {
                        model: category,
                        as: 'CategoryDetails',
                        attributes:['id','categoryName']
                    }

                ],
                required: false, 
            },
        ],
        
    });
    if(allCredit.length == 0){
       return res.status(404).json({
            message: "no credit found"
        })
    }

    res.status(200).json({
        message: "credit fetched",
        allCredit
    })
}

// get credit by accepted status
exports.getAcceptedCredit = async(req,res)=>{
    const acceptedCredit = await credit.findAll({
        where:{
            status: "approved"
        },include: [
            {
                model: users,
                attributes: ["username", "email", "role"],
                required: false,
            },
            {
                model: product,
                attributes: ["id","name","price","description","unit","stock"],
                include:[
                    {
                        model: category,
                        as: 'CategoryDetails',
                        attributes:['id','categoryName']
                    }

                ],
                required: false, 
            },
        ],
    })
    if(acceptedCredit.length == 0){
        return res.status(404).json({
            message: "accepted credit not found"
        })
    }
    res.status(200).json({
        message: "accepted credits found",
        acceptedCredit
    })
}

//get credit by rejected status
exports.getRejectedCredit = async(req,res)=>{
    const rejectedCredit = await credit.findAll({
        where:{
            status: "rejected"
        },
        include: [
            {
                model: users,
                attributes: ["username", "email", "role"],
                required: false,
            },
            {
                model: product,
                attributes: ["id","name","price","description","unit","stock"],
                include:[
                    {
                        model: category,
                        as: 'CategoryDetails',
                        attributes:['id','categoryName']
                    }

                ],
                required: false, 
            },
        ],
    })
    if(rejectedCredit.length == 0){
        return res.status(404).json({
            message: "rejected credit not found"
        })
    }
    res.status(200).json({
        message: "rejected credits found",
        rejectedCredit
    })
}

// Get credit by pending status
exports.getPendingCredit = async (req, res) => {

        const pendingCredit = await credit.findAll({
            where: {
                status: "pending",
            },
            include: [
                {
                    model: users,
                    attributes: ["username", "email", "role"],
                    required: false,
                },
                {
                    model: product,
                    attributes: ["id","name","price","description","unit","stock"],
                    include:[
                        {
                            model: category,
                            as: 'CategoryDetails',
                            attributes:['id','categoryName']
                        }

                    ],
                    required: false, 
                },
            ],
            
        });

     
        if (pendingCredit.length === 0) {
            return res.status(404).json({
                message: "Pending credit not found",
            });
        }

        res.status(200).json({
            message: "Pending credits found",
            data: pendingCredit,
        });
   
};


// request credit
exports.creditRequest = async(req,res)=>{
    const userId = req.userId;
    const {productId} = req.params
    const products = await product.findByPk(productId)
    if(!products) return res.status(404).json({message: "product not found"})
        const user = await users.findByPk(userId)
        if(!user) return res.status(404).json({message: "user not found"})
        //     const credit = await credit.findOne({username:user.username})
        // if(!credit) return res.status(404).json({message: "credit not found"})
        const newCredit = await credit.create({
        username: req.user.username,
        email: req.user.email,
        productName:products.productName,
        price: products.price,
        userId,
        productId    
    })
        res.status(200).json({
            message: "credit request successful",
            newCredit
            })

}

//handle credit request
exports.handleCreditRequest = async(req,res)=>{
    const creditId= req.params.id
    const {status,isPaid} = req.body
    const creditReq = await credit.findByPk(creditId);
    if(!creditReq){
        return res.status(400).json({
            message: "credit not found"
        })
    }
    creditReq.status = status || creditReq.status
    creditReq.isPaid = isPaid  || creditReq.isPaid
    creditReq.save();
    
    //SEND MAIL TO USER
    sendMail({
        email: creditReq.email,
        subject: `Status Updated for your credit Request`,
        text: `your request has been ${status} by the Rijal_Grocery_store <br> THANK YOU FOR CONNECTING WITH OUR STORE AND WELCOME`

    })

    res.status(200).json({
        message: `credit req updated to ${status}`,
        credit : creditReq
    })
}

//delete credit 
exports.deleteCredit = async(req,res)=>{
    const creditId = req.params.id
    const data = await credit.findByPk(creditId);
    if(!data){
        return res.status(400).json({
            message: "credit record not found"
        })
    }
    await credit.destroy({
        where:{
            id: creditId
        }
    })
    res.status(200).json({
        message: "credit data deleted success"
    })
}
 
// Update credit details
exports.updateCredit = async (req, res) => {
        const creditId = req.params.id;
        const updateData = req.body;   

        const creditRecord = await credit.findByPk(creditId);
        if (!creditRecord) {
            return res.status(404).json({
                message: "Credit record not found",
            });
        }

        await creditRecord.update(updateData);

        res.status(200).json({
            message: "Credit record updated successfully",
            credit: creditRecord,
        });
}

//getproduct which are unpaid
exports.unpaidCredit = async(req,res)=>{
    const data = await credit.findAll({
        where:{
            isPaid: "unpaid"
        }
    })
    if(data.length == 0){
        res.status(400).json({
            message: "record can't find"
        })
    }
    res.status(200).json({
        message: "unpaid credit records finds",
        data
    })
}

//getproduct which are paid
exports.paidCredit = async(req,res)=>{
    const data = await credit.findAll({
        where:{
            isPaid: "paid"
        }
    })
    if(data.length == 0){
        res.status(400).json({
            message: "record can't find"
        })
    }
    res.status(200).json({
        message: "paid credit records finds",
        data
    })
}

// Get credit of logged-in user
exports.getLoginUserCredit = async (req, res) => {
    const userId = req.userId;
    console.log(userId)

    const isCredit = await credit.findAll({
        where: {
            userId
        },
        include: [
            {
                model: users,
                attributes: ["username", "email", "role"]
            },
            {
                model: product
            }
        ]
    });

    if (isCredit.length === 0) {
        return res.status(404).json({
            message: "No credits found for the logged-in user."
        });
    }

    res.status(200).json({
        message: "Fetched logged-in user credits.",
        data: isCredit
    });

};

//get not login user credit
exports.getNotLoginUserCredit = async(req,res)=>{
    const data = await credit.findAll({
        where:{
            userId: null
        }
    })
    if(data.length == 0){
        return res.status(400).json({
            message: "unauthorized user credit data not found"
        })
    }

    res.status(200).json({
        message: "fetched login user credit data",
        data
    })
}

    