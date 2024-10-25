const {DataTypes} = require('sequelize')
const sequelize = require('./db')
const User = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    family_name:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

const Employers = sequelize.define('employee',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING
    },
    family_name:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports = {
    User,
    Employers
}