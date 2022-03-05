const Aspiration = require("./aspiration");
const User = require("./user");

User.hasMany(Aspiration);
Aspiration.belongsTo(User);

Aspiration.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Aspiration,
  User,
};
