const { Sequelize } = require("sequelize");

console.log("DB USER :",process.env.DB_USER);


const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
