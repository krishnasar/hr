const Sequelize = require("sequelize");
const sequelize = require("../config/db.config");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Employee = require("./employees.model")(sequelize, Sequelize);
db.Job = require("./jobs.model")(sequelize, Sequelize);
db.Country = require("./countries.model")(sequelize, Sequelize);
db.Department = require("./departments.model")(sequelize, Sequelize);
db.Location2 = require("./locations.model")(sequelize, Sequelize);

module.exports = db;
