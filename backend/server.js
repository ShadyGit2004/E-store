require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/db/db.js");

connectToDB();


app.listen(process.env.PORT, (req, res)=>{
    console.log("Server is listening to port : ", process.env.PORT);    
});