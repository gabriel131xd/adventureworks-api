const express = require('express');
const Produto = require('./models/Produto');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

// Rota para criar um novo produto (POST /produtos)
app.post('/produtos', async (req, res) => {
  const produto = await Produto.create(req.body);
  res.status(201).json(produto);
});

// Rota para listar todos os produtos (GET /produtos)
app.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

// Rota para buscar um produto por ID (GET /produtos/:id)
app.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

// Rota para atualizar um produto por ID (PUT /produtos/:id)
app.put('/produtos/:id', async (req, res) => {
  const [atualizado] = await Produto.update(req.body, {
    where: { id: req.params.id }
  });
  if (atualizado) {
    const produtoAtualizado = await Produto.findByPk(req.params.id);
    res.json(produtoAtualizado);
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

// Rota para deletar um produto por ID (DELETE /produtos/:id)
app.delete('/produtos/:id', async (req, res) => {
  const deletado = await Produto.destroy({ where: { id: req.params.id } });
  if (deletado) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Produto não encontrado' });
  }
});

// Sincronizar o Sequelize e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
});
