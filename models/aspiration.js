const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Aspiration extends Model {}

Aspiration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "aspiration",
  }
);

module.exports = Aspiration;
