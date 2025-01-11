exports.allowedTo= (...roles)=>{
    return(req,res,next)=>{
        let userRole = req?.user?.role
        if(!roles.includes(userRole)){
            return res.status(400).json({
                message:"you are not allowed to access this route"
            })
        }
        next();
    }
}