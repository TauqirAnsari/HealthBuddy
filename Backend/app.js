const express = require('express');
const cors = require('cors');

const app = express();

const userRoutes = require('./src/router/user.routes');


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/users', userRoutes);



// app.get("/",(req,res)=>{
//     res.send("Hello WoRld")
// })


module.exports = app;