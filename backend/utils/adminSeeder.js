const { users } = require("../models")
const bcrypt = require("bcryptjs")

exports.adminSeeder = async(req,res)=>{
    const adminAlreadyExit = await users.findOne({
        where: {email: process.env.ADMIN_EMAIL}
    })
    if(adminAlreadyExit){
       console.log("admin seeded already");
        }
    const admin = await users.create({
        username: process.env.ADMIN_USERNAME,
        email: bcrypt.hashSync(process.env.ADMIN_EMAIL,8),
        password: process.env.ADMIN_PASSWORD,
        role: "admin" 
    });
    console.log("admin seeded successfully");

}