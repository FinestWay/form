const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const file = path.join(__dirname, '../public')

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(file));

// MongoDB connection

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI is not defined in .env file')
  process.exit(1)
}

console.log('MONGO_URI:', process.env.MONGO_URI)

mongoose.connect(mongoUri)
.then(() => { console.log("MongoDB connected");})
.catch((err) => { console.log(err || "Not connected");})

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
        res.status(201).json({ success: true, message: 'Project Submitted Successfully', redirectUrl: `../public/pages/success.html`})
    } catch(error) {
        res.status(500).json({ success: false, message: "Error Submitting the form"})
    }
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Starting the server
app.listen(port, () => console.log(`server is running on port ${port}`));