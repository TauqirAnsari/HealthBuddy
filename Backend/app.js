const express = require('express');
const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/router/user.routes');
const dietRouter = require('./src/aiModel/routes/dietRoutes') // Import diet recommendation routes

// Environment Variables    
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';


//Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Routes
app.use('/healthbuddy/v1/users', userRoutes);
app.use('/healthbuddy/v1/api/diet', dietRouter); // Diet recommendation routes



// app.get("/",(req,res)=>{
//     res.send("Hello WoRld")
// })


module.exports = app;