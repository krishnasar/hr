/*

const express = require("express");
const app = express();
const sequelize = require("./config/db.config");

const countriesRoutes = require("./routes/countries.routes");
const departmentsRoutes = require("./routes/departments.routes");
const employeeRoutes = require("./routes/employees.routes");
const jobsRoutes = require("./routes/jobs.routes");
const locationsRoutes = require("./routes/locations.routes");
const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());
app.use("/api/countries", countriesRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/locations", locationsRoutes);
app.use(errorHandler);

sequelize.sync().then(() => {
  console.log("Database synced.");
});

module.exports = app;

*/


const express = require("express");
const cors = require("cors");           // <-- import cors
const app = express();
const sequelize = require("./config/db.config");

const countriesRoutes = require("./routes/countries.routes");
const departmentsRoutes = require("./routes/departments.routes");
const employeeRoutes = require("./routes/employees.routes");
const jobsRoutes = require("./routes/jobs.routes");
const locationsRoutes = require("./routes/locations.routes");
const errorHandler = require("./middlewares/error.middleware");

// Enable CORS for all origins (development)
app.use(cors());

// Optionally, restrict to only your React app origin:
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use("/api/countries", countriesRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/locations", locationsRoutes);
app.use(errorHandler);

sequelize.sync().then(() => {
  console.log("Database synced.");
});

module.exports = app;
