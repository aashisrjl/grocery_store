const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");


app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());

//database connection
require('./models/index.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.get('/about', (req, res) => {
    res.send('logged in!');
    }
);

//admin seeder
const { adminSeeder } = require("./utils/adminSeeder.js");
adminSeeder();

//category seeder
const { categorySeeder } = require("./utils/categorySeeder.js");
categorySeeder()

const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const productRoute = require("./routes/productRoute.js");
const { users } = require("./models/index.js");

// serialize and deserialize user
passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((id, cb) => {
        cb(null, id);
    });

app.use("/",authRoute)
app.use("/",categoryRoute)
app.use("/",productRoute)

//google authentication google strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    passport.use(new GoogleStrategy({
        clientID: process.env.O_CLIENT_ID,
        clientSecret: process.env.O_CLIENT_SECRET,
        callbackURL: process.env.O_CALLBACK_URL
    }, async function(accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null,userProfile);
    }));

    //routes
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email'],
        session:false
    },{session:false}))

    app.get('/auth/google/callback',passport.authenticate('google',{
        failureRedirect: '/login',
        session:false
    }),async function(req,res){
        const user = await users.findOne({
            where:{
                email: userProfile.emails[0].value
            }
        })
        if(user){
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET , {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.cookie('token',token)
            res.redirect('http://localhost:3000/about')
        }else{
            const data = await users.create({
                username: userProfile.displayName,
                email: userProfile.emails[0].value,
                password: Math.random().toString(36).substring(2, 10),
                googleId: userProfile.id,
                imgUrl: userProfile.photos[0].value
            })
            const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET , {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.cookie('token',token)
            res.redirect('http://localhost:3000/about')
        }
    })

    //===============================================================//

// Facebook login authentication
const FacebookStrategy = require("passport-facebook").Strategy;

// Configure the Facebook Strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.F_CLIENT_ID,
            clientSecret: process.env.F_CLIENT_SECRET,
            callbackURL: process.env.F_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'email', 'photos'], // Correct fields
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                return done(null, profile); // Pass the profile to the callback
            } catch (err) {
                return done(err, null); // Handle errors gracefully
            }
        }
    )
);

// Routes for Facebook Authentication
app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email'], // Request email permission
        session: false,  // Disable session
    })
);

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login', // Redirect on failure
        session: false, // Disable session
    }),
    async (req, res) => {
        try {
            // Check if user exists in the database
            const user = await users.findOne({
                where: {
                    email: req.user.emails[0].value, // Access email from `req.user`
                },
            });

            let token;

            if (user) {
                // User exists, generate a token
                token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
            } else {
                // Create a new user
                const newUser = await users.create({
                    username: req.user.displayName,
                    email: req.user.emails[0].value,
                    password: Math.random().toString(36).substring(2, 10), // Generate random password
                    facebookId: req.user.id,
                    imgUrl: req.user.photos[0].value, // Profile picture
                });

                token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
            }

            // Set token as a cookie and redirect
            res.cookie('token', token);
            res.redirect('http://localhost:3000/about'); // Redirect to the desired page
        } catch (error) {
            console.error('Error during Facebook authentication:', error);
            res.redirect('/login'); // Redirect to login page on error
        }
    }
);




app.listen(port, () => {
    console.log(`SERVER listening at ${port}`);
    }
);