const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Behavior extends Model {}

Behavior.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motivating: {
      type: DataTypes.INTEGER,
    },
    easy: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "behavior",
  }
);

module.exports = Behavior;
