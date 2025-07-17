/*const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

*/

const express = require('express');
const cors = require('cors');
const app = require('./app');  // assuming app exports an express instance

// Add cors middleware here
app.use(cors());

// Optional: restrict CORS to localhost:3000 only
// app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
