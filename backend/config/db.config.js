const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mysql", "root", "Temp#1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
