const { Sequelize } = require("sequelize");

// Use SQLite for development (no PostgreSQL installation needed)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

module.exports = sequelize;
