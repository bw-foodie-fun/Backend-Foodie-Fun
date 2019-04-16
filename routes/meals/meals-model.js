const db = require('../../data/dbConfig.js');

module.exports = {
    getAllMeals,
    insert,
    addMeal
}

function getAllMeals() {
    return db('meals')
}

  async function addMeal(meal) {
    const [id] = await db('meals').insert(meal, 'id');

    return findMealById(id);
}

function findMealById(id) {
    return db('meals')
        .where({ id })
        .first();
}