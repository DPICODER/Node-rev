const Allocation = require("./allocation.model");
const Asset = require("./asset.model");
const User = require("./User");

Asset.hasMany(Allocation, {
  foreignKey: "assetId",
  as: "allocations",
});

Allocation.belongsTo(Asset, {
  foreignKey: "assetId",
  as: "asset",
});

User.hasMany(Allocation, {
  foreignKey: "userId",
  as: "allocations",
});

Allocation.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = { User, Asset, Allocation };
