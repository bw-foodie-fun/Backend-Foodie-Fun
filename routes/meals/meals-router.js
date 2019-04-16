//Router Module
const express = require("express");

//model
const mealsModel = require('./meals-model.js')

const router = express.Router();

//MEALS CRUD
router.get('/all', async (req, res) => {
    try {
        const meals = await mealsModel.getAllMeals();
        res.status(200).json(meals)
    } catch (error) {
        res.status(500).json(error);
    }
});

// AUTHORIZED ONLY
// POST
router.post("/", async (req, res) => {
   try {
     const meal = await mealsModel.insert(req.body);
     res.status(201).json(meal);
   } catch (error) {
     console.log(error);
     res.status(500).json({
       message: "Error adding the meal"
     });
   }
 });

  //Export Router
module.exports = router;