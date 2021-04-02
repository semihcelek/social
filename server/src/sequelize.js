const { Sequelize, DataTypes } = require("sequelize");
const pg = require("pg");

const UserModel = require("./models/user-model");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize, DataTypes);

module.exports = {
  User,
};
