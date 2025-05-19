const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config.js');

const app = express();
//convert data to json
app.use(express.json());

app.use(express.urlencoded({extended: false}));//

//set ejs as view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

app.get('/', (req,res) => {
    res.render('login');
})

app.get('/signup', (req,res) => {
    res.render('signup');
})
app.get('/Mine', (req,res) => {
    res.render('Mine');
})
app.get('/Task', (req,res) => {
    res.render('Task');
})
app.get('/Wealthfund', (req,res) => {
    res.render('Wealthfund');
})
app.get('/Team', (req,res) => {
    res.render('Team');
})
app.get('/Admin', (req,res) => {
    res.render('Admin');
})
//Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    //check if user exists
    const existingUser = await collection.findOne({name: data.name});
    if (existingUser) {
        res.send("User already exists. Please choose different name.");
    }else {
        //hash password using bcrypt
        const saltRounds = 10;//No. of sr for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;//Replace the hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("index");
    }
   
})
//login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});
        if (!check) {
            res.send("User not found. Please signup.");
        }
        const checkemail = await collection.findOne({email: req.body.email});
        if (!checkemail) {
            res.send("Email does not match.");
        }
        //compare the hash password with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("index");
        }else {
            req.send("Wrong password");
        }
    }catch{
        res.send("Wrong Details");
    }
})

const PORT  = 3200
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})