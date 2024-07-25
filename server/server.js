const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(express.static('../public'))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log("MongoDB connected");})
.catch((err) => { console.log(err || "Not connected");});

// MongoDB Schema
const User = require("./models/user")

// API Endpoint
app.post('/submit', async (req,res) => {
    const { name, email, projectTitle, div , rollno } = req.body;

    if(!name || !email || !projectTitle || !div || !rollno ) {
        const response = res.status(400);
        return response.json({ success: false, message: 'All Fields required'})
    }

    const newUser = new User({
        name,
        email,
        projectTitle,
        div,
        rollno
    })

    try{
        await newUser.save();
        res.status(201).json({ success: true, message: 'Project Submitted Successfully'})
    } catch(error) {
        res.status(500).json({ success: false, message: "Error Submitting the form"})
    }
});

// Starting the server
app.listen(port, () => console.log(`server is running on port ${port}`));