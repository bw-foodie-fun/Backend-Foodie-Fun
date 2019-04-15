const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const tokenService = require("./token-service");
const db = require("../data/dbConfig");

router.post("/register", (req, res) => {
  const user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({
      error: "Please provide a username and password."
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    db("users")
      .insert(user)
      .then(ids => {
        const id = ids[0];
        db("users")
          .where({ id })
          .first()
          .then(user => {
            const token = tokenService.generateToken(user);
            res.status(201).json({ user, token });
          });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      error: "Please provide a username and password."
    });
  } else {
    db("users")
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokenService.generateToken(user);
          res
            .status(200)
            .json({ message: `${user.username} is logged in.`, token });
        } else {
          res
            .status(401)
            .json({
              error: "Please provide the correct username and password."
            });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while logging in."
        });
      });
  }
});

module.exports = router;
