const Asset = require("./asset.model");
const User = require("./User");

User.hasMany(Asset,{
    foreignKey:'createdBy',
    as:'assets',
})

Asset.belongsTo(User,{
    foreignKey:'createdBy',
    as:'creator',
})

module.exports ={User,Asset}