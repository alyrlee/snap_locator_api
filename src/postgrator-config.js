require('dotenv').config();
console.log('config info', config());
module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": (pg.defaults.sll = process.env.NODE_ENV === "production")
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
}