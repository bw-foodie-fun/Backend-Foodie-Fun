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

module.exports = router;
