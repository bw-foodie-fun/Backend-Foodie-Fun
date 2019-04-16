const middleware = require("./middleware");
const express = require("express");

const authRouter = require("../auth/auth-router");
const mRouter = require("../auth/m-router");
const mealsRouter = require('../routes/meals/meals-router.js');


const server = express();
middleware(server);

server.use("/api/auth", authRouter);
server.use('/api/meals', mealsRouter);
server.use('/api/m', mRouter);



server.get('/', (req, res) => {
    res.send(`
      <h2>FOODIE FUN API</h2>
      <p>Welcome!</p>
    `);
  });


module.exports = server; 
