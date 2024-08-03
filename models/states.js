const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');



const state= sequelize.define('State', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.GEOMETRY('POLYGON'),
    allowNull: true,
 }
});



module.exports = state;
