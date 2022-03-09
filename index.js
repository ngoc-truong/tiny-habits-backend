const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const aspirationsRouter = require("./controllers/aspirations");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const behaviorsRouter = require("./controllers/behaviors");

app.use(express.json());

app.use("/api/aspirations", aspirationsRouter);
app.use("/api/behaviors", behaviorsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
