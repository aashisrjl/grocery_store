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

app.listen(port, () => {
    console.log(`SERVER listening at ${port}`);
    }
);