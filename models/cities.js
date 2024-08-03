const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const State=require('./states')

const city = sequelize.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: true,
 }
});

city.belongsTo(State, { as: 'state' });
    


module.exports = city;
