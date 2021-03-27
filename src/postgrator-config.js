require('dotenv').config();
console.log('config info', config());
module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (pg.defaults.sll = process.env.NODE_ENV === "production")
    ? process.env.TEST_DB_URL
    : process.env.DB_URL,
}