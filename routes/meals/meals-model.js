const db = require('../../data/dbConfig.js');

module.exports = {
    getAllMeals,
}

function getAllMeals() {
    return db('meals')
}
