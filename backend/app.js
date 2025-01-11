const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;


app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

app.use("/",authRoute)
app.use("/",categoryRoute)


app.listen(port, () => {
    console.log(`SERVER listening at ${port}`);
    }
);