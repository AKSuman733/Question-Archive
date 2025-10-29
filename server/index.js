
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({path: '../.env'});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//get link of searched paper
//Mongoose connection
mongoose.connect(process.env.Mongo_URI).then(()=> console.log("mongoose connected"))
.catch(err => console.log("Mongoose not conected"));

//Routes
const paperRoutes = require('./routes/papers');
app.use('/api/papers', paperRoutes);

    
app.get('/', (req, res) => {
  res.send('Welcome to the Question Archive API');
});

app.listen(5000);