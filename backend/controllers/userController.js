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

exports.getAlluser = async(req,res)=>{
    const userId = req.userId;
    const user = await users.findAll();
    if(!userId){
        return res.status(400).json({
            message: "userId not found"
        })
    }
    res.status(200).json({
        message: "users data",
        userCount: user.length,
        user
    })
}

//get users only five latest
exports.getRecentUser = async(req,res)=>{
    const userId = req.userId;
    const user = await users.findAll({
        limit: 5,
        order:[['createdAt','DESC']]
    })

    res.status(200).json({
        message: "users data",
        userCount: user.length,
        user
    })
}