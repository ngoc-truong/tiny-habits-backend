const Aspiration = require("./aspiration");
const User = require("./user");
const Team = require("./team");
const Membership = require("./membership");

User.hasMany(Aspiration);
Aspiration.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

// Aspiration.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Aspiration,
  User,
  Team,
  Membership,
};
