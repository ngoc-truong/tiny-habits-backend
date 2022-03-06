const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class UserAspirations extends Model {}

UserAspirations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    aspirationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "aspirations", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user_aspirations",
  }
);

module.exports = UserAspirations;
