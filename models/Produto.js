const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroProduto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING
    },
    custoPadrao: {
        type: DataTypes.FLOAT
    },
    precoLista: {
        type: DataTypes.FLOAT
    }
});

module.exports = Produto;
