require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const cookieParser = require("cookie-parser");
// const passport = require("passport");
// const session = require("express-session");
// const jwt = require("jsonwebtoken");
const passport = require('./services/passport.js')

// cors origin setup
const cors = require("cors");
app.use(cors());
const corsOption ={
    origin:"http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}

app.use(cors(corsOption));

// packgaes 
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());

//database connection
require('./models/index.js');

//admin seeder
const {adminSeeder} = require("./utils/adminSeeder.js")
adminSeeder();
//category seeder
const { categorySeeder } = require("./utils/categorySeeder.js");
categorySeeder();


app.get('/about', (req, res) => {
    res.send('logged in!');
    }
);


const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const productRoute = require("./routes/productRoute.js");
const cartRoute = require("./routes/cartRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const creditRoute = require("./routes/creditRoute.js");

app.use("/",authRoute)
app.use("/",categoryRoute)
app.use("/",productRoute)
app.use("/",cartRoute)
app.use("/",orderRoute)
app.use("/",creditRoute)



// // serialize and deserialize user
// passport.serializeUser((user, cb) => {
//     cb(null, user);
// });
// passport.deserializeUser((id, cb) => {
//         cb(null, id);
//     });

// //google authentication google strategy
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//     passport.use(new GoogleStrategy({
//         clientID: process.env.O_CLIENT_ID,
//         clientSecret: process.env.O_CLIENT_SECRET,
//         callbackURL: process.env.O_CALLBACK_URL
//     }, async function(accessToken, refreshToken, profile, done) {
//         userProfile = profile;
//         return done(null,userProfile);
//     }));

//     //routes
//     app.get('/auth/google',passport.authenticate('google',{
//         scope:['profile','email'],
//         session:false
//     },{session:false}))

//     app.get('/auth/google/callback',passport.authenticate('google',{
//         failureRedirect: '/login',
//         session:false
//     }),async function(req,res){
//         const user = await users.findOne({
//             where:{
//                 email: userProfile.emails[0].value
//             }
//         })
//         if(user){
//             const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET , {
//                 expiresIn: process.env.JWT_EXPIRES_IN,
//             });
//             res.cookie('token',token)
//             res.redirect('http://localhost:3000/about')
//         }else{
//             const data = await users.create({
//                 username: userProfile.displayName,
//                 email: userProfile.emails[0].value,
//                 password: Math.random().toString(36).substring(2, 10),
//                 googleId: userProfile.id,
//                 imgUrl: userProfile.photos[0].value
//             })
//             const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET , {
//                 expiresIn: process.env.JWT_EXPIRES_IN,
//             });
//             res.cookie('token',token)
//             res.redirect('http://localhost:3000/about')
//         }
//     })

//     //===============================================================//

// // Facebook login authentication
// const FacebookStrategy = require("passport-facebook").Strategy;
// passport.use(new FacebookStrategy({
//             clientID: process.env.F_CLIENT_ID,
//             clientSecret: process.env.F_CLIENT_SECRET,
//             callbackURL: process.env.F_CALLBACK_URL,
//             profileFields: ['id', 'displayName', 'email', 'photos'], 
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 return done(null, profile); 
//             } catch (err) {
//                 return done(err, null); 
//             }
//         }
//     )
// );
// // Routes
// app.get('/auth/facebook',passport.authenticate('facebook', {
//         scope: ['email'], session: false, 
//     }));

// app.get('/auth/facebook/callback',passport.authenticate('facebook', {
//         failureRedirect: '/login',session: false, 
//     }),async (req, res) => {
//         try {
//             const user = await users.findOne({
//                 where: {
//                     email: req.user.emails[0].value, 
//                 },
//             });
//             let token;
//             if (user) {
//                     token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//                     expiresIn: process.env.JWT_EXPIRES_IN,
//                 });
//             } else {
//                 // new user
//                 const newUser = await users.create({
//                     username: req.user.displayName,
//                     email: req.user.emails[0].value,
//                     password: Math.random().toString(36).substring(2, 10), 
//                     facebookId: req.user.id,
//                     imgUrl: req.user.photos[0].value, 
//                 });
//                 token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
//                     expiresIn: process.env.JWT_EXPIRES_IN,
//                 });
//             }
//             res.cookie('token', token);
//             res.redirect('http://localhost:3000/about'); // Redirect to the desired page
//         } catch (error) {
//             console.error('Error during Facebook authentication:', error);
//             res.redirect('/login'); // Redirect to login page on error
//         }
//     }
// );




app.listen(port, () => {
    console.log(`SERVER listening at ${port}`);
    }
);