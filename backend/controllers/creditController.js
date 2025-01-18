const { credit, users } = require("../models");

exports.addCredit = async(req,res)=>{
    const {productName,username,email,phone,address,price} = req.body

    let creditData = {
            username,
            email,
            phone,
            address,
            productName,
            price,
            status: "accepted"
        }
    const newCredit = await credit.create(creditData)
    res.status(200).json({
        message: "credit add/ apply",
        newCredit
    })

}
// request credit
exports.creditRequest = async(req,res)=>{
    const userId = req.userId;
    const {productId} = req.params
    const product = await product.findById(productId)
    if(!product) return res.status(404).json({message: "product not found"})
        const user = await users.findById(userId)
        if(!user) return res.status(404).json({message: "user not found"})
        //     const credit = await credit.findOne({username:user.username})
        // if(!credit) return res.status(404).json({message: "credit not found"})
        const newCredit = await credit.create({
        username: req.user.username,
        email: req.user.email,
        productName:product.productName,
        price: product.price,
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
    
    