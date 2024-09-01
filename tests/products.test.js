const request = require('supertest');
const express = require('express');
const rotasProduto = require('../routes/produtos');
const sequelize = require('../config/database');
const Produto = require('./models/Produto');


const app = express();
app.use(express.json());
app.use('/produtos', rotasProduto);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

test('POST /produtos deve criar um novo produto', async () => {
    const resposta = await request(app)
        .post('/produtos')
        .send({ nome: 'Produto1', numeroProduto: '123', cor: 'Vermelho', custoPadrao: 100, precoLista: 150 });
    expect(resposta.statusCode).toBe(201);
    expect(resposta.body.nome).toBe('Produto1');
});

afterAll(async () => {
    await sequelize.close();
});
