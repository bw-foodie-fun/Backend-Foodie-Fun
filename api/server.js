const middleware = require("./middleware");
const express = require("express");

//routes
const mealsRouter = require('../routes/meals/meals-router.js');

const server = express();
middleware(server);

//routers
server.use('/api/meals', mealsRouter);

module.exports = server; 