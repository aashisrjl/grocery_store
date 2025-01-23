const { users } = require("../models")
const bcrypt = require("bcryptjs")
exports.adminSeeder = async(req,res)=>{
    const adminAlreadyExit = await users.findOne({
        where: {email: process.env.ADMIN_EMAIL || 'aashisrijal252@gmail.com'}
    })
    if(adminAlreadyExit){
       console.log("admin seeded already");
       return;
        }
    const admin = await users.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'aashisrijal252@gmail.com',
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin',8),
        role: "admin" 
    });
    console.log("admin seeded successfully");

}