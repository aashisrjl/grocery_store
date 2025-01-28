const { users } = require("../models");

exports.getLoginUser = async(req,res)=>{
    const userId = req.userId;
    const user = await users.findOne({
        where:{
            id: userId
        }
    })
    if(!user){
        return res.status(400).json({
            message: "no user login"
        })
    }
    data ={
        name: user.username,
        email: user.email,
        role: user.role,
        imgUrl: user.imgUrl
    }

    res.status(200).json({
        message: "loggedIn user fetched",
        data
    })
}