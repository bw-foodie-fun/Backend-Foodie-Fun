const express = require("express");
const router = express.Router();

const db = require("../data/dbConfig");
const restricted = require("../auth/restricted");

router.get("/", restricted, (req, res) => {
  db("meals")
    .where({ user_id: req.decodedToken.subject })
    .then(meals => {
      res.status(200).json(meals);
    })
    .catch(error => {
      res.status(500).json({ error: "The meals could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("meals")
    .where({ id })
    .first()
    .then(meal => {
      if (meal) {
        res.status(200).json(meal);
      } else {
        res
          .status(404)
          .json({ error: "The meal with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The action with the specified ID could not be retrieved"
      });
    });
});

module.exports = router;
