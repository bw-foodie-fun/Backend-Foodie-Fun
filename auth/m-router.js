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

router.get("/:id", restricted, (req, res) => {
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

router.post("/", (req, res) => {
  const meal = req.body;

  if (!meal.item_name) {
    res.status(400).json({ error: "Please provide a name for the meal." });
  } else {
    // meal.user_id = req.decodedToken.subject;
    meal.user_id = 3;
    db("meals")
      .insert(meal)
      .then(ids => {
        const id = ids[0];
        db("meals")
          .where({ id })
          .first()
          .then(meal => {
            res.status(201).json(meal);
          });
      })
      .catch(error => {
        res
          .status(500)
          .json({
            error: "There was an error while saving the meal to the database."
          });
      });
  }
});

module.exports = router;
