const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const cookieParser = require("cookie-parser");
const passport = require("passport");


app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//database connection
require('./models/index.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
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
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
        cb(null, id);
    });

app.use("/",authRoute)
app.use("/",categoryRoute)
app.use("/",productRoute)

//google authentication google strategy
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async function(accessToken, refreshToken, profile, done) {
        
    }))



app.listen(port, () => {
    console.log(`SERVER listening at ${port}`);
    }
);