//sqlite3 module
const knex = require('knex');
//knex blueprint
const knexConfig = require('../knexfile.js');
//export
module.exports = knex(knexConfig.development);
