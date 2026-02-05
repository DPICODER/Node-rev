process.env.DOTENV_CONFIG_QUIET = "true";
require("dotenv").config({ quiet: true });
const express = require("express");
const { Sequelize } = require("sequelize");
const path = require("path");
const sequelize = require("./config/database");
const errorMiddleware = require("./middlewares/errorMiddleware");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const User = require("./models/User");
const authRouter = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.send("Dayumm you didn't forget NODE js");
});

app.use('/api/auth',authRouter);

// Test Route for checking user creation
// app.get('/create-test-user',async(req,res,next)=>{
//     try {
//         const user = await User.create({
//             email:'varun@gmail.com',
//             firstName:'SaiVarun',
//             lastName:'Pannala',
//             password:'stronkPassword123'
//         })
//         const {password,...safeUser} = user.toJSON();
//         res.json(safeUser);
//     } catch (error) {
//         next(err);
//     }
// })


// Test Route Error middleware test error 
/* app.get("/test-error", (req, res, next) => {
   next(new Error("This is a test error"));
 });*/


// async function that establishes test connection to the database (Mariadb)
async function initailizeDB() {
  await sequelize.authenticate();
  try {
    console.log("Authentiaction to Database Successfull ✔");
    await sequelize.sync();
    console.log("Database Sync Success ✔");
  } catch (error) {
    console.error("Error Database!!!!!", error.message);
  }
}

app.use(errorMiddleware);

// starting a Node server for listening the REST API requrest
// app listens at given port number if any error a message handles the error
app.listen(PORT || 3000, (err) => {
  if (err) {
    //error handling message
    console.error("Error starting server", err);
  } else {
    //server start message
    console.log(`Server is up @ http://localhost:${PORT || 3000}`);
    initailizeDB();
  }
});
