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
const protect = require("./middlewares/authMiddleware");
const testRouter = require("./routes/testRoutes");
const assetRouter = require("./routes/assetRoutes");
const adminRouter = require("./routes/adminRoutes");
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Dayumm you didn't forget NODE js");
});

app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);
app.use('/api/asset',assetRouter);
app.use('/api/admin',adminRouter);
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
