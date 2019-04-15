const middleware = require("./middleware");
const express = require("express");

const authRouter = require("../auth/auth-router");

const server = express();
middleware(server);

server.use("/api/auth", authRouter);

module.exports = server; 