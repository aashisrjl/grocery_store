exports.allowedTo= (...roles)=>{
    return(req,res,next)=>{
        let userRole = req?.user?.role
        if(!roles.includes(usreRole)){
            return res.status(400).json({
                message:"you d"
            })
        }
    }
}