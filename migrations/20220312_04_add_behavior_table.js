const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("behaviors", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      motivating: {
        type: DataTypes.INTEGER,
      },
      easy: {
        type: DataTypes.INTEGER,
      },
      aspiration_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "aspirations", key: "id" },
      },
      date: {
        type: DataTypes.DATE,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("behaviors");
  },
};
