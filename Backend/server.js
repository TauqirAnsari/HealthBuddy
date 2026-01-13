require('dotenv').config();
const dbConn = require('./src/config/dbConn');
// const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
 
// const server = http.createServer(app);



dbConn().then( () => { 
    app.listen(port, () => {
         console.log(`Server is running on Port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});
