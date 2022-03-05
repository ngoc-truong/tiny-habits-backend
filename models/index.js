const Aspiration = require("./aspiration");
const User = require("./user");

// Aspiration.sync();
User.sync();

module.exports = {
  Aspiration,
  User,
};
