const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',  // Armazena o banco de dados na memória
  logging: console.log  // Habilita o log das consultas SQL
});

module.exports = sequelize;
