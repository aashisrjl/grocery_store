const { users } = require("../models")
const bcrypt = require("bcryptjs")

exports.adminSeeder = async(req,res)=>{
    const adminAlreadyExit = await users.findOne({
        where: {email: process.env.ADMIN_EMAIL}
    })
    if(adminAlreadyExit){
       console.log("admin seeded already");
       return;
        }
    const admin = await users.create({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD,8),
        role: "admin" 
    });
    console.log("admin seeded successfully");

}