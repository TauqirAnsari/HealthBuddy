const express = require('express');
const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/router/user.routes');
const dietRouter = require('./src/aiModel/routes/dietRoutes') // Import diet recommendation routes

// Environment Variables    
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';


//Middleware
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Routes
app.use('/users', userRoutes);
app.use('/api/diet', dietRouter); // Diet recommendation routes



// app.get("/",(req,res)=>{
//     res.send("Hello WoRld")
// })


module.exports = app;