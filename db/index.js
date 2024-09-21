const Sequelize = require("sequelize");
const initModels = require("./models/init-models");
const config = require("./config/config");

const db =
  process.env.NODE_ENV === "development"
    ? config.development
    : config.production;

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const models = initModels(sequelize);

module.exports = { models, sequelize, Sequelize };
