const { Sequelize, DataTypes } = require("sequelize");
const pg = require("pg");

const UserModel = require("./models/user-model");
const PostModel = require("./models/post-model");
const MeetupModel = require("./models/meetup-model");

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
const Post = PostModel(sequelize, DataTypes);
const Meetup = MeetupModel(sequelize, DataTypes);

User.hasMany(Post, { foreignKey: "posts" });
Post.belongsTo(User, { foreignKey: "author" });

// User.belongsToMany(Meetup)
// In order to implement many-to-many relationship, it is neccessary to create a middleground table.

module.exports = {
  User,
  Post,
  Meetup,
};
