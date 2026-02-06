const { DataTypes, } = require('sequelize');
const sequelize = require('../config/database');
const Asset = sequelize.define('Asset', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    assetTag: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    category:{
        type: DataTypes.ENUM('IT','Vehicle','Furniture','Other'),
        defaultValue:"Other",
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('available','allocated','repair','retired'),
        defaultValue:'available',
        allowNull:false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    purchaseDate:{
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    purchaseCost:{
        type: DataTypes.DECIMAL(12,2),
        allowNull:false,
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, 
{
    timestamps: true,
    paranoid:true,
    indexes:[
        {
            unique:true,
            fields:['assetTag'],
        },
    ],
}
);

module.exports = Asset;