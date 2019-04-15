const db = require('../../data/dbConfig.js');

module.exports = {
    getAllMeals,
    insert,
    addMeal
}

function getAllMeals() {
    return db('meals')
}

function insert(meal) {
    return db('meals')
      .insert(meal)
  }

  async function addMeal(meal) {
    const [id] = await db('meals').insert(meal, 'id');

    return findPhotoById(id);
}