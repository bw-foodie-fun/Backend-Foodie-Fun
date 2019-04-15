//Table for USERNAME and PASSWORD
exports.up = function(knex) {
    return knex.schema.createTable('meals', users => {
      users.increments();
  
    
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('meals');
  };