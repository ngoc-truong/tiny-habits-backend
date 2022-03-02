require("dotenv").config();
const { Sequelize, Model, QueryTypes } = require("sequelize");
const express = require("express");
const res = require("express/lib/response");
const { NoticeMessage } = require("pg-protocol/dist/messages");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
  { sequelize, underscored: true, timestamps: false, modelName: "aspiration" }
);

app.get("/api/aspirations", async (req, res) => {
  const aspirations = await Aspiration.findAll();
  res.json(aspirations);
});

app.post("/api/aspirations", async (req, res) => {
  console.log(req.body);
  try {
    const aspiration = await Aspiration.create(req.body);
    return res.json(aspiration);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
