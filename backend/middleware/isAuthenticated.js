const jwt = require("jsonwebtoken");
const { users } = require("../models");
const {promisify} = require("util")


exports.isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"You are not logged in" 
        });
    }
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    console.log(decoded)
    if(!decoded){
        console.log("can't decode")
        return
    }
   const user =  await users.findOne({
        where:{
            id: decoded.id
        }
    })
    if(!user){
        return res.status(401).json({
            success:false,
            message:"You are not logged in" 
        });
    }
    req.user = user;
    req.userId = user.id;
    next()
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error in iaAuthentication"
        })
        
    }
    
}