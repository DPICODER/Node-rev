require("dotenv").config();

const { initailizeDB, app } = require("./app");

console.log("Starting Server");
initailizeDB().then(()=>{
    app.listen(5000,()=>console.log("Server running"))
});