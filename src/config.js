const mongoose = require('mongoose');
const connect = mongoose.connect("")

//check connection
connect.then(() => {
    console.log("Conneted to MongoDB");
})
.catch(() => {
    console.log("Error connecting to MongoDB");
})

//create schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

//create model   
const collection = new mongoose.model("posts", LoginSchema);

module.exports = collection;
