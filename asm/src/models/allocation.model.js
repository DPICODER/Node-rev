const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Allocation = sequelize.define('Allocation',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    assignedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
    returnedAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    status:{
        type:DataTypes.ENUM("active","returned"),
        defaultValue:'active',
    },
    notes:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
});

module.exports = Allocation;