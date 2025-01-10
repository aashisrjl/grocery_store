const { users } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.handleRegister = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            message: "Please provide username, email, and password",
        });
        return;
    }
    const alreadyExituser = await users.findOne({ where: { email } });
    if (alreadyExituser) {
        res.status(400).json({
            message: "User with that email already exists",
        });
        return;
    }

    const user = await users.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
    });

    res.status(200).json({
        message: "User registered",
        user,
    });
}

exports.handleLogin = async (req, res) => {
    const { email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message: "Please provide email and password",
                });
                return;
        }
        const user = await users.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({
                message: "User not found",
                });
                return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: "Invalid credentials",
                });
                return;
            }
            //cookies 
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET , {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.cookie("token", token, {
                httpOnly: true,
            });
            res.status(200).json({
                message: "Login success",
                user: user.username,
                email: user.email,
                role: user.role,
                token: token
            })

}
exports.handleLogout= async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout success",
    });
}
