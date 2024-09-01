const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();

// Criar (POST /produtos)
router.post('/', async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ler todos (GET /produtos)
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ler por ID (GET /produtos/:id)
router.get('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar (PUT /produtos/:id)
router.put('/:id', async (req, res) => {
    try {
        const [atualizado] = await Produto.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const produtoAtualizado = await Produto.findByPk(req.params.id);
            res.json(produtoAtualizado);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar (DELETE /produtos/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletado = await Produto.destroy({
            where: { id: req.params.id }
        });
        if (deletado) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
