require('dotenv').config();
const dbConn = require('./src/config/dbConn');
const app = require('./app');
const port = process.env.PORT || 4000;


dbConn().then( () => { 
    app.listen(port, () => {
         console.log(`Server is running on Port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});
