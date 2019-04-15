const middleware = require("./middleware");
const express = require("express");

const authRouter = require("../auth/auth-router");
const mealsRouter = require('../routes/meals/meals-router.js');


const server = express();
middleware(server);

server.use("/api/auth", authRouter);
server.use('/api/meals', mealsRouter);

module.exports = server; 