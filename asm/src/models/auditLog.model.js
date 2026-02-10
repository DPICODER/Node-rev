const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const AuditLog = sequelize.define('AuditLog',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    action:DataTypes.STRING,
    entityId:DataTypes.INTEGER,
    entityType:DataTypes.STRING,
    metadata:DataTypes.JSON,
    ipAddress:DataTypes.STRING
},{
    timestamps:true,
    updatedAt:false
})

module.exports = AuditLog;