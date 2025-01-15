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
            messsage: "credit record not found"
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
 