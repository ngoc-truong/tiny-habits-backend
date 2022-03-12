const Aspiration = require("./aspiration");
const User = require("./user");
const Team = require("./team");
const Behavior = require("./behavior");
const Membership = require("./membership");
const UserAspirations = require("./user_aspirations");

User.hasMany(Aspiration);
Aspiration.belongsTo(User);

Aspiration.hasMany(Behavior);
Behavior.belongsTo(Aspiration);
// Aspiration.sync({ alter: true });
// Behavior.sync({ alter: true });

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Aspiration, {
  through: UserAspirations,
  as: "marked_aspirations",
});
Aspiration.belongsToMany(User, {
  through: UserAspirations,
  as: "users_marked",
});

module.exports = {
  Aspiration,
  User,
  Team,
  Membership,
  UserAspirations,
  Behavior,
};
