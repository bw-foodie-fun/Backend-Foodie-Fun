//Router Module
const express = require("express");

//model
const mealsModel = require('./meals-model.js')

const router = express.Router();

//MEALS CRUD
//GET ALL
router.get('/all', async (req, res) => {
    try {
        const meals = await mealsModel.getAllMeals();
        res.status(200).json(meals)
    } catch (error) {
        res.status(500).json(error);
    }
});
//AUTHORIZED ONLY
//POST
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

//   router.post('/all/:id', restricted, checkRole('expat'), async (req, res) => {
//     try {
//         const { location, img_url } = req.body;
//         req.body.user_id = req.params.id;
//         if (!req.body.user_id || !location || !img_url) {
//             res.status(400).json({ message: 'Please provide the user_id, location, and img_url for this photo' });
//         } else {
//             const photo = req.body
//             const newPhoto = await Photos.addPhoto(photo);
//             res.status(201).json(newPhoto);
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

  //Export Router
module.exports = router;