const mongoose = require ("mongoose");
const uri = process.env.DATABASE_URL;

const dbConn=async() => {
    try{
        await mongoose.connect(uri);
        console.log("Database connected Sucessfully");

    }catch(error){
        console.log(error.message);
    }
}

module.exports = dbConn;