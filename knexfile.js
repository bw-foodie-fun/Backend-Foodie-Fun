
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/meals.db3'
    }
  },
  useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: 'meals'
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
};