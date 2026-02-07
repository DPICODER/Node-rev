const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt')

const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{isEmail:true},
        allowNull:false,
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:'user',
        allowNull:false
    },
},{
    timestamps:true,
    //automatically hide password 
    defaultScope:{
        attributes:{exclude:["password"]},
    },

    scopes:{
        withPassword:{
            attributes:{include:["password"]}
        }
    },

    //hooks to automatically hash password on user creation removing the need of creating hash code on register route
    hooks:{
        beforeSave:async(user)=>{
            if(user.changed('password')){
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password , saltRounds);
            }
        },
        beforeValidate:(user)=>{
            if(user.email){
                user.email = user.email.toLowerCase();
            }
        }
    },
})

User.prototype.comparePassword=async function(inputPassword){
    return await bcrypt.compare(inputPassword,this.password);
};


module.exports = User;