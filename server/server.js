const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
 .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true
 })
 .then(() => {
  console.log('Connected to the Database successfully');
 });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
        }
        res.locals.loggedInUser = await User.findById(userId); next();
    } else {
        next();
    }
});

app.use('/', routes); app.listen(PORT, () => {
    console.log('Server is listening on Port: ', PORT);
})

