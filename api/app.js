// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./rest/users');
const CORERoutes = require('./rest/core');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mount the API routers
app.use(userRoutes);
app.use(CORERoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});