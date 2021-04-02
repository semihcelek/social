const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: DataTypes.STRING(50),
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
