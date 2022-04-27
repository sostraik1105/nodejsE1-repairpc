const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "sostraik1903",
  database: "repair_pc",
  logging: false
});

module.exports = { db };
