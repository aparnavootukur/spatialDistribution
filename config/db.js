const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('postgres', 'postgres', 'password', {
    host: 'localhost', // or your database server's IP address
    dialect: 'postgres', // or 'postgresql'
    port: 5433, // default PostgreSQL port
  });

module.exports = sequelize;