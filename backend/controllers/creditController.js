const { credit } = require("../models");

exports.addCredit = async(req,res)=>{
    const {productId,productName,username,email,phone,address} = req.body
    let creditData = {};
    if(req.user){
        //register user
        creditData = {
            userId :req.userId,
            productId
        }
    }else{
        creditData = {
            username,
            email,
            phone,
            address,
            productName
        }
    }
    const newCredit = await credit.create(creditData)
    res.status(200).json({
        message: "credit add/ apply",
        newCredit
    })

}

//handle credit request
exports.handleCreditRequest = async(req,res)=>{
    const creditId= req.params.id
    const {status} = req.body
    const creditReq = await credit.findByPk(creditId);
    if(!creditReq){
        return res.status(400).json({
            message: "credit not found"
        })
    }
    creditReq.status = status
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
    
    