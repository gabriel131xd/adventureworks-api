const express = require('express');
const bodyParser = require('body-parser');
const { sql, connectToDatabase } = require('./db');

const app = express();
app.use(bodyParser.json());

// Conectar ao banco de dados SQL Server
connectToDatabase();

// Rota para listar todos os produtos da tabela 'Produto' (por exemplo)
app.get('/produtos', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Produção.Produto`;
    res.json(result.recordset);  // recordset contém os resultados da consulta
  } catch (err) {
    console.error('Erro ao buscar produtos:', err.message);
    res.status(500).send('Erro no Servidor ao buscar produtos.');
  }
});

// Rota para criar um novo produto (exemplo)
app.post('/produtos', async (req, res) => {
  const { nome, numeroProduto, cor, custoPadrao } = req.body;
  try {
    const query = `
      INSERT INTO Produção.Produto (Nome, NumeroProduto, Cor, CustoPadrao)
      VALUES (@nome, @numeroProduto, @cor, @custoPadrao);
      SELECT SCOPE_IDENTITY() AS id;`;

    const request = new sql.Request();
    request.input('nome', sql.NVarChar, nome);
    request.input('numeroProduto', sql.NVarChar, numeroProduto);
    request.input('cor', sql.NVarChar, cor);
    request.input('custoPadrao', sql.Decimal, custoPadrao);

    const result = await request.query(query);
    res.status(201).json({ id: result.recordset[0].id });
  } catch (err) {
    console.error('Erro ao criar produto:', err.message);
    res.status(500).send('Erro no Servidor ao criar produto.');
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
